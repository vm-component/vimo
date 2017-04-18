<template>
    <div class="ion-item-sliding item-wrapper"
         @touchstart="onDragStart"
         @mousedown="onDragStart"
         @touchend="onDragEnd"
         @mouseup="onDragEnd"
         @touchmove="onDragMove"
         @mousemove="onDragMove"
         :class="activeClass">
        <slot></slot>
    </div>
</template>
<style lang="scss"></style>
<script>
  /**
   * @name ItemSliding
   * @module Component/ItemSliding
   * @description
   *
   * item滑动选择
   *
   * 组件说明：
   * 对外事件：
   * onDrag - 拖动时触发
   * onSwipe - 滑动超过按钮最大距离+SWIPE_MARGIN时触发，不管方向
   * onSwipeRight - 向右滑动 超过按钮最大距离+SWIPE_MARGIN时触发
   * onSwipeLeft - 向左滑动 超过按钮最大距离+SWIPE_MARGIN时触发
   * */
  import { pointerCoord, transitionEnd } from '../../util/util.js'

  const SWIPE_MARGIN = 30 * 2 // 触发swipe的值
  const ELASTIC_FACTOR = 0.55 // 0.55
  const ItemSideFlags = {
    None: 0,
    Left: 1,
    Right: 2,
    Both: 3,
  }
  const SlidingState = {
    Disabled: 2,
    Enabled: 4,
    Right: 8,
    Left: 16,
    SwipeRight: 32,
    SwipeLeft: 64,
  }

  const DIRECTION_NONE = 1
  const DIRECTION_LEFT = 2
  const DIRECTION_RIGHT = 4
  const DIRECTION_UP = 8
  const DIRECTION_DOWN = 16

  const MAX_DELTAX = 20
  let startCood

  export default{
    name: 'ItemSliding',
    data(){
      return {
        isDragging: false,                      // 是否正在滑动
        isDraggingConfirm: false,               // 单次滚动方向确认

        itemComponent: null,                     // 父组件Item的实例
        ListComponent: null,                     // 父组件List的实例

        leftOptions: null,                      // 左边的选项 实例
        rightOptions: null,                     // 右边的选项 实例
        optsWidthRightSide: 0,                  // 右边选项的宽度 number
        optsWidthLeftSide: 0,                   // 左边选项的宽度 number

        openAmount: 0,                          // 开启值 number
        startX: 0,                              // 初始的位置 number

        sides: 0,                               // 当前滑动的方向 ItemSideFlags的枚举值 标识options的left/right/both的状态
        unregister: null,                       // itemComponent组件关闭动画的解绑函数

        optsDirty: true,                        // boolean true:还未计算options的宽度，false:已计算
        state: SlidingState.Disabled,           // 滑动程度及状态
        firstCoord: 0,                          // {x,y} 记录点击开始的位置，用于计算速度
        firstTimestamp: new Date().getTime(),   // number 记录点击开始的时间，用于计算速度
        activeClass: {},                        // 根据滑动状态设置active的class类型
      }
    },
    props: {},
    watch: {},
    computed: {},
    methods: {

      /**
       * 获取ion-item的开启值
       * @return {number}
       * */
      getOpenAmount() {
        return this.openAmount
      },

      /**
       * 获取开口的百分比
       * @return {number}
       * */
      getSlidingPercent() {
        let openAmount = this.openAmount
        if (openAmount > 0) {
          return openAmount / this.optsWidthRightSide
        } else if (openAmount < 0) {
          return openAmount / this.optsWidthLeftSide
        } else {
          return 0
        }
      },

      /**
       * 开启左边的选项卡
       * @return {any} ins - 开启的组件示例的this，默认是当前组件自己的this
       * */
      openLeftOptions(ins = this){
        if (ins === this && !!this.leftOptions) {
          if (this.state === SlidingState.Left || this.state === SlidingState.SwipeLeft) {
            return
          }
          this.activeClass = {
            'active-slide': true,
          }
          this.$nextTick(() => {
            if (this.optsDirty) {
              this.calculateOptsWidth()
              return
            }
            if (this.optsWidthLeftSide > 0) {
              this.setOpenAmount(-this.optsWidthLeftSide, false)
            }
          })
        }
      },

      /**
       * 开启右边的选项卡
       * @return {any} ins - 开启的组件示例的this，默认是当前组件自己的this
       * */
      openRightOptions(ins = this){
        if (ins === this && !!this.rightOptions) {
          if (this.state === SlidingState.Right || this.state === SlidingState.SwipeRight) {
            return
          }

          this.activeClass = {
            'active-slide': true,
          }
          this.$nextTick(() => {
            if (this.optsDirty) {
              this.calculateOptsWidth()
              return
            }
            if (this.optsWidthRightSide > 0) {
              this.setOpenAmount(this.optsWidthRightSide, false)
            }
          })
        }
      },

      /**
       * 关闭当前的sliding
       * */
      close() {
        // 关闭的条件：必须是开启状态，并且不是disable状态
        if (Math.abs(this.openAmount) > 0 && this.state !== SlidingState.Disabled) {
          this.setOpenAmount(0, true)
        }
      },

      // ------------- @private -------------

      /**
       * @private
       * onDragStart
       * @param {any} ev
       */
      onDragStart(ev){
        startCood = pointerCoord(ev)
        this.firstCoord = startCood
        this.firstTimestamp = new Date().getTime()
        this.startSliding(this.firstCoord.x)
        this.$eventBus && this.$eventBus.$emit('onSlidingClose', this)
      },

      /**
       * @private
       * onDragMove
       * @param {any} ev
       */
      onDragMove(ev){
        let coordX = pointerCoord(ev).x
        if (this.isDragging && this.isDraggingConfirm) {
          ev.preventDefault()
          this.moveSliding(coordX)
        } else {
          if (Math.abs(coordX - this.firstCoord.x) > MAX_DELTAX && !this.isDraggingConfirm) {
            let directionCode = this.getDirection(this.firstCoord, pointerCoord(ev))
            this.isDraggingConfirm = true
            if (directionCode === DIRECTION_LEFT || directionCode === DIRECTION_RIGHT) {
              this.isDragging = true
            } else {
              this.isDragging = false
            }
          }
        }
      },

      /**
       * @private
       * onDragEnd
       * @param {any} ev
       */
      onDragEnd(ev){
        let coordX = pointerCoord(ev).x
        let deltaX = (coordX - this.firstCoord.x)
        let deltaT = (Date.now() - this.firstTimestamp)
        if (deltaX === 0) {
          this.close()
        } else {
          this.endSliding(deltaX / deltaT)
        }
        this.isDragging = false
        this.isDraggingConfirm = false
      },

      /**
       * @private
       * 获取方向
       */
      getDirection(start, end) {

        let deltaX = end.x - start.x
        let deltaY = end.y - start.y

        if (deltaX > 0 && Math.abs(deltaX) > Math.abs(deltaY)) {
          return DIRECTION_RIGHT
        }

        if (deltaX < 0 && Math.abs(deltaX) > Math.abs(deltaY)) {
          return DIRECTION_LEFT
        }

        if (deltaY > 0 && Math.abs(deltaX) < Math.abs(deltaY)) {
          return DIRECTION_DOWN
        }

        if (deltaY < 0 && Math.abs(deltaX) < Math.abs(deltaY)) {
          return DIRECTION_UP
        }

        return DIRECTION_NONE
      },

      /**
       * @private
       * 初始化：获取子组件实例，ItemSideFlags状态变更
       * */
      init(){
        // 获取子组件实例
        let side = 0 // ItemSideFlags None=0
        this.$children.forEach((item) => {
          if (item.$options._componentTag.toLowerCase() === 'item') {
            this.itemComponent = item
          }
          if (item.$options._componentTag.toLowerCase() === 'itemoptions' && item.side === 'left') {
            this.leftOptions = item
            side |= this.getSides(item)
          }
          if (item.$options._componentTag.toLowerCase() === 'itemoptions' && item.side === 'right') {
            this.rightOptions = item
            side |= this.getSides(item)
          }
        })
        // ItemSideFlags 的状态记录
        this.sides = side // option的可滑动方向 none:0 left:1 right:2 both:3
        this.optsDirty = true

        //  事件注册
        this.$eventBus && this.$eventBus.$on('onSlidingClose', (ins) => {
          if (this !== ins) {
            this.close()
          }
        })
        this.$eventBus && this.$eventBus.$on('onScroll', () => {
          this.close()
        })

      },

      /**
       * @private
       * 设置起始点，因为有原始点与options点
       * @private
       * @param {number} startX
       * */
      startSliding(startX) {
        this.unregister && this.unregister()
        if (this.openAmount === 0) {
          this.setState(SlidingState.Enabled)
        }
        this.startX = startX + this.openAmount
      },

      /**
       * @private
       * 计算openAmount，算入阻尼，最后执行item定位
       * @private
       * @param {number} x
       * @return {number}
       */
      moveSliding(x){

        if (this.optsDirty) {
          this.calculateOptsWidth()
          return
        }
        let openAmount = (this.startX - x)
        switch (this.sides) {
          case ItemSideFlags.Right:
            openAmount = Math.max(0, openAmount)
            break
          case ItemSideFlags.Left:
            openAmount = Math.min(0, openAmount)
            break
          case ItemSideFlags.Both:
            break
          case ItemSideFlags.None:
            return
          default:
            console.assert(false, 'invalid ItemSideFlags value')
            break
        }

        if (openAmount > this.optsWidthRightSide) {
          let optsWidth = this.optsWidthRightSide
          openAmount = optsWidth + (openAmount - optsWidth) * ELASTIC_FACTOR

        } else if (openAmount < -this.optsWidthLeftSide) {
          let optsWidth = -this.optsWidthLeftSide
          openAmount = optsWidth + (openAmount - optsWidth) * ELASTIC_FACTOR
        }
        this.setOpenAmount(openAmount, false)
        return openAmount
      },

      /**
       * @private
       * 松手后的移动特性决定最终停在哪个位置
       * @private
       * @param {number} velocity 移动速度(惯性)
       * @return {number}
       */
      endSliding(velocity){
        // 松手后的停留点
        let restingPoint = (this.openAmount > 0)
          ? this.optsWidthRightSide
          : -this.optsWidthLeftSide

        // Check if the drag didn't clear the buttons mid-point
        // and we aren't moving fast enough to swipe open
        let isResetDirection = (this.openAmount > 0) === !(velocity < 0)
        let isMovingFast = Math.abs(velocity) > 0.3
        let isOnCloseZone = Math.abs(this.openAmount) < Math.abs(restingPoint / 2)
        if (swipeShouldReset(isResetDirection, isMovingFast, isOnCloseZone)) {
          restingPoint = 0
        }

        this.setOpenAmount(restingPoint, true)

        this.fireSwipeEvent()
        return restingPoint
      },

      /**
       * @private
       * 计算子组件的左右options的宽度
       * @private
       * */
      calculateOptsWidth() {
        if (!this.optsDirty) {
          return
        }
        this.optsWidthRightSide = 0
        if (this.rightOptions) {
          this.optsWidthRightSide = this.rightOptions.width()
        }
        this.optsWidthLeftSide = 0
        if (this.leftOptions) {
          this.optsWidthLeftSide = this.leftOptions.width()
        }
        this.optsDirty = false
      },

      /**
       * 获取options子组件的side属性对应的ItemSideFlags值
       * @private
       * @param {any} ins options子组件的实例
       * */
      getSides(ins) {
        if (ins.side === 'left') {
          return ItemSideFlags.Left
        } else {
          return ItemSideFlags.Right
        }
      },

      /**
       * 根据openAmount设置item的开闭位置
       * @private
       * @param {number} openAmount
       * @param {boolean} isFinal - 是否关闭
       * */
      setOpenAmount(openAmount, isFinal) {
        this.unregister && this.unregister()
        this.openAmount = openAmount
        if (isFinal) {
          this.setItemTransformX(0)
        } else {
          if (openAmount > 0) {
            let state = (openAmount >= (this.optsWidthRightSide + SWIPE_MARGIN))
              ? SlidingState.Right | SlidingState.SwipeRight
              : SlidingState.Right

            this.setState(state)

          } else if (openAmount < 0) {
            let state = (openAmount <= (-this.optsWidthLeftSide - SWIPE_MARGIN))
              ? SlidingState.Left | SlidingState.SwipeLeft
              : SlidingState.Left

            this.setState(state)
          }
        }

        if (openAmount === 0) {
          this.unregister && this.unregister()

          this.unregister = transitionEnd(this.itemComponent.$el, () => {
            this.setState(SlidingState.Disabled)
            this.unregister = null
          })

          this.setItemTransformX(0)
          return
        }

        this.setItemTransformX(-openAmount)
        this.$emit('onDrag', this)
      },

      /**
       * @private
       * @param {SlidingState} state
       * */
      setState  (state) {
        if (state === this.state) return
        this.activeClass = {
          'active-slide': (state !== SlidingState.Disabled),
          'active-options-right': !!(state & SlidingState.Right),
          'active-options-left': !!(state & SlidingState.Left),
          'active-swipe-right': !!(state & SlidingState.SwipeRight),
          'active-swipe-left': !!(state & SlidingState.SwipeLeft)
        }
        this.state = state
      },

      /**
       * 设置子组件ion-item的transformX属性
       * @private
       * @param {number} val
       * */
      setItemTransformX(val = 0){
        if (this.itemComponent) {
          this.itemComponent.$el.style.transform = `translate3d(${val}px, 0px, 0px)`
        }
      },

      /**
       * 对外发出swipe事件，
       * @private
       * @param {number} val
       * */
      fireSwipeEvent() {
        if (this.state & SlidingState.SwipeRight) {
          this.$emit('onSwipe', this)
          this.$emit('onSwipeLeft', this)
        } else if (this.state & SlidingState.SwipeLeft) {
          this.$emit('onSwipe', this)
          this.$emit('onSwipeRight', this)
        }
      },
    },
    mounted () {
      // 此时子组件才初始化完毕
      this.init()
    },
    destroyed(){
      // 组件中，activated和deactivated都不管用
      this.$eventBus && this.$eventBus.$off('onSlidingClose')
    }
  }

  /**
   * 根据传入条件判断是否执行swipeReset
   * @private
   * @param {boolean} isResetDirection
   * @param {boolean} isMovingFast
   * @param {boolean} isOnResetZone
   * @return {boolean}
   */
  function swipeShouldReset (isResetDirection, isMovingFast, isOnResetZone) {
    // The logic required to know when the sliding item should close (openAmount=0)
    // depends on three booleans (isCloseDirection, isMovingFast, isOnCloseZone)
    // and it ended up being too complicated to be written manually without errors
    // so the truth table is attached below: (0=false, 1=true)
    // isCloseDirection | isMovingFast | isOnCloseZone || shouldClose
    //         0        |       0      |       0       ||    0
    //         0        |       0      |       1       ||    1
    //         0        |       1      |       0       ||    0
    //         0        |       1      |       1       ||    0
    //         1        |       0      |       0       ||    0
    //         1        |       0      |       1       ||    1
    //         1        |       1      |       0       ||    1
    //         1        |       1      |       1       ||    1
    // The resulting expression was generated by resolving the K-map (Karnaugh map):
    let shouldClose = (!isMovingFast && isOnResetZone) || (isResetDirection && isMovingFast)
    return shouldClose
  }
</script>

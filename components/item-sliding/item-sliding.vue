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
<style lang="less">
    @import "item-sliding.less";
    @import "item-sliding.ios.less";
    @import "item-sliding.md.less";
</style>
<script type="text/javascript">
  /**
   * @component Item/ItemSliding
   * @description
   *
   * ## 列表组件 / ItemSliding滑动选择组件
   *
   * 这个组件是对Item组件的拓展, 当左右滑动时出现可选择的按钮, 这个组件在部分安卓机上卡顿明显, 使用起来效果不太好, 但是在IOS上很流畅.
   *
   *
   * ### 子组件ItemSlidingOptions
   *
   * ItemSlidingOptions只能在ItemSliding组件中使用
   *
   * ### 如何使用
   *
   * ```
   * // 引入
   * import { ItemSlidingOptions, ItemSliding } from 'vimo/lib/item-sliding'
   * // 安装
   * export default{
   *   components: { ItemSlidingOptions, ItemSliding }
   * }
   * ```
   *
   *
   * @props {Boolean} disabled - 是否禁用
   *
   * @fires component:ItemSliding#onDrag
   * @fires component:ItemSliding#onSwipe
   * @fires component:ItemSliding#onSwipeRight
   * @fires component:ItemSliding#onSwipeLeft
   *
   * @demo #/slidingList
   * @see component:ItemOptions
   *
   * @usage
   *
   * <ItemSliding>
   *    <Item>
   *        <Avatar slot="item-left">
   *            <img src="./img/avatar-ts-woody.png">
   *        </Avatar>
   *        <Label>
   *            <h2>两边都有按钮</h2>
   *            <p>试试 ↔️️ 都滑动</p>
   *        </Label>
   *    </Item>
   *    <ItemSlidingOptions side="left">
   *        <Button color="primary" @click="clickText">
   *            <Icon name="text"></Icon>
   *            <span>Text</span>
   *        </Button>
   *        <Button color="secondary" @click="clickCall">
   *            <Icon name="call"></Icon>
   *            <span>Call</span>
   *        </Button>
   *     </ItemSlidingOptions>
   *     <ItemSlidingOptions side="right">
   *        <Button color="primary" @click="clickEmail">
   *            <Icon name="mail"></Icon>
   *            <span>Email</span>
   *        </Button>
   *    </ItemSlidingOptions>
   * </ItemSliding>
   * */
  import { pointerCoord, transitionEnd } from '../util/util.js'

  const SWIPE_MARGIN = 30 * 2 // 触发swipe的值
  const ELASTIC_FACTOR = 0.55 // 0.55
  const ITEM_SIDE_FLAGS = {
    None: 0,
    Left: 1,
    Right: 2,
    Both: 3
  }
  const SLIDING_STATE = {
    Disabled: 2,            // 关闭状态
    Enabled: 4,             // 滑动状态, 不清楚方向和程度
    Right: 8,               // 向右滑动
    Left: 16,               // 向左滑动
    SwipeRight: 32,         // 向右滑动且滑动距离大
    SwipeLeft: 64          // 向左滑动且滑动距离大
  }

  const DIRECTION_NONE = 1
  const DIRECTION_LEFT = 2
  const DIRECTION_RIGHT = 4
  const DIRECTION_UP = 8
  const DIRECTION_DOWN = 16

  const MAX_DELTAX = 20

  export default {
    name: 'ItemSliding',
    data () {
      return {
        timer: null,
        isDragging: false,                      // 是否正在左右滑动
        isDraggingConfirm: false,               // 当次滚动方向确认与否
        isDraggingFromStart: false,             // 滚动是否从start开始

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
        state: SLIDING_STATE.Disabled,           // 滑动程度及状态
        firstCoord: 0,                          // {x,y} 记录点击开始的位置，用于计算速度
        firstTimestamp: new Date().getTime(),   // number 记录点击开始的时间，用于计算速度
        activeClass: {}                        // 根据滑动状态设置active的class类型
      }
    },
    props: {
      disabled: [Boolean]
    },
    methods: {

      /**
       * @function getOpenAmount
       * @description
       * 获取ion-item的开启值
       * @return {number}
       * */
      getOpenAmount () {
        return this.openAmount
      },

      /**
       * @function getSlidingPercent
       * @description
       * 获取开口的百分比
       * @return {number}
       * */
      getSlidingPercent () {
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
       * @function openLeftOptions
       * @description
       * 开启左边的选项卡
       * @return {*} ins - 开启的组件示例的this，默认是当前组件自己的this
       * */
      openLeftOptions (ins = this) {
        if (ins === this && this.leftOptions) {
          if (this.state === SLIDING_STATE.Left || this.state === SLIDING_STATE.SwipeLeft) {
            return
          }
          this.activeClass = {
            'active-slide': true
          }
          this.$nextTick(() => {
            if (this.optsDirty) {
              this.calculateOptsWidth()
            }
            if (this.optsWidthLeftSide > 0) {
              this.setOpenAmount(-this.optsWidthLeftSide, false)
            }
          })
        }
      },

      /**
       * @function openRightOptions
       * @description
       * 开启右边的选项卡
       * @return {*} ins - 开启的组件示例的this，默认是当前组件自己的this
       * */
      openRightOptions (ins = this) {
        if (ins === this && this.rightOptions) {
          if (this.state === SLIDING_STATE.Right || this.state === SLIDING_STATE.SwipeRight) {
            return
          }
          this.activeClass = {
            'active-slide': true
          }
          this.$nextTick(() => {
            if (this.optsDirty) {
              this.calculateOptsWidth()
            }
            if (this.optsWidthRightSide > 0) {
              this.setOpenAmount(this.optsWidthRightSide, false)
            }
          })
        }
      },

      /**
       * @function close
       * @description
       * 关闭当前的sliding
       * */
      close () {
        // 关闭的条件：必须是开启状态，并且不是disable状态
        if (Math.abs(this.openAmount) > 0 && this.state !== SLIDING_STATE.Disabled) {
          this.setOpenAmount(0, true)
        }
      },

      // ------------- @private -------------

      /**
       * 判断是否能拖动
       * @private
       * */
      canDrag () {
        if (this.disabled) return false

        // 表示还在动画transition中
        if (this.unregister) {
          this.unregister()
          this.unregister = null
        }

        return true
      },

      /**
       * onDragStart
       * @param {any} ev
       * @return {*}
       * @private
       */
      onDragStart (ev) {
        if (!this.canDrag()) return
        this.firstCoord = pointerCoord(ev)
        this.firstTimestamp = new Date().getTime()
        this.startSliding(this.firstCoord.x)
        this.$eventBus && this.$eventBus.$emit('onItemSlidingOpen', this)
        this.isDraggingFromStart = true
      },

      /**
       * onDragMove
       * @param {any} ev
       * @return {*}
       * @private
       */
      onDragMove (ev) {
        if (!this.canDrag()) return
        if (!this.isDraggingFromStart) return false
        let coordX = pointerCoord(ev).x

        // 判断当前的移动是滚动还是组件的左右移动
        if (!this.isDraggingConfirm && Math.abs(coordX - this.firstCoord.x) > MAX_DELTAX) {
          this.isDraggingConfirm = true

          let directionCode = this.getDirection(this.firstCoord, pointerCoord(ev))
          if (directionCode === DIRECTION_LEFT || directionCode === DIRECTION_RIGHT) {
            this.isDragging = true
            ev.preventDefault && ev.preventDefault()
          } else {
            this.isDragging = false
          }
        }

        if (this.isDraggingConfirm && this.isDragging) {
          this.moveSliding(coordX)
          ev.preventDefault && ev.preventDefault()
        }
      },

      /**
       * onDragEnd
       * @param {any} ev
       * @private
       */
      onDragEnd (ev) {
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
        this.isDraggingFromStart = false

        if (this.openAmount === 0 && !this.unregister) {
          // 如果点击结束后, 组件未开启, 且未动画, 则设为disabled状态
          this.activeClass = {'active-slide': false}
          this.state = SLIDING_STATE.Disabled
        }
      },

      /**
       * 获取方向
       * @private
       */
      getDirection (start, end) {
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
       * 初始化：获取子组件实例，ItemSideFlags状态变更
       * @private
       * */
      init () {
        // 获取子组件实例
        let side = 0 // ITEM_SIDE_FLAGS None=0
        let componentIs = (component, name = '') => {
          return component.$options._componentTag.toLowerCase() === name.toLowerCase()
        }

        this.$children.forEach((item) => {
          if (componentIs(item, 'item')) {
            this.itemComponent = item
          }
          if (componentIs(item, 'ItemSlidingOptions') && item.side === 'left') {
            this.leftOptions = item
            side |= this.getSides(item)
          }
          if (componentIs(item, 'ItemSlidingOptions') && item.side === 'right') {
            this.rightOptions = item
            side |= this.getSides(item)
          }
        })

        // ITEM_SIDE_FLAGS 的状态记录
        this.sides = side // option的可滑动方向 none:0 left:1 right:2 both:3
        this.optsDirty = true

        //  事件注册
        this.$eventBus && this.$eventBus.$on('onItemSlidingOpen', (ins) => {
          if (this !== ins) {
            this.close()
          }
        })
        this.$eventBus && this.$eventBus.$on('onScroll', () => {
          this.close()
        })
      },

      /**
       * 设置起始点，因为有原始点与options点
       * @param {number} startX
       * @private
       * */
      startSliding (startX) {
        if (this.openAmount === 0) {
          this.setState(SLIDING_STATE.Enabled)
        }
        this.startX = startX + this.openAmount
      },

      /**
       * 计算openAmount，算入阻尼，最后执行item定位
       * @param {number} x
       * @return {number}
       * @private
       */
      moveSliding (x) {
        if (this.optsDirty) {
          this.calculateOptsWidth()
          return 0
        }
        let openAmount = (this.startX - x)
        switch (this.sides) {
          case ITEM_SIDE_FLAGS.Right:
            openAmount = Math.max(0, openAmount)
            break
          case ITEM_SIDE_FLAGS.Left:
            openAmount = Math.min(0, openAmount)
            break
          case ITEM_SIDE_FLAGS.Both:
            break
          case ITEM_SIDE_FLAGS.None:
            return 0
          default:
            console.assert(false, 'invalid ITEM_SIDE_FLAGS value')
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
       * 松手后的移动特性决定最终停在哪个位置
       * @param {number} velocity 移动速度(惯性)
       * @return {number}
       * @private
       */
      endSliding (velocity) {
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
       * 计算子组件的左右options的宽度
       * @private
       * */
      calculateOptsWidth () {
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
       * @param {any} ins options子组件的实例
       * @private
       * */
      getSides (ins) {
        if (ins.side === 'left') {
          return ITEM_SIDE_FLAGS.Left
        } else {
          return ITEM_SIDE_FLAGS.Right
        }
      },

      /**
       * 根据openAmount设置item的开闭位置
       * @param {number} openAmount
       * @param {boolean} isFinal - 是否关闭(随手拖动 还是 松手关闭)
       * @private
       * */
      setOpenAmount (openAmount, isFinal) {
        this.openAmount = openAmount
        if (isFinal) {
          // 松手关闭状态, 可以是到起始位置, 也可以是到中途点, 全部打回初始状态
          this.isDragging = false
          this.isDraggingConfirm = false
          this.isDraggingFromStart = false
          this.unregister && this.unregister()
          if (openAmount === 0) {
            // 动画过程禁止点击操作
            this.unregister = transitionEnd(this.itemComponent.$el, () => {
              this.setState(SLIDING_STATE.Disabled)
              this.unregister = null
            })
            this.setItemTransformX(0)
          } else {
            this.unregister = transitionEnd(this.itemComponent.$el, () => {
              this.unregister = null
            })
            this.setItemTransformX(-openAmount)
          }
        } else {
          // 随手滚动阶段
          if (openAmount > 0) {
            let state = (openAmount >= (this.optsWidthRightSide + SWIPE_MARGIN))
              ? SLIDING_STATE.Right | SLIDING_STATE.SwipeRight
              : SLIDING_STATE.Right
            this.setState(state)
          } else if (openAmount < 0) {
            let state = (openAmount <= (-this.optsWidthLeftSide - SWIPE_MARGIN))
              ? SLIDING_STATE.Left | SLIDING_STATE.SwipeLeft
              : SLIDING_STATE.Left
            this.setState(state)
          }

          this.setItemTransformX(-openAmount)
          /**
           * @event component:ItemSliding#onDrag
           * @description 正在拖动时触发
           * @property {ItemSlidingComponent} this - 当前ItemSliding实例
           */
          this.$emit('onDrag', this)
        }
      },

      /**
       * @param {SLIDING_STATE} state
       * @private
       * */
      setState (state) {
        if (state === this.state) return

        this.timer && window.clearTimeout(this.timer)
        this.activeClass = {
          'active-slide': true,
          'active-options-right': (state & SLIDING_STATE.Right),
          'active-options-left': (state & SLIDING_STATE.Left),
          'active-swipe-right': (state & SLIDING_STATE.SwipeRight),
          'active-swipe-left': (state & SLIDING_STATE.SwipeLeft)
        }

        // bugFix
        if (state === SLIDING_STATE.Disabled) {
          this.timer = window.setTimeout(() => {
            this.activeClass['active-slide'] = false
          }, 16 * 5)
        }

        this.state = state
      },

      /**
       * 设置子组件ion-item的transformX属性
       * @param {number} val
       * @private
       * */
      setItemTransformX (val = 0) {
        if (this.itemComponent) {
          window.requestAnimationFrame(() => {
            this.itemComponent.$el.style.transform = `translate3d(${val >> 0}px, 0px, 0px)`
          })
        }
      },

      /**
       * 对外发出swipe事件，
       * @param {number} val
       * @private
       * */
      fireSwipeEvent () {
        if (this.state & SLIDING_STATE.SwipeRight) {
          /**
           * @event component:ItemSliding#onSwipe
           * @description 当滑动超过一定阈值时触发, 这个事件不确定方向
           * @property {ItemSlidingComponent} this - 当前ItemSliding实例
           */
          /**
           * @event component:ItemSliding#onSwipeLeft
           * @description 向左滑动 超过按钮最大距离+SWIPE_MARGIN时触
           * @property {ItemSlidingComponent} this - 当前ItemSliding实例
           */
          this.$emit('onSwipe', this)
          this.$emit('onSwipeLeft', this)
        } else if (this.state & SLIDING_STATE.SwipeLeft) {
          /**
           * @event component:ItemSliding#onSwipeRight
           * @description 向右滑动 超过按钮最大距离+SWIPE_MARGIN时触发
           * @property {ItemSlidingComponent} this - 当前ItemSliding实例
           */
          this.$emit('onSwipe', this)
          this.$emit('onSwipeRight', this)
        }
      }
    },
    mounted () {
      // 此时子组件才初始化完毕
      this.init()
    },
    destroyed () {
      this.$eventBus && this.$eventBus.$off('onItemSlidingOpen')
      this.$eventBus && this.$eventBus.$off('onScroll')
    }
  }

  /**
   * 根据传入条件判断是否执行swipeReset
   * @param {boolean} isResetDirection
   * @param {boolean} isMovingFast
   * @param {boolean} isOnResetZone
   * @return {boolean}
   * @private
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

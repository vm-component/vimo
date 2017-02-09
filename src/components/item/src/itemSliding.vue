<template>
  <div class="ion-item-sliding item-wrapper"
       @touchstart="onDragStart"
       @touchend="onDragEnd"
       @touchmove="onDragMove"
       :class="activeClass">
    <slot></slot>
  </div>
</template>
<style lang="scss"></style>
<script type="text/ecmascript-6">
  /**
   * 组件说明：
   * 对外事件：
   * ionDrag - 拖动时触发
   * ionSwipe - 滑动超过按钮最大距离+SWIPE_MARGIN时触发，不管方向
   * ionSwipeRight - 向右滑动 超过按钮最大距离+SWIPE_MARGIN时触发
   * ionSwipeLeft - 向左滑动 超过按钮最大距离+SWIPE_MARGIN时触发
   * */
  import { swipeShouldReset } from '../../../utils/assist.js'
  import { pointerCoord } from '../../../utils/dom.js'
  const SWIPE_MARGIN = 30 * 2; // 触发swipe的值
  const ELASTIC_FACTOR = 0.55;
  const ItemSideFlags = {
    None: 0,
    Left: 1,
    Right: 2,
    Both: 3,
  };
  const SlidingState = {
    Disabled: 2,
    Enabled: 4,
    Right: 8,
    Left: 16,
    SwipeRight: 32,
    SwipeLeft: 64,
  };

  let startCood;

  export default{
    name: 'ion-item-sliding',
    data(){
      return {
        itemInstance: null,// 子组件item的实例
        openAmount: 0,// 开启值 number
        startX: 0, // 初始的位置 number
        optsWidthRightSide: 0, // 右边选项的宽度 number
        optsWidthLeftSide: 0, // 左边选项的宽度 number
        sides: 0, // 当前滑动的方向 ItemSideFlags的枚举值 标识options的left/right/both的状态
        timer: null, // setTimeout的定时器 number 控制关闭时的class
        leftOptions: null, // 左边的选项 实例
        rightOptions: null, // 右边的选项 实例
        optsDirty: true, // boolean true:还未计算options的宽度，false:已计算
        state: SlidingState.Disabled, // 当前状态 SlidingState的枚举值
        firstCoordX: 0, //number 记录点击开始的位置，用于计算速度
        firstTimestamp: new Date().getTime(), //number 记录点击开始的时间，用于计算速度
        activeClass: {}, // 根据滑动状态设置active的class类型
      }
    },
    props: {},
    watch: {},
    computed: {},
    methods: {

      /**
       * onDragStart
       * @param {any} ev
       */
      onDragStart(ev){
        // ev.preventDefault();
        startCood = pointerCoord(ev);
        console.log('coord')
        console.log(startCood)
        this.firstCoordX = startCood.x;
        this.firstTimestamp = new Date().getTime();
        this._startSliding(this.firstCoordX);
        this.$eventBus.$emit('ionSlidingClose', this)
      },

      /**
       * onDragMove
       * @param {any} ev
       */
      onDragMove(ev){
        // ev.preventDefault();
        let coordX = pointerCoord(ev).x;
        this._moveSliding(coordX);
      },

      /**
       * onDragEnd
       * @param {any} ev
       */
      onDragEnd(ev){
        let coordX = pointerCoord(ev).x;
        let deltaX = (coordX - this.firstCoordX);
        let deltaT = (Date.now() - this.firstTimestamp);
        if (deltaX === 0) {
          this.close();
        } else {
          this._endSliding(deltaX / deltaT);
        }
      },

      /**
       * 获取ion-item的开启值
       * @return {number}
       * */
      getOpenAmount() {
        return this.openAmount;
      },

      /**
       * 获取开口的百分比
       * @return {number}
       * */
      getSlidingPercent() {
        let openAmount = this.openAmount;
        if (openAmount > 0) {
          return openAmount / this.optsWidthRightSide;
        } else if (openAmount < 0) {
          return openAmount / this.optsWidthLeftSide;
        } else {
          return 0;
        }
      },

      /**
       * 开启左边的选项卡
       * @return {any} ins - 开启的组件示例的this，默认是当前组件自己的this
       * */
      openLeftOptions(ins = this){
        const _this = this;
        if (ins === _this && !!_this.leftOptions) {
          _this.activeClass = {
            'active-slide': true,
          };
          _this.$nextTick(function () {
            _this._calculateOptsWidth();
            if (_this.optsWidthLeftSide > 0) {
              _this._setOpenAmount(-_this.optsWidthLeftSide, false)
            }
          })
        }
      },

      /**
       * 开启右边的选项卡
       * @return {any} ins - 开启的组件示例的this，默认是当前组件自己的this
       * */
      openRightOptions(ins = this){
        const _this = this;
        if (ins === _this && !!_this.rightOptions) {
          _this.activeClass = {
            'active-slide': true,
          };
          _this.$nextTick(function () {
            _this._calculateOptsWidth();
            if (_this.optsWidthRightSide > 0) {
              _this._setOpenAmount(_this.optsWidthRightSide, false)
            }
          })
        }
      },

      /**
       * 关闭当前的sliding
       * */
      close() {
        // 关闭的条件：必须是开启状态，并且不是disable状态
        if (Math.abs(this.openAmount) > 0 && this.state != SlidingState.Disabled) {
          this._setOpenAmount(0, true);
        }
      },

      /**
       * 获取方向
       */
      _getDirection(coordStart, coordEnd){
        let _dx = Math.abs(coordEnd.x - coordStart.x);
        let _dy = Math.abs(coordEnd.y - coordStart.y);
        if (_dy > _dx) {
          if (coordEnd.y > coordStart.y) {
            return 'bottom'
          } else {
            return 'top'
          }
        } else {
          if (coordEnd.x > coordStart.x) {
            return 'right'
          } else {
            return 'left'
          }
        }
      },

      // ------------- @private -------------
      /**
       * 初始化：获取子组件实例，ItemSideFlags状态变更
       * */
      _init(){
        const _this = this;
        // 获取子组件实例
        let side = 0; // ItemSideFlags None=0
        _this.$children.forEach(function (item) {
          if (item.$options._componentTag === 'ion-item') {
            _this.itemInstance = item;
          }
          if (item.$options._componentTag === 'ion-item-options' && item.side === 'left') {
            _this.leftOptions = item;
            side |= _this._getSides(item)
          }
          if (item.$options._componentTag === 'ion-item-options' && item.side === 'right') {
            _this.rightOptions = item;
            side |= _this._getSides(item)
          }
        });
        // ItemSideFlags 的状态记录
        _this.sides = side;
        _this.optsDirty = true;

        //  事件注册
        _this.$eventBus.$on('ionSlidingClose', function (ins) {
          if (_this != ins) {
            _this.close();
          }
        })
      },

      /**
       * 设置起始点，因为有原始点与options点
       * @private
       * @param {number} startX
       * */
      _startSliding(startX) {
        const _this = this;
        if (_this.timer) {
          window.clearTimeout(_this.timer);
          _this.timer = null;
        }
        if (_this.openAmount === 0) {
          _this._setState(SlidingState.Enabled);
        }
        _this.startX = startX + this.openAmount;
      },

      /**
       * 计算openAmount，算入阻尼，最后执行ion-item定位
       * @private
       * @param {number} x
       * @return {number}
       */
      _moveSliding(x){
        const _this = this;
        if (_this.optsDirty) {
          _this._calculateOptsWidth();
          return
        }
        let openAmount = (_this.startX - x);
        switch (_this.sides) {
          case ItemSideFlags.Right:
            openAmount = Math.max(0, openAmount);
            break;
          case ItemSideFlags.Left:
            openAmount = Math.min(0, openAmount);
            break;
          case ItemSideFlags.Both:
            break;
          // default: assert(false, 'invalid ItemSideFlags value'); break;
        }

        if (openAmount > _this.optsWidthRightSide) {
          let optsWidth = _this.optsWidthRightSide;
          openAmount = optsWidth + (openAmount - optsWidth) * ELASTIC_FACTOR;

        } else if (openAmount < -_this.optsWidthLeftSide) {
          let optsWidth = -_this.optsWidthLeftSide;
          openAmount = optsWidth + (openAmount - optsWidth) * ELASTIC_FACTOR;
        }
        _this._setOpenAmount(openAmount, false);
        return openAmount;
      },

      /**
       * 松手后的移动特性决定最终停在哪个位置
       * @private
       * @param {number} velocity 移动速度(惯性)
       * @return {number}
       */
      _endSliding(velocity){
        // 松手后的停留点
        let restingPoint = (this.openAmount > 0)
          ? this.optsWidthRightSide
          : -this.optsWidthLeftSide;

        // Check if the drag didn't clear the buttons mid-point
        // and we aren't moving fast enough to swipe open
        let isResetDirection = (this.openAmount > 0) === !(velocity < 0);
        let isMovingFast = Math.abs(velocity) > 0.3;
        let isOnCloseZone = Math.abs(this.openAmount) < Math.abs(restingPoint / 2);
        if (swipeShouldReset(isResetDirection, isMovingFast, isOnCloseZone)) {
          restingPoint = 0;
        }

        this._setOpenAmount(restingPoint, true);

        this._fireSwipeEvent();
        return restingPoint;
      },

      /**
       * 计算子组件的options的宽度
       * @private
       * */
      _calculateOptsWidth() {
        if (!this.optsDirty) {
          return;
        }
        this.optsWidthRightSide = 0;
        if (this.rightOptions) {
          this.optsWidthRightSide = this.rightOptions.width();
        }
        this.optsWidthLeftSide = 0;
        if (this.leftOptions) {
          this.optsWidthLeftSide = this.leftOptions.width();
        }
        this.optsDirty = false;
      },

      /**
       * 获取options子组件的side属性对应的ItemSideFlags值
       * @private
       * @param {any} ins options子组件的实例
       * */
      _getSides(ins) {
        if (ins.side === 'left') {
          return ItemSideFlags.Left;
        } else {
          return ItemSideFlags.Right;
        }
      },

      /**
       * 根据openAmount设置item的开闭位置
       * @private
       * @param {number} openAmount
       * @param {boolean} isFinal
       * */
      _setOpenAmount(openAmount, isFinal) {
        const _this = this;
        if (_this.timer) {
          window.clearTimeout(_this.timer);
          _this.timer = null;
        }
        _this.openAmount = openAmount;

        if (isFinal) {
          _this._setItemTransformX(0);
        } else {
          if (openAmount > 0) {
            let state = (openAmount >= (_this.optsWidthRightSide + SWIPE_MARGIN))
              ? SlidingState.Right | SlidingState.SwipeRight
              : SlidingState.Right;

            _this._setState(state);

          } else if (openAmount < 0) {
            let state = (openAmount <= (-_this.optsWidthLeftSide - SWIPE_MARGIN))
              ? SlidingState.Left | SlidingState.SwipeLeft
              : SlidingState.Left;

            _this._setState(state);
          }
        }
        if (openAmount === 0) {
          _this.timer = setTimeout(() => {
            _this._setState(SlidingState.Disabled);
            _this.timer = null;
          }, 600);

          _this._setItemTransformX(0);
          return;
        }

        _this._setItemTransformX(-openAmount);
        _this.$emit('ionDrag', _this);
      },

      /**
       * @param {SlidingState} state
       * */
      _setState  (state) {
        if (state === this.state) {
          return;
        }
        this.activeClass = {
          'active-slide': (state !== SlidingState.Disabled),
          'active-options-right': !!(state & SlidingState.Right),
          'active-options-left': !!(state & SlidingState.Left),
          'active-swipe-right': !!(state & SlidingState.SwipeRight),
          'active-swipe-left': !!(state & SlidingState.SwipeLeft),
        };
        this.state = state;
      },

      /**
       * 设置子组件ion-item的transformX属性
       * @private
       * @param {number} val
       * */
      _setItemTransformX(val = 0){
        if (!!this.itemInstance) {
          this.itemInstance.$el.style.transform = 'translate3d(' + val + 'px, 0px, 0px)'
        }
      },

      /**
       * 对外发出swipe事件，
       * @private
       * @param {number} val
       * */
      _fireSwipeEvent() {
        if (this.state & SlidingState.SwipeRight) {
          this.$emit('ionSwipe', this)
          this.$emit('ionSwipeLeft', this)
        } else if (this.state & SlidingState.SwipeLeft) {
          this.$emit('ionSwipe', this)
          this.$emit('ionSwipeRight', this)
        }
      },
    },
    mounted () {
      // 此时子组件才初始化完毕
      this._init();
    },
    destroyed(){
      // 组件中，activated和deactivated都不管用
      this.$eventBus.$off('ionSlidingClose');
    },
  }
</script>

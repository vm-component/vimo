<template>
  <div class="ion-refresher" :class="{'refresher-active':(state !== 'inactive')}" :style="{'top':top}" :state="state">
    <slot></slot>
  </div>
</template>
<style lang="scss">
  @import "./refresher.scss";
</style>
<script type="text/ecmascript-6">
  /**
   * @module Component/Refresher
   * @description
   *
   * @fires onRefresh - 进入 refreshing 状态时触发
   * @fires onPull - 下拉并且看到了refresher
   * @fires onStart - 开始下拉的事件
   *
   * */

  const STATE_INACTIVE = 'inactive';
  const STATE_PULLING = 'pulling';
  const STATE_READY = 'ready';
  const STATE_REFRESHING = 'refreshing';
  const STATE_CANCELLING = 'cancelling';
  const STATE_COMPLETING = 'completing';
  import { setElementClass, registerListener, pointerCoord } from '../../util/dom'
  import { isTrueProperty } from '../../util/util'
  export default{
    name: 'Refresher',
    data(){
      return {
        // -------- private --------
        _content: null, // Content组件的this
        _appliedStyles: false,
        _didStart: false,
        _lastCheck: 0,
        _pointerEvents: null,
        _unregs: [], // 解绑的事件列表

        /**
         * state表示当前 Refresher 的状态, 可以使下面的一个值:
         *
         * - `inactive` - Refresher 当前时隐藏状态, 没有下拉 或者 刷新
         * - `pulling` - Refresher 当前正在被下拉, 但是还没达到触发刷新的点
         * - `cancelling` - 还没达到触发刷新的点时, 用户松手, 动画恢复完毕后改为`inactive`状态
         * - `ready` - 用户已经下拉到达触发点, 如果用户松手, 则进入`refreshing`状态
         * - `refreshing` - Refresher 处于刷新状态, 等待异步操作的完成. 一旦执行了refresh的 `complete()` 方法, Refresher  将进入 `completing` 状态.
         * - `completing` - Refresher 的`refreshing` 状态结束, Refresher之后会执行关闭的动画, 如果动画结束, 则回退到`inactive` 状态.
         * */
        state: STATE_INACTIVE,
        startY: null, // 下拉的起始点
        currentY: null, // 当前的点
        deltaY: null, // 起始点和当前点的距离
        progress: null, // 表示对当前进度. 0:原始状态,为下拉; >1: 刷新开始

        damp:0.5,
        top: null,
        isEnabled: this.enabled,
      }
    },
    props: {
      // 回复到 inactive 状态的时间
      closeDuration: {
        type: Number,
        default: 280
      },
      enabled: {
        type: Boolean,
        default: true
      },
      // 下拉的最大值, 超过则拉不动
      pullMax: {
        type: Number,
        default:200
      },
      // 下拉进入refreshing状态的最小值
      pullMin: {
        type: Number,
        default: 70
      },
      // 回复到 refreshing 状态的时间
      snapbackDuration: {
        type: Number,
        default: 280
      },
    },
    watch: {
      enabled(val){
        this.isEnabled = isTrueProperty(val);
        this._setListeners(this.isEnabled);
      }
    },
    computed: {},
    methods: {

      // -------- public --------
      /**
       * 异步数据请求成功后, 调用这个方法; refresher将会关闭,
       * 状态由`refreshing` -> `completing`.
       */
      complete() {
        this._close(STATE_COMPLETING, '120ms');
      },

      /**
       * 取消 refresher, 其状态由`refreshing` -> `cancelling`
       */
      cancel() {
        this._close(STATE_CANCELLING, '');
      },

      // -------- private --------
      _init(){
        let _pageComponentChildrenList = this.$vnode.context.$children[0].$children || [];
        _pageComponentChildrenList.forEach((component) => {
          if (component.$options._componentTag.toLowerCase() === 'content') {
            this._content = component;
          }
        });
        console.assert(this._content, 'Refresher组件必须要在Content组件下使用');

        setElementClass(this._content.$el, 'has-refresher', true);

        this._setListeners(this.isEnabled);
      },

      /**
       * @private
       * @param {Boolean} shouldListen -
       * */
      _setListeners(shouldListen) {
        // 如果解绑函数存在则全部解绑
        if (this._unregs && this._unregs.length > 0) {
          console.debug('refresher.vue 解除绑定')
          this._unregs.forEach((_unreg) => {
            _unreg && _unreg();
          })
        }

        // 如果为true, 则添加事件监听
        if (shouldListen) {
          let contentElement = this._content.getScrollElement();
          // TODO: 对于点击事件应该同一封装一层
          registerListener(contentElement, 'touchstart', this._onStart.bind(this), {'passive': false}, this._unregs);
          registerListener(contentElement, 'mousedown', this._onStart.bind(this), {'passive': false}, this._unregs);

          registerListener(contentElement, 'touchmove', this._onMove.bind(this), {'passive': false}, this._unregs);
          registerListener(contentElement, 'mousemove', this._onMove.bind(this), {'passive': false}, this._unregs);

          registerListener(contentElement, 'touchend', this._onEnd.bind(this), {'passive': false}, this._unregs);
          registerListener(contentElement, 'mouseup', this._onEnd.bind(this), {'passive': false}, this._unregs);
        }
      },

      /**
       * @private
       * @param {TouchEvent} ev - 点击事件
       * */
      _onStart(ev){
        // 如果多点触摸, 则直接返回
        if (ev.touches && ev.touches.length > 1) {
          return false;
        }
        if (this.state !== STATE_INACTIVE) {
          return false;
        }

        let contentDimensions = this._content.getContentDimensions();
        let scrollHostScrollTop = contentDimensions.scrollTop;
        // 如果当前的scrollTop大于0, 意味着页面在别的位置, 不是停在顶部, 不是在refresher状态, 直接退出
        if (scrollHostScrollTop > 0) {
          return false;
        }

        let coord = pointerCoord(ev);
        console.debug('Pull-to-refresh, onStart', ev.type, 'y:', coord.y);

        // refresher定位
        if (contentDimensions.contentTop > 0) {
          let newTop = contentDimensions.contentTop + 'px';
          if (this.top !== newTop) {
            this.top = newTop;
          }
        }

        // 记录开始位置
        this.startY = this.currentY = coord.y;
        this.progress = 0;
        this.state = STATE_INACTIVE;
        return true;
      },
      /**
       * @private
       * @param {TouchEvent} ev - 点击事件
       * */
      _onMove(ev){

        // 滑动部分的处理函数在滑动过程中会执行很多次, 因此会有节流的处理,
        // 另外DOM的操作除非必要, 否则不进行

        // 多点触摸则直接返回
        if (ev.touches && ev.touches.length > 1) {
          return 1;
        }

        // 以下状态将返回
        // 没有开始位置/正在refreshing状态/正在closing(cancelling/completing)
        if (this.startY === null || this.state === STATE_REFRESHING || this.state === STATE_CANCELLING || this.state === STATE_COMPLETING) {
          return 2;
        }

        // 在16ms之内如果连续触发,则不处理(节流)
        let now = Date.now();
        const T = 16;
        if (this._lastCheck + T > now) {
          return 3;
        }

        // 节流 -- 记录上次的节流时间
        this._lastCheck = now;

        let coord = pointerCoord(ev);
        this.currentY = coord.y;

        // 记录拉动的距离
        this.deltaY = (coord.y - this.startY);

        // 当前是向上滑动, 所以应该设置state为inactive
        if (this.deltaY <= 0) {
          // 这个是向上滚动, 没使用 refresher 的功能, 故现在是inactive状态
          this.progress = 0;

          if (this.state !== STATE_INACTIVE) {
            this.state = STATE_INACTIVE;
          }

          if (this._appliedStyles) {
            // reset the styles only if they were applied
            this._setCss(0, '', false, ''); // y/duration/overflow/delay
            return 5;
          }

          return 6;
        }

        // 正式进入 refresher
        if (this.state === STATE_INACTIVE) {
          let scrollHostScrollTop = this._content.getContentDimensions().scrollTop;
          if (scrollHostScrollTop > 0) {
            this.progress = 0;
            this.startY = null;
            return 7;
          }

          // 步入正题
          this.state = STATE_PULLING;
        }

        if (!this.deltaY) {
          this.progress = 0;
          return 8;
        }

        // prevent native scroll events
        ev.preventDefault();

        // 进入 pulling 状态, 开始移动scroll element
        this._setCss(this.deltaY * this.damp, '0ms', true, '');

        // 可以执行判断了
        this._onScrollCheck();

      },
      _onScrollCheck(){
        // set pull progress
        this.progress = (this.deltaY* this.damp / this.pullMin);

        // 对外发送 onStart 事件
        if (!this._didStart) {
          this._didStart = true;
          this.$emit('onStart', this)
        }

        // 对外发送 onPull 事件
        this.$emit('onPull', this)

        // do nothing if the delta is less than the pull threshold
        if (this.deltaY* this.damp < this.pullMin) {
          // ensure it stays in the pulling state, cuz its not ready yet
          this.state = STATE_PULLING;
          return 2;
        }

        if (this.deltaY* this.damp > this.pullMax) {
          // they pulled farther than the max, so kick off the refresh
          this._beginRefresh();
          return 3;
        }

        // 正好在最大和最小值之间, 进入 ready 状态吧
        this.state = STATE_READY;

        return 4;
      },
      _onEnd(){
        if (this.state === STATE_READY) {
          this._beginRefresh();
        } else if (this.state === STATE_PULLING) {
          // 返回原点
          this.cancel();
        }
        // reset
        this.startY = null;
      },
      _beginRefresh() {
        this.state = STATE_REFRESHING;

        // 将content放置在开口处
        this._setCss(this.pullMin, (this.snapbackDuration + 'ms'), true, '');

        // 发送事件 onRefresh
        this.$emit('onRefresh', this)
      },

      /**
       * @private
       * @param {string} state
       * @param {string} delay
       * */
      _close(state, delay) {
        var timer; //: number

        function close (ev) {
          // closing is done, return to inactive state
          if (ev) {
            clearTimeout(timer);
          }

          this.state = STATE_INACTIVE;
          this.progress = 0;
          this._didStart = this.startY = this.currentY = this.deltaY = null;
          this._setCss(0, '0ms', false, '');
        }

        // create fallback timer incase something goes wrong with transitionEnd event
        timer = setTimeout(close.bind(this), 600);

        // create transition end event on the content's scroll element
        this._content.onScrollElementTransitionEnd(close.bind(this));

        // reset set the styles on the scroll element
        // set that the refresh is actively cancelling/completing
        this.state = state;
        this._setCss(0, '', true, delay);

        if (this._pointerEvents) {
          this._pointerEvents.stop();
        }
      },

      /**
       * @private
       * @param {Number} y -
       * @param {String} duration -
       * @param {Boolean} overflowVisible -
       * @param {String} delay -
       **/
      _setCss(y, duration, overflowVisible, delay) {
        this._appliedStyles = (y > 0);

        const content = this._content;
        const Css = VM && VM.platform && VM.platform.css;
        console.assert(!!Css, "无法获取platform中的css样式定义,refresher/refresher.vue::<Function>_setCss()")
        content.setScrollElementStyle(Css.transform, ((y > 0) ? 'translateY(' + y + 'px) translateZ(0px)' : 'translateZ(0px)'));
        content.setScrollElementStyle(Css.transitionDuration, duration);
        content.setScrollElementStyle(Css.transitionDelay, delay);
        content.setScrollElementStyle('overflow', (overflowVisible ? 'hidden' : ''));
      }

    },
    created () {},
    mounted () {
      // 需要等待父元素mounted, 故这里初始化需要延迟
      this.$nextTick(() => {
        this._init();
      })
    },
    activated () {},
    components: {}
  }
</script>

<template>
    <div class="ion-refresher" :class="{'refresher-active':(state !== 'inactive')}" :style="{'top':top}" :state="state">
        <slot></slot>
    </div>
</template>
<style lang="scss">
    @import "./refresher.scss";
</style>
<script>
  /**
   * @module Component/Refresher
   * @description
   *
   * Refresher组件是在Content组件下使用, 并提供了下拉刷新的功能. 使用前需要将Refresher组件放在Content组件内所有内容的前面, 并加上`slot="refresher"`属性.
   *
   * 如果Refresher组件使用完毕希望禁用, 请使用`enabled`属性, 而不是使用`v-if`指令.
   *
   * @property {Number} [closeDuration=280] - 回复到 inactive 状态的动画时间
   * @property {Boolean} [enabled=true] - 组件是否可用
   * @property {Number} [pullMax=200] - 下拉的最大值, 超过则直接进入 refreshing状态
   * @property {Number} [pullMin=70] - 下拉进入refreshing状态的最小值
   * @property {Number} [snapbackDuration=280] - 回复到 refreshing 状态的动画时间
   *
   * @fires onRefresh - 进入 refreshing 状态时触发, 事件传递组件的this
   * @fires onPull - 下拉并且看到了refresher, 事件传递组件的this
   * @fires onStart - 开始下拉的事件, 事件传递组件的this
   *
   * @example
   *
   <Page>
   <Header>
   <Navbar>
   <Title>Refresher</Title>
   </Navbar>
   </Header>
   <Content>
   <Refresher slot="refresher" @onRefresh="doRefresh($event)" @onPull="doPulling($event)">
   <RefresherContent pullingText="下拉刷新..." refreshingText="正在刷新..."></RefresherContent>
   </Refresher>
   <List>
   <Item v-for="i in list">{{i}}</Item>
   </List>
   </Content>
   </Page>
   *
   * @example
   *
   methods: {
      doRefresh(ins){
        console.debug('doRefresh $event')
        let _start = this.i;
        setTimeout(() => {
          for (; (10 + _start) > this.i; this.i++) {
            this.list.unshift(`item - ${this.i}`)
          }
          // 当前异步完成
          ins.complete();
          console.debug('onInfinite-complete')
        }, 500)

      },
    },
   * */

  const STATE_INACTIVE = 'inactive';
  const STATE_PULLING = 'pulling';
  const STATE_READY = 'ready';
  const STATE_REFRESHING = 'refreshing';
  const STATE_CANCELLING = 'cancelling';
  const STATE_COMPLETING = 'completing';
  const DAMP = 0.5;// 滑动阻尼
  import { setElementClass, registerListener, pointerCoord } from '../../util/dom'
  export default{
    name: 'Refresher',
    data(){
      return {
        // -------- public --------
        /**
         * @name state
         * @type {number}
         * @description Refresher 的状态, 可以使下面的一个值:
         * - `inactive` - Refresher 当前时隐藏状态, 没有下拉 或者 刷新
         * - `pulling` - Refresher 当前正在被下拉, 但是还没达到触发刷新的点
         * - `cancelling` - 还没达到触发刷新的点时, 用户松手, 动画恢复完毕后改为`inactive`状态
         * - `ready` - 用户已经下拉到达触发点, 如果用户松手, 则进入`refreshing`状态
         * - `refreshing` - Refresher 处于刷新状态, 等待异步操作的完成. 一旦执行了refresh的 `complete()` 方法, Refresher  将进入 `completing` 状态.
         * - `completing` - Refresher 的`refreshing` 状态结束, Refresher之后会执行关闭的动画, 如果动画结束, 则回退到`inactive` 状态.
         * */
        state: STATE_INACTIVE,

        /**
         * @name startY
         * @type {Number}
         * @description 下拉的起始点
         * */
        startY: null, // 下拉的起始点
        /**
         * @name currentY
         * @type {Number}
         * @description 当前的点
         * */
        currentY: null, // 当前的点
        /**
         * @name deltaY
         * @type {Number}
         * @description 起始点和当前点的距离
         * */
        deltaY: null, // 起始点和当前点的距离
        /**
         * @name progress
         * @type {Number}
         * @description 表示对当前进度.
         * - 0: 原始状态,为下拉;
         * - =1: 到达refreshing状态的最小值;
         * - \>1: 超过refreshing状态的最小值
         * */
        progress: null, // 表示对当前进度. 0:原始状态,为下拉; >1: 刷新开始

        // -------- private --------
        content: null, // Content组件的this
        appliedStyles: false,
        didStart: false,
        lastCheck: 0,
        // TODO: 解决下这里
        pointerEvents: null,
        unregs: [], // 解绑的事件列表
        damp: DAMP, // 滑动阻尼
        top: null, // style的top
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
        default: 200
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
        this.setListeners(val);
      }
    },
    methods: {
      // -------- public --------
      /**
       * @function complete
       * @description
       * 异步数据请求成功后, 调用这个方法; refresher将会关闭,
       * 状态由`refreshing` -> `completing`.
       */
      complete() {
        this.closeRefresher(STATE_COMPLETING, '120ms');
      },

      /**
       * @function cancel
       * @description
       * 取消 refresher, 其状态由`refreshing` -> `cancelling`
       */
      cancel() {
        this.closeRefresher(STATE_CANCELLING, '');
      },

      // -------- private --------
      init(){
        let _pageComponentChildrenList = this.$vnode.context.$children[0].$children || [];
        _pageComponentChildrenList.forEach((component) => {
          if (component.$options._componentTag.toLowerCase() === 'content') {
            this.content = component;
          }
        });
        console.assert(this.content, 'Refresher组件必须要在Content组件下使用');

        setElementClass(this.content.$el, 'has-refresher', true);

        this.setListeners(this.enabled);
      },

      /**
       * @param {Boolean} shouldListen -
       * */
      setListeners(shouldListen) {
        // 如果解绑函数存在则全部解绑
        if (this.unregs && this.unregs.length > 0) {
          console.debug('refresher.vue 解除绑定')
          this.unregs.forEach((_unreg) => {
            _unreg && _unreg();
          })
        }

        // 如果为true, 则添加事件监听
        // 等待Content完毕
        this.$nextTick(() => {
          if (shouldListen) {
            let contentElement = this.content.getScrollElement();
            console.assert(contentElement, 'Refresh Component need Content Ready!::<Component>setListeners()')
            // TODO: 对于点击事件应该同一封装一层
            registerListener(contentElement, 'touchstart', this.pointerDownHandler.bind(this), {'passive': false}, this.unregs);
            registerListener(contentElement, 'mousedown', this.pointerDownHandler.bind(this), {'passive': false}, this.unregs);

            registerListener(contentElement, 'touchmove', this.pointerMoveHandler.bind(this), {'passive': false}, this.unregs);
            registerListener(contentElement, 'mousemove', this.pointerMoveHandler.bind(this), {'passive': false}, this.unregs);

            registerListener(contentElement, 'touchend', this.pointerUpHandler.bind(this), {'passive': false}, this.unregs);
            registerListener(contentElement, 'mouseup', this.pointerUpHandler.bind(this), {'passive': false}, this.unregs);
          }
        })
      },

      /**
       * @param {TouchEvent} ev - 点击事件
       * */
      pointerDownHandler(ev){
        // 如果多点触摸, 则直接返回
        if (ev.touches && ev.touches.length > 1) {
          return false;
        }
        if (this.state !== STATE_INACTIVE) {
          return false;
        }

        let contentDimensions = this.content.getContentDimensions();
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
       * @param {TouchEvent} ev - 点击事件
       * */
      pointerMoveHandler(ev){

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
        if (this.lastCheck + T > now) {
          return 3;
        }

        // 节流 -- 记录上次的节流时间
        this.lastCheck = now;

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

          if (this.appliedStyles) {
            // reset the styles only if they were applied
            this.setCss(0, '', false, ''); // y/duration/overflow/delay
            return 5;
          }

          return 6;
        }

        // 正式进入 refresher
        if (this.state === STATE_INACTIVE) {
          let scrollHostScrollTop = this.content.getContentDimensions().scrollTop;
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
        this.setCss((this.deltaY * this.damp), '0ms', true, '');

        // 进行滚动吧
        this.goScroll();

      },

      goScroll(){
        // set pull progress
        this.progress = (this.deltaY * this.damp / this.pullMin);

        // 对外发送 onStart 事件
        if (!this.didStart) {
          this.didStart = true;
          this.$emit('onStart', this)
        }

        // 对外发送 onPull 事件
        this.$emit('onPull', this)

        // do nothing if the delta is less than the pull threshold
        if (this.deltaY * this.damp < this.pullMin) {
          // ensure it stays in the pulling state, cuz its not ready yet
          this.state = STATE_PULLING;
          return 2;
        }

        if (this.deltaY * this.damp > this.pullMax) {
          // they pulled farther than the max, so kick off the refresh
          this.beginRefresh();
          return 3;
        }

        // 正好在最大和最小值之间, 进入 ready 状态吧
        this.state = STATE_READY;

        return 4;
      },
      pointerUpHandler(){
        if (this.state === STATE_READY) {
          this.beginRefresh();
        } else if (this.state === STATE_PULLING) {
          // 返回原点
          this.cancel();
        }
        // reset
        this.startY = null;
      },
      beginRefresh() {
        this.state = STATE_REFRESHING;

        // 将content放置在开口处
        this.setCss(this.pullMin, (this.snapbackDuration + 'ms'), true, '');

        // 发送事件 onRefresh
        this.$emit('onRefresh', this)
      },
      /**
       * @param {string} state
       * @param {string} delay
       * */
      closeRefresher(state, delay) {
        var timer; //: number

        function close (ev) {
          // closing is done, return to inactive state
          if (ev) {
            clearTimeout(timer);
          }

          this.state = STATE_INACTIVE;
          this.progress = 0;
          this.didStart = this.startY = this.currentY = this.deltaY = null;
          this.setCss(0, '0ms', false, '');
        }

        // create fallback timer incase something goes wrong with transitionEnd event
        timer = setTimeout(close.bind(this), 600);

        // create transition end event on the content's scroll element
        this.content.onScrollElementTransitionEnd(close.bind(this));

        // reset set the styles on the scroll element
        // set that the refresh is actively cancelling/completing
        this.state = state;
        this.setCss(0, '', true, delay);
      },

      /**
       * @param {Number} y -
       * @param {String} duration -
       * @param {Boolean} overflowVisible -
       * @param {String} delay -
       **/
      setCss(y, duration, overflowVisible, delay) {
        this.appliedStyles = (y > 0);
        const content = this.content;
        const Css = window.VM && window.VM.platform && VM.platform.css;
        console.assert(!!Css, "无法获取platform中的css样式定义,refresher/refresher.vue::<Function>setCss()")
        content.setScrollElementStyle(Css.transform, ((y > 0) ? 'translateY(' + y + 'px) translateZ(0px)' : 'translateZ(0px)'));
        content.setScrollElementStyle(Css.transitionDuration, duration);
        content.setScrollElementStyle(Css.transitionDelay, delay);
        content.setScrollElementStyle('overflow', (overflowVisible ? 'hidden' : ''));
      },
    },
    mounted () {
      // 需要等待父元素mounted, 故这里初始化需要延迟
      this.$nextTick(() => {this.init()})
    }
  }
</script>

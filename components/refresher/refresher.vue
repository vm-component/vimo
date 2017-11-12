<template>
    <div class="ion-refresher" :class="{'refresher-active':(state !== 'inactive')}" :style="{'top':top}" :state="state">
        <slot></slot>
    </div>
</template>
<style lang="less">
    @import "refresher";
</style>
<script type="text/javascript">
  /**
   * @component Refresher
   * @description
   *
   * ## 数据加载 / Refresher下拉刷新组件
   *
   * ### 说明
   *
   * Refresher组件是在Content组件下使用, 并提供了下拉刷新的功能. 使用前需要将Refresher组件放在Content组件内所有内容的前面, 并加上`slot="refresher"`属性. 如果Refresher组件使用完毕希望禁用, 请使用`enabled`属性, 而不是使用`v-if`指令.
   *
   * ### 事件
   *
   * 事件传递组件的this, 可用的两个方法为: complete/cancel. 当然可以使用ref获取组件的实例
   *
   * ### 注意
   *
   * 目前这个组件只适合在原生滚动下使用, 当使用js滚动时会异常
   *
   * ### 关于指示器RefresherContent
   *
   * 这个组件是可以定制化的
   *
   * @props {Number} [closeDuration=280] - 回复到 inactive 状态的动画时间
   * @props {Boolean} [enabled=true] - 组件是否可用
   * @props {Number} [pullMax=200] - 下拉的最大值, 超过则直接进入 refreshing状态
   * @props {Number} [pullMin=70] - 下拉进入refreshing状态的最小值
   * @props {Number} [snapbackDuration=280] - 回复到 refreshing 状态的动画时间
   *
   * @fires component:Refresher#onRefresh - 进入 refreshing 状态时触发, 事件传递组件的this
   * @fires component:Refresher#onPull - 下拉并且看到了refresher, 事件传递组件的this
   * @fires component:Refresher#onStart - 开始下拉的事件, 事件传递组件的this
   *
   * @slot 空 - 指示器RefresherContent组件的插槽
   *
   * @demo #/refresher
   * @see component:Base/Content
   * @usage
   * <Page>
   *    <Header>
   *        <Navbar>
   *            <Title>Refresher</Title>
   *        </Navbar>
   *    </Header>
   *    <Content>
   *        <Refresher slot="refresher" @onRefresh="doRefresh($event)" @onPull="doPulling($event)">
   *            <RefresherContent pullingText="下拉刷新..." refreshingText="正在刷新..."></RefresherContent>
   *            </Refresher>
   *        <List>
   *            <Item v-for="i in list">{{i}}</Item>
   *        </List>
   *    </Content>
   * </Page>
   *
   *
   * // ...
   *
   * methods: {
   *    doRefresh(ins){
   *      let _start = this.i;
   *      setTimeout(() => {
   *        for (; (10 + _start) > this.i; this.i++) {
   *          this.list.unshift(`item - ${this.i}`)
   *        }
   *        // 当前异步完成
   *        ins.complete();
   *        console.debug('onInfinite-complete')
   *      }, 500)
   *    },
   *  },
   * */

  import { setElementClass, registerListener, pointerCoord } from '../util/util'

  const STATE_INACTIVE = 'inactive'
  const STATE_PULLING = 'pulling'
  const STATE_READY = 'ready'
  const STATE_REFRESHING = 'refreshing'
  const STATE_CANCELLING = 'cancelling'
  const STATE_COMPLETING = 'completing'
  const DAMP = 0.5// 滑动阻尼
  export default {
    name: 'Refresher',
    data () {
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
         * - 0: 原始状态,为下拉
         * - =1: 到达refreshing状态的最小值
         * - \>1: 超过refreshing状态的最小值
         * */
        progress: null, // 表示对当前进度. 0:原始状态,为下拉; >1: 刷新开始

        // -------- private --------
        appliedStyles: false,
        didStart: false,
        lastCheck: 0,
        unregs: [], // 解绑的事件列表
        damp: DAMP, // 滑动阻尼
        top: null // style的top
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
      }
    },
    watch: {
      enabled (val) {
        this.$_setListeners(val)
      }
    },
    // Content组件的实例注入
    inject: ['contentComponent'],
    methods: {
      /**
       * @function complete
       * @description
       * 异步数据请求成功后, 调用这个方法; refresher将会关闭,
       * 状态由`refreshing` -> `completing`.
       */
      complete () {
        this.$_closeRefresher(STATE_COMPLETING, '120ms')
        // 重新计算尺寸, 必须
        this.contentComponent.resize()
      },

      /**
       * @function cancel
       * @description
       * 取消 refresher, 其状态由`refreshing` -> `cancelling`
       */
      cancel () {
        this.$_closeRefresher(STATE_CANCELLING, '')
      },

      /**
       * @param {Boolean} shouldListen -
       * */
      $_setListeners (shouldListen) {
        // 如果解绑函数存在则全部解绑
        if (this.unregs && this.unregs.length > 0) {
          this.unregs.forEach((_unreg) => {
            _unreg && _unreg()
          })
        }

        // 如果为true, 则添加事件监听
        // 等待Content完毕
        this.$nextTick(() => {
          if (shouldListen) {
            let contentElement = this.contentComponent.$_getScrollElement()
            console.assert(contentElement, 'Refresh Component need Content Ready!::<Component>$_setListeners()')
            // TODO: 对于点击事件应该同统一封装一层
            registerListener(contentElement, 'touchstart', this.$_pointerDownHandler.bind(this), {'passive': false}, this.unregs)
            registerListener(contentElement, 'mousedown', this.$_pointerDownHandler.bind(this), {'passive': false}, this.unregs)

            registerListener(contentElement, 'touchmove', this.$_pointerMoveHandler.bind(this), {'passive': false}, this.unregs)
            registerListener(contentElement, 'mousemove', this.$_pointerMoveHandler.bind(this), {'passive': false}, this.unregs)

            registerListener(contentElement, 'touchend', this.$_pointerUpHandler.bind(this), {'passive': false}, this.unregs)
            registerListener(contentElement, 'mouseup', this.$_pointerUpHandler.bind(this), {'passive': false}, this.unregs)
          }
        })
      },

      /**
       * @param {TouchEvent} ev - 点击事件
       * */
      $_pointerDownHandler (ev) {
        // 如果多点触摸, 则直接返回
        if (ev.touches && ev.touches.length > 1) {
          return false
        }
        if (this.state !== STATE_INACTIVE) {
          return false
        }

        let scrollHostScrollTop = this.contentComponent.scrollView.getTop()
        // 如果当前的scrollTop大于0, 意味着页面在别的位置, 不是停在顶部, 不是在refresher状态, 直接退出
        if (scrollHostScrollTop > 0) {
          return false
        }

        let coord = pointerCoord(ev)

        // refresher定位
        let contentTop = this.contentComponent.headerBarHeight
        if (contentTop > 0) {
          let newTop = contentTop + 'px'
          if (this.top !== newTop) {
            this.top = newTop
          }
        }

        // 记录开始位置
        this.startY = this.currentY = coord.y
        this.progress = 0
        this.state = STATE_INACTIVE

        return true
      },
      /**
       * @param {TouchEvent} ev - 点击事件
       * */
      $_pointerMoveHandler (ev) {
        // 滑动部分的处理函数在滑动过程中会执行很多次, 因此会有节流的处理,
        // 另外DOM的操作除非必要, 否则不进行
        // 多点触摸则直接返回
        if (ev.touches && ev.touches.length > 1) {
          return 1
        }

        // 以下状态将返回
        // 没有开始位置/正在refreshing状态/正在closing(cancelling/completing)
        if (this.startY === null || this.state === STATE_REFRESHING || this.state === STATE_CANCELLING || this.state === STATE_COMPLETING) {
          return 2
        }

        // 在16ms之内如果连续触发,则不处理(节流)
        let now = Date.now()
        const T = 16
        if (this.lastCheck + T > now) {
          return 3
        }

        // 节流 -- 记录上次的节流时间
        this.lastCheck = now

        let coord = pointerCoord(ev)
        this.currentY = coord.y

        // 记录拉动的距离
        this.deltaY = (coord.y - this.startY)

        // 当前是向上滑动, 所以应该设置state为inactive
        if (this.deltaY <= 0) {
          // 这个是向上滚动, 没使用 refresher 的功能, 故现在是inactive状态
          this.progress = 0

          if (this.state !== STATE_INACTIVE) {
            this.state = STATE_INACTIVE
          }

          if (this.appliedStyles) {
            // reset the styles only if they were applied
            this.$_setCss(0, '', false, '') // y/duration/overflow/delay
            return 5
          }

          return 6
        }

        // 正式进入 refresher
        if (this.state === STATE_INACTIVE) {
          let scrollHostScrollTop = this.contentComponent.scrollView.ev.scrollTop
          if (scrollHostScrollTop > 0) {
            this.progress = 0
            this.startY = null
            return 7
          }

          // 步入正题
          this.state = STATE_PULLING
        }

        if (!this.deltaY) {
          this.progress = 0
          return 8
        }

        // prevent native scroll events
        ev.preventDefault()

        // 进入 pulling 状态, 开始移动scroll element
        this.$_setCss((this.deltaY * this.damp), '0ms', true, '')

        // 进行滚动吧
        this.$_goScroll()
      },
      $_goScroll () {
        // set pull progress
        this.progress = (this.deltaY * this.damp / this.pullMin)

        // 对外发送 onStart 事件
        if (!this.didStart) {
          this.didStart = true
          /**
           * @event component:Refresher#onStart
           * @description 开始下拉的事件, 事件传递组件的this
           * @property {RefreshComponent} this - 组件实例
           */
          this.$emit('onStart', this)
        }

        // 对外发送 onPull 事件
        /**
         * @event component:Refresher#onPull
         * @description 下拉并且看到了refresher, 事件传递组件的this
         * @property {RefreshComponent} this - 组件实例
         */
        this.$emit('onPull', this)

        // do nothing if the delta is less than the pull threshold
        if (this.deltaY * this.damp < this.pullMin) {
          // ensure it stays in the pulling state, cuz its not ready yet
          this.state = STATE_PULLING
          return 2
        }

        if (this.deltaY * this.damp > this.pullMax) {
          // they pulled farther than the max, so kick off the refresh
          this.$_beginRefresh()
          return 3
        }

        // 正好在最大和最小值之间, 进入 ready 状态吧
        this.state = STATE_READY

        return 4
      },
      $_pointerUpHandler () {
        if (this.state === STATE_READY) {
          this.$_beginRefresh()
        } else if (this.state === STATE_PULLING) {
          // 返回原点
          this.cancel()
        }
        // reset
        this.startY = null
      },
      $_beginRefresh () {
        this.state = STATE_REFRESHING

        // 将content放置在开口处
        this.$_setCss(this.pullMin, (this.snapbackDuration + 'ms'), true, '')

        // 发送事件 onRefresh
        /**
         * @event component:Refresher#onRefresh
         * @description 进入 refreshing 状态时触发, 事件传递组件的this
         * @property {RefreshComponent} this - 组件实例
         */
        this.$emit('onRefresh', this)
      },
      /**
       * @param {string} state
       * @param {string} delay
       * */
      $_closeRefresher (state, delay) {
        var timer // number

        function close (ev) {
          // closing is done, return to inactive state
          if (ev) {
            clearTimeout(timer)
          }

          this.state = STATE_INACTIVE
          this.progress = 0
          this.didStart = this.startY = this.currentY = this.deltaY = null
          this.$_setCss(0, '0ms', false, '')
        }

        // create fallback timer incase something goes wrong with transitionEnd event
        timer = window.setTimeout(close.bind(this), 600)

        // create transition end event on the content's scroll element
        this.contentComponent.$_onScrollElementTransitionEnd(close.bind(this))

        // reset set the styles on the scroll element
        // set that the refresh is actively cancelling/completing
        this.state = state
        this.$_setCss(0, '', true, delay)
      },

      /**
       * @param {Number} y -
       * @param {String} duration -
       * @param {Boolean} overflowVisible -
       * @param {String} delay -
       **/
      $_setCss (y, duration, overflowVisible, delay) {
        this.appliedStyles = (y > 0)
        const Css = this.$platform.css
        this.contentComponent.$_setScrollElementStyle(Css.transform, ((y > 0) ? 'translateY(' + y + 'px) translateZ(0px)' : 'translateZ(0px)'))
        this.contentComponent.$_setScrollElementStyle(Css.transitionDuration, duration)
        this.contentComponent.$_setScrollElementStyle(Css.transitionDelay, delay)
        this.contentComponent.$_setScrollElementStyle('overflow', (overflowVisible ? 'hidden' : ''))
      }
    },
    mounted () {
      setElementClass(this.contentComponent.$el, 'has-refresher', true)
      this.$_setListeners(this.enabled)
    }
  }
</script>

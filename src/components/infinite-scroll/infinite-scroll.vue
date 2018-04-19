<template>
    <div class="ion-infinite-scroll" :threshold="threshold" :state="state">
        <slot></slot>
    </div>
</template>
<script type="text/javascript">
  import { setElementClass } from '../../util/util'

  const STATE_ENABLED = 'enabled'
  const STATE_DISABLED = 'disabled'
  const STATE_LOADING = 'loading'
  export default {
    name: 'InfiniteScroll',
    inject: {
      contentComponent: {
        from: 'contentComponent',
        default: null
      }
    },
    props: {
      // 可用状态
      enabled: {
        type: Boolean,
        default: true
      },
      // 阈值
      threshold: {
        type: String,
        default: '15%' // 15%  150px
      }
    },
    data () {
      return {
        lastCheck: 0,  // 节流, 少于32ms的事件变动不必监听
        state: (this.enabled ? STATE_ENABLED : STATE_DISABLED) // 内部状态
      }
    },
    watch: {
      enabled () {
        this.enable(this.enabled)
      }
    },
    computed: {
      // 阈值
      thr () {
        return this.threshold
      },
      // 阈值(px单位)
      thrPx () {
        if (this.threshold.indexOf('%') > -1) {
          return 0
        } else {
          return parseFloat(this.threshold)
        }
      },
      // 阈值(百分比)
      thrPc () {
        if (this.threshold.indexOf('%') > -1) {
          return (parseFloat(this.threshold) / 100)
        } else {
          return 0
        }
      }
    },
    methods: {
      /**
       * @function complete
       * @description
       * 在 `onInfinite` 事件的回调中(参数为当前InfiniteScroll组件的this)执行`complete()`这个方法, 表示异步操作完毕.
       * 比如在异步情况下通过AJAX获取数据增加新行列, 数据获取完毕更新UI后, 执行`complete()`这个方法,
       * 表示loading已经完成, InfiniteScroll组件的状态将由`loading` 转为 `enabled`.
       * */
      complete () {
        this.$nextTick(() => {
          if (this.state === STATE_LOADING) {
            this.state = STATE_ENABLED
            // 重新计算尺寸, 必须
            this.contentComponent && this.contentComponent.resize()
          }
        })
      },

      /**
       * @function enable
       * @description
       * 设置InfiniteScroll组件的状态. 当在已经没有数据或者不再需要InfiniteScroll组件时执行这个方法.
       * 需要在`onInfinite` 事件的回调中执行 `infiniteScroll.enable(false)`.
       * @param {boolean} shouldEnable - 组件当前状态, 如果为`false`, 则移除scroll的所有监听函数, 并隐藏组件
       */
      enable (shouldEnable) {
        this.state = (shouldEnable ? STATE_ENABLED : STATE_DISABLED)
        this.$_setListeners(shouldEnable)
      },

      /**
       * @function waitFor
       * @description
       * 传入Promise对象, 在传入的Promise完成数据的加载, 当加载完毕执行`resolve()`, 这个`resolve()`
       * 在这里相当于执行了`this.complete()`, 用法如下所示
       * @param {Promise} action - 执行方法
       *
       * @example
       *
       * <Content>
       *  <List>
       *      <Item v-for="item of items">{{item}}</Item>
       *  </List>
       *  <InfiniteScroll @onInfinite="$event.waitFor(doInfinite())">
       *      <InfiniteScrollContent></InfiniteScrollContent>
       *  </InfiniteScroll>
       * </Content>
       *
       * @example
       * // ...
       *   doInfinite () {
       *     console.log('Begin async operation');
       *     return new Promise((resolve) => {
       *       setTimeout(() => {
       *         for (var i = 0; i < 30; i++) {
       *           this.items.push( this.items.length );
       *         }
       *         console.log('Async operation has ended');
       *         resolve();
       *       }, 500);
       *     })
       * }
       * // ...
       */
      waitFor (action) {
        const enable = this.complete.bind(this)
        action.then(enable, enable)
      },

      /**
       * @param {boolean} shouldListen - 是否监听
       * @private
       */
      $_setListeners (shouldListen) {
        if (shouldListen) {
          // 监听Content组件的onScroll事件
          // NOTICE: 这里是监听的是Content组件自己内部维护的事件`onScroll`
          this.contentComponent && this.contentComponent.$on('onScroll', this.$_onScrollHandler)
        } else {
          // 解除onScroll事件监听(Content组件)
          this.contentComponent && this.contentComponent.$off('onScroll', this.$_onScrollHandler)
        }
      },

      /**
       * @param {ScrollEvent} ev - 滚动事件对象
       * @return {Number} - 1:loading/disabled; 2:还在滚动呢; 3:没有滚动高度; 5:loading状态; 6:一般滚动状态
       * @private
       * */
      $_onScrollHandler (ev) {
        if (this.state === STATE_LOADING || this.state === STATE_DISABLED) {
          return 1
        }

        if (this.lastCheck + 32 > ev.timeStamp) {
          // 少于32ms的事件变动不必监听
          return 2
        }
        this.lastCheck = ev.timeStamp

        const infiniteHeight = this.$el.scrollHeight

        if (!infiniteHeight) {
          // 如果滚动高度不存在则什么都不做
          return 3
        }

        const d = this.contentComponent && this.contentComponent.scrollView.ev

        let reloadY = window.innerHeight

        if (this.thrPc) {
          reloadY += (reloadY * this.thrPc)
        } else {
          reloadY += this.thrPx
        }

        const distanceFromInfinite = ((d.scrollHeight - infiniteHeight) - d.scrollTop) - reloadY

        if (distanceFromInfinite < 0) {
          if (this.state !== STATE_LOADING && this.state !== STATE_DISABLED) {
            this.state = STATE_LOADING

            /**
             * @event component:InfiniteScroll#onInfinite
             * @description 触发无限滚动
             * @param {InfiniteScroll} infiniteScroll - InfiniteScroll组件的实例对象
             * */
            this.$emit('onInfinite', this)
          }
          return 5
        }
        return 6
      }
    },
    mounted () {
      // console.assert(this.contentComponent, 'InfiniteScroll组件必须要在Content组件下使用')
      if (this.contentComponent) {
        setElementClass(this.contentComponent.$el, 'has-infinite-scroll', true)
      }
      this.$_setListeners(this.state !== STATE_DISABLED)
    },
    destroyed () {
      this.$_setListeners(false)
    }
  }
</script>

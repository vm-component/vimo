<template>
  <div class="ion-infinite-scroll" :threshold="threshold" :state="state">
    <slot></slot>
  </div>
</template>
<style lang="scss">
  @import "./infinite-scroll.scss";
</style>
<script type="text/ecmascript-6">

  /**
   * @event onInfinite
   * @description 触发无限滚动
   * @param {InfiniteScroll} infiniteScroll - InfiniteScroll组件的实例对象
   * */

  /**
   * @module Component/InfiniteScroll
   * @description
   *
   * 当页面滚动到页面底部一定距离时, InfiniteScroll组件会触发`onInfinite`事件,
   * 通过回调传入的参数`infiniteScroll`来处理对应的状态.
   *
   * 比如: 当需要异步请求AJAX数据时, 数据请求后, 需要执行`infiniteScroll.complete()`
   * 来变更InfiniteScroll组件的状态,当继续向下滚动时, 还能继续出发`onInfinite`事件,
   * 如此往复.
   *
   * 当通过AJAX请求的数据已经全部请求完毕(没有更多的数据时), 则执行`infiniteScroll.enable(false)`,
   * 表明InfiniteScroll任务全部结束. 此时, 将解除对Content组件的`onContentScroll`事件的监听
   *
   * InfiniteScroll组件会附带InfiniteScrollContent组件, InfiniteScrollContent组件
   * 是默认的显示组件,它只是起到显示状态的作用, 你也可以自己定义显示状态, 只要写好相应的css样式就好.
   *
   * 其中, 标示状态的`state`有三种值: enabled/disabled/loading.
   *
   *
   * > 建议: 首屏的数据至少占满两个以上屏幕高度, 通过 InfiniteScroll 加载的数据也至少能占满两个以上的屏幕高度,
   * 这样的体验效果会好点
   *
   * > 注意: 组件中的方法是在事件的回调参数中定义的.
   *
   *
   * ##### Usage
   *
   * ```
   * <InfiniteScroll threshold="20%" @onInfinite="onInfinite">
   *    <InfiniteScrollContent loadingSpinner="ios" loadingText="正在加载..."></InfiniteScrollContent>
   *    <h5 class="loadedAll" text-center>全部加载完毕</h5>
   * </InfiniteScroll>
   *
   * ```
   *
   * ```
   *  .ion-infinite-scroll{
   *      .loadedAll{
   *          display: none;
   *      }
   *   }
   *  .ion-infinite-scroll[state=disabled]{
   *      .loadedAll{
   *          display: block;
   *      }
   *  }
   *```
   *
   * ```
   * // ....
   * methods: {
   *    onInfinite(infiniteScroll){
   *      let _start = this.i;
   *      if(_start < 40){
   *        setTimeout(() => {
   *          for (; (10 + _start) > this.i; this.i++) {
   *           this.list.push(`item - ${this.i}`)
   *         }
   *         // 当前异步完成
   *         infiniteScroll.complete();
   *       }, 100)
   *     }else{
   *       // 当前异步结束, 没有新数据了
   *       infiniteScroll.enable(false);
   *     }
   *  }
   *  // ....
   * ```
   *
   * @property {Boolean} [enabled=true] - 设置当前组件的可用状态, 如果为false, 则移除当前组件绑定的全部事件处理函数, 隐藏组件并且将状态设置为disabled
   * @property {String} [threshold='15%'] - 激活`onInfinite`事件的阈值. 阈值可以使百分比也可以是具体的px值. 如果为百分比(10%), 则距离底部10%的位置将为激活点; 如果为具体px值(100px), 则页面底部向下100px出为激活点.
   *
   * @fires onInfinite
   *
   * */

  const STATE_ENABLED = 'enabled';
  const STATE_DISABLED = 'disabled';
  const STATE_LOADING = 'loading';
  import { setElementClass } from '../../util/dom'
  export default{
    name: 'InfiniteScroll',
    data(){
      return {
        _content: null, // Content组件的实例
        _lastCheck: 0,  // 节流, 少于32ms的事件变动不必监听
        _init: false,   // 组件是否初始化

        state: STATE_ENABLED, // 内部状态
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
        default: '15%', // 15%  150px
      },
    },
    computed: {
      // 阈值
      _thr(){
        return this.threshold;
      },
      // 阈值(px单位)
      _thrPx(){
        if (this.threshold.indexOf('%') > -1) {
          return 0
        } else {
          return parseFloat(this.threshold)
        }
      },
      // 阈值(百分比)
      _thrPc(){
        if (this.threshold.indexOf('%') > -1) {
          return (parseFloat(this.threshold) / 100)
        } else {
          return 0
        }
      },
    },
    methods: {
      // -------- public --------
      /**
       * @function complete
       * @description
       * 在 `onInfinite` 事件的回调中(参数为当前InfiniteScroll组件的this)执行`complete()`这个方法, 表示异步操作完毕.
       * 比如在异步情况下通过AJAX获取数据增加新行列, 数据获取完毕更新UI后, 执行`complete()`这个方法,
       * 表示loading已经完成, InfiniteScroll组件的状态将由`loading` 转为 `enabled`.
       * */
      complete(){
        this.$nextTick(() => {
          if (this.state === STATE_LOADING) {
            this.state = STATE_ENABLED;
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
      enable(shouldEnable){
        this.state = (shouldEnable ? STATE_ENABLED : STATE_DISABLED);
        this._setListeners(shouldEnable);
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
       *   doInfinite(){
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
      waitFor(action) {
        const enable = this.complete.bind(this);
        action.then(enable, enable);
      },

      // -------- private --------

      /**
       * @private
       * @param {boolean} shouldListen - 是否监听
       */
      _setListeners(shouldListen) {
        if (this._init) {
          if (shouldListen) {
            // 监听Content组件的onScroll事件
            // NOTICE: 这里是监听的是Content组件自己内部维护的事件`onContentScroll`
            this._content.$on('onContentScroll', this._onScroll);
          } else {
            // 解除onScroll事件监听(Content组件)
            this._content.$off('onContentScroll', this._onScroll);
          }
        }
      },

      /**
       * @private
       * @param {ScrollEvent} ev - 滚动事件对象
       * @return {Number} - 1:loading/disabled; 2:还在滚动呢; 3:没有滚动高度; 5:loading状态; 6:一般滚动状态
       * */
      _onScroll(ev) {

        if (this.state === STATE_LOADING || this.state === STATE_DISABLED) {
          return 1;
        }

        if (this._lastCheck + 32 > ev.timeStamp) {
          // 少于32ms的事件变动不必监听
          return 2;
        }
        this._lastCheck = ev.timeStamp;

        const infiniteHeight = this.$el.scrollHeight;
        if (!infiniteHeight) {
          // 如果滚动高度不存在则什么都不做
          return 3;
        }

        const d = this._content.getContentDimensions();

        let reloadY = d.contentHeight;
        if (this._thrPc) {
          reloadY += (reloadY * this._thrPc);
        } else {
          reloadY += this._thrPx;
        }

        const distanceFromInfinite = ((d.scrollHeight - infiniteHeight) - d.scrollTop) - reloadY;
        if (distanceFromInfinite < 0) {
          if (this.state !== STATE_LOADING && this.state !== STATE_DISABLED) {
            this.state = STATE_LOADING;
            this.$emit('onInfinite', this)
          }
          return 5;
        }
        return 6;
      },

      /**
       * 初始化
       * */
      _init(){

        let _pageComponentChildrenList = this.$vnode.context.$children[0].$children || [];
        _pageComponentChildrenList.forEach((component) => {
          if (component.$options._componentTag.toLowerCase() === 'content') {
            this._content = component;
          }
        });
        console.assert(this._content, 'InfiniteScroll组件必须要在Content组件下使用');
        setElementClass(this._content.$el, 'has-infinite-scroll', true);

        this._init = true;
        this._setListeners(this.state !== STATE_DISABLED);
      },

    },
    mounted () {
      this._init();
    },
    destroy(){
      this._setListeners(false);
    }
  }

</script>

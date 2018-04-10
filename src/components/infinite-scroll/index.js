export { default } from './infinite-scroll.vue';
/**
 * @component InfiniteScroll
 * @description
 *
 * ## 数据加载 / InfiniteScroll无限滚动组件
 *
 * ### 说明
 *
 * 当页面滚动到页面底部一定距离时, InfiniteScroll组件会触发`onInfinite`事件, 通过回调传入的参数`infiniteScroll`来处理对应的状态.
 *
 * 比如: 当需要异步请求AJAX数据时, 数据请求后, 需要执行`infiniteScroll.complete()` 来变更InfiniteScroll组件的状态,当继续向下滚动时, 还能继续出发`onInfinite`事件, 如此往复.
 *
 * 当通过AJAX请求的数据已经全部请求完毕(没有更多的数据时), 则执行`infiniteScroll.enable(false)`, 表明InfiniteScroll任务全部结束. 此时, 将解除对Content组件的`onScroll`事件的监听.
 *
 * ### 其他
 *
 * InfiniteScroll组件会附带InfiniteScrollContent组件, InfiniteScrollContent组件 是默认的显示组件,它只是起到显示状态的作用, 你也可以自己定义显示状态, 只要写好相应的css样式就好.
 *
 * 其中, 标示状态的`state`有三种值: enabled/disabled/loading, 且这三种状态会写在父组件上, 因此可以用这个特性定义子组件的样式. 比如像下面的demo
 *
 * ### 建议
 *
 * 首屏的数据至少占满两个以上屏幕高度, 通过 InfiniteScroll 加载的数据也至少能占满两个以上的屏幕高度, 这样的体验效果会好点
 *
 * ### 注意
 *
 * - 组件中的方法是在事件的回调参数中定义的.
 * - 组件支持js滚动监听, 如何设置参考Content组件
 *
 * ### 如何引入
 * ```
 * // 引入
 * import { InfiniteScroll, InfiniteScrollContent } from 'vimo'
 * // 安装
 * Vue.component(InfiniteScroll.name, InfiniteScroll)
 * Vue.component(InfiniteScrollContent.name, InfiniteScrollContent)
 * // 或者
 * export default{
   *   components: {
   *     InfiniteScroll, InfiniteScrollContent
   *  }
   * }
 *```
 *
 *
 * @props {Boolean} [enabled=true] - 设置当前组件的可用状态, 如果为false, 则移除当前组件绑定的全部事件处理函数, 隐藏组件并且将状态设置为disabled
 * @props {String} [threshold='15%'] - 激活`onInfinite`事件的阈值. 阈值可以使百分比也可以是具体的px值. 如果为百分比(10%), 则距离底部10%的位置将为激活点; 如果为具体px值(100px), 则页面底部向下100px出为激活点.
 *
 * @fires component:InfiniteScroll#onInfinite
 *
 * @demo #/infinite-scroll
 * @see component:Content
 *
 * @usage
 *
 * <InfiniteScroll threshold="20%" @onInfinite="onInfinite">
 *    <InfiniteScrollContent loadingSpinner="ios" loadingText="正在加载..."></InfiniteScrollContent>
 *    <h5 class="loadedAll" text-center>全部加载完毕</h5>
 * </InfiniteScroll>
 *
 * // ....
 *  .#{$prefix}-infinite-scroll{
   *      .loadedAll{
   *          display: none;
   *      }
   *   }
 *  .#{$prefix}-infinite-scroll[state=disabled]{
   *      .loadedAll{
   *          display: block;
   *      }
   *  }
 *
 * // ....
 *
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
   * */

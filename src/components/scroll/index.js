export { default } from './scroll.vue'
/**
 * @component Scroll
 * @description
 *
 * ## 滚动组件 / Scroll滚动组件
 *
 * ### 来源
 *
 * Content组件也具有滚动属性, 但是Content组件的定位是页面基础布局的中间层, 也就是内容层, 这个内容层也支持jsScroll, 但是不支持滚动事件, 移除也是为了考虑性能的问题. 当然也有特殊情况, 如果内容层希望能有一个支持jsScroll的子组件这里就需要Scroll组件了.
 *
 * 比如:
 *
 * - 订单App, 左侧的菜单类别, 右侧类别详情(菜单详情).
 * - 滑动可切换的tab组件, 能更具我外接触发滚动祖选择等.
 * - 横向的跑马灯, 根据指令切换到某个位置.
 * - 对Content组件的拓展, 是的浏览内容支持jsScroll
 *
 * ### 传参及事件
 *
 * Scroll组件是对 `better-scroll` 组件的封装, 组件书写完毕也是初始化完毕的时候, props就是传入的参数, 如果需要监听事件, 则通过@绑定即可, 例如:
 *
 * ```
 * <Scroll @scroll="scrollHandler" ref="scroll">内容</Scroll>
 * ```
 *
 * 虽然事件的命名不符合Vimo既有规范, 但这部分是封装了better-scroll, 因此不改变原基础为好, `better-scroll`的文档参看下方链接.
 *
 * 通过ref获取组件实例进行操作, 因此使用逻辑完全一致. 其余详情请参考下方链接.
 *
 *
 * ### 获取jsScroll的实例
 * ```
 * <Scroll ref="scroll">内容</Scroll>
 *
 * computed: {
   *    scrollComponent () {
   *        return this.$refs.scroll.jsScrollInstance
   *    }
   * }
 * ```
 *
 * ### 关于销毁
 *
 * 组件关闭自动销毁, 因此不存在持续占用内存的问题
 *
 * ### 如何引入
 * ```
 * // 引入
 * import { Scroll } from 'vimo'
 * // 安装
 * Vue.component(Scroll.name, Scroll)
 * // 或者
 * export default{
   *   components: {
   *     Scroll
   *  }
   * }
 * ```
 *
 * @see https://www.npmjs.com/package/better-scroll
 * @see https://github.com/ustbhuangyi/better-scroll
 * @demo #/scroll
 * */

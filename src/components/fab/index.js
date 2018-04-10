export { default } from './fab.vue';
/**
 * @component Fab
 * @description
 *
 * ## 浮层组件 / FAB浮动按钮组件
 *
 * ### 简介
 *
 * FAB是Floating Action Buttons的缩写, 表示浮动按钮组件, 点击主按钮展开附属按钮用于选择操作. FAB组件悬浮在Content组件之上, 不随着内容滚动而变动位置.
 *
 * ### 组件关闭
 *
 * 组件关闭需要自己手动执行, 页面切换对关闭不起作用(只有弹出层对 popstate 有动作)
 *
 * ### 其他
 *
 * FAB可在四个方向展开, 此外, FAB可以放置在6中不同位置. 详情参考Demo. 另外, 为了保证组件悬浮在Content组件之上, `slot="fixed"` 属性不要忘记添加.
 *
 * ### 如何引入
 * ```
 * // 引入
 * import { Fab, FabButton, FabList } from 'vimo'
 * // 安装
 * Vue.component(Fab.name, Fab)
 * Vue.component(FabButton.name, FabButton)
 * Vue.component(FabList.name, FabList)
 * // 或者
 * export default{
   *   components: {
   *     Fab, FabButton, FabList
   *  }
   * }
 * ```
 *
 * @usage
 * <Fab slot="fixed" bottom right ref="fab5">
 *    <FabButton color="dark">
 *        <Icon name="arrow-dropleft"></Icon>
 *    </FabButton>
 *    <FabList side="left">
 *        <FabButton @click="clickHandler('facebook')" color="danger">
 *            <Icon name="logo-facebook"></Icon>
 *        </FabButton>
 *        <FabButton @click="clickHandler('googleplus')" color="secondary">
 *            <Icon name="logo-googleplus"></Icon>
 *        </FabButton>
 *        <FabButton @click="clickHandler('twitter')" color="dark">
 *            <Icon name="logo-twitter"></Icon>
 *        </FabButton>
 *        <FabButton @click="clickHandler('vimeo')" color="primary">
 *            <Icon name="logo-vimeo"></Icon>
 *        </FabButton>
 *    </FabList>
 * </Fab>
 *
 *
 * @props {Boolean} [top] - 设置放置位置
 * @props {Boolean} [bottom] - 设置放置位置
 * @props {Boolean} [left] - 设置放置位置
 * @props {Boolean} [right] - 设置放置位置
 * @props {Boolean} [middle] - 设置放置位置
 * @props {Boolean} [center] - 设置放置位置
 * @props {Boolean} [edge] - 设置放置位置, 放在Header/Footer组件与Content组件交界处
 * @props {Boolean} [fabContentMargin=10] - 靠边的距离, 默认是1opx
 *
 *
 * @demo #/fab
 * */

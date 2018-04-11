export { default } from './toggle.vue'
/**
 * @component Toggle
 * @description
 *
 * ## 表单组件 / Toggle开关组件
 *
 * ### 注意
 *
 * 使用 v-model 切换状态, 不支持checked属性
 *
 * ### 说明
 *
 * Toggle组件和Checkbox组件的功能类似, 但是Toggle组件在移动端更加好看, 也更加易用. Toggle可以设置颜色, 当然不同模式下的样式还是不一样的, 感兴趣的可以切换试试.
 *
 * ### 如何引入
 * ```
 * // 引入
 * import { Toggle } from 'vimo'
 * // 安装
 * Vue.component(Toggle.name, Toggle)
 * // 或者
 * export default{
   *   components: {
   *    Toggle
   *  }
   * }
 * ```
 *
 * @props {String} [mode='ios'] - 模式: "ios", "md"
 * @props {String} [color] - 颜色: "primary", "secondary", "danger", "light", and "dark"
 * @props {Boolean} [disabled=false] - 禁用状态
 *
 * @fires component:Toggle#onChange
 * @demo #/toggle
 * @usage
 * <List>
 *    <ListHeader>
 *        普通使用
 *    </ListHeader>
 *    <Item>
 *        Toggle Normal
 *        <Toggle slot="item-right"></Toggle>
 *    </Item>
 *    <Item>
 *        Red Toggle
 *        <Toggle slot="item-right" color="danger"></Toggle>
 *    </Item>
 *    <Item>
 *        Toggle Open
 *        <Toggle slot="item-right"></Toggle>
 *    </Item>
 *    <Item>
 *        Toggle Close
 *        <Toggle slot="item-right"></Toggle>
 *    </Item>
 *    <Item>
 *        Toggle Disabled
 *        <Toggle slot="item-right" v-model="checked"></Toggle>
 *    </Item>
 * </List>
 *
 * */

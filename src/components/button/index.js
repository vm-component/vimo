/**
 * @component Button
 * @description
 *
 * ## 其他 / Button按钮组件
 *
 * 基础的按钮组件, 可以设置大小, 形状等, 包括和Icon组件的组合.
 *
 * ### 如何引入
 * ```
 * // 引入
 * import { Button } from 'vimo
 * // 安装
 * Vue.component(Button.name, Button)
 * // 或者
 * export default{
   *   components: {
   *    Button
   *  }
   * }
 * ```
 *
 * @props {String} [color='default'] - 颜色
 * @props {String} [mode='ios'] - 模式
 *
 * @props {Boolean} [small]       - 尺寸
 * @props {Boolean} [default]     - 尺寸
 * @props {Boolean} [large]       - 尺寸
 *
 * @props {Boolean} [active]      - 是否激活(按下时的效果)
 *
 * @props {Boolean} [round]       - round(宽度auto有圆角)
 * @props {Boolean} [full]        - full(宽度100%无圆角)
 * @props {Boolean} [block]       - block(宽度100%有圆角)
 * @props {Boolean} [menutoggle]  - menutoggle类型
 *
 * @props {Boolean} [outline]     - outline只有边框
 * @props {Boolean} [clear]       - clear空心
 * @props {Boolean} [solid]       - solid实心
 *
 * @props {Boolean} [role='button']       - role 按钮具体角色 例如 action-sheet-button/bar-button
 *
 * @props {Boolean} [strong]      - 样式加强
 *
 * @demo #/button
 * @usage
 * <Button full>full</Button>
 * <Button outline full color="secondary">outline + full</Button>
 * <Button color="dark">
 *    <Icon class="icon" name="star"></Icon>
 *    <span>Left Icon</span>
 * </Button>
 * */
export { default } from './button.vue'

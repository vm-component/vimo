export { default } from './checkbox.vue';
/**
 * @component Checkbox
 * @description
 *
 * ## 表单组件 / Checkbox复选框(检查框)组件
 *
 * ### 注意
 *
 * 使用v-modal切换状态, 不支持checked属性
 *
 * ### 如何引入
 * ```
 * // 引入
 * import { Checkbox } from 'vimo'
 * // 安装
 * Vue.component(Checkbox.name, Checkbox)
 * // 或者
 * export default{
   *   components: {
   *    Checkbox
   *  }
   * }
 *```
 *
 * @props {String} [mode='ios'] - 模式
 * @props {String} [color] - 颜色
 * @props {Boolean} [disabled=false] - 单向选择, 点击且换并不对父组件传递
 * @props {Boolean} [value] - 当前值
 *
 * @fires component:Checkbox#onChange
 * @demo #/checkbox
 *
 * @usage
 * <Item>
 *    <Label>Danger</Label>
 *    <Checkbox slot="item-left" color="danger" v-model="testModal" :disabled="testDisabled" @onChange="onCheckboxChange"></Checkbox>
 * </Item>
 * */

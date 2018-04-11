export { default } from './select.vue'
/**
 * @name Select
 * @component Select
 * @description
 *
 * ## 表单组件 / Select选择组件
 *
 * ### 说明
 *
 * 如果在Select中使用了`v-model`指令时, Option中的`checked`属性将不起作用, 因为两者的使用逻辑是冲突的!
 *
 * `v-model`是在Select组件中使用数据控制, 而`checked`是在Option中使用checked属性控制.
 *
 * ### 数据源
 *
 * 使用此组件建议使用固定数据而不是异步数据, 异步数据使用Alert组件完成.
 *
 * ### 如何引入
 * ```
 * // 引入
 * import { Select, SelectOption } from 'vimo'
 * // 安装
 * Vue.component(Select.name, Select)
 * Vue.component(Option.name, SelectOption)
 * // 或者
 * export default{
   *   components: {
   *     Select, SelectOption
   *  }
   * }
 * ```
 * @props {String} [cancelText='取消'] - cancel按钮显示文本
 * @props {String} [cancelText='确认'] - OK按钮显示文本
 * @props {Boolean} [disabled='false'] - OK按钮显示文本
 * @props {String} [interface='alert'] - 显示界面类型, 可以是'action-sheet','alert'两个
 * @props {Boolean} [multiple='false'] - 单选多选,默认为单选
 * @props {String} [placeholder] - 当未选择时显示的值
 * @props {Object} [selectOptions] - select组件掉用alert和action-sheet组件的, 这个是针对传入的参数 title/subTitle/message/cssClass/enableBackdropDismiss等
 * @props {String} [selectedText] - 选择组件的文本提示, 代替选择的option选项
 * @props {String} [mode='ios'] - 模式
 * @props {Object|String|Array} [value='ios'] - 组件值
 *
 * @fires component:Select#onChange
 * @fires component:Select#onCancel
 * @fires component:Select#onSelect
 *
 * @demo #/select
 *
 * @usage
 * <Item>
 *    <Label>Gender</Label>
 *    <Select item-right placeholder="Select" interface="alert"
 *            @ onChange="onChange"
 *            @ onSelect="onSelect"
 *            @ onCancel="onCancel">
 *        <Option value="f" checked>Female</Option>
 *        <Option value="m">Male</Option>
 *    </Select>
 * </Item>
 * */

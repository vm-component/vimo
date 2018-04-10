export { default } from './datetime.vue';
/**
 * @component Datetime
 * @description
 *
 * ## 时间组件 / Datetime时间选择组件
 *
 * ### 简介
 * Datetime组件是对Picker组件的再封装, 这个和Select组件对Alert组件的封装类似. Datetime组件用于替代原生input[type="datetime"]的解决方案, 且功能比原生更丰富. 支持单列~多列时间的选择/固定时间范围/固定时间的选择间隔等.
 *
 * ### 感谢Ionic
 *
 * 该组件是对Ionic的Datetime组件的转义, 具体使用和Ionic的datetime完全一致. API参考下方链接.
 *
 * ### 改进部分
 * Ionic原组件值对符合ISO格式的日期能正确显示使用, 这里做了改进:
 *
 * 通过v-model可以传入如下类型: **Date日期对象/ISO格式的时间String/能转化为Date对象**的字符串 这三类. 但是v-model返回的数据都是ISO格式日期String, 如果期望返回每个column返回的详细结果, 请监听onChange事件.
 *
 * ### 如何引入
 * ```
 * // 引入
 * import { Datetime } from 'vimo'
 * // 安装
 * Vue.component(Datetime.name, Datetime)
 * // 或者
 * export default{
   *   components: {
   *     Datetime
   *  }
   * }
 * ```
 *
 * @usage
 * <Item>
 *    <Label>MMMM</Label>
 *    <Datetime slot="item-right" displayFormat="MMMM" v-model="monthOnly"></Datetime>
 * </Item>
 *
 * @props {String} [min] - ISO 8601 datetime 的时间格式, 1996-12-19
 * @props {String} [max] - ISO 8601 datetime 的时间格式, 1996-12-19
 * @props {String} displayFormat - 外部 显示的格式
 * @props {String} [pickerFormat] - picker 显示的格式
 * @props {String} [placeholder] - placeholder
 * @props {String|Object|Date} value - value
 * @props {String} [cancelText='取消'] - 取消的显示文本
 * @props {String} [doneText='确认'] - 确定的显示文本
 * @props {String|Array} [yearValues] - 显示可以选择的 年 信息, 例如: "2024,2020,2016,2012,2008"
 * @props {String|Array} [monthValues] - 显示可以选择的 月 信息, 例如: "6,7,8"
 * @props {String|Array} [dayValues] - 显示可以选择的 月 信息, 例如: "6,7,8"
 * @props {String|Array} [hourValues] - 显示可以选择的 小时 信息,
 * @props {String|Array} [minuteValues] - 显示可以选择的 分钟 信息,
 * @props {String|Array} [monthNames] - 每个月 的名字
 * @props {String|Array} [monthShortNames] - 每个月 的短名字
 * @props {String|Array} [dayNames] - 每天 的显示名字
 * @props {String|Array} [dayShortNames] - 每天 的短名字
 * @props {Object} [pickerOptions] - pickerOptions
 * @props {String} [mode='ios'] - mode
 *
 *
 * @see http://ionicframework.com/docs/demos/src/datetime/www/?production=true&ionicplatform=ios
 * @see http://ionicframework.com/docs/api/components/datetime/DateTime/
 * @demo #/time-picker
 * @fires component:Datetime#onCancel
 * @fires component:Datetime#onChange
 * */

export { default } from './textarea.vue';
/**
 * @component Textarea
 * @description
 *
 * ## 表单组件 Textarea输入框
 *
 * ### 如何引入
 * ```
 * // 引入
 * import { Textarea } from 'vimo'
 * // 安装
 * Vue.component(Textarea.name, Textarea)
 * // 或者
 * export default{
   *   components: {
   *     Textarea
   *  }
   * }
 * ```
 *
 * @props {Boolean} [showFocusHighlight]      - focus时底部高亮
 * @props {Boolean} [disabled]                - 如果为true, 用户无法输入
 * @props {Number} [maxlength]                - 设置最大值, 只对textarea有效
 * @props {Number} [rows=3]                   - 设置行数, 只对textarea有效
 * @props {Boolean} [autosize]                - 自动高度
 * @props {Boolean} [autofocus]               - 自动对焦
 * @props {String} [mode='ios']               - 当前平台
 * @props {String} [placeholder]              - 占位文字
 * @props {Boolean} [readonly]                - 只读模式, 不能修改
 * @props {Boolean} [count]                   - 计数模式
 * @props {*} [value]                         - 内容输入值
 *
 * @fires component:Textarea#onBlur
 * @fires component:Textarea#onFocus
 * @fires component:Textarea#onInput
 * @fires component:Textarea#onKeyup
 * @fires component:Textarea#onKeydown
 * @fires component:Textarea#onValid
 * @fires component:Textarea#onInvalid
 *
 * @demo #/textarea
 * @usage
 * <Textarea placeholder="Text Textarea">
 * <Textarea @onBlur="blur($event)" @onFocus="focus($event)" @onInput="onInput($event)" placeholder="Enter a description"></Textarea>
 * */

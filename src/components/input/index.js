export { default } from './input.vue';
/**
 * @component Input
 * @description
 *
 * ## 表单组件 Input输入框
 *
 * ### 注意
 *
 * Input组件只能对以下类型的type作出相应 : `text`,`password`, `email`, `number`, `search`, `tel`, and `url`. 但是不适用一下类型: `checkbox`, `radio`, `toggle`, `range`, `select`, etc.
 *
 * ### 如何引入
 * ```
 * // 引入
 * import { Input } from 'vimo'
 * // 安装
 * Vue.component(Input.name, Input)
 * // 或者
 * export default{
   *   components: {
   *     Input
   *  }
   * }
 * ```
 *
 * ### 关于输入验证
 *
 * - 只在blur阶段才进行
 * - ```check```默认关闭, ```check```只是作为内部正误标示, 只有开启了检查, 才会发出```onValid```和```onInvalid```两个事件, 外部提交判断需要额外代码判断(内部```isValid```变量).
 * - 如果```check```开启, 但是regex无值, 则使用内置判断(如下).
 * - 如果```regex```有值, 则自动开启```check```, 支持的regex可以使正则, 也可以是返回Boolena的函数, 传入参数为传入的value
 * - 内部验证的typ如下
 *
 * ### 内置的验证type
 *
 * 名称    | 类型              |内部类型              | 说明
 * ------|-----------------|------------------------------------------------------------------------------
 * 整数    | integer         | number| 整数
 * 正整数   | positiveInteger |number| 正整数
 * 负整数   | negativeInteger |number| 负整数
 * 邮箱    | email           |email| 电子邮件
 * IP地址  | ip              |number| IP地址
 * 身份证   | idCard          | text| 严格验证
 * 密码    | password        | password|密码需6-18位，以字母开头可含数字
 * 国内电话  | tel             | tel|正确格式为：XXXX-XXXXXXX，XXXX- XXXXXXXX，XXX-XXXXXXX，XXX-XXXXXXXX，XXXXXXX，XXXXXXXX。
 * 国内手机号 | mobile          | tel|13/14/15/18/17开头
 * 验证汉字  | cn              |text|
 * 验证码   | securityCode    | number|至少4位数字
 * 昵称    | nickName        | text|可由中英文字母、数字、"-"、"_"组成。
 * QQ号码  | qq              | number|qq: 1-9开头，最少5位。
 * 网址URL | url             | url|网址URL, 必须以(https,http,ftp,rtsp,mms)开头
 *
 * @props {Boolean} [clearInput]              - 如果为true, 当输入值的时候一个清除按钮会在input右边出现, 点击按钮则清除输入.
 * @props {Boolean} [clearOnEdit]             - 如果为true, 当再次输入的时候会清空上次的输入, 如果type为password时默认为true, 其余情况默认为false, 默认值的变更, 需要js控制
 * @props {Boolean} [disabled]                - 如果为true, 用户无法输入
 * @props {Boolean} [showFocusHighlight]      - focus时底部是否 highlight 显示
 * @props {Boolean} [showValidHighlight]      - 验证成功是否显示 highlight 显示
 * @props {Boolean} [showInvalidHighlight]    - 验证失败是否显示 highlight 显示
 * @props {Number} [max]                      - 设置最大值, 1. type=number时限制输入数字的大小; 2. type=text时限制输入字符的长度
 * @props {Number} [min]                      - 设置最小值, 1. type=number时限制输入数字的大小; 2. type=text时限制输入字符的长度
 * @props {Number} [decimal=2]                - 设置数字的小数位, 默认为2
 * @props {Number} [step]                     - 设置数字变化的阶梯值, 只对type=number有效
 * @props {String} [mode='ios']               - 当前平台
 * @props {String} [placeholder]              - 占位文字
 * @props {Boolean} [readonly]                - 只读模式, 不能修改
 * @props {String} [type='text']              - 输入的类型: "text", "password", "email", "number", "search", "tel", or "url"
 * @props {*} [value]                         - 内容输入值
 * @props {Number} [debounce=0]               - 触发间隔
 * @props {RegExp} [regex]                    - 自定义正则
 * @props {Boolean} [check]                   - 是否check输入结果, 如果regex有值, 则开启, 否则关闭. 如果check开启, 但是regex无值, 则使用内置判断. 默认关闭check, check只是作为内部正误标示, 对外提交不起作用, 如果点击能知道各个input的状态, 需要在dom中search'ng-invalid'类名, 这样的话, 验证位置就会统一.
 *
 * @fires component:Input#onBlur
 * @fires component:Input#onFocus
 * @fires component:Input#onInput
 * @fires component:Input#onKeyup
 * @fires component:Input#onKeydown
 * @fires component:Input#onValid
 * @fires component:Input#onInvalid
 *
 * @demo #/input
 * @usage
 * <Input placeholder="Text Input">
 * <Input placeholder="Clear Input" clearInput></Input>
 * <Input placeholder="请输入手机号" type="mobile" check clearInput></Input>
 * <Input placeholder="请输入至少4位" type="securityCode" check clearInput></Input>
 * <Input placeholder="XX-XX-XXX格式" type="text" check :regex=/\d{2}-\d{2}-\d{3}/ clearInput></Input>
 * */

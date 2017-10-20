<template>
    <div class="ion-input" :class="[modeClass,{'clearInput':clearInput}]">
        <div class="input-innerWrap" @click="clickToFocus($event)">
            <input ref="input"
                   :class="[textInputClass]"
                   :value="inputValue"
                   :type="typeValue"
                   :placeholder="placeholder"
                   :disabled="disabled"
                   :readonly="readonly"
                   :max="max"
                   :min="min"
                   :step="step"
                   :autofocus="autofocus"
                   @keyup="inputKeyUp($event)"
                   @blur="inputBlurred($event)"
                   @focus="inputFocused($event)"
                   @input="inputChanged($event)"
                   @keydown="inputKeyDown($event)">
        </div>
        <vm-button v-if="clearInput && hasValue"
                   clear
                   class="text-input-clear-icon"
                   @click="clearTextInput()"></vm-button>
    </div>
</template>
<style lang="less">
    @import "input";
    @import "input.ios.less";
    @import "input.md.less";
</style>
<script type="text/javascript">
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
   * import Input from 'vimo/lib/input'
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
  import { hasFocus, setElementClass, isObject, isBlank, isPresent, isFunction, isRegexp } from '../util/util'
  import Button from '../button/index'
  import REGEXP from '../util/regexp'

  export default {
    name: 'Input',
    components: {
      'vm-button': Button
    },
    props: {
      /**
       * focus时, 下划线是否高亮
       * */
      showFocusHighlight: Boolean,

      /**
       * 验证成功是否显示 highlight
       * */
      showValidHighlight: Boolean,

      /**
       * 验证失败是否显示 highlight
       * */
      showInvalidHighlight: Boolean,

      /**
       * 如果为true, 当输入值的时候一个清除按钮会在input右边出现, 点击按钮则清除输入
       * */
      clearInput: Boolean,

      /**
       * 如果为true, 当再次输入的时候会清空上次的输入, 如果type为password时默认为true, 其余情况默认为false
       * 默认值的变更, 需要js控制
       * */
      clearOnEdit: Boolean,

      /**
       * 如果为true, 用户无法输入
       * */
      disabled: Boolean,

      /**
       * 设置最大值, 用于text/number等类型的长度限制
       * */
      max: Number,

      /**
       * 设置最小值
       * */
      min: Number,

      /**
       * 设置type=number的小数位
       * */
      decimal: {
        type: Number,
        validator (val) {
          return val >= 0
        },
        default: 2
      },

      /**
       * 自动focus
       * */
      autofocus: Boolean,

      /**
       * 设置数字变化的阶梯值, 只对type=number有效
       * */
      step: Number,

      /**
       * 当前平台
       * */
      mode: {
        type: String,
        default () { return this.$config && this.$config.get('mode', 'ios') || 'ios' }
      },

      placeholder: String,

      /**
       * 只读模式, 不能修改
       * */
      readonly: Boolean,

      /**
       * 输入的类型: "text", "password", "email", "number", "search", "tel", or "url"
       * */
      type: {
        type: String,
        default: 'text'
      },

      /**
       * 内容输入值
       * */
      value: [String, Number, Object, Function],

      debounce: {
        type: Number,
        default: 0
      },

      // 自定义输入结果验证的正则表达式
      regex: RegExp,

      // 是否check输入结果, 如果regex有值, 则开启, 否自关闭.
      // 如果check开启, 但是regex无值, 则使用内置判断
      // 默认关闭check
      // check只是作为内部正误标示, 对外提交不起作用
      // 如果点击能知道各个input的状态, 需要在dom中search'ng-invalid'类名
      // 这样的话, 验证位置就会统一.
      check: Boolean

    },
    data () {
      return {
        oldInputValue: null,    // 内部value值
        inputValue: this.value, // 内部value值
        typeValue: this.type, // 内部type值
        checkValue: this.check || this.regex, // 内部check值, 判断是否需要验证结果

        itemComponent: null, // 外部item组件实例 -> 修改class

        isValid: false, // 验证结果

        timer: null,

        clearOnEditValue: this.clearOnEdit, // 内部维护的clearOnEdit副本, 因为会修改的
        didBlurAfterEdit: false, // clearOnEdit状态唤起的标志
        shouldBlur: true // 点击清楚按钮时使用
      }
    },
    watch: {
      value (val) {
        this.inputValue = val
      },
      inputValue (newVal, oldVal) {

      }
    },
    computed: {
      modeClass () {
        return `input-${this.mode}`
      },
      textInputClass () {
        return `text-input text-input-${this.mode}`
      },
      inputElement () {
        return this.$refs.input
      },
      hasValue () {
        const inputValue = this.inputValue
        return (inputValue !== null && inputValue !== undefined && inputValue !== '')
      }
    },
    methods: {
      /**
       * 边界检查
       * @param {String|Number} val - 数值
       * @param {String} text - 对应的string
       * */
      checkBoundary ($event) {
        let inputText = $event.target.value // text
        let resetValue = null

        // 数字边界限制
        // 这段代码已在很卡顿的安卓机上试验过了, 之所以不在watch阶段重置, 是因为在较慢的安卓机上有数字抖动的情况
        // 现在已能很好的处理
        if (this.typeValue === 'number') {
          resetValue = inputText
          if (isPresent(inputText)) {
            if (isPresent(this.max) && parseFloat(inputText) > this.max) {
              resetValue = this.oldInputValue
            }

            if (isPresent(this.min) && parseFloat(inputText) < this.min) {
              resetValue = this.min
            }

            // 小数点检查, 使用string的方式, number的方式会有奇怪的问题, 比如: 222.22 -> 222.19
            let int = resetValue.toString().split('.')[0]
            let decimals = resetValue.toString().split('.')[1]

            if (decimals && this.decimal > 0) {
              if (decimals.length > this.decimal) {
                decimals = decimals.substr(0, this.decimal)
                resetValue = `${int}.${decimals}`
              }
            }
          }

          if (resetValue !== inputText) {
            $event.target.value = resetValue
          }
        } else {
          resetValue = inputText
          // 非数字 且有 最大长度限制
          if (isPresent(this.max) && isPresent(inputText) && inputText.toString().length > this.max) {
            resetValue = this.oldInputValue
            // 重置 input 输入框
            $event.target.value = resetValue
          }
        }

        return resetValue
      },

      /**
       * @event component:Input#onKeyup
       * @description keyup事件
       */
      inputKeyUp ($event) {
        this.$emit('onKeyup', $event)
      },

      /**
       * @event component:Input#onKeydown
       * @description keydown事件
       */
      inputKeyDown ($event) {
        this.$emit('onKeydown', $event)
        if (this.clearOnEditValue) {
          this.checkClearOnEdit()
        }

        this.oldInputValue = this.inputValue
      },

      /**
       * 执行验证, 如果错误则设置ng-invalid, 正确则设置ng-valid
       * @private
       * */
      verification () {
        // 只有开启才检查
        if (!this.checkValue) return

        this.isValid = this.getVerifyResult(this.inputValue, this.type)
        if (this.isValid) {
          /**
           * @event  component:Input#onValid
           * @description 验证通过, 只在check开启或者有regex时判断
           * @property {*} value - 当前检查的value
           * @property {string} type - 当前检查的value的类型
           */
          this.$emit('onValid', this.inputValue, this.type)
          this.itemComponent && setElementClass(this.itemComponent.$el, 'ng-valid', true)
          this.itemComponent && setElementClass(this.itemComponent.$el, 'ng-invalid', false)
        } else {
          /**
           * @event  component:Input#onInvalid
           * @description 验证失败, 只在check开启或者有regex时判断
           * @property {*} value - 当前检查的value
           * @property {string} type - 当前检查的value的类型
           */
          this.$emit('onInvalid', this.inputValue, this.type)
          this.itemComponent && setElementClass(this.itemComponent.$el, 'ng-valid', false)
          this.itemComponent && setElementClass(this.itemComponent.$el, 'ng-invalid', true)
        }
      },

      /**
       * 获取验证结果
       * @param {*} value - 待验证的值
       * @param {String} type - 待验证的值的类型
       * @return Boolean
       * @private
       * */
      getVerifyResult (value, type = 'text') {
        if (!isPresent(value)) {
          console.debug('当前没有值, 验证跳过, 返回 false!')
          return false
        }

        let _regex = this.regex
        if (isBlank(_regex)) {
          let regexpInfo = REGEXP[type]
          if (regexpInfo && (isRegexp(regexpInfo) || isFunction(regexpInfo))) {
            _regex = regexpInfo
          } else if (regexpInfo && (isRegexp(regexpInfo.regexp) || isFunction(regexpInfo.regexp))) {
            _regex = regexpInfo.regexp
          }
        }

        // 如果没有正则信息则返回true, 表示不验证
        if (!isPresent(_regex)) {
          console.error('未找到匹配type:' + type + '的regex, 验证跳过, 返回 false!')
          return false
        }

        // 如果是函数则执行判断
        if (isFunction(_regex)) {
          return _regex(value)
        }

        // 判断是不是正则
        if (isRegexp(_regex)) {
          return _regex.test(value)
        }

        console.error('regex:' + _regex + '不是正则/函数, 验证跳过, 返回 false!')
        return false
      },

      /**
       * 当该组件被点击的时候触发, 扩大focus触发范围
       */
      clickToFocus () {
        this.setFocus()
      },

      /**
       * 设置当前组件为focus状态
       * */
      setFocus () {
        if (!hasFocus(this.inputElement)) {
          this.inputElement.focus()
        }
      },

      /**
       * 监听并发送blur事件
       * @private
       */
      inputBlurred () {
        // debug: clearInput会在onBlur之后,造成blur后点击clearInput失效, 故需要延迟blur
        window.setTimeout(() => {
          if (this.shouldBlur) {
            // 向父组件Item添加标记
            this.setItemHasFocusClass(false)

            /**
             * @event component:Input#onBlur
             * @description blur事件
             */
            this.$emit('onBlur')
            // 如果是clearOnEdit模式， blur时还有值的情况下，定一个flag
            if (this.clearOnEditValue && this.hasValue) {
              this.didBlurAfterEdit = true
            }

            // 验证输入结果
            this.verification()
          } else {
            this.shouldBlur = true
          }
        }, 16 * 2)
      },

      /**
       * 监听并发送focus事件
       * @private
       */
      inputFocused () {
        // 向父组件Item添加标记
        this.setItemHasFocusClass(true)
        this.setFocus()
        /**
         * @event  component:Input#onFocus
         * @description focus事件
         */
        this.$emit('onFocus')
        this.itemComponent && setElementClass(this.itemComponent.$el, 'ng-touched', true)
      },

      /**
       * 监听input事件, 更新input的value(inputValue)
       * @param {Event} [$event] - 事件(可选)
       * @private
       */
      inputChanged ($event) {
        if ($event && $event.target) {
          // 输入限制检查
          this.inputValue = this.checkBoundary($event)
        } else {
          // clear的情况
          this.inputValue = null
        }

        this.setItemHasValueClass()

        // debounce
        window.clearTimeout(this.timer)
        this.timer = window.setTimeout(() => {
          // 组件对外事件
          /**
           * @event  component:Input#onInput
           * @description input事件
           * @property {*} value - 当前输入的值
           */
          this.$emit('onInput', this.inputValue)
          this.$emit('input', this.inputValue)
        }, this.debounce)
      },

      /**
       * @private
       * */
      checkClearOnEdit () {
        if (!this.clearOnEditValue) {
          return
        }

        // clearOnEdit模式激活,并且input有值
        if (this.didBlurAfterEdit && this.hasValue) {
          this.inputValue = ''
          this.inputChanged()
        }

        // 重置标记
        this.didBlurAfterEdit = false
      },

      /**
       * 点击清除输入项
       * @private
       * */
      clearTextInput () {
        this.inputValue = ''
        this.inputChanged()
        this.shouldBlur = false

        this.setFocus()
        this.setItemHasFocusClass(true)
      },

      /**
       *  设置父组件Item被点中时的class
       *  @private
       */
      setItemHasFocusClass (isFocus) {
        if (this.itemComponent) {
          setElementClass(this.itemComponent.$el, 'input-has-focus', isFocus)
        }
        setElementClass(this.$el, 'input-has-focus', isFocus)
      },

      /**
       *  设置父组件Item有值时的class
       *  @private
       */
      setItemHasValueClass () {
        if (this.itemComponent) {
          setElementClass(this.itemComponent.$el, 'input-has-value', this.hasValue)
        }
        setElementClass(this.$el, 'input-has-value', this.hasValue)
      }
    },
    created () {
      // 默认情况下, 如果password有值, 则点击执行清空
      if (this.type === 'password') {
        this.clearOnEditValue = true
        this.typeValue = 'password'
      }

      // 根据 REGEXP 匹配 type 的真正规则
      if (isObject(REGEXP[this.type]) && isPresent(REGEXP[this.type].type)) {
        this.typeValue = REGEXP[this.type].type
      } else {
        this.typeValue = this.type
      }
    },
    mounted () {
      // 找到外部item实例
      if (this.$parent.$options._componentTag.toLowerCase() === 'item') {
        this.itemComponent = this.$parent
        setElementClass(this.itemComponent.$el, 'item-input', true)
        setElementClass(this.itemComponent.$el, 'show-focus-highlight', this.showFocusHighlight)
        setElementClass(this.itemComponent.$el, 'show-valid-highlight', this.showValidHighlight)
        setElementClass(this.itemComponent.$el, 'show-invalid-highlight', this.showInvalidHighlight)
      }

      // 初始化时,判断是否有value
      this.setItemHasValueClass()
    }
  }
</script>

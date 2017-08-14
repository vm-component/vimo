<template>
    <div class="ion-input" :class="[modeClass,{'clearInput':clearInput}]">

        <div class="input-innerWrap" @click="clickToFocus($event)">
            <input
                    :class="[textInputClass]"
                    :value="inputValue"
                    :type="typeValue"
                    :placeholder="placeholder"
                    :disabled="disabled"
                    :readonly="readonly"
                    :max="max"
                    :min="min"
                    :step="step"
                    ref="input"
                    @blur="inputBlurred($event)"
                    @focus="inputFocused($event)"
                    @input="inputChanged($event)"
                    @keydown="onKeydown($event)"
                    v-if="typeValue!=='textarea'">

            <textarea
                    :class="[textInputClass]"
                    :value="inputValue"
                    :placeholder="placeholder"
                    :disabled="disabled"
                    :readonly="readonly"
                    :autofocus="autofocus"
                    :maxlength="maxlength"
                    :rows="rows"
                    ref="textarea"
                    @blur="inputBlurred($event)"
                    @focus="inputFocused($event)"
                    @input="inputChanged($event)"
                    @keydown="onKeydown($event)"
                    v-if="typeValue ==='textarea'"></textarea>
        </div>

        <Button v-if="clearInput && typeValue!=='textarea' && hasValue()"
                clear
                class="text-input-clear-icon"
                @click="clearTextInput()"></Button>
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
   * ## 表单组件 Input/Textarea输入框
   *
   * ### 注意
   *
   * Input组件只能对以下类型的type作出相应 : `text`,`password`, `email`, `number`, `search`, `tel`, and `url`. 但是不适用一下类型: `checkbox`, `radio`, `toggle`, `range`, `select`, etc. 当然, input直接使用也没问题.
   *
   * 此外, Textarea组件和Input组件两者的使用个逻辑相似.
   *
   *
   *
   * ### 如何引入
   * ```
   * // 引入
   * import { Input, Textarea } from 'vimo/components/input'
   * // 安装
   * Vue.component(Input.name, Input)
   * Vue.component(Textarea.name, Textarea)
   * // 或者
   * export default{
   *   components: {
   *     Input, Textarea
   *  }
   * }
   * ```
   *
   *
   * ### 关于输入验证
   *
   * - 只在blur阶段才进行
   * - `check`默认关闭, check只是作为内部正误标示, 对外提交不起作用
   * - 如果点击能知道各个input的状态, 需要在dom中search'ng-invalid'类名, 这样的话, 验证位置就会统一.
   * - 如果check开启, 但是regex无值, 则使用内置判断.
   * - 如果regex有值, 则自动开启check
   * - 内部验证的type有: integer/positiveInteger/negativeInteger/mobile/email/ip/idCard
   *
   * ### 内置的验证type
   *
   * 名称    | 类型              | 说明
   * ------|-----------------|------------------------------------------------------------------------------
   * 整数    | integer         |
   * 正整数   | positiveInteger |
   * 负整数   | negativeInteger |
   * 邮箱    | email           |
   * IP地址  | ip              |
   * 身份证   | idCard          | 严格验证
   * 密码    | password        | 密码需6-18位，以字母开头可含数字
   * 国内电话  | tel             | 正确格式为：XXXX-XXXXXXX，XXXX- XXXXXXXX，XXX-XXXXXXX，XXX-XXXXXXXX，XXXXXXX，XXXXXXXX。
   * 国内手机号 | mobile          | 13/14/15/18/17开头
   * 验证汉字  | cn              |
   * 验证码   | securityCode    | 至少4位
   * 昵称    | nickName        | 可由中英文字母、数字、"-"、"_"组成。
   * QQ号码  | qq              | qq: 1-9开头，最少5位。
   * 网址URL | url             | 网址URL, 必须以(https,http,ftp,rtsp,mms)开头
   *
   *
   * @props {Boolean} [clearInput]      - 如果为true, 当输入值的时候一个清除按钮会在input右边出现, 点击按钮则清除输入. textarea没有这个特性
   * @props {Boolean} [clearOnEdit]     - 如果为true, 当再次输入的时候会清空上次的输入, 如果type为password时默认为true, 其余情况默认为false, 默认值的变更, 需要js控制
   * @props {Boolean} [disabled]        - 如果为true, 用户无法输入
   * @props {Number} [max]              - 设置最大值, 只对type=number有效
   * @props {Number} [maxlength]        - 设置最大值, 只对textarea有效
   * @props {Number} [rows=3]             - 设置行数, 只对textarea有效
   * @props {Number} [min]              - 设置最小值, 只对type=number有效
   * @props {Number} [step]             - 设置数字变化的阶梯值, 只对type=number有效
   * @props {String} [mode='ios']       - 当前平台
   * @props {String} [placeholder]      - 占位文字
   * @props {Boolean} [readonly]        - 只读模式, 不能修改
   * @props {String} [type='text']      - 输入的类型: "text", "password", "email", "number", "search", "tel", or "url"
   * @props {*} [value]                 - 内容输入值
   * @props {Number} [debounce=0]       - 触发间隔
   * @props {RegExp} [regex]            - 自定义正则
   * @props {Boolean} [check]           - 是否check输入结果, 如果regex有值, 则开启, 否自关闭. 如果check开启, 但是regex无值, 则使用内置判断. 默认关闭check, check只是作为内部正误标示, 对外提交不起作用, 如果点击能知道各个input的状态, 需要在dom中search'ng-invalid'类名, 这样的话, 验证位置就会统一.
   *
   *
   *
   * @fires component:Input#onBlur
   * @fires component:Input#onFocus
   * @fires component:Input#onInput
   *
   * @demo https://dtfe.github.io/vimo-demo/#/input
   * @usage
   * <Input placeholder="Text Input">
   * <Textarea @onBlur="onBlur($event)" @onFocus="onFocus($event)" @onInput="onInput($event)" placeholder="Enter a description"></Textarea>
   *
   * */
  import { hasFocus, setElementClass, isPresent, isFunction, REGEXP } from '../util/util'
  import { Button } from '../button'
  import Autosize from 'autosize'
  export default{
    data () {
      return {
        inputValue: this.value, // 内部value值
        typeValue: this.type, // 内部type值
        checkValue: this.check || this.regex, // 内部check值, 判断是否需要验证结果

        itemComponent: null, // 外部item组件实例 -> 修改class
        inputElement: null, // 当前输入的主体, input/textarea

        timer: null,

        clearOnEditValue: this.clearOnEdit, // 内部维护的clearOnEdit副本, 因为会修改的
        didBlurAfterEdit: false, // clearOnEdit状态唤起的标志
        shouldBlur: true // 点击清楚按钮时使用
      }
    },
    props: {
      /**
       * 如果为true, 当输入值的时候一个清除按钮会在input右边出现, 点击按钮则清除输入
       * textarea没有这个特性
       * */
      clearInput: [Boolean],

      /**
       * 如果为true, 当再次输入的时候会清空上次的输入, 如果type为password时默认为true, 其余情况默认为false
       * 默认值的变更, 需要js控制
       * */
      clearOnEdit: [Boolean],

      /**
       * 如果为true, 用户无法输入
       * */
      disabled: [Boolean],

      /**
       * 设置最大值, 只对type=number有效
       * */
      max: [Number],

      /**
       * 设置最大值, 只对textarea有效
       * */
      maxlength: [Number],

      /**
       * 设置行数, 只对textarea有效
       * */
      rows: {
        type: Number,
        default: 3
      },

      /**
       * 设置最小值, 只对type=number有效
       * */
      min: [Number],

      /**
       * 自动focus
       * */
      autofocus: Boolean,

      /**
       * 设置数字变化的阶梯值, 只对type=number有效
       * */
      step: [Number],

      /**
       * 当前平台
       * */
      mode: {
        type: String,
        default () { return this.$config && this.$config.get('mode', 'ios') || 'ios' }
      },

      placeholder: [String],

      /**
       * 只读模式, 不能修改
       * */
      readonly: [Boolean],

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
      value: [String],

      debounce: {
        type: Number,
        default: 0
      },

      // 自定义输入结果验证的正则表达式
      regex: [RegExp],

      // 是否check输入结果, 如果regex有值, 则开启, 否自关闭.
      // 如果check开启, 但是regex无值, 则使用内置判断
      // 默认关闭check
      // check只是作为内部正误标示, 对外提交不起作用
      // 如果点击能知道各个input的状态, 需要在dom中search'ng-invalid'类名
      // 这样的话, 验证位置就会统一.
      check: [Boolean]
    },
    watch: {
      value (val) {
        this.inputValue = val
      }
    },
    computed: {
      modeClass () {
        return `input input-${this.mode}`
      },
      textInputClass () {
        return `text-input text-input-${this.mode}`
      }

    },
    methods: {

      // -------- public --------
      /**
       * @function update
       * @description
       * 更新textarea组件
       * */
      update () {
        this.typeValue === 'textarea' && Autosize.update(this.textareaElement)
      },
      /**
       * @function destroy
       * @description
       * 销毁textarea组件
       * */
      destroy () {
        this.typeValue === 'textarea' && Autosize.destroy(this.textareaElement)
      },

      // -------- private --------
      /**
       * 执行验证, 如果错误则设置ng-invalid, 正确则设置ng-valid
       * @private
       * */
      verification () {
        if (!this.checkValue) return

        let result = this.getVerifyResult(this.inputValue, this.typeValue)
        if (result === null) return
        if (result) {
          this.itemComponent && setElementClass(this.itemComponent.$el, 'ng-valid', true)
          this.itemComponent && setElementClass(this.itemComponent.$el, 'ng-invalid', false)
        } else {
          this.itemComponent && setElementClass(this.itemComponent.$el, 'ng-valid', false)
          this.itemComponent && setElementClass(this.itemComponent.$el, 'ng-invalid', true)
        }
      },

      /**
       * 获取验证结果
       * @param {*} value - 待验证的值
       * @param {String} type - 待验证的值的类型
       * @private
       * */
      getVerifyResult (value, type = 'text') {

        if (!value) {
          console.debug('当前没有值, 验证跳过, 返回true!')
          return null
        }

        let _regex = this.regex
        if (!_regex) {
          _regex = REGEXP[type]
        }

        // 如果没有正则信息则返回true, 表示不验证
        if (!isPresent(_regex)) {
          console.debug('未找到匹配type:' + type + '的regex, 验证跳过, 返回true!')
          return null
        }

        // 如果是函数则执行判断
        if (isFunction(_regex)) {
          return _regex(value)
        }

        // 判断是不是正则
        let _tmpType = Object.prototype.toString.call(_regex).match(/^(\[object )(\w+)\]$/i)[2].toLowerCase()
        if (_tmpType !== 'regexp') {
          console.debug('regex:' + _regex + '不是正则, 是:' + _tmpType + '类型, 验证跳过, 返回true!')
          return null
        }
        return _regex.test(value)
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
      inputBlurred ($event) {
        // debug: clearInput会在onBlur之后,造成blur后点击clearInput失效, 故需要延迟blur
        window.setTimeout(() => {
          if (this.shouldBlur) {
            // 向父组件Item添加标记
            this.setItemHasFocusClass(false)

            /**
             * @event  component:Input#onBlur
             * @description blur事件
             * @property {object} $event - 事件对象
             */
            this.$emit('onBlur', $event)
            // 如果是clearOnEdit模式， blur时还有值的情况下，定一个flag
            if (this.clearOnEditValue && this.hasValue()) {
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
      inputFocused ($event) {
        // 向父组件Item添加标记
        this.setItemHasFocusClass(true)
        this.setFocus()
        /**
         * @event  component:Input#onFocus
         * @description focus事件
         * @property {object} $event - 事件对象
         */
        this.$emit('onFocus', $event)
        this.itemComponent && setElementClass(this.itemComponent.$el, 'ng-touched', true)
      },

      /**
       * 监听input事件, 更新input的value(inputValue)
       * @private
       */
      inputChanged ($event) {
        this.inputValue = $event && $event.target ? $event.target.value : ''
        this.setItemHasValueClass()

        // debounce
        window.clearTimeout(this.timer)
        this.timer = window.setTimeout(() => {
          // 组件对外事件
          /**
           * @event  component:Input#onInput
           * @description input事件
           * @property {object} $event - 事件对象
           */
          this.$emit('onInput', $event)
          // 通知父组件的v-model
          this.$emit('input', this.inputValue)
        }, this.debounce)
      },

      /**
       * 键盘按下事件
       * @private
       * */
      onKeydown () {
        if (this.clearOnEditValue) {
          this.checkClearOnEdit()
        }
      },

      /**
       * @private
       * */
      checkClearOnEdit () {
        if (!this.clearOnEditValue) {
          return
        }

        // clearOnEdit模式激活,并且input有值
        if (this.didBlurAfterEdit && this.hasValue()) {
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
      },

      /**
       *  设置父组件Item有值时的class
       *  @private
       */
      setItemHasValueClass () {
        if (this.itemComponent) {
          setElementClass(this.itemComponent.$el, 'input-has-value', this.hasValue())
        }
      },

      /**
       * 判断input是否有value
       * @private
       * */
      hasValue () {
        const inputValue = this.inputValue
        return (inputValue !== null && inputValue !== undefined && inputValue !== '')
      }
    },
    created () {
      // 当在textarea组件下，强制设置type=textarea
      if (this.$options._componentTag.toLowerCase() === 'textarea') {
        this.typeValue = 'textarea'
      }

      // 默认情况下, 如果password有值, 则点击执行清空
      if (this.type === 'password') {
        this.clearOnEditValue = true
      }
    },
    mounted () {
      // 当在textarea组件下，强制设置type=textarea
      if (this.typeValue === 'textarea') {
        this.inputElement = this.$refs['textarea']
        Autosize(this.inputElement)
      } else {
        this.inputElement = this.$refs['input']
      }

      console.assert(this.inputElement, 'inputElement has undefined!')

      // 找到外部item实例
      if (this.$parent.$options._componentTag.toLowerCase() === 'item') {
        this.itemComponent = this.$parent
        setElementClass(this.itemComponent.$el, 'item-textarea', (this.typeValue === 'textarea'))
        setElementClass(this.itemComponent.$el, 'item-input', true)
      }

      // 初始化时,判断是否有value
      this.setItemHasValueClass()
    },
    components: {
      Button
    }
  }
</script>

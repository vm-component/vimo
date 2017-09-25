<template>
    <div class="ion-textarea" :class="[modeClass]">
        <div class="input-innerWrap" @click="setFocus($event)">
            <textarea :class="[textInputClass]"
                      class="text-input"
                      :value="inputValue"
                      :placeholder="placeholder"
                      :disabled="disabled"
                      :readonly="readonly"
                      :required="required"
                      :autofocus="autofocus"
                      :maxlength="max"
                      :rows="rows"
                      ref="textarea"
                      @keyup="inputKeyUp($event)"
                      @blur="inputBlurred($event)"
                      @focus="inputFocused($event)"
                      @input="inputChanged($event)"
                      @keydown="inputKeyDown($event)"></textarea>
            <div class="input-count" v-if="count > 0"><span>{{inputValue.length}}</span>/{{count}}</div>
        </div>
    </div>
</template>
<style lang="less">
    @import "textarea";
    @import "textarea.ios.less";
    @import "textarea.md.less";
</style>
<script type="text/javascript">
  /**
   * @component Textarea
   * @description
   *
   * ## 表单组件 Textarea输入框
   *
   * ### 如何引入
   * ```
   * // 引入
   * import Textarea from 'vimo/lib/textarea'
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
  import { hasFocus, setElementClass, isPresent, isNumber } from '../util/util'
  import Autosize from 'autosize'

  export default {
    name: 'Textarea',
    data () {
      return {
        max: this.maxlength,
        isValid: false, // 验证结果
        inputValue: this.value || '', // 内部value值
        itemComponent: null // 外部item组件实例 -> 修改class
      }
    },
    props: {
      /**
       * focus时, 下划线是否高亮
       * */
      showFocusHighlight: Boolean,

      /**
       * 如果为true, 用户无法输入
       * */
      disabled: Boolean,

      /**
       * 设置最大值, 只对textarea有效
       * */
      maxlength: Number,

      /**
       * 设置行数, 只对textarea有效
       * */
      rows: {
        type: Number,
        default: 3
      },

      /**
       * 自动focus
       * */
      autofocus: Boolean,

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
       * 自动高度
       * */
      autosize: Boolean,

      /**
       * 必填
       * */
      required: Boolean,

      /**
       * 计数模式
       * */
      count: Number,

      /**
       * 内容输入值
       * */
      value: [String, Number, Object, Function]
    },
    watch: {
      value (val) {
        this.inputValue = val
      }
    },
    computed: {
      modeClass () {
        return `input-${this.mode}`
      },
      textInputClass () {
        return `text-input-${this.mode}`
      },
      textareaElement () {
        return this.$refs.textarea
      },
      hasValue () {
        const inputValue = this.inputValue
        return (inputValue !== null && inputValue !== undefined && inputValue !== '')
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
        Autosize && Autosize.update(this.textareaElement)
      },
      /**
       * @function destroy
       * @description
       * 销毁textarea组件
       * */
      destroy () {
        Autosize && Autosize.destroy(this.textareaElement)
      },

      // -------- private --------
      /**
       * 对外传递onKeyup事件
       * @private
       * */
      inputKeyUp ($event) {
        /**
         * @event  component:Textarea#onKeyup
         * @description onKeyup
         * @property {object} $event - 事件对象
         */
        this.$emit('onKeyup', $event)
      },

      /**
       * 键盘按下事件
       * @private
       * */
      inputKeyDown ($event) {
        /**
         * @event  component:Textarea#onKeydown
         * @description onKeydown
         * @property {object} $event - 事件对象
         */
        this.$emit('onKeydown', $event)
      },

      /**
       * 设置当前组件为focus状态
       * */
      setFocus () {
        if (!hasFocus(this.textareaElement)) {
          this.textareaElement.focus()
        }
      },

      /**
       * 监听并发送blur事件
       * @private
       */
      inputBlurred () {
        // 向父组件Item添加标记
        this.setItemHasFocusClass(false)

        /**
         * @event  component:Textarea#onBlur
         * @description blur事件
         */
        this.$emit('onBlur')

        // 验证输入结果
        this.verification()
      },

      /**
       * 必填验证
       *
       * */
      verification () {
        if (!this.required) return

        this.isValid = this.hasValue
        if (this.isValid) {
          /**
           * @event  component:Textarea#onValid
           * @description 验证通过
           * @property {*} value - 当前检查的value
           */
          this.$emit('onValid', this.inputValue)
          this.itemComponent && setElementClass(this.itemComponent.$el, 'ng-valid', true)
          this.itemComponent && setElementClass(this.itemComponent.$el, 'ng-invalid', false)
        } else {
          /**
           * @event  component:Textarea#onInvalid
           * @description 验证失败
           * @property {*} value - 当前检查的value
           */
          this.$emit('onInvalid', this.inputValue)
          this.itemComponent && setElementClass(this.itemComponent.$el, 'ng-valid', false)
          this.itemComponent && setElementClass(this.itemComponent.$el, 'ng-invalid', true)
        }
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
         * @event  component:Textarea#onFocus
         * @description focus事件
         */
        this.$emit('onFocus')
        this.itemComponent && setElementClass(this.itemComponent.$el, 'ng-touched', true)
      },

      /**
       * 监听input事件, 更新input的value(inputValue)
       * @private
       */
      inputChanged ($event) {
        this.inputValue = $event && $event.target ? $event.target.value : ''
        this.setItemHasValueClass()

        /**
         * @event  component:Textarea#onInput
         * @description input事件
         * @property {*} value - 输入值
         */
        this.$emit('input', this.inputValue)
        this.$emit('onInput', this.inputValue)
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
      if (isPresent(this.count) && isNumber(this.count)) {
        this.max = this.count
      }
    },
    mounted () {
      if (this.autosize) {
        Autosize(this.textareaElement)
      }

      // 找到外部item实例
      if (this.$parent.$options._componentTag.toLowerCase() === 'item') {
        this.itemComponent = this.$parent
        setElementClass(this.itemComponent.$el, 'item-textarea', true)
        setElementClass(this.itemComponent.$el, 'item-input', true)
        setElementClass(this.itemComponent.$el, 'show-focus-highlight', this.showFocusHighlight)
        setElementClass(this.itemComponent.$el, 'show-valid-highlight', this.required)
        setElementClass(this.itemComponent.$el, 'show-invalid-highlight', this.required)
      }

      // 初始化时,判断是否有value
      this.setItemHasValueClass()
    }
  }
</script>

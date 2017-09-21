<template>
    <div class="ion-input" :class="[modeClass]">
        <div class="input-innerWrap" @click="clickToFocus($event)">
            <textarea :class="[textInputClass]"
                      :value="inputValue"
                      :placeholder="placeholder"
                      :disabled="disabled"
                      :readonly="readonly"
                      :autofocus="autofocus"
                      :maxlength="maxlength"
                      :rows="rows"
                      ref="textarea"
                      @keyup="inputKeyUp($event)"
                      @blur="inputBlurred($event)"
                      @focus="inputFocused($event)"
                      @input="inputChanged($event)"
                      @keydown="inputKeyDown($event)"></textarea>
        </div>
    </div>
</template>
<style lang="less">
    @import "input";
    @import "input.ios.less";
    @import "input.md.less";
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
   * import { Textarea } from 'vimo/lib/input'
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
   * @props {*} [value]                         - 内容输入值
   *
   * @fires component:Textarea#blur
   * @fires component:Textarea#focus
   * @fires component:Textarea#input
   * @fires component:Textarea#keyup
   * @fires component:Textarea#keydown
   *
   * @demo #/textarea
   * @usage
   * <Textarea placeholder="Text Textarea">
   * <Textarea @blur="blur($event)" @focus="focus($event)" @input="input($event)" placeholder="Enter a description"></Textarea>
   *
   * */
  import { hasFocus, setElementClass } from '../util/util'
  import Autosize from 'autosize'

  export default {
    name: 'Textarea',
    data () {
      return {
        inputValue: this.value, // 内部value值
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
        return `text-input text-input-${this.mode}`
      },
      textareaElement () {
        return this.$refs.textarea
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
       * 对外传递keyup事件
       * @private
       * */
      inputKeyUp ($event) {
        /**
         * @event  component:Textarea#keyup
         * @description keyup
         * @property {object} $event - 事件对象
         */
        this.$emit('keyup', $event)
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
        if (!hasFocus(this.textareaElement)) {
          this.textareaElement.focus()
        }
      },

      /**
       * 监听并发送blur事件
       * @private
       */
      inputBlurred ($event) {
        // 向父组件Item添加标记
        this.setItemHasFocusClass(false)

        /**
         * @event  component:Textarea#blur
         * @description blur事件
         * @property {object} $event - 事件对象
         */
        this.$emit('blur', $event)
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
         * @event  component:Textarea#focus
         * @description focus事件
         * @property {object} $event - 事件对象
         */
        this.$emit('focus', $event)
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
         * @event  component:Textarea#input
         * @description input事件
         * @property {*} value -
         */
        this.$emit('input', this.inputValue)
      },

      /**
       * 键盘按下事件
       * @private
       * */
      inputKeyDown ($event) {
        /**
         * @event  component:Textarea#keydown
         * @description keydown
         * @property {object} $event - 事件对象
         */
        this.$emit('keydown', $event)
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
      }

      // 初始化时,判断是否有value
      this.setItemHasValueClass()
    }
  }
</script>

/**
 * Created by Hsiang on 2017/2/23.
 */
import { hasFocus } from '../../util/dom'
export default{
  data(){
    return {
      inputValue: '', // 内部value值
      typeValue: this.type, // 内部value值

      _item: null, // 外部item组件实例 -> 修改class
      _page: null, // 外部page组件实例 -> 调取scroll特性
      _input: null, // 当前输入的主体, input/textarea

      debounce: 0, // 缓冲

      _autoFocusAssist: null,
      _autoComplete: null,
      _autoCorrect: null,
      _keyboardHeight: null,
      _useAssist: null,
      _usePadding: null,

      _clearOnEdit: this.clearOnEdit,

    }
  },
  props: {
    /**
     * 如果为true, 当输入值的时候一个清除按钮会在input右边出现, 点击按钮则清除输入
     * textarea没有这个特性
     * */
    clearInput: {
      type: Boolean,
      default: () => {
        return false
      },
    },

    /**
     * 如果为true, 当再次输入的时候会清空上次的输入, 如果type为password时默认为true, 其余情况默认为false
     * 默认值的变更, 需要js控制
     * */
    clearOnEdit: {
      type: Boolean,
      default: false,
    },

    /**
     * 如果为true, 用户无法输入
     * */
    disabled: {
      type: Boolean,
      default: false,
    },

    /**
     * 设置最大值, 只对type=number有效
     * */
    max: {
      type: Number,
    },

    /**
     * 设置最小值, 只对type=number有效
     * */
    min: {
      type: Number
    },

    /**
     * 设置数字变化的阶梯值, 只对type=number有效
     * */
    step: {
      type: Number,
      default: 1,
    },

    /**
     * 当前平台
     * */
    mode: {
      type: String,
      default: VM.config.get('mode') || 'ios',
    },

    /**
     * 当前平台
     * */
    placeholder: {
      type: String,
      default: '',
    },

    /**
     * 只读模式, 不能修改
     * */
    readonly: {
      type: Boolean,
      default: false,
    },

    /**
     * 输入的类型: "text", "password", "email", "number", "search", "tel", or "url"
     * */
    type: {
      type: String,
      default: 'text',
    },

    /**
     * 内容输入值
     * */
    value: {
      type: String,
      default: '',
    }

  },
  watch: {},
  computed: {

    modeClass () {
      return `input input-${this.mode}`
    },
    textInputClass(){
      return `text-input text-input-${this.mode}`
    },

  },
  methods: {

    /**
     * 设置当前组件为focus状态
     * */
    setFocus(){
      if (!hasFocus(this._input)) {

        if (this._clearOnEdit) {
          this.inputValue = '';
        }

        this._input.focus()
      }
    },

    /**
     * 当该组件被点击的时候, 触发
     */
    clickToFocus($event){
      this.setFocus();
    },

    /**
     * @private
     * 监听并发送blur事件
     */
    inputBlurred($event){
      // 向父组件Item添加标记
      this._setItemHasFocusClass();

      this.$emit('blur', $event)
    },

    /**
     * @private
     * 监听并发送focus事件
     */
    inputFocused($event){
      // 向父组件Item添加标记
      this._setItemHasFocusClass();

      this.$emit('focus', $event)
    },


    /**
     * @private
     * 监听input事件, 更新input的value(inputValue)
     */
    inputChanged($event){
      const _this = this;
      _this.inputValue = !!$event.target ? $event.target.value : '';

      _this._setItemHasValueClass();

      // this.onChange(this.inputValue);
      _this.$emit('ionInput', $event);

      // 通知父组件的v-model
      _this.$emit('input', _this.inputValue);
    },

    /**
     * 判断input是否有value
     * */
    hasValue() {
      const inputValue = this.inputValue;
      return (inputValue !== null && inputValue !== undefined && inputValue !== '');
    },

    /**
     * 点击清除输入项
     * */
    clearTextInput(){
      this.inputValue = '';
      this._setItemHasValueClass();
    },



    /**
     *  设置父组件Item被点中时的class
     */
    _setItemHasFocusClass(){
      if (this._item) {
        this._item.inputHasFocus = hasFocus(this._input);
      }
    },

    /**
     *  设置父组件Item有值时的class
     */
    _setItemHasValueClass(){
      if (this._item) {
        this._item.inputHasValue = this.hasValue();
      }
    },


  },
  created () {},
  mounted () {

    // 当在textarea组件下，强制设置type=textarea
    if (this.$options._componentTag.toLowerCase() === 'textarea') {
      this.typeValue = 'textarea'
    }

    // 特性记录
    this._autoFocusAssist = this.$config.get('autoFocusAssist', 'delay');
    this._autoComplete = this.$config.get('autocomplete', 'off');
    this._autoCorrect = this.$config.get('autocorrect', 'off');
    this._keyboardHeight = this.$config.getNumber('keyboardHeight');
    this._useAssist = this.$config.getBoolean('scrollAssist', false);
    this._usePadding = this.$config.getBoolean('scrollPadding', this._useAssist);

    // 找到外部item实例
    if (this.$parent.$options._componentTag.toLowerCase() === 'item') {
      this._item = this.$parent;
    }

    // 找到外部页面实例
    if (this.$vnode.context) {
      this._page = this.$vnode.context
    }

    // 获取输入主体
    if (this.$options._componentTag.toLowerCase() === 'input') {
      this._input = this.$refs.input
    } else if (this.$options._componentTag.toLowerCase() === 'textarea') {
      this._input = this.$refs.textarea
    }

    if (this._item) {
      if (this.type === 'textarea') {
        this._item.isTextarea = true;
      }
      this._item.isInput = true;
    }
    // 默认情况下, 如果password有值, 则点击执行清空
    if (this.type === 'password') {
      this._clearOnEdit = true;
    }

    // scroll事件绑定, 用于处理input的focus和blur时, 文档的滚动
    // only listen to content scroll events if there is content
    // if (_content) {
    //   this._scrollStart = _content.ionScrollStart.subscribe((ev: ScrollEvent) => {
    //     this.scrollHideFocus(ev, true);
    //   });
    //   this._scrollEnd = _content.ionScrollEnd.subscribe((ev: ScrollEvent) => {
    //     this.scrollHideFocus(ev, false);
    //   });
    // }

  },
}

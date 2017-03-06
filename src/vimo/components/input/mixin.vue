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
        v-show="typeValue!=='textarea'">

      <textarea
        :class="[textInputClass]"
        :value="inputValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        ref="textarea"
        @blur="inputBlurred($event)"
        @focus="inputFocused($event)"
        @input="inputChanged($event)"
        @keydown="onKeydown($event)"
        v-show="typeValue ==='textarea'"></textarea>
    </div>

    <!--<input [type]="type" aria-hidden="true" next-input *ngIf="_useAssist">-->

    <Button
      v-if="clearInput && typeValue!=='textarea' && hasValue()"
      type="clear"
      class="text-input-clear-icon"
      @click="clearTextInput()"
      @mousedown="clearTextInput()"></Button>

    <!--<div (touchstart)="pointerStart($event)" (touchend)="pointerEnd($event)" (mousedown)="pointerStart($event)"-->
    <!--(mouseup)="pointerEnd($event)" class="input-cover" tappable *ngIf="_useAssist"></div>-->

  </div>
</template>
<style lang="scss">
  @import "./input.scss";
  @import "./input.ios.scss";
  @import "./input.md.scss";
  @import "./input.wp.scss";
</style>
<script type="text/ecmascript-6">
  /**
   * @name Input/Textarea
   * @description
   *
   * Input组件只能对以下类型的type作出相应 : `text`,`password`, `email`, `number`, `search`, `tel`, and `url`.
   * 但是不适用一下类型: `checkbox`, `radio`, `toggle`, `range`, `select`, etc.
   * 当然, input直接使用也没问题
   *
   * 此外, Textarea组件和Input组件公用此文件
   *
   * */
  import { hasFocus, setElementClass } from '../../util/dom'
  export default{
    data(){
      return {
        inputValue: this.value, // 内部value值
        typeValue: this.type, // 内部value值

        _item: null, // 外部item组件实例 -> 修改class
        _page: null, // 外部page组件实例 -> 调取scroll特性
        _input: null, // 当前输入的主体, input/textarea

        _timer: null,

        _clearOnEdit: this.clearOnEdit, // 内部维护的clearOnEdit副本, 因为会修改的
        _didBlurAfterEdit: false, // clearOnEdit状态唤起的标志

      }
    },
    props: {
      /**
       * 如果为true, 当输入值的时候一个清除按钮会在input右边出现, 点击按钮则清除输入
       * textarea没有这个特性
       * */
      clearInput: {
        type: Boolean,
        default: false,
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
      },

      debounce:{
        type: Number,
        default: 0,
      }

    },
    watch: {
      inputValue(){

      }
    },
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
       * 当该组件被点击的时候触发, 扩大focus触发范围
       */
      clickToFocus(){
        this.setFocus();
      },

      /**
       * 设置当前组件为focus状态
       * */
      setFocus(){
        if (!hasFocus(this._input)) {
          this._input.focus()
        }
      },

      /**
       * @private
       * 监听并发送blur事件
       */
      inputBlurred($event){
        const _this = this;
        // debug: clearInput会在onBlur之后,造成blur后点击clearInput失效, 故需要延迟blur
        setTimeout(function () {
          // 向父组件Item添加标记
          _this.setItemHasFocusClass(false);
          _this.$emit('onBlur', $event);
          // 如果是clearOnEdit模式， blur时还有值的情况下，定一个flag
          if (_this._clearOnEdit && _this.hasValue()) {
            _this._didBlurAfterEdit = true;
          }
        }, 16 * 2)
      },

      /**
       * @private
       * 监听并发送focus事件
       */
      inputFocused($event){
        // 向父组件Item添加标记
        this.setItemHasFocusClass(true);

        this.setFocus();

        this.$emit('onFocus', $event)
      },

      /**
       * @private
       * 监听input事件, 更新input的value(inputValue)
       */
      inputChanged($event){
        const _this = this;
        _this.inputValue = !!$event && !!$event.target ? $event.target.value : '';
        _this.setItemHasValueClass();

        // debounce
        clearTimeout(_this._timer);
        _this._timer = setTimeout(function () {
          // 组件对外事件
          _this.$emit('onInput', $event);
          // 通知父组件的v-model
          _this.$emit('input', _this.inputValue);
        },_this.debounce)
      },

      /**
       * 键盘按下事件
       * */
      onKeydown(){
        if (this._clearOnEdit) {
          this.checkClearOnEdit();
        }
      },

      checkClearOnEdit(){
        if (!this._clearOnEdit) {
          return;
        }

        // clearOnEdit模式激活,并且input有值
        if (this._didBlurAfterEdit && this.hasValue()) {
          this.clearTextInput();
        }

        // 重置标记
        this._didBlurAfterEdit = false;
      },

      /**
       * 点击清除输入项
       * */
      clearTextInput(){
        this.inputValue = '';
        this.inputChanged();
      },

      /**
       *  设置父组件Item被点中时的class
       */
      setItemHasFocusClass(isFocus){
        const _this = this;
        if (_this._item) {
          setElementClass(_this._item.$el, 'input-has-focus', isFocus)
          _this.$nextTick(function () {

          })
        }
      },

      /**
       *  设置父组件Item有值时的class
       */
      setItemHasValueClass(){
        if (this._item) {
          setElementClass(this._item.$el, 'input-has-value', this.hasValue())
        }
      },

      /**
       * 判断input是否有value
       * */
      hasValue() {
        const inputValue = this.inputValue;
        return (inputValue !== null && inputValue !== undefined && inputValue !== '');
      },

      // -----------滚动的辅助程序, 用于配合键盘滚动 -----------
      /**
       * 设置点击相关处理
       * 正常情况下, 点击input会自动弹出keyboard,并且input会滚动到合适的位置
       * 但是存在特殊原因无法滚动, 这里需要处理下
       *
       * 如果开启了scrollAssist模式, 将在Input组件外部覆盖一层处理点击的代理层, 并监听点击事件
       * */
      // TODO: 这部分待续

    },
    created () {},
    mounted () {

      // 当在textarea组件下，强制设置type=textarea
      if (this.$options._componentTag.toLowerCase() === 'textarea') {
        this.typeValue = 'textarea';
        this._input = this.$refs['textarea']
      } else {
        this._input = this.$refs['input']
      }

      // 找到外部item实例
      if (this.$parent.$options._componentTag.toLowerCase() === 'item') {
        this._item = this.$parent;
        setElementClass(this._item.$el, 'item-textarea', (this.typeValue === 'textarea'))
        setElementClass(this._item.$el, 'item-input', true)
      }

      // 默认情况下, 如果password有值, 则点击执行清空
      if (this.type === 'password') {
        this._clearOnEdit = true;
      }

      // 找到外部页面实例
      if (this.$vnode.context) {
        this._page = this.$vnode.context
      }

      // 初始化时,判断是否有value
      this.setItemHasValueClass();

    },
  }
</script>

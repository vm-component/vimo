<template>
  <div class="ion-input" :class="[modeClass]">

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
        v-if="type!=='textarea'">

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
        v-if="type==='textarea'"></textarea>

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

        _clearOnEdit: this.clearOnEdit, // 内部维护的clearOnEdit副本, 因为会修改的
        _didBlurAfterEdit: false, // clearOnEdit状态唤起的标志

        _isTouch:false,
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
        // 向父组件Item添加标记
        this.setItemHasFocusClass(false);
        this.$emit('onBlur', $event);
        // 如果是clearOnEdit模式， blur时还有值的情况下，定一个flag
        if (this._clearOnEdit && this.hasValue()) {
          this._didBlurAfterEdit = true;
        }
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
        _this.inputValue = !!$event.target ? $event.target.value : '';
        _this.setItemHasValueClass();

        // 组件对外事件
        _this.$emit('ionInput', $event);
        // 通知父组件的v-model
        _this.$emit('input', _this.inputValue);
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
        this.setItemHasValueClass();
      },

      /**
       *  设置父组件Item被点中时的class
       */
      setItemHasFocusClass(isFocus){
        if (this._item) {
          this._item.inputHasFocus = isFocus;
        }
      },

      /**
       *  设置父组件Item有值时的class
       */
      setItemHasValueClass(){
        if (this._item) {
          this._item.inputHasValue = this.hasValue();
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
      // TODO: 这部分待续
      /**
       * 设置点击相关处理
       * 正常情况下, 点击input会自动弹出keyboard,并且input会滚动到合适的位置
       * 但是存在特殊原因无法滚动, 这里需要处理下
       *
       * 如果开启了scrollAssist模式, 将在Input组件外部覆盖一层处理点击的代理层, 并监听点击事件
       * */
      initInput(){
        //
        // // begin the process of setting focus to the inner input element
        // const app = this._app;
        // const content = this._content;
        // const nav = this._nav;
        // const nativeInput = this._native;
        //
        // console.debug(`input-base, initFocus(), scrollView: ${!!content}`);
        //
        // if (content) {
        //   // this input is inside of a scroll view
        //   // find out if text input should be manually scrolled into view
        //
        //   // get container of this input, probably an ion-item a few nodes up
        //   var ele: HTMLElement = this._elementRef.nativeElement;
        //   ele = <HTMLElement>ele.closest('ion-item,[ion-item]') || ele;
        //
        //   var scrollData = getScrollData(ele.offsetTop, ele.offsetHeight, content.getContentDimensions(), this._keyboardHeight, this._plt.height());
        //   if (Math.abs(scrollData.scrollAmount) < 4) {
        //     // the text input is in a safe position that doesn't
        //     // require it to be scrolled into view, just set focus now
        //     this.setFocus();
        //
        //     // all good, allow clicks again
        //     app.setEnabled(true);
        //     nav && nav.setTransitioning(false);
        //
        //     if (this._usePadding) {
        //       content.clearScrollPaddingFocusOut();
        //     }
        //     return;
        //   }
        //
        //   if (this._usePadding) {
        //     // add padding to the bottom of the scroll view (if needed)
        //     content.addScrollPadding(scrollData.scrollPadding);
        //   }
        //
        //   // manually scroll the text input to the top
        //   // do not allow any clicks while it's scrolling
        //   var scrollDuration = getScrollAssistDuration(scrollData.scrollAmount);
        //   app.setEnabled(false, scrollDuration);
        //   nav && nav.setTransitioning(true);
        //
        //   // temporarily move the focus to the focus holder so the browser
        //   // doesn't freak out while it's trying to get the input in place
        //   // at this point the native text input still does not have focus
        //   nativeInput.beginFocus(true, scrollData.inputSafeY);
        //
        //   // scroll the input into place
        //   content.scrollTo(0, scrollData.scrollTo, scrollDuration, () => {
        //     console.debug(`input-base, scrollTo completed, scrollTo: ${scrollData.scrollTo}, scrollDuration: ${scrollDuration}`);
        //     // the scroll view is in the correct position now
        //     // give the native text input focus
        //     nativeInput.beginFocus(false, 0);
        //
        //     // ensure this is the focused input
        //     this.setFocus();
        //
        //     // all good, allow clicks again
        //     app.setEnabled(true);
        //     nav && nav.setTransitioning(false);
        //
        //     if (this._usePadding) {
        //       content.clearScrollPaddingFocusOut();
        //     }
        //   });
        //
        // } else {
        //   // not inside of a scroll view, just focus it
        //   this.setFocus();
        // }
      },

      /**
       * 获取点击开始的坐标
       * @param {UIEvent} ev
       * */
      pointerStart(ev) {
        // // input cover touchstart
        // if (ev.type === 'touchstart') {
        //   this._isTouch = true;
        // }
        //
        // if ((this._isTouch || (!this._isTouch && ev.type === 'mousedown')) && this._app.isEnabled()) {
        //   // remember where the touchstart/mousedown started
        //   this._coord = pointerCoord(ev);
        // }
        //
        // console.debug(`input-base, pointerStart, type: ${ev.type}`);
      },

      /**
       * 获取点击结束的坐标, 并触发input的初始化
       * @param {UIEvent} ev
       * */
      pointerEnd(ev) {
        // // input cover touchend/mouseup
        // console.debug(`input-base, pointerEnd, type: ${ev.type}`);
        //
        // if ((this._isTouch && ev.type === 'mouseup') || !this._app.isEnabled()) {
        //   // the app is actively doing something right now
        //   // don't try to scroll in the input
        //   ev.preventDefault();
        //   ev.stopPropagation();
        //
        // } else if (this._coord) {
        //   // get where the touchend/mouseup ended
        //   let endCoord = pointerCoord(ev);
        //
        //   // focus this input if the pointer hasn't moved XX pixels
        //   // and the input doesn't already have focus
        //   if (!hasPointerMoved(8, this._coord, endCoord) && !this.hasFocus()) {
        //     ev.preventDefault();
        //     ev.stopPropagation();
        //
        //     // begin the input focus process
        //     this.initFocus();
        //   }
        // }
        //
        // this._coord = null;
      },

      /**
       * 根据点击起止
       * @param {number} inputOffsetTop
       * @param {number} inputOffsetHeight
       * @param {ContentDimensions} scrollViewDimensions
       * @param {number} keyboardHeight
       * @param {number} plaformHeight
       * */
      getScrollData(inputOffsetTop, inputOffsetHeight, scrollViewDimensions, keyboardHeight, plaformHeight) {
        // // compute input's Y values relative to the body
        // let inputTop = (inputOffsetTop + scrollViewDimensions.contentTop - scrollViewDimensions.scrollTop);
        // let inputBottom = (inputTop + inputOffsetHeight);
        //
        // // compute the safe area which is the viewable content area when the soft keyboard is up
        // let safeAreaTop = scrollViewDimensions.contentTop;
        // let safeAreaHeight = (plaformHeight - keyboardHeight - safeAreaTop) / 2;
        // let safeAreaBottom = safeAreaTop + safeAreaHeight;
        //
        // // figure out if each edge of teh input is within the safe area
        // let inputTopWithinSafeArea = (inputTop >= safeAreaTop && inputTop <= safeAreaBottom);
        // let inputTopAboveSafeArea = (inputTop < safeAreaTop);
        // let inputTopBelowSafeArea = (inputTop > safeAreaBottom);
        // let inputBottomWithinSafeArea = (inputBottom >= safeAreaTop && inputBottom <= safeAreaBottom);
        // let inputBottomBelowSafeArea = (inputBottom > safeAreaBottom);
        //
        // /*
        //  Text Input Scroll To Scenarios
        //  ---------------------------------------
        //  1) Input top within safe area, bottom within safe area
        //  2) Input top within safe area, bottom below safe area, room to scroll
        //  3) Input top above safe area, bottom within safe area, room to scroll
        //  4) Input top below safe area, no room to scroll, input smaller than safe area
        //  5) Input top within safe area, bottom below safe area, no room to scroll, input smaller than safe area
        //  6) Input top within safe area, bottom below safe area, no room to scroll, input larger than safe area
        //  7) Input top below safe area, no room to scroll, input larger than safe area
        //  */
        //
        // const scrollData: ScrollData = {
        //   scrollAmount: 0,
        //   scrollTo: 0,
        //   scrollPadding: 0,
        //   inputSafeY: 0
        // };
        //
        // if (inputTopWithinSafeArea && inputBottomWithinSafeArea) {
        //   // Input top within safe area, bottom within safe area
        //   // no need to scroll to a position, it's good as-is
        //   return scrollData;
        // }
        //
        // // looks like we'll have to do some auto-scrolling
        // if (inputTopBelowSafeArea || inputBottomBelowSafeArea || inputTopAboveSafeArea) {
        //   // Input top or bottom below safe area
        //   // auto scroll the input up so at least the top of it shows
        //
        //   if (safeAreaHeight > inputOffsetHeight) {
        //     // safe area height is taller than the input height, so we
        //     // can bring up the input just enough to show the input bottom
        //     scrollData.scrollAmount = Math.round(safeAreaBottom - inputBottom);
        //
        //   } else {
        //     // safe area height is smaller than the input height, so we can
        //     // only scroll it up so the input top is at the top of the safe area
        //     // however the input bottom will be below the safe area
        //     scrollData.scrollAmount = Math.round(safeAreaTop - inputTop);
        //   }
        //
        //   scrollData.inputSafeY = -(inputTop - safeAreaTop) + 4;
        //
        //   if (inputTopAboveSafeArea && scrollData.scrollAmount > inputOffsetHeight) {
        //     // the input top is above the safe area and we're already scrolling it into place
        //     // don't let it scroll more than the height of the input
        //     scrollData.scrollAmount = inputOffsetHeight;
        //   }
        // }
        //
        // // figure out where it should scroll to for the best position to the input
        // scrollData.scrollTo = (scrollViewDimensions.scrollTop - scrollData.scrollAmount);
        //
        // // when auto-scrolling, there also needs to be enough
        // // content padding at the bottom of the scroll view
        // // always add scroll padding when a text input has focus
        // // this allows for the content to scroll above of the keyboard
        // // content behind the keyboard would be blank
        // // some cases may not need it, but when jumping around it's best
        // // to have the padding already rendered so there's no jank
        // scrollData.scrollPadding = keyboardHeight;
        //
        // // var safeAreaEle: HTMLElement = (<any>window).safeAreaEle;
        // // if (!safeAreaEle) {
        // //   safeAreaEle = (<any>window).safeAreaEle  = document.createElement('div');
        // //   safeAreaEle.style.cssText = 'position:absolute; padding:1px 5px; left:0; right:0; font-weight:bold; font-size:10px; font-family:Courier; text-align:right; background:rgba(0, 128, 0, 0.8); text-shadow:1px 1px white; pointer-events:none;';
        // //   document.body.appendChild(safeAreaEle);
        // // }
        // // safeAreaEle.style.top = safeAreaTop + 'px';
        // // safeAreaEle.style.height = safeAreaHeight + 'px';
        // // safeAreaEle.innerHTML = `
        // //   <div>scrollTo: ${scrollData.scrollTo}</div>
        // //   <div>scrollAmount: ${scrollData.scrollAmount}</div>
        // //   <div>scrollPadding: ${scrollData.scrollPadding}</div>
        // //   <div>inputSafeY: ${scrollData.inputSafeY}</div>
        // //   <div>scrollHeight: ${scrollViewDimensions.scrollHeight}</div>
        // //   <div>scrollTop: ${scrollViewDimensions.scrollTop}</div>
        // //   <div>contentHeight: ${scrollViewDimensions.contentHeight}</div>
        // //   <div>plaformHeight: ${plaformHeight}</div>
        // // `;
        //
        // return scrollData;
      },

    },
    created () {},
    mounted () {

      // 当在textarea组件下，强制设置type=textarea
      if (this.$options._componentTag.toLowerCase() === 'textarea') {
        this.typeValue = 'textarea'
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

    },
  }
</script>

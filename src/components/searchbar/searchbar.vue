<template>
  <div class="ion-searchbar"
       :class="[
         modeClass,colorClass,
         {'searchbar-has-focus': sbHasFocus},
         {'searchbar-has-value':valueInner},
         {'searchbar-has-animated':animated},
         {'searchbar-has-active':isActive},
         {'searchbar-show-cancel':showCancelButton},
         {'searchbar-left-aligned':shouldAlignLeft}
         ]">
    <div class="searchbar-input-container">
      <!--在md模式下，md的取消按钮是在这里的，当点击inputs输入时，返回按钮将覆盖search按钮-->
      <ion-button
        mode="md"
        @click="cancelSearchbar($event)"
        @mousedown="cancelSearchbar($event)"
        type="clear"
        color="dark"
        class="searchbar-md-cancel"
        role="button">
        <ion-icon mode="md" name="md-arrow-back"></ion-icon>
      </ion-button>

      <!--input左边的search按钮-->
      <div ref="searchbarIcon" class="searchbar-search-icon"></div>
      <input ref="searchbarInput" class="searchbar-input"
             @input="inputChanged($event)"
             @blur="inputBlurred($event)"
             :value="valueInner"
             @focus="inputFocused($event)"
             :placeholder="placeholder"
             :type="type"
             :autocomplete="_autocomplete"
             :autocorrect="_autocorrect"
             :spellcheck="_spellcheck">

      <!--input右边的关闭按钮-->
      <ion-button
        type="clear"
        class="searchbar-clear-icon"
        :mode="mode"
        @click="clearInput($event)"
        role="button"></ion-button>
    </div>

    <!--取消按钮，点击input时出现，只对IOS，md在search icon位置显示，wp没有-->
    <ion-button
      ref="cancelButton"
      mode="ios"
      :tabindex="isActive ? 1 : -1"
      type="clear"
      @click="cancelSearchbar($event)"
      class="searchbar-ios-cancel"
      role="button">{{cancelButtonText}}
    </ion-button>

  </div>
</template>
<style scoped lang="scss">
  @import "./searchbar";
  @import "./searchbar.ios";
  @import "./searchbar.md";
  @import "./searchbar.wp";

</style>
<script type="text/ecmascript-6">
  export default{
    name: 'ion-searchbar',
    data(){
      return {
        isCancelVisible: false,
        sbHasFocus: false,
        isActive: false,
        shouldAlignLeft: true,
        shouldBlur: true,

        // 三个元素的id的document实例
        _searchbarIcon: '',
        _searchbarInput: '',
        _cancelButton: '',

        // 外部的value映射
        valueInner: this.value,

        clearTimeout: '',
      }
    },
    props: {
      /**
       * The predefined color to use. For example: "primary", "secondary", "danger".
       * */
      color: {
        type: String,
        default: '',
      },
      /**
       * The mode to apply to this component. Mode can be ios, wp, or md.
       * */
      mode: {
        type: String,
        default: 'ios',
      },
      /**
       * Set the the cancel button text. Default: "Cancel".
       * */
      cancelButtonText: {
        type: String,
        default: 'Cancel',
      },
      /**
       * Whether to show the cancel button or not. Default: "false".
       * */
      showCancelButton: {
        type: Boolean,
        default: false,
      },
      /**
       * How long, in milliseconds, to wait to trigger the ionInput event after each keystroke. Default 250.
       * */
      debounce: {
        type: Number,
        default: 250,
      },
      /**
       * Set the input's placeholder. Default "Search".
       * */
      placeholder: {
        type: String,
        default: 'Search',
      },
      /**
       * Set the input's autocomplete property. Values: "on", "off". Default "off".
       * */
      autocomplete: {
        type: String,
        default: 'off',
      },
      /**
       * Set the input's autocorrect property. Values: "on", "off". Default "off".
       * */
      autocorrect: {
        type: String,
        default: 'off',
      },
      /**
       * Set the input's spellcheck property. Values: true, false. Default false.
       * */
      spellcheck: {
        type: [String, Boolean],
        default: false,
      },
      /**
       * Set the type of the input. Values: "text", "password", "email", "number", "search", "tel", "url". Default "search".
       * */
      type: {
        type: String,
        default: 'search',
      },
      /**
       * Configures if the searchbar is animated or no. By default, animation is false.
       * */
      animated: {
        type: Boolean,
        default: false,
      },
      /**
       * Set the input value.
       * */
      value: {
        type: String,
        default: '',
      },
    },
    watch: {
      valueInner: function (val) {
        // console.log('watch val : ' + val)
      }
    },
    computed: {
      // props处理
      _autocomplete: function () {
        return (this.autocomplete === '' || this.autocomplete === 'on') ? 'on' : 'off';
      },
      _autocorrect: function () {
        return (this.autocorrect === '' || this.autocorrect === 'on') ? 'on' : 'off';
      },
      _spellcheck: function () {
        return this.spellcheck === '' || this.spellcheck === 'true' || this.spellcheck === true
      },

      // class处理
      modeClass: function () {
        return `searchbar-${this.mode}`
      },
      colorClass: function () {
        return !!this.color ? `searchbar-${this.mode}-${this.color}` : ''
      },
    },
    methods: {
      /**
       * @private
       * Update the Searchbar input value when the input changes
       */
      inputChanged: function ($event) {
        const _this = this;
        // console.info('inner-inputChanged');
        let _valueInner = !!$event.target ? $event.target.value : '';
        if (!!_valueInner && _valueInner != undefined) {
          _this.valueInner = _valueInner;
        } else {
          _this.valueInner = null;
        }

        // TODO: setTimeout->debounce
        clearTimeout(_this.clearTimeout);
        _this.clearTimeout = setTimeout(function () {
          // this.onChange(this.valueInner);
          _this.$emit('ionInput', $event);

          // 通知父组件的v-model
          _this.$emit('input', _this.valueInner);
        }, _this.debounce);
      },

      /**
       * @private
       * Sets the Searchbar to focused and active on input focus.
       */
      inputFocused: function ($event) {
        // console.info('inner-inputFocused');
        this.$emit('ionFocus', $event);
        this.sbHasFocus = true;
        this.isActive = true;
        this._positionElements();
      },

      /**
       * @private
       * Sets the Searchbar to not focused and checks if it should align left
       * based on whether there is a value in the searchbar or not.
       */
      inputBlurred: function ($event) {
        // this.sbHasFocus = false;
        // shouldBlur determines if it should blur
        // if we are clearing the input we still want to stay focused in the input
        const _this = this;
        // wait for DOM update, because of focus method
        _this.$nextTick(function () {
          if (!_this.shouldBlur) {
            _this._searchbarInput.focus();
            _this.shouldBlur = true;
            return;
          }
          // console.info('inner-inputBlurred: ');
          _this.$emit('ionBlur', $event);
          _this.sbHasFocus = false;
          _this._positionElements();
        })
      },
      /**
       * @private
       * Clears the input field and triggers the control change.
       */
      clearInput: function ($event) {
        const _this = this;
        // console.info('inner-clearInput:');
        _this.$emit('ionClear', $event);
        // setTimeout() fixes https://github.com/driftyco/ionic/issues/7527
        // wait for 4 frames
        // setTimeout(() => {
        //     let value = _this.valueInner;
        //     if (!!value && value !== '') {
        //         _this.valueInner = ''; // DOM WRITE
        //         // this.onChange(this.valueInner);
        //         _this.$emit('input', _this.valueInner);
        //         _this.$emit('ionInput', $event)
        //     }
        // }, 16 * 4);

        let value = _this.valueInner;
        if (!!value && value !== '') {
          _this.valueInner = ''; // DOM WRITE
          // this.onChange(this.valueInner);
          _this.$emit('input', _this.valueInner);
          _this.$emit('ionInput', $event)
        }

        _this.shouldBlur = false;
      },
      /**
       * @private
       * Clears the input field and tells the input to blur since
       * the clearInput function doesn't want the input to blur
       * then calls the custom cancel function if the user passed one in.
       */
      cancelSearchbar: function ($event) {
        // console.info('inner-cancelSearchbar:');
        this.$emit('ionCancel', $event);

        let value = this.valueInner;
        if (!!value && value !== '') {

        }
        this.clearInput($event);
        this.shouldBlur = true;
        this.isActive = false;

      },

      /**
       * @private
       * Positions the input search icon, placeholder, and the cancel button
       * based on the input value and if it is focused. (ios only)
       */
      _positionElements() {
        let isAnimated = this.animated;
        let prevAlignLeft = this.shouldAlignLeft;
        let shouldAlignLeft = (!isAnimated || (this.valueInner && this.valueInner.toString().trim() !== '') || this.sbHasFocus === true);
        this.shouldAlignLeft = shouldAlignLeft;

        if (this.mode !== 'ios') {
          return;
        }

        if (prevAlignLeft !== shouldAlignLeft) {
          this._positionPlaceholder();
        }
        if (isAnimated) {
          this.positionCancelButton();
        }
      },

      _positionPlaceholder() {
        let inputEle = this._searchbarInput;
        let iconEle = this._searchbarIcon;
        if (!inputEle || !iconEle) {
          return;
        }

        if (this.shouldAlignLeft) {
          inputEle.removeAttribute('style');
          iconEle.removeAttribute('style');
        } else {
          // Create a dummy span to get the placeholder width
          let tempSpan = document.createElement('span');
          tempSpan.innerHTML = this.placeholder;
          document.body.appendChild(tempSpan);

          // Get the width of the span then remove it
          let textWidth = tempSpan.offsetWidth;
          tempSpan.remove();

          // Set the input padding left
          let inputLeft = 'calc(50% - ' + (textWidth / 2) + 'px)';
          inputEle.style.paddingLeft = inputLeft;

          // Set the icon margin left
          let iconLeft = 'calc(50% - ' + ((textWidth / 2) + 30) + 'px)';
          iconEle.style.marginLeft = iconLeft;
        }
      },

      /**
       * @private
       * Show the iOS Cancel button on focus, hide it offscreen otherwise
       */
      positionCancelButton() {
        if (!this._cancelButton) {
          return;
        }
        let showShowCancel = this.sbHasFocus;
        if (showShowCancel !== this.isCancelVisible) {
          let cancelStyleEle = this._cancelButton;
          let cancelStyle = cancelStyleEle.style;
          this.isCancelVisible = showShowCancel;
          if (showShowCancel) {
            cancelStyle.marginRight = '0';
          } else {
            let offset = cancelStyleEle.offsetWidth;
            if (offset > 0) {
              cancelStyle.marginRight = -offset + 'px';
            }
          }
        }
      }

    },
    created: function () {
    },
    mounted: function () {
      this._searchbarIcon = this.$refs.searchbarIcon
      this._searchbarInput = this.$refs.searchbarInput
      this._cancelButton = this.$refs.cancelButton.$el

      this._positionElements();
    },
  }
</script>

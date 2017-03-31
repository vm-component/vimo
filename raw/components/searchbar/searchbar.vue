<template>
    <div class="ion-searchbar searchbar"
         :class="[
         modeClass,colorClass,
         {'searchbar-has-focus': sbHasFocus},
         {'searchbar-has-value':valueInner},
         {'searchbar-animated':shouldAnimated},
         {'searchbar-active':sbHasFocus},
         {'searchbar-show-cancel':showCancelButton},
         {'searchbar-left-aligned':shouldAlignLeft}
         ]">
        <div class="searchbar-input-container">
            <!--在md模式下，md的取消按钮是在这里的，当点击inputs输入时，返回按钮将覆盖search按钮-->
            <Button mode="md"
                    @click="cancelSearchbar($event)"
                    clear
                    color="dark"
                    class="searchbar-md-cancel"
                    role="button">
                <Icon mode="md" name="md-arrow-back"></Icon>
            </Button>

            <!--input左边的search按钮-->
            <div ref="searchbarIcon" class="searchbar-search-icon"></div>
            <div class="searchbar-input-wrap" @click="containerClickHandler($event)">
                <input ref="searchbarInput" class="searchbar-input" id="searchbarInput"
                       @input="onInputHandler($event)"
                       @blur="onBlurHandler($event)"
                       @focus="onFocusHandler($event)"
                       :value="valueInner"
                       :placeholder="placeholder"
                       :type="type"
                       :autocomplete="_autocomplete"
                       :autocorrect="_autocorrect"
                       :spellcheck="_spellcheck">
            </div>
            <!--input右边的关闭按钮-->
            <Button clear
                    class="searchbar-clear-icon"
                    :mode="mode"
                    @click="clearInput($event)"
                    role="button"></Button>
        </div>

        <!--取消按钮，点击input时出现，只对IOS，md在search icon位置显示，wp没有-->
        <Button
                ref="cancelButton"
                mode="ios"
                clear
                @click="cancelSearchbar($event)"
                class="searchbar-ios-cancel"
                role="button">
            <span>{{cancelButtonText}}</span>
        </Button>
    </div>
</template>
<style scoped lang="scss">
    @import "./searchbar";
    @import "./searchbar.ios";
    @import "./searchbar.md";
</style>
<script>
  /**
   * @module Component/SearchBar
   * @description
   * 搜索条
   *
   * @property {String} color - The predefined color to use. For example: "primary", "secondary", "danger".
   * @property {String} mode - 模式
   * @property {String} cancelButtonText - Set the the cancel button text. Default: "Cancel".
   * @property {Boolean} showCancelButton - Whether to show the cancel button or not. Default: "false".
   * @property {Number} debounce - How long, in milliseconds, to wait to trigger the onInput event after each keystroke. Default 250.
   * @property {String} placeholder - Set the input's placeholder. Default "Search".
   * @property {String} autocomplete - autocomplete
   * @property {String} autocorrect - autocorrect
   * @property {Boolean} spellcheck - spellcheck
   * @property {String} type - Set the type of the input. Values: "text", "password", "email", "number", "search", "tel", "url". Default "search".
   * @property {Boolean} animated - Configures if the searchbar is animated or no. By default, animation is false.
   *
   *
   * @fires onInput
   * @fires onFocus
   * @fires onBlur
   * @fires onClear
   * @fires onCancel
   * */
  export default{
    name: 'Searchbar',
    data(){
      return {
        isCancelVisible: false,
        sbHasFocus: false,
        shouldAlignLeft: true,
        shouldBlur: true,
        shouldAnimated: false,

        // 三个元素的id的document实例
        _searchbarIcon: '',
        _searchbarInput: '',
        _cancelButton: '',

        // 外部的value映射
        valueInner: this.value,
        clearTimeout: '',

        placeHolderTextWidth: null, // number eg: 44

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
        default(){ return window.VM && window.VM.config.get('mode', 'ios') || 'ios' }
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
       * How long, in milliseconds, to wait to trigger the onInput event after each keystroke. Default 250.
       * */
      debounce: {
        type: Number,
        default: 0,
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
      }
    },
    computed: {
      // props处理
      _autocomplete () {
        return (this.autocomplete === '' || this.autocomplete === 'on') ? 'on' : 'off'
      },
      _autocorrect () {
        return (this.autocorrect === '' || this.autocorrect === 'on') ? 'on' : 'off'
      },
      _spellcheck () {
        return this.spellcheck === '' || this.spellcheck === 'true' || this.spellcheck === true
      },

      // class处理
      modeClass () {
        return this.mode ? `searchbar-${this.mode}` : ''
      },
      colorClass () {
        return !!this.color ? `searchbar-${this.mode}-${this.color}` : ''
      },
    },
    methods: {
      /**
       * 避免focus和动画一起执行
       * */
      containerClickHandler(){
        if (this.sbHasFocus) {
          // 这里会导致触发两次focus事件
          this._searchbarInput.focus()
          this.shouldBlur = false
          return
        }

        if (this.animated) {
          this.sbHasFocus = true
          this._positionElements()
          window.setTimeout(() => {
            this.$nextTick(() => {
              this._searchbarInput.focus()
              this.shouldBlur = true
            })
          }, 16 * 20)
        } else {
          this._searchbarInput.focus()
          this.shouldBlur = true
        }
      },
      /**
       * @private
       * Update the Searchbar input value when the input changes
       */
      onInputHandler ($event) {
        let _valueInner = $event.target ? $event.target.value : ''
        if (_valueInner) {
          this.valueInner = _valueInner
        } else {
          this.valueInner = null
        }

        // TODO: setTimeout->debounce
        if (this.debounce > 0) {
          window.clearTimeout(this.clearTimeout)
          this.clearTimeout = window.setTimeout(() => {
            this.$emit('onInput', $event)
            // 通知父组件的v-model
            this.$emit('input', this.valueInner)
          }, this.debounce)
        } else {
          this.$emit('onInput', $event)
          this.$emit('input', this.valueInner)
        }
      },

      /**
       * @private
       * Sets the Searchbar to focused and active on input focus.
       */
      onFocusHandler ($event) {
        this.$emit('onFocus', $event)
        this.sbHasFocus = true
        this._positionElements()
      },

      /**
       * @private
       * Sets the Searchbar to not focused and checks if it should align left
       * based on whether there is a value in the searchbar or not.
       */
      onBlurHandler ($event) {
        // shouldBlur: 是否真正的blur, 因为当点击clearBtn时, 需要再次focus, 所以等到16*4ms后, 判断是否blue
        // shouldBlur determines if it should blur
        // if we are clearing the input we still want to stay focused in the input
        // wait for DOM update, because of focus method
        window.setTimeout(() => {
          if (!this.shouldBlur) {
            this._searchbarInput.focus()
          } else {
            this.$emit('onBlur', $event)
            this.sbHasFocus = false
            this._positionElements()
          }
          this.shouldBlur = true
        }, 16 * 4)
      },
      /**
       * @private
       * Clears the input field and triggers the control change.
       */
      clearInput ($event) {
        this._searchbarInput.focus()
        this.$emit('onClear', $event)
        this.shouldBlur = false
        if (this.valueInner) {
          this.valueInner = null
          this.$emit('input', this.valueInner)
          this.$emit('onInput', $event)
        }
      },
      /**
       * @private
       * Clears the input field and tells the input to blur since
       * the clearInput function doesn't want the input to blur
       * then calls the custom cancel function if the user passed one in.
       */
      cancelSearchbar ($event) {
        this.$emit('onCancel', $event)
        if (this.valueInner) {
          this.valueInner = null
          this.$emit('input', this.valueInner)
          this.$emit('onInput', $event)
        }
        this.shouldBlur = true
      },

      /**
       * @private
       * 当focus时, 设置搜索框的icon/placeholder/cancel button的位置 (ios only)
       */
      _positionElements() {
        let isAnimated = this.animated
        let prevAlignLeft = this.shouldAlignLeft
        let shouldAlignLeft = (!isAnimated || (this.valueInner && this.valueInner.toString().trim() !== '') || this.sbHasFocus === true)
        this.shouldAlignLeft = shouldAlignLeft

        if (this.mode !== 'ios') {
          return
        }

        if (prevAlignLeft !== shouldAlignLeft) {
          this._positionPlaceholder()
        }
        if (isAnimated) {
          this.positionCancelButton()
        }
        this.shouldAnimated = this.animated;
      },

      _positionPlaceholder() {
        let inputEle = this._searchbarInput
        let iconEle = this._searchbarIcon
        console.assert(inputEle, 'The input element is undefined, please check!::<Function>_positionPlaceholder():inputEle')
        console.assert(iconEle, 'The icon element is undefined, please check!::<Function>_positionPlaceholder():iconEle')
        if (!inputEle || !iconEle) {
          return
        }

        if (this.shouldAlignLeft) {
          inputEle.removeAttribute('style')
          iconEle.removeAttribute('style')
        } else {
          if (this.sbHasFocus) {
            this._searchbarInput.blur()
          }

          if (this.placeHolderTextWidth === null) {
            // Create a dummy span to get the placeholder width
            if (!this.placeholder) {
              this.placeHolderTextWidth = 0
            } else {
              let tempSpan = document.createElement('span')
              tempSpan.innerHTML = this.placeholder
              tempSpan.style.fontSize = getComputedStyle(inputEle).fontSize
              tempSpan.style.display = 'inline'
              document.body.appendChild(tempSpan)

              // Get the width of the span then remove it
              this.placeHolderTextWidth = tempSpan.offsetWidth
              tempSpan.remove()
            }
          }

          // Set the input padding left
          let inputLeft = 'calc(50% - ' + (this.placeHolderTextWidth / 2) + 'px)'
          inputEle.style.paddingLeft = inputLeft

          let paddingLeft = this.placeHolderTextWidth === 0 ? 14 : 30
          // Set the icon margin left
          let iconLeft = 'calc(50% - ' + ((this.placeHolderTextWidth / 2) + paddingLeft) + 'px)'
          iconEle.style.marginLeft = iconLeft
        }
      },

      /**
       * @private
       * Show the iOS Cancel button on focus, hide it offscreen otherwise
       */
      positionCancelButton() {
        if (!this._cancelButton) {
          return
        }
        let showShowCancel = this.sbHasFocus
        if (showShowCancel !== this.isCancelVisible) {
          let cancelStyleEle = this._cancelButton
          let cancelStyle = cancelStyleEle.style
          this.isCancelVisible = showShowCancel
          if (showShowCancel) {
            cancelStyle.marginRight = '0'
          } else {
            let offset = cancelStyleEle.offsetWidth
            if (offset > 0) {
              cancelStyle.marginRight = -offset + 'px'
            }
          }
        }
      }

    },
    mounted () {
      this._searchbarIcon = this.$refs.searchbarIcon
      this._searchbarInput = this.$refs.searchbarInput
      this._cancelButton = this.$refs.cancelButton.$el
      this._positionElements()
    }

  }
</script>

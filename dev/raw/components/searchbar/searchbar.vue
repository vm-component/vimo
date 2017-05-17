<template>
    <div class="ion-searchbar searchbar"
         :class="[
         modeClass,colorClass,
         {'searchbar-has-focus': sbHasFocus},
         {'searchbar-has-value':theValue},
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

            <input ref="searchbarInput" class="searchbar-input" id="searchbarInput"
                   @input="onInputHandler($event)"
                   @blur="onBlurHandler($event)"
                   @focus="onFocusHandler($event)"
                   :value="theValue"
                   :placeholder="placeholder"
                   :type="type"
                   :autocomplete="autocompleteValue"
                   :autocorrect="autocorrectValue"
                   :spellcheck="spellcheckValue">
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
<script type="text/javascript">
  /**
   * @component SearchBar
   * @description
   * 搜索条
   *
   * ## 表单组件 / SearchBar搜索条组件
   *
   * 搜索组件, 一般是放在Header组件的Toolbar组件中, 当然也可以放置在任何位置
   *
   *
   * ### 如何引入
   * ```
   * // 引入
   * import { Searchbar } from 'vimo/components/searchbar'
   * // 安装
   * Vue.component(Searchbar.name, Searchbar)
   * // 或者
   * export default{
   *   components: {
   *    Searchbar
   *  }
   * }
   * ```
   *
   * @props {String} [color] - 颜色
   * @props {String} [mode='ios'] - 模式
   * @props {String} [cancelButtonText='Cancel'] - 取消按钮的文本
   * @props {Boolean} [showCancelButton=false] - 是否显示cancelButton
   * @props {Number} [debounce=0] - 等待多久触发onInput事件
   * @props {String} [placeholder='Search'] - 设置placeholder的值.
   * @props {String} [autocomplete] - 自动完成
   * @props {String} [autocorrect] - 自动纠错
   * @props {Boolean} [spellcheck] - 拼写检查
   * @props {String} [type='search'] - 设置input配型, 可以是: "text", "password", "email", "number", "search", "tel", "url".
   * @props {Boolean} [animated=false] - 是否启动点击动画
   *
   *
   * @fires component:SearchBar#onInput
   * @fires component:SearchBar#onFocus
   * @fires component:SearchBar#onBlur
   * @fires component:SearchBar#onClear
   * @fires component:SearchBar#onCancel
   *
   *
   * @demo https://dtfe.github.io/vimo-demo/#/searchbar
   *
   * @usage
   * <template>
   *    <Page>
   *    <Header>
   *        <Navbar>
   *            <Title>Searchbar</Title>
   *        </Navbar>
   *        <Toolbar>
   *            <Searchbar :animated="true"
   *                placeholder="Search"
   *                :debounce="0"
   *                v-model="myInput"
   *                :showCancelButton="true"
   *                cancelButtonText="取消"
   *                @onInput="onInput"
   *                @onFocus="onFocus"
   *                @onBlur="onBlur"
   *                @onCancel="onCancel"
   *                @onClear="onClear"></Searchbar>
   *         </Toolbar>
   *     </Header>
   *    <Content padding>
   *        <p>Search debounce: 100</p>
   *        <p>Search Value: {{myInput}}</p>
   *    </Content>
   *    </Page>
   * </template>
   * */
  import { Button } from '../button'
  import { Icon } from '../icon'
  export default{
    name: 'Searchbar',
    data () {
      return {
        isCancelVisible: false,
        sbHasFocus: false,
        shouldAlignLeft: true,
        shouldBlur: true,
        shouldAnimated: false,

        // 三个元素的id的document实例
        searchbarIcon: '',
        searchbarInput: '',
        cancelButton: '',

        // 外部的value映射
        theValue: this.value,
        timer: '',

        placeHolderTextWidth: null // number eg: 44

      }
    },
    props: {
      /**
       * The predefined color to use. For example: "primary", "secondary", "danger".
       * */
      color: [String],
      /**
       * The mode to apply to this component. Mode can be ios, wp, or md.
       * */
      mode: {
        type: String,
        default () { return this.$config.get('mode') || 'ios' }
      },
      /**
       * Set the the cancel button text. Default: "Cancel".
       * */
      cancelButtonText: {
        type: String,
        default: 'Cancel'
      },
      /**
       * Whether to show the cancel button or not. Default: "false".
       * */
      showCancelButton: [Boolean],
      /**
       * How long, in milliseconds, to wait to trigger the onInput event after each keystroke. Default 250.
       * */
      debounce: {
        type: Number,
        default: 0
      },
      /**
       * Set the input's placeholder. Default "Search".
       * */
      placeholder: {
        type: String,
        default: 'Search'
      },
      /**
       * Set the input's autocomplete property. Values: "on", "off". Default "off".
       * */
      autocomplete: {
        type: String,
        default: 'off'
      },
      /**
       * Set the input's autocorrect property. Values: "on", "off". Default "off".
       * */
      autocorrect: {
        type: String,
        default: 'off'
      },
      /**
       * Set the input's spellcheck property. Values: true, false. Default false.
       * */
      spellcheck: {
        type: [String, Boolean],
        default: false
      },
      /**
       * Set the type of the input. Values: "text", "password", "email", "number", "search", "tel", "url". Default "search".
       * */
      type: {
        type: String,
        default: 'search'
      },
      /**
       * Configures if the searchbar is animated or no. By default, animation is false.
       * */
      animated: {
        type: Boolean,
        default: false
      },
      /**
       * Set the input value.
       * */
      value: [String]
    },
    watch: {
      value (val) {
        this.theValue = val
        this.positionElements()
      }
    },
    computed: {
      // props处理
      autocompleteValue () {
        return (this.autocomplete === '' || this.autocomplete === 'on') ? 'on' : 'off'
      },
      autocorrectValue () {
        return (this.autocorrect === '' || this.autocorrect === 'on') ? 'on' : 'off'
      },
      spellcheckValue () {
        return this.spellcheck === '' || this.spellcheck === 'true' || this.spellcheck === true
      },
      // class处理
      modeClass () {
        return this.mode ? `searchbar-${this.mode}` : ''
      },
      colorClass () {
        return this.color ? `searchbar-${this.mode}-${this.color}` : ''
      }
    },
    methods: {

      /**
       * Update the Searchbar input value when the input changes
       * @private
       */
      onInputHandler ($event) {
        let _valueInner = $event.target ? $event.target.value : ''
        if (_valueInner) {
          this.theValue = _valueInner
        } else {
          this.theValue = null
        }

        if (this.debounce > 16) {
          window.clearTimeout(this.timer)
          this.timer = window.setTimeout(() => {
            // 通知父组件的v-model
            this.$emit('input', this.theValue)

            this.$emit('onInput', $event)
          }, this.debounce)
        } else {
          /**
           * @event component:SearchBar#onInput
           * @description input事件
           * @property {object} $event - 事件对象
           */
          this.$emit('input', this.theValue)
          this.$emit('onInput', $event)
        }
      },

      /**
       * Sets the Searchbar to focused and active on input focus.
       * @private
       */
      onFocusHandler ($event) {
        /**
         * @event component:SearchBar#onFocus
         * @description focus事件
         * @property {object} $event - 事件对象
         */
        this.$emit('onFocus', $event)
        this.sbHasFocus = true
        this.positionElements()
      },

      /**
       * Sets the Searchbar to not focused and checks if it should align left
       * based on whether there is a value in the searchbar or not.
       * @private
       */
      onBlurHandler ($event) {
        // shouldBlur: 是否真正的blur, 因为当点击clearBtn时, 需要再次focus, 所以等到16*4ms后, 判断是否blue
        // shouldBlur determines if it should blur
        // if we are clearing the input we still want to stay focused in the input
        // wait for DOM update, because of focus method
        window.setTimeout(() => {
          if (!this.shouldBlur) {
            this.sbHasFocus = true
            this.searchbarInput.focus()
          } else {
            /**
             * @event component:SearchBar#onBlur
             * @description blur事件
             * @property {object} $event - 事件对象
             */
            this.$emit('onBlur', $event)
            this.sbHasFocus = false
            this.positionElements()
          }
          this.shouldBlur = true
        }, 16 * 4)
      },
      /**
       * Clears the input field and triggers the control change.
       * @private
       */
      clearInput ($event) {
        this.searchbarInput.focus()
        /**
         * @event component:SearchBar#onClear
         * @description clear事件
         * @property {object} $event - 事件对象
         */
        this.$emit('onClear', $event)
        this.shouldBlur = false
        if (this.theValue) {
          this.theValue = null
          this.$emit('input', this.theValue)
          this.$emit('onInput', $event)
        }
      },
      /**
       * Clears the input field and tells the input to blur since
       * the clearInput function doesn't want the input to blur
       * then calls the custom cancel function if the user passed one in.
       * @private
       */
      cancelSearchbar ($event) {
        /**
         * @event component:SearchBar#onCancel
         * @description cancel事件
         * @property {object} $event - 事件对象
         */
        this.$emit('onCancel', $event)
        if (this.theValue) {
          this.theValue = null
          this.$emit('input', this.theValue)
          this.$emit('onInput', $event)
        }
        this.shouldBlur = true
      },

      /**
       * 当focus时, 设置搜索框的icon/placeholder/cancel button的位置 (ios only)
       * @private
       */
      positionElements () {
        let isAnimated = this.animated
        let prevAlignLeft = this.shouldAlignLeft
        let shouldAlignLeft = (!isAnimated || (this.theValue && this.theValue.toString().trim() !== '') || this.sbHasFocus === true)
        this.shouldAlignLeft = shouldAlignLeft

        if (this.mode !== 'ios') {
          return
        }

        if (prevAlignLeft !== shouldAlignLeft) {
          this.positionPlaceholder()
        }
        if (isAnimated) {
          this.positionCancelButton()
        }
        this.shouldAnimated = this.animated
      },

      positionPlaceholder () {
        let inputEle = this.searchbarInput
        let iconEle = this.searchbarIcon
        console.assert(inputEle, 'The input element is undefined, please check!::<Function>positionPlaceholder():inputEle')
        console.assert(iconEle, 'The icon element is undefined, please check!::<Function>positionPlaceholder():iconEle')
        if (!inputEle || !iconEle) {
          return
        }

        if (this.shouldAlignLeft) {
          inputEle.removeAttribute('style')
          iconEle.removeAttribute('style')
        } else {
          if (this.sbHasFocus) {
            this.searchbarInput.blur()
          }

          if (this.placeHolderTextWidth === null) {
            // Create a dummy span to get the placeholder width
            if (!this.placeholder) {
              this.placeHolderTextWidth = 0
            } else {
              let tempSpan = document.createElement('span')
              tempSpan.innerHTML = this.placeholder
              tempSpan.style.fontSize = window.getComputedStyle(inputEle).fontSize
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
       * Show the iOS Cancel button on focus, hide it offscreen otherwise
       * @private
       */
      positionCancelButton () {
        if (!this.cancelButton) {
          return
        }
        let showShowCancel = this.sbHasFocus
        if (showShowCancel !== this.isCancelVisible) {
          let cancelStyleEle = this.cancelButton
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
      this.searchbarIcon = this.$refs.searchbarIcon
      this.searchbarInput = this.$refs.searchbarInput
      this.cancelButton = this.$refs.cancelButton.$el
      this.positionElements()
    },
    components: {
      Button, Icon
    }
  }
</script>

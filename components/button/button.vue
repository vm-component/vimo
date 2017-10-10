<template>
    <button class="disable-hover ion-button" @click="clickHandler($event)" :active="active"
            :class="[modeClass,itemClass]">
        <span class="button-inner"><slot></slot></span>
    </button>
</template>
<style lang="less">
    @import "button.less";
    @import "button.md.less";
    @import "button.ios.less";
    @import "button-icon.less";
</style>
<script type="text/javascript">
  /**
   * @component Button
   * @description
   *
   * ## 其他 / Button按钮组件
   *
   * 基础的按钮组件, 可以设置大小, 形状等, 包括和Icon组件的组合.
   *
   * ### 如何引入
   * ```
   * // 引入
   * import Button from 'vimo/lib/button'
   * // 安装
   * Vue.component(Button.name, Button)
   * // 或者
   * export default{
   *   components: {
   *    Button
   *  }
   * }
   * ```
   *
   * @props {String} [color='default'] - 颜色
   * @props {String} [mode='ios'] - 模式
   *
   * @props {Boolean} [small]       - 尺寸
   * @props {Boolean} [default]     - 尺寸
   * @props {Boolean} [large]       - 尺寸
   *
   * @props {Boolean} [active]      - 是否激活(按下时的效果)
   *
   * @props {Boolean} [round]       - round(宽度auto有圆角)
   * @props {Boolean} [full]        - full(宽度100%无圆角)
   * @props {Boolean} [block]       - block(宽度100%有圆角)
   * @props {Boolean} [menutoggle]  - menutoggle类型
   *
   * @props {Boolean} [outline]     - outline只有边框
   * @props {Boolean} [clear]       - clear空心
   * @props {Boolean} [solid]       - solid实心
   *
   * @props {Boolean} [role='button']       - role 按钮具体角色 例如 action-sheet-button/bar-button
   *
   * @props {Boolean} [strong]      - 样式加强
   *
   * @demo #/button
   * @usage
   * <Button full>full</Button>
   * <Button outline full color="secondary">outline + full</Button>
   * <Button color="dark">
   *    <Icon class="icon" name="star"></Icon>
   *    <span>Left Icon</span>
   * </Button>
   * */
  import { setElementClass, isTrueProperty } from '../util/util'

  export default {
    name: 'Button',
    props: {
      /**
       * 按钮color：primary、secondary、danger、light、dark
       * */
      color: {
        type: String,
        default () {
          return 'default'
        }
      },
      /**
       * mode 按钮风格 ios/window/android/we/alipay
       * */
      mode: {
        type: String,
        default () { return this.$config && this.$config.get('mode', 'ios') || 'ios' }
      },

      small: Boolean,
      default: Boolean,
      large: Boolean,

      /**
       * 激活模式, 按下时的效果
       * */
      active: Boolean,

      /**
       * 形状：round(宽度auto有圆角)
       * round/fab
       * */
      round: Boolean,

      /**
       * 形状：full(宽度100%无圆角)/block(宽度100%有圆角)/menutoggle
       * */
      full: Boolean,
      block: Boolean,
      menutoggle: Boolean,

      /**
       * 按钮类型： solid实心/outline只有边框/clear空心
       * */
      outline: Boolean,
      clear: Boolean,
      solid: Boolean,

      /**
       * role 按钮具体角色 例如 action-sheet-button/bar-button
       * */
      role: {
        type: String,
        default () {
          return 'button'
        }
      },

      /**
       * 样式加强
       * */
      strong: Boolean
    },
    data () {
      return {
        itemClass: '',
        size: null,         // large/small/default
        style: null,        // outline/clear/solid
        shape: null,        // round/fab
        display: null,      // block/full
        init: false,       //

        theMode: ''
      }
    },
    computed: {
      // 环境样式
      modeClass () {
        return this.theMode ? (`${this.role} ${this.role}-${this.theMode}`) : this.role
      }
    },
    methods: {
      clickHandler ($event) {
        this.$emit('click', $event)
      },

      // 获取元素属性
      getProps () {
        isTrueProperty(this.small) && (this.size = 'small')
        isTrueProperty(this.default) && (this.size = 'default')
        isTrueProperty(this.large) && (this.size = 'large')

        isTrueProperty(this.outline) && (this.style = 'outline')
        isTrueProperty(this.clear) && (this.style = 'clear')
        isTrueProperty(this.solid) && (this.style = 'solid')

        isTrueProperty(this.round) && (this.shape = 'round')

        isTrueProperty(this.full) && (this.display = 'full')
        isTrueProperty(this.block) && (this.display = 'block')
        isTrueProperty(this.menutoggle) && (this.display = 'menutoggle')

        isTrueProperty(this.strong) && (this.decorator = 'strong')
      },

      /**
       * @private
       * @param {boolean} assignCssClass - add or remove
       */
      assignCss () {
        let role = this.role
        if (role) {
          this.setClass(this.style) // button-clear
          this.setClass(this.shape) // button-round
          this.setClass(this.display) // button-full
          this.setClass(this.size) // button-small
          this.setClass(this.decorator) // button-strong
        }
        this.updateColor(this.color) // button-secondary, bar-button-secondary
      },

      /**
       * @private
       * @param {string} type
       */
      setClass (type) {
        if (type && this.init) {
          type = type.toLocaleLowerCase()
          this.addElementClass(`${this.role}-${type}`)
          if (this.theMode) {
            this.addElementClass(`${this.role}-${type}-${this.theMode}`)
          }
        }
      },

      /**
       * @param {string} className - className
       * */
      addElementClass (className) {
        setElementClass(this.$el, className, true)
      },

      /**
       * @private
       * @param {string} color
       * @param {boolean} isAdd
       */
      updateColor (color, isAdd) {
        if (color && this.init) {
          // The class should begin with the button role
          // button, bar-button
          let className = this.role

          // If the role is not a bar-button, don't apply the solid style
          let style = this.style
          style = (this.role !== 'bar-button' && style === 'solid' ? 'default' : style)
          className += (style !== null && style !== '' && style !== 'default' ? '-' + style.toLowerCase() : '')

          if (this.theMode) {
            this.addElementClass(`${className}-${this.theMode}-${color}`)
          } else {
            this.addElementClass(`${className}-${color}`)
          }
        }
      },

      // 设置icon button的左右位置
      addIconBtnPosition () {
        let _firstSlot = null
        let _lastSlot = null
        let _length = this.getSlotLength(this.$slots)
        if (_length > 0) {
          _firstSlot = this.$slots.default[0]
          _lastSlot = this.$slots.default[_length - 1]
          // icon-only
          if (_length === 1 && this.isIconComponent(_firstSlot)) {
            this.$el.setAttribute('icon-only', '')
          }

          if (_length > 1) {
            // icon left
            if (this.isIconComponent(_firstSlot)) {
              this.$el.setAttribute('icon-left', '')
            }
            // icon right
            if (this.isIconComponent(_lastSlot)) {
              this.$el.setAttribute('icon-right', '')
            }
          }
        }
      },

      // 判断slot是icon组件
      isIconComponent (slot) {
        return !!slot.componentOptions && !!slot.componentOptions.tag && slot.componentOptions.tag.toLowerCase() === 'icon'
      },

      // 获取slot的数量
      getSlotLength (slots) {
        return (slots && slots.default) ? slots.default.length : 0
      },

      // 如果icon是在item中的话, 则设置 class="item-button"
      addClassInItemComp () {
        if (this.$parent.$el && this.$parent.$el.className && this.$parent.$el.className.indexOf('item') > -1) {
          // button in items should add class of 'item-button'
          this.addElementClass('item-button')
        }
      }
    },
    created () {
      this.getProps()
      this.init = true
      if (this.role === 'bar-button') {
        this.theMode = null
      } else {
        this.theMode = this.mode
      }
    },
    mounted () {
      this.assignCss()
      this.addIconBtnPosition()
      this.addClassInItemComp()
    }
  }
</script>

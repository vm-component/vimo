<template>
    <button class="disable-hover ion-button"
            :active="active"
            @click="clickHandler($event)">
        <slot name="backup"></slot>
        <span class="button-inner">
            <slot></slot>
        </span>
        <div class="button-effect"></div>
    </button>
</template>
<style lang="scss">
    @import "button";
    @import "button.md";
    @import "button.ios";
    @import "button-icon";
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
   *   src: {
   *    Button
   *  }
   * }
   * ```
   *
   * @props {String} [color='default'] - 颜色
   * @props {String} [mode='ios'] - 模式 ios/window/android/we/alipay
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
   * <vm-button full>full</vm-button>
   * <vm-button outline full color="secondary">outline + full</vm-button>
   * <vm-button color="dark">
   *    <vm-icon class="icon" name="star"></vm-icon>
   *    <span>Left Icon</span>
   * </vm-button>
   **/
  import { setElementClass, isTrueProperty } from '../../util/util'
  import ThemeMixins from '../../themes/theme.mixins'

  export default {
    name: 'vm-button',
    mixins: [ThemeMixins],
    props: {
      /**
       * role 按钮具体角色 例如 action-sheet-button/bar-button
       **/
      role: {
        type: String,
        default () {
          return 'button'
        }
      },

      small: [Boolean, String],
      default: [Boolean, String],
      large: [Boolean, String],

      /**
       * 激活模式, 按下时的效果
       **/
      active: Boolean,

      /**
       * 形状：round(宽度auto有圆角)
       * round/fab
       **/
      round: Boolean,

      /**
       * 形状：full(宽度100%无圆角)/block(宽度100%有圆角)/menutoggle
       **/
      full: [Boolean, String],
      block: [Boolean, String],
      menutoggle: [Boolean, String],

      /**
       * 按钮类型： solid实心/outline只有边框/clear空心
       **/
      outline: [Boolean, String],
      clear: [Boolean, String],
      solid: [Boolean, String],

      /**
       * 样式加强
       **/
      strong: [Boolean, String]
    },
    data () {
      return {
        itemClass: '',
        size: null,         // large/small/default
        style: 'default',   // outline/clear/solid
        shape: null,        // round/fab
        display: null,      // block/full
        init: false       //
      }
    },
    created () {
      this.init = true

      this.roleName = this.role

      if (this.$parent) {
        let parentName = this.$parent.$options.name.toLowerCase()

      // 如果是在组件 buttons 下则修改前缀为 bar-button-
        if (parentName === 'vm-buttons' || parentName === 'vm-toolbar' || parentName === 'vm-navbar') {
          this.roleName = 'bar-button'
        }

        if (this.role === 'radio' || this.role === 'checkbox' || this.role === 'select') {
          this.roleName = 'item-cover'
        }
      }

      this.getProps()
    },
    mounted () {
      this.assignCss(true)
      this.addIconBtnPosition()
      this.addClassInItemComp()
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
       * @param {boolean} assignCssClass
       */
      assignCss (assignCssClass) {
        let role = this.roleName
        if (role) {
          setElementClass(this.$el, role, assignCssClass) // button
          setElementClass(this.$el, `${role}-${this.mode}`, assignCssClass) // button

          this.setClass(this.style, assignCssClass) // button-clear
          this.setClass(this.shape, assignCssClass) // button-round
          this.setClass(this.display, assignCssClass) // button-full
          this.setClass(this.size, assignCssClass) // button-small
          this.setClass(this.decorator, assignCssClass) // button-strong

          this.updateColor(this.color, assignCssClass) // button-secondary, bar-button-secondary
        }
      },

      /**
       * @private
       * @param {string} type
       * @param {boolean} assignCssClass
       */
      setClass (type, assignCssClass) {
        if (type && this.init) {
          type = type.toLocaleLowerCase()
          setElementClass(this.$el, `${this.roleName}-${type}`, assignCssClass)
          setElementClass(this.$el, `${this.roleName}-${type}-${this.mode}`, assignCssClass)
        }
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
          let className = this.roleName

          // If the role is not a bar-button, don't apply the solid style
          let style = this.style
          style = (this.roleName !== 'bar-button' && style === 'solid' ? 'default' : style)
          className += (style !== null && style !== '' && style !== 'default' ? '-' + style.toLowerCase() : '')

          if (color !== null && color !== '') {
            setElementClass(this.$el, `${className}-${this.mode}-${color}`, isAdd)
          }
        }
      },

      // 设置icon button的左右位置
      addIconBtnPosition () {
        let _firstSlot = null
        let _lastSlot = null
        let _length = this.$slots && this.$slots.default ? this.$slots.default.length : 0

        if (_length > 0) {
          _firstSlot = this.$slots.default[0]
          _lastSlot = this.$slots.default[_length - 1]
          // icon-only
          if (_length === 1 && this.isIconComponent(_firstSlot)) {
            this.$el.setAttribute('icon-only', '')
          }

          if (_length > 1) {
            // icon left
            if (this.isIconComponent(_firstSlot) && this.roleName !== 'bar-button') {
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
        return !!slot.componentOptions && !!slot.componentOptions.tag && slot.componentOptions.tag.toLowerCase() === 'vm-icon'
      },

      // 如果icon是在item中的话, 则设置 class="item-button"
      addClassInItemComp () {
        if (this.$parent && this.$parent.$el.classList.contains('ion-item')) {
          // button in items should add class of 'item-button'
          setElementClass(this.$el, 'item-button', true)
        }
      }
    }
  }
</script>

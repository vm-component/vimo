<template>
    <button class="ion-button"
            :active="active"
            :icon-only="iconOnly"
            :icon-left="iconLeft"
            :icon-right="iconRight"
            :class="[modeClass, styleClass, shapeClass, displayClass, sizeClass, decoratorClass, colorClass,
              {'disable-hover':disableHover},
              {'item-button':isInItemComponent}]"
            @click="$_clickHandler($event)">
        <span class="button-inner"><slot></slot></span>
    </button>
</template>
<style lang="scss" src="./style.scss"></style>
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
   * import { Button } from 'vimo
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
  import disableHover from '../../util/disable-hover'

  export default {
    name: 'Button',
    inject: {
      itemComponent: {
        from: 'itemComponent',
        default: null
      }
    },
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
      'default': Boolean,
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
        disableHover: disableHover,

        style: 'default',        // outline/clear/solid
        shape: null,        // round/fab
        display: null,      // block/full
        size: null,         // large/small/default
        decorator: null,     // strong

        styleClass: null,
        shapeClass: null,
        displayClass: null,
        sizeClass: null,
        decoratorClass: null,
        colorClass: null,

        iconOnly: false,
        iconLeft: false,
        iconRight: false

      }
    },
    computed: {
      // 环境样式
      modeClass () {
        return this.mode ? (`${this.role} ${this.role}-${this.mode}`) : this.role
      },
      isInItemComponent () {
        return !!this.itemComponent
      }
    },
    methods: {
      /**
       * @private
       * @param {Object} $event - $event
       */
      $_clickHandler ($event) {
        this.$emit('click', $event)
      },

      /**
       * @private
       */
      $_assignCss () {
        let role = this.role
        if (role) {
          this.styleClass = this.$_setClass(this.style) // button-clear
          this.shapeClass = this.$_setClass(this.shape) // button-round
          this.displayClass = this.$_setClass(this.display) // button-full
          this.sizeClass = this.$_setClass(this.size) // button-small
          this.decoratorClass = this.$_setClass(this.decorator) // button-strong
        }
        this.colorClass = this.$_setColor(this.color) // button-secondary, bar-button-secondary
      },

      /**
       * @param {String} type
       * @private
       */
      $_setClass (type) {
        if (type) {
          type = type.toLocaleLowerCase()
          return `${this.role}-${type} ${this.role}-${type}-${this.mode}`
        }
      },

      /**
       * @param {String} color
       * @private
       */
      $_setColor (color) {
        if (color) {
          // The class should begin with the button role
          // button, bar-button
          let className = this.role

          // If the role is not a bar-button, don't apply the solid style
          let style = this.style
          style = (this.role !== 'bar-button' && style === 'solid' ? 'default' : style)

          className += (style !== null && style !== '' && style !== 'default' ? '-' + style.toLowerCase() : '')

          if (color !== null && color !== '') {
            return `${className}-${this.mode}-${color}`
          }
        }

        return ''
      },

      /**
       * 设置icon button的左右位置
       * @private
       */
      $_addIconBtnPosition () {
        let firstSlot = null
        let lastSlot = null
        let length = this.$_getSlotLength(this.$slots)
        if (length > 0) {
          firstSlot = this.$slots.default[0]
          lastSlot = this.$slots.default[length - 1]
          if (length === 1 && this.$_isIconComponent(firstSlot)) {
            this.iconOnly = 'icon-only'
          }

          if (length > 1) {
            if (this.$_isIconComponent(firstSlot)) {
              this.iconLeft = 'icon-left'
            }
            if (this.$_isIconComponent(lastSlot)) {
              this.iconRight = 'icon-right'
            }
          }
        }
      },

      /**
       * 判断slot是icon组件
       * @private
       * */
      $_isIconComponent (slot) {
        return !!slot.componentOptions && !!slot.componentOptions.tag && slot.componentOptions.tag.toLowerCase() === 'icon'
      },

      /**
       * 获取slot的数量
       * @private
       * */
      $_getSlotLength (slots) {
        return (slots && slots.default) ? slots.default.length : 0
      },

      /**
       * @private
       * */
      $_classify () {
        if (this.small) this.size = 'small'
        if (this.default) this.size = 'default'
        if (this.large) this.size = 'large'

        if (this.outline) this.style = 'outline'
        if (this.clear) this.style = 'clear'
        if (this.solid) this.style = 'solid'

        if (this.round) this.shape = 'round'

        if (this.full) this.display = 'full'
        if (this.block) this.display = 'block'
        if (this.menutoggle) this.display = 'menutoggle'

        if (this.strong) this.decorator = 'strong'
      }
    },
    created () {
      this.$_classify()
      this.$_assignCss()
      this.$_addIconBtnPosition()
    }
  }

</script>

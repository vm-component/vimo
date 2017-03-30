<template>
    <button class="disable-hover ion-button" @click="clickHandler($event)"
            :class="[modeClass,itemClass]">
    <span class="button-inner">
      <slot></slot>
    </span>
        <div class="button-effect"></div>
    </button>
</template>
<style lang="scss">
    @import './button';
    @import './button.ios';
    @import './button.md';
    @import './button-icon';
</style>
<script>
  import { setElementClass } from '../../util/dom'
  import { isTrueProperty } from '../../util/util'
  export default{
    name: 'Button',
    props: {
      /**
       * 按钮color：primary、secondary、danger、light、dark
       * */
      color: {
        type: String,
        default(){
          return 'default'
        }
      },
      /**
       * mode 按钮风格 ios/window/android/we/alipay
       * */
      mode: {
        type: String,
        default(){ return window.VM && window.VM.config.get('mode') || 'ios' }
      },

      small: [Boolean],
      default: [Boolean],
      large: [Boolean],

      /**
       * 形状：round(宽度auto有圆角)
       * round/fab
       * */
      round: [Boolean],

      /**
       * 形状：full(宽度100%无圆角)/block(宽度100%有圆角)/menutoggle
       * */
      full: [Boolean],
      block: [Boolean],
      menutoggle: [Boolean],

      /**
       * 按钮类型： solid实心/outline只有边框/clear空心
       * */
      outline: [Boolean],
      clear: [Boolean],
      solid: [Boolean],

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
       * A button that has strong importance, ie. it represents an important action.
       * */
      strong: [Boolean],

    },
    data(){
      return {
        itemClass: '',

        size: null,         // large/small/default
        style: null,        // outline/clear/solid
        shape: null,        // round/fab
        display: null,      // block/full
        init: false,        //

      }
    },
    computed: {
      // 环境样式
      modeClass () {
        return `${this.role}-${this.mode}`
      }
    },
    methods: {
      clickHandler ($event) {
        this.$emit('click', $event)
      },

      // 获取元素属性
      getProps(){
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
      assignCss(assignCssClass) {
        let role = this.role;
        if (role) {
          this.setElementClass(role, assignCssClass); // button
          this.setElementClass(`${role}-${this.mode}`, assignCssClass); // button
          this.setClass(this.style, assignCssClass); // button-clear
          this.setClass(this.shape, assignCssClass); // button-round
          this.setClass(this.display, assignCssClass); // button-full
          this.setClass(this.size, assignCssClass); // button-small
          this.setClass(this.decorator, assignCssClass); // button-strong
        }
        this.updateColor(this.color, assignCssClass); // button-secondary, bar-button-secondary
      },

      /**
       * @private
       * @param {string} type
       * @param {boolean} assignCssClass
       */
      setClass(type, assignCssClass) {
        if (type && this.init) {
          type = type.toLocaleLowerCase();
          this.setElementClass(`${this.role}-${type}`, assignCssClass);
          this.setElementClass(`${this.role}-${type}-${this.mode}`, assignCssClass);
        }
      },

      /**
       * @param {string} className -
       * @param {boolean} assignCssClass - add or remove
       * */
      setElementClass(className, assignCssClass){
        setElementClass(this.$el, className, assignCssClass)
      },

      /**
       * @private
       * @param {string} color
       * @param {boolean} isAdd
       */
      updateColor(color, isAdd) {
        if (color && this.init) {
          // The class should begin with the button role
          // button, bar-button
          let className = this.role;

          // If the role is not a bar-button, don't apply the solid style
          let style = this.style;
          style = (this.role !== 'bar-button' && style === 'solid' ? 'default' : style)
          className += (style !== null && style !== '' && style !== 'default' ? '-' + style.toLowerCase() : '')

          if (this.role !== 'bar-button') {
            this.setElementClass(`${className}-${this.mode}-${color}`, isAdd)
          } else {
            this.setElementClass(`${className}-${color}-${this.mode}`, isAdd)
          }

        }
      },

      // 设置icon button的左右位置
      addIconBtnPosition(){
        let _firstSlot = null;
        let _lastSlot = null;
        let _length = this.getSlotLength(this.$slots)
        if (_length > 0) {
          _firstSlot = this.$slots.default[0];
          _lastSlot = this.$slots.default[_length - 1];

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
      isIconComponent(slot){
        return !!slot.componentOptions && !!slot.componentOptions.tag && slot.componentOptions.tag.toLowerCase() === 'icon'
      },

      // 获取slot的数量
      getSlotLength(slots){
        return (!!slots && !!slots.default) ? slots.default.length : 0;
      },

      // 如果icon是在item中的话, 则设置 class="item-button"
      addClassInItemComp(){
        if (!!this.$parent.$el && this.$parent.$el.className && this.$parent.$el.className.indexOf('item') > -1) {
          // button in items should add class of 'item-button'
          this.setElementClass('item-button', true)
        }
      }
    },
    created(){
      this.getProps()
      this.init = true;

    },
    mounted () {

      this.assignCss(true);

      this.addIconBtnPosition()
      this.addClassInItemComp()
    }
  }
</script>

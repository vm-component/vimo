<template>
  <button class="disable-hover ion-button" @click="_click($event)"
          :class="[roleClass,modeClass,typeClass,shapeClass,sizeClass,colorClass,strongClass,itemClass]">
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
  @import './button.wp';
  @import './button-icon';
</style>
<script type="text/ecmascript-6">
  export default{
    name: 'Button',
    props: {
      /**
       * 按钮color：primary、secondary、danger、light、dark
       * */
      color: {
        type: String,
        default: '',
      },
      /**
       * mode 按钮风格 ios/window/android/we/alipay
       * */
      mode: {
        type: String,
        default: VM.config.get('mode') || 'ios',
      },
      /**
       * 按钮大小：large small default
       * */
      size: {
        type: String,
        default: '',
      },

      /**
       * 形状：full(宽度100%无圆角)/block(宽度100%有圆角)/round(宽度auto有圆角)/menutoggle
       * */
      shape: {
        type: String,
        default: '',
      },

      /**
       * 按钮类型： solid实心/outline只有边框/clear空心
       * */
      type: {
        type: String,
        default: 'default',
      },

      /**
       * role 按钮具体角色 例如 action-sheet-button/bar-button
       * */
      role: {
        type: String,
        default: 'button',
      },

      /**
       * A button that has strong importance, ie. it represents an important action.
       * */
      isStrong: {
        type: Boolean,
        default: false,
      }
    },
    data(){
      return {
        itemClass: '',
      }
    },
    computed: {
      // 环境样式
      modeClass () {
        return `${this.role}-${this.mode}`
      },
      // 颜色
      colorClass () {
        return !!this.color ? (`${this.role}-${this.mode}-${this.color}`) : ''
      },
      shapeClass () {
        // button-round
        return !!this.shape ? `${this.role}-${this.shape} ${this.role}-${this.shape}-${this.mode}` : ''
      },
      sizeClass () {
        // if(this.role === 'button'){
        //   return !!this.size ? `${this.role}-${this.size} ${this.role}-${this.size}-${this.mode}` : ''
        // }else {
        // 	return ''
        // }
        return !!this.size ? `${this.role}-${this.size} ${this.role}-${this.size}-${this.mode}` : ''

      },
      typeClass () {
        if (!!this.type) {
          if (!!this.color) {
            return `${this.role}-${this.type} ${this.role}-${this.type}-${this.mode} ${this.role}-${this.type}-${this.mode}-${this.color}`
          } else {
            return `${this.role}-${this.type} ${this.role}-${this.type}-${this.mode}`
          }
        } else {
          return ''
        }
      },
      // 按钮角色
      roleClass () {
        if (!!this.role) {
          // action-sheet-button action-sheet-button-ios action-sheet-button-default action-sheet-button-default-ios
          return `${this.role} ${this.role}-${this.mode}`
        } else {
          return ''
        }
      },
      // button-strong
      strongClass () {
        return !!this.isStrong ? `${this.role}-strong-${this.mode}` : ''
      }
    },
    methods: {
      _click ($event) {
        this.$emit('click', $event)
      }
    },
    mounted () {
      if (!!this.$parent.$el && this.$parent.$el.className && this.$parent.$el.className.indexOf('item') > -1) {
        //	button in items should add class of 'item-button'
        this.itemClass += 'item-button';
      }
    }
  }
</script>

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
        default(){ return window.VM && window.VM.config.get('mode') || 'ios' }
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
      },

      isIconComponent(slot){
        return !!slot.componentOptions && !!slot.componentOptions.tag && slot.componentOptions.tag.toLowerCase() === 'icon'
      },

      getSlotLength(slots){
        return (!!slots && !!slots.default) ? slots.default.length : 0;
      },
    },
    mounted () {
      let _firstSlot = null;
      let _lastSlot = null;
      let _length = this.getSlotLength(this.$slots)

      if (_length > 0 && this.role !== 'bar-button') {
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

      if (!!this.$parent.$el && this.$parent.$el.className && this.$parent.$el.className.indexOf('item') > -1) {
        //	button in items should add class of 'item-button'
        this.itemClass += 'item-button';
      }

    }
  }
</script>

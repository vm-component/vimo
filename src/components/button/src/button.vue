<template>
  <button class="disable-hover button ion-button" @click="_click"
          :class="[modeClass,typeClass,shapeClass,sizeClass,colorClass,roleClass,strongClass]">
    <span class="button-inner">
      <slot></slot>
    </span>
    <div class="button-effect"></div>
  </button>
</template>
<style scoped lang="scss">
  @import './button';
  @import './button.ios';
  @import './button.md';
  @import './button.wp';
  @import './button-icon';
</style>
<script type="text/ecmascript-6">
  export default{
    props: {
      /**
       * 按钮color：primary、secondary、danger、light、dark
       * */
      color: {
        type: String,
        default: '',
      },

      /**
       * 按钮大小：large small default
       * */
      size: {
        type: String,
        default: 'default',
      },

      /**
       * 圆角还是直角：full(宽度100%无圆角)/block(宽度100%有圆角)/round(宽度auto有圆角)
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
        default: '',
      },

      /**
       * mode 按钮风格 ios/window/android/we/alipay
       * */
      mode: {
        type: String,
        default: 'ios',
      },

      /**
       * role 按钮具体角色 例如 action-sheet-button
       * */
      role: {
        type: String,
        default: '',
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
      return {}
    },
    computed: {
      // 环境样式
      modeClass: function () {
        return `button-${this.mode}`
      },
      // 颜色
      colorClass: function () {
        return !!this.color ? (`button-${this.mode}-${this.color}`) : ''
      },
      shapeClass: function () {
        // button-round
        return !!this.shape ? `button-${this.shape} button-${this.shape}-${this.mode}` : ''
      },
      sizeClass: function () {
        return !!this.size ? `button-${this.size} button-${this.size}-${this.mode}` : ''
      },
      typeClass: function () {
        if (!!this.type) {
          if (!!this.color) {
            return `button-${this.type} button-${this.type}-${this.mode} button-${this.type}-${this.mode}-${this.color}`
          } else {
            return `button-${this.type} button-${this.type}-${this.mode}`
          }
        } else {
          return ''
        }
      },
      // 按钮角色
      roleClass: function () {
        if(!!this.role){
          // action-sheet-button action-sheet-button-ios action-sheet-button-default action-sheet-button-default-ios
          return `${this.role} ${this.role}-${this.mode}`
        }else{
          return ''
        }
      },
      // button-strong
      strongClass: function () {
        return !!this.isStrong ? `button-strong-${this.mode}` : ''
      }
    },
    methods: {
      _click: function () {
        this.$emit('click', function () {
          alert('inner')
        })
      }
    },
  }
</script>

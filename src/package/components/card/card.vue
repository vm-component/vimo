<template>
    <div class="ion-card" :class="[modeClass,colorClass]">
        <slot></slot>
    </div>
</template>
<style lang="scss">
    @import "card.scss";
    @import "card.ios.scss";
    @import "card.md.scss";
</style>
<script type="text/ecmascript-6">
  export default{
    name: 'Card',
    data(){
      return {
        componentName: 'card'
      }
    },
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
    },
    watch: {},
    computed: {
      // 环境样式
      modeClass () {
        return `${this.componentName} ${this.componentName}-${this.mode}`
      },
      // 颜色
      colorClass () {
        return !!this.color ? (`${this.componentName}-${this.mode}-${this.color}`) : ''
      },
    }
  }
</script>

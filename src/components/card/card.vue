<template>
  <div class="ion-card" :class="[modeClass,colorClass]">
    <slot></slot>
  </div>
</template>
<style lang="scss">
  @import "card";
  @import "card.ios";
</style>
<script type="text/ecmascript-6">
  export default{
    name: 'ion-card',
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
        default: 'ios',
      },
    },
    watch: {},
    computed: {
      // 环境样式
      modeClass: function () {
        return `${this.componentName} ${this.componentName}-${this.mode}`
      },
      // 颜色
      colorClass: function () {
        return !!this.color ? (`${this.componentName}-${this.mode}-${this.color}`) : ''
      },
    },
    methods: {},
    created: function () {},
    mounted: function () {},
    activated: function () {},
    components: {}
  }
</script>

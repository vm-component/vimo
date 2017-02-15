<template>
  <div class="ion-badge" :class="[modeClass,colorClass]">
    <slot></slot>
  </div>
</template>
<style lang="scss">
  @import "badge";
  @import "badge.ios";
</style>
<script type="text/ecmascript-6">
  export default{
    name: 'ion-badge',
    data(){
      return {}
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
    computed: {
      // 环境样式
      modeClass: function () {
        return `badge badge-${this.mode}`
      },
      // 颜色
      colorClass: function () {
        return !!this.color ? (`badge-${this.mode}-${this.color}`) : ''
      },
    },
    methods: {},
    created: function () {},
    mounted: function () {},
    activated: function () {},
    components: {}
  }
</script>

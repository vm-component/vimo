<template>
  <div class="ion-badge" :class="[modeClass,colorClass]">
    <slot></slot>
  </div>
</template>
<style lang="scss">
  @import "badge.scss";
  @import "badge.ios.scss";
  @import "badge.md.scss";
  @import "badge.wp.scss";
</style>
<script type="text/ecmascript-6">
  export default{
    name: 'Badge',
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
        default: VM.config.get('mode') || 'ios',
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

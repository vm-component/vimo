<template>
  <div class="ion-label label" :class="[modeClass,colorClass]">
    <slot></slot>
  </div>
</template>
<style lang="scss">
  @import "label";
  @import "label.ios";
</style>
<script type="text/ecmascript-6">
  export default{
    name: 'Label',
    data(){
      return {}
    },
    props: {
      /**
       * mode 按钮风格 ios/window/android/we/alipay
       * */
      mode: {
        type: String,
        default:  VM.config.get('mode') || 'ios',
      },
      /**
       * 按钮color：primary、secondary、danger、light、dark
       * */
      color: {
        type: String,
        default: '',
      },
      /**
       * 可以是fixed/floating/stacked，这个和input与label的位置相关
       * fixed: A persistent label that sits next the input.
       * floating: A label that will float above the input if the input is empty or loses focus.
       * stacked: A stacked label will always appear on top of the input.
       * */
      //TODO: 还未做
      type: {
        type: String,
        default: null,
      }
    },
    watch: {},
    computed: {
      // 环境样式
      modeClass: function () {
        return `label-${this.mode}`
      },
      // 颜色
      colorClass: function () {
        return !!this.color ? (`label-${this.mode}-${this.color}`) : ''
      },
    },
    methods: {},
    created: function () {},
    mounted: function () {},
    activated: function () {},
    components: {}
  }
</script>

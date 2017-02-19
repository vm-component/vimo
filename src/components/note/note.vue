<template>
  <div class="ion-note" :class="[modeClass,colorClass]">
    <slot></slot>
  </div>
</template>
<style lang="scss">
  @import 'note.ios';

</style>
<script type="text/ecmascript-6">
  export default{
    name: 'Note',
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
        default:  VM.config.get('mode') || 'ios',
      },
    },
    watch: {},
    computed: {
      // 环境样式
      modeClass: function () {
        return `note note-${this.mode}`
      },
      // 颜色
      colorClass: function () {
        return !!this.color ? (`note-${this.mode}-${this.color}`) : ''
      },
    },
    methods: {},
    created: function () {},
    mounted: function () {},
    activated: function () {},
    components: {}
  }
</script>

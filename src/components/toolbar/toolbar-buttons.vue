<template>
  <div class="ion-buttons bar-buttons" :class="[modeClass]">
    <slot></slot>
  </div>
</template>
<style lang="scss">

</style>
<script type="text/ecmascript-6">
  export default{
    name: 'ion-buttons',
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
    },
    watch: {},
    computed: {
      // 环境样式
      modeClass () {
        return `bar-buttons-${this.mode}`
      },
    },
    methods: {},
    created () {},
    mounted () {},
    activated () {},
    components: {}
  }
</script>

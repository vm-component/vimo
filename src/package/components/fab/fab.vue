<template>
  <div class="ion-fab fab" ion-fab :class="[modeClass,colorClass]">
    <Icon name="close" class="fab-close-icon"></Icon>
    <span class="button-inner">
      <slot></slot>
    </span>
    <div class="button-effect"></div>
  </div>
</template>
<style scoped lang="scss">
  .main {

  }
</style>
<script type="text/ecmascript-6">
  export default{
    name: 'Fab',
    data(){
      return {}
    },
    props: {
      color: {
        type: String,
        default: '',
      },
      /**
       * 组件使用的模式: ios/md/wp/wechat
       * */
      mode: {
        type: String,
        default: VM.config.get('mode', 'ios') || 'ios',
      },
    },
    watch: {},
    computed: {
      modeClass(){
        return `fab-${this.mode}`
      },
      colorClass(){
        return !!this.color ? `fab-${this.mode}-${this.color}` : ''
      },
    },
    methods: {},
    created: function () {},
    mounted: function () {},
    activated: function () {},
    components: {}
  }
</script>

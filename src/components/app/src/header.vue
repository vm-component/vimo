<template>
  <div class="ion-header header" :class="[modeClass]">
    <slot></slot>
  </div>
</template>
<style lang="scss">

</style>
<script type="text/ecmascript-6">
  export default{
    name: 'ion-header',
    data(){
      return {}
    },
    props: {
      /**
       * The mode to apply to this component. Mode can be ios, wp, or md.
       * */
      mode: {
        type: String,
        default: 'ios',
      },
    },
    watch: {},
    computed: {
      // set the mode class name
      // ios/md/wp
      modeClass () {
        return `header-${this.mode}`
      },
    },
    methods: {},
    created () {
      // 将挂载点同步到根this上
      const _this = this;
      if (_this.$parent.$options._componentTag != 'ion-menu') {
        _this.$eventBus.$emit('$headerReady', _this);
      }
    },
    mounted () {

    },
    activated () {
    },
    beforeDestroy:function () {

    },
    components: {}
  }
</script>

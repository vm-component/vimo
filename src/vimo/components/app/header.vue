<template>
  <header class="ion-header header" :class="[modeClass]">
    <slot></slot>
  </header>
</template>
<style lang="scss">
  @import "../../themes/ionic.globals";
  .ion-header {
    position: absolute;
    top: 0;
    left: 0;
    z-index: $z-index-toolbar;
    display: block;

    width: 100%;
  }
</style>
<script type="text/ecmascript-6">
  export default{
    name: 'Header',
    data(){
      return {}
    },
    props: {
      /**
       * The mode to apply to this component. Mode can be ios, wp, or md.
       * */
      mode: {
        type: String,
        default: VM.config.get('mode') || 'ios',
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

    },
    mounted () {
      // 将挂载点同步到根this上
      this.$vnode.context.$header = this;
    },
    activated () {
    },
    beforeDestroy () {

    },
    components: {}
  }
</script>

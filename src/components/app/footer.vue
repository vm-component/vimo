<template>
  <footer class="ion-footer footer" :class="[modeClass]">
    <slot></slot>
  </footer>
</template>
<script type="text/ecmascript-6">
  export default{
    name: 'Footer',
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
        return `footer-${this.mode}`
      },
    },
    methods: {},
    created () {

    },
    mounted () {
      // 将挂载点同步到根this上
      this.$vnode.context.$footer = this;
    },
    activated () {
    },
    beforeDestroy () {
    },
    components: {}
  }
</script>

<template>
  <div class="ion-footer footer" :class="[modeClass]">
    <slot></slot>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    name: 'ion-footer',
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
      modeClass: function () {
        return `footer-${this.mode}`
      },
    },
    methods: {},
    created: function () {
      // 将挂载点同步到根this上
      const _this = this;
      if (_this.$parent.$options._componentTag === 'ion-page') {
        _this.$eventBus.$emit('$footerReady', _this);
      }
    },
    mounted: function () {

    },
    activated: function () {
    },
    beforeDestroy: function () {
    },
    components: {}
  }
</script>

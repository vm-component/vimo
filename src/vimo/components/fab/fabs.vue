<template>
  <div class="ion-fab">
    <slot></slot>
  </div>
</template>
<style  lang="scss">
  @import "fab.scss";
  @import "fab.ios.scss";


</style>
<script type="text/ecmascript-6">
  export default{
    name: 'Fabs',
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
    computed: {},
    methods: {},
    created: function () {},
    mounted: function () {},
    activated: function () {},
    components: {}
  }
</script>

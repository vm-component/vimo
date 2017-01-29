<template>
  <div class="ion-menu">
    <div class="menu-inner">
      <slot></slot>
    </div>
    <ion-backdrop></ion-backdrop>
  </div>
</template>
<style lang="scss">
  @import './menu';
  @import './menu.ios';

</style>
<script type="text/ecmascript-6">
  export default{
    name: 'ion-menu',
    data(){
      return {}
    },
    props: {},
    watch: {},
    computed: {},
    methods: {},
    created(){},
    mounted(){},
    activated(){},
    components: {}
  }
</script>

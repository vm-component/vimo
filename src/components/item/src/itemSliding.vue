<template>
  <div class="main">
    <!--<ng-content select="ion-item,[ion-item]"></ng-content>-->
    <!--<ng-content select="ion-item-options"></ng-content>-->

    <slot></slot>
  </div>
</template>
<style lang="scss">
  .main {

  }
</style>
<script type="text/ecmascript-6">

  const SWIPE_MARGIN = 30;
  const ELASTIC_FACTOR = 0.55;


  const ItemSideFlags = {
    None: 0,
    Left: 1,
    Right: 2,
    Both: 3,
  };


  export default{
    name: 'ion-item-sliding',
    data(){
      return {}
    },
    props: {},
    watch: {},
    computed: {},
    methods: {},
    created: function () {},
    mounted: function () {},
    activated: function () {},
    components: {}
  }
</script>

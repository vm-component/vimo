<template>
  <div class="iconDemo">
    <ion-icon color="primary" name="ionic"></ion-icon>
    <ion-icon color="danger" ios="ionic"></ion-icon>
    <ion-icon color="secondary" md="ionic"></ion-icon>
  </div>
</template>
<style scoped lang="scss">

  .iconDemo{
    font-size: 50px;
  }
</style>
<script type="text/ecmascript-6">
  import mixin from '../mixins/baseMethodMixin'

  export default{
    mixins: [mixin],
    data(){
      return {}
    },
    components: {
    },
  }
</script>

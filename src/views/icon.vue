<template>
  <ion-page>
    <ion-header>
      <ion-navbar>
        <ion-title>Icon</ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content padding class="iconDemo">
      <ion-icon color="primary" name="ionic"></ion-icon>
      <ion-icon color="danger" ios="ionic"></ion-icon>
      <ion-icon color="secondary" md="ionic"></ion-icon>
    </ion-content>
  </ion-page>
</template>
<style lang="scss">
  .iconDemo{
    font-size: 50px;
  }
</style>
<script type="text/ecmascript-6">
  export default{
    data(){
      return {}
    },
    components: {
    },
  }
</script>

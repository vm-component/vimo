<template>
  <ion-page>
    <ion-header>
      <ion-navbar>
        <ion-title>Spinner</ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content padding>


      <p>默认</p>
      <ion-spinner></ion-spinner>
      <ion-spinner name="ios"></ion-spinner>
      <ion-spinner name="ios-small"></ion-spinner>
      <ion-spinner name="bubbles"></ion-spinner>
      <ion-spinner name="circles"></ion-spinner>
      <ion-spinner name="crescent"></ion-spinner>
      <ion-spinner name="dots"></ion-spinner>

      <p>Mode</p>
      <span>未指定</span>
      <ion-spinner></ion-spinner>
      <span>ios</span>
      <ion-spinner mode="ios"></ion-spinner>
      <span>md</span>
      <ion-spinner mode="md"></ion-spinner>
      <span>wp</span>
      <ion-spinner mode="wp"></ion-spinner>

      <p>Color</p>
      <ion-spinner></ion-spinner>
      <ion-spinner color="primary" name="ios"></ion-spinner>
      <ion-spinner color="secondary" name="ios-small"></ion-spinner>
      <ion-spinner color="light" name="bubbles"></ion-spinner>
      <ion-spinner color="dark" name="circles"></ion-spinner>
      <ion-spinner color="primary" name="crescent"></ion-spinner>
      <ion-spinner color="secondary" name="dots"></ion-spinner>

      <!--duration-->
      <p>Duration 3000ms</p>
      <ion-spinner duration="3000"></ion-spinner>
      <ion-spinner duration="3000" name="ios"></ion-spinner>
      <ion-spinner duration="3000" name="ios-small"></ion-spinner>
      <ion-spinner duration="3000" name="bubbles"></ion-spinner>
      <ion-spinner duration="3000" name="circles"></ion-spinner>
      <ion-spinner duration="3000" name="crescent"></ion-spinner>
      <ion-spinner duration="3000" name="dots"></ion-spinner>

      <!--paused-->
      <p>Paused</p>
      <ion-spinner :paused="true"></ion-spinner>
      <ion-spinner :paused="true" name="ios"></ion-spinner>
      <ion-spinner :paused="true" name="ios-small"></ion-spinner>
      <ion-spinner :paused="true" name="bubbles"></ion-spinner>
      <ion-spinner :paused="true" name="circles"></ion-spinner>
      <ion-spinner :paused="true" name="crescent"></ion-spinner>
      <ion-spinner :paused="true" name="dots"></ion-spinner>
    </ion-content>
  </ion-page>
</template>
<style lang="scss">
</style>
<script type="text/ecmascript-6">
    export default{
        data(){
            return{}
        },
        watch:{},
        computed:{},
        methods:{},
        created:function(){},
        mounted:function(){},
        activated:function(){},
    }
</script>

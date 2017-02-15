<template>
  <ion-page>
    <ion-header>
      <ion-navbar>
        <ion-title slot="content">AvatarList</ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content class="list-avatar-page">
      <ion-list>
        <ion-list-header>
          today
        </ion-list-header>
        <ion-item>
          <ion-avatar item-left slot="item-left">
            <img src="http://ionicframework.com/dist/preview-app/www/assets/img/avatar-ts-woody.png">
          </ion-avatar>
          <h2>Woody</h2>
          <p>This town ain't big enough for the two of us!</p>
          <ion-note item-right slot="item-right">3:43 pm</ion-note>
        </ion-item>
        <ion-item>
          <ion-avatar item-left slot="item-left">
            <img src="http://ionicframework.com/dist/preview-app/www/assets/img/avatar-ts-buzz.png">
          </ion-avatar>
          <h2>Buzz Lightyear</h2>
          <p>My eyeballs could have been sucked from their sockets!</p>
          <ion-note item-right slot="item-right">1:12 pm</ion-note>
        </ion-item>
      </ion-list>

      <ion-list>
        <ion-list-header>
          yesterday
        </ion-list-header>
        <ion-item>
          <ion-avatar item-left slot="item-left">
            <img src="http://ionicframework.com/dist/preview-app/www/assets/img/avatar-ts-hamm.png">
          </ion-avatar>
          <h2>Hamm</h2>
          <p>You heard of Kung Fu? Well get ready for pork chop.</p>
          <ion-note item-right slot="item-right">11:12 pm</ion-note>
        </ion-item>
        <ion-item>
          <ion-avatar item-left slot="item-left">
            <img src="http://ionicframework.com/dist/preview-app/www/assets/img/avatar-ts-slinky.png">
          </ion-avatar>
          <h2>Slinky Dog</h2>
          <p>I may not be a smart dog, but I know what roadkill is.</p>
          <ion-note item-right slot="item-right">12:12 pm</ion-note>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>
<style scoped lang="scss">
  .list-avatar-page {
    .ion-note {
      font-size: 12px;
      -webkit-align-self: flex-start;
      -ms-flex-item-align: start;
      align-self: flex-start;
      margin-top: 14px;
    }
  }
</style>
<script type="text/ecmascript-6">
  export default{
    data(){
      return {}
    },
    watch: {},
    computed: {},
    methods: {},
    created() {},
    mounted () {},
    activated () {},
    components: {}
  }
</script>

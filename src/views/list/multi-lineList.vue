<template>
  <ion-page>
    <ion-header>
      <ion-navbar>
        <ion-title slot="content">Multi-lineList</ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-list-header>
          today
        </ion-list-header>
        <ion-item>
          <ion-avatar item-left slot="item-left">
            <img src="http://ionicframework.com/dist/preview-app/www/assets/img/avatar-ts-woody.png">
          </ion-avatar>
          <h2>Woody</h2>
          <h3>Hello world</h3>
          <p>This town ain't big enough for the two of us!</p>
        </ion-item>
        <ion-item>
          <ion-avatar item-left slot="item-left">
            <img src="http://ionicframework.com/dist/preview-app/www/assets/img/avatar-ts-buzz.png">
          </ion-avatar>
          <h2>Buzz Lightyear</h2>
          <h3>Hello world</h3>
          <p>My eyeballs could have been sucked from their sockets!</p>
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
          <h3>Hello world</h3>
          <p>You heard of Kung Fu? Well get ready for pork chop.</p>
        </ion-item>
        <ion-item>
          <ion-avatar item-left slot="item-left">
            <img src="http://ionicframework.com/dist/preview-app/www/assets/img/avatar-ts-slinky.png">
          </ion-avatar>
          <h2>Slinky Dog</h2>
          <h3>Hello world</h3>
          <p>I may not be a smart dog, but I know what roadkill is.</p>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>
<style scoped lang="scss">

</style>
<script type="text/ecmascript-6">
  import mixin from '../../mixins/baseMethodMixin'
  export default{
    mixins: [mixin],
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

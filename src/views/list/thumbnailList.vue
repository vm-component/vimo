<template>
  <ion-page>
    <ion-header>
      <ion-navbar>
        <ion-title slot="content">ThumbnailList</ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content>


      <ion-list>
        <ion-item>
          <ion-thumbnail item-left slot="item-left">
            <img src="http://ionicframework.com/dist/preview-app/www/assets/img/thumbnail-totoro.png">
          </ion-thumbnail>
          <h2>My Neighbor Totoro</h2>
          <p>Hayao Miyazaki • 1988</p>
          <ion-button ion-button type="clear" slot="item-right" item-right>View</ion-button>
        </ion-item>
        <ion-item>
          <ion-thumbnail item-left slot="item-left">
            <img src="http://ionicframework.com/dist/preview-app/www/assets/img/thumbnail-rotla.png">
          </ion-thumbnail>
          <h2>My Neighbor Totoro</h2>
          <p>Hayao Miyazaki • 1988</p>
          <ion-button ion-button type="clear" slot="item-right" item-right>View</ion-button>
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
      return {
      }
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

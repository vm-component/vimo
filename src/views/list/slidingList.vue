<template>
  <ion-page>
    <ion-header>
      <ion-navbar>
        <ion-title slot="content">SlidingList</ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content>

      <ion-list>

        <ion-list-header>
          SlidingList Demo
        </ion-list-header>

        <ion-item-sliding>
          <ion-item>
            <ion-avatar item-left slot="item-left">
              <img src="img/slimer.png">
            </ion-avatar>
            <h2>Slimer</h2>
            <p>Back off man, I'm a scientist.</p>
          </ion-item>
          <ion-item-options side="left">
            <ion-button ion-button color="primary">
              <ion-icon name="text"></ion-icon>
              Text
            </ion-button>
            <ion-button ion-button color="secondary">
              <ion-icon name="call"></ion-icon>
              Call
            </ion-button>
          </ion-item-options>
          <ion-item-options side="right">
            <ion-button ion-button color="primary">
              <ion-icon name="mail"></ion-icon>
              Email
            </ion-button>
          </ion-item-options>
        </ion-item-sliding>
      </ion-list>


    </ion-content>
  </ion-page>
</template>
<style scoped lang="scss">
  .list-avatar-page{
    .ion-note{
      font-size: 12px;
      -webkit-align-self: flex-start;
      -ms-flex-item-align: start;
      align-self: flex-start;
      margin-top: 14px;
    }
  }
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

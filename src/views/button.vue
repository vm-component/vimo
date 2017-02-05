<template>
  <ion-page>
    <ion-header>
      <ion-navbar>
        <ion-title slot="content">Button</ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content padding>
      <h4>Colors</h4>
      <ion-button @click="primary()" color="primary">primary</ion-button>
      <ion-button color="secondary" :isStrong="true">secondary</ion-button>
      <ion-button color="danger">danger</ion-button>
      <ion-button color="light">light</ion-button>
      <ion-button color="light" disabled>light</ion-button>
      <ion-button color="dark">dark</ion-button>
      <ion-button>default color</ion-button>

      <h4>Spinner</h4>
      <ion-button>
        Loading
        <ion-spinner  color="light" name="ios-small"></ion-spinner>
      </ion-button>


      <h4>Shaps</h4>
      <ion-button shape="full">full</ion-button>
      <ion-button shape="block">block</ion-button>
      <ion-button shape="round">round</ion-button>

      <h4>Type</h4>
      <!--solid-->
      <ion-button type="solid" color="secondary">solid</ion-button>
      <ion-button type="outline" color="secondary">outline</ion-button>
      <ion-button type="clear" color="secondary">clear</ion-button>


      <h4>Outline</h4>
      <ion-button type="outline" shape="full" color="secondary">outline + full</ion-button>
      <ion-button type="outline" shape="block" color="secondary">outline + block</ion-button>
      <ion-button type="outline" shape="round" color="secondary">outline + round</ion-button>

      <h4>Size</h4>
      <ion-button color="light" size="large">large</ion-button>
      <ion-button color="light" size="default">default</ion-button>
      <ion-button color="light" size="small">small</ion-button>

      <h4>Icons</h4>
      <ion-button color="dark icon-left" icon-left>
        <ion-icon class="icon" name="star"></ion-icon>
        Left Icon
      </ion-button>
      <ion-button color="dark">
        No Icon
      </ion-button>
      <ion-button icon-only color="dark">
        <ion-icon class="icon" name="star"></ion-icon>
      </ion-button>
      <ion-button icon-only color="dark">
        <ion-icon class="icon" name="star"></ion-icon>
      </ion-button>
      <ion-button color="dark icon-right" icon-right>
        Right Icon
        <ion-icon class="icon" name="star"></ion-icon>
      </ion-button>


    </ion-content>
  </ion-page>


</template>
<style scoped lang="scss">
  .buttons {
    text-align: center;

  }
</style>
<script type="text/ecmascript-6">
  import Button from '../components/button'
  import Icon from '../components/icon';
  import mixin from '../mixins/baseMethodMixin'

  export default{
    mixins: [mixin],
    data(){
      return {}
    },
    methods: {
      primary: function () {
        alert('primary');
      }
    },
    components: {
      'ion-button': Button,
      'ion-icon': Icon,
    },
  }
</script>

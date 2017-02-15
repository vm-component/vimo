<template>
  <ion-page>
    <ion-header>
      <ion-navbar>
        <ion-title slot="content">Loading</ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content padding>
      <p>Spinner type: ios/ios-small/bubbles/circles/crescent/dots</p>
      <p>1000ms</p>
      <ion-bubtton type="block" @click="showDefault()">show default</ion-bubtton>
      <ion-bubtton type="block" @click="showIos()">show ios</ion-bubtton>
      <ion-bubtton type="block" @click="showIosSmall()">show ios-small</ion-bubtton>
      <ion-bubtton type="block" @click="showBubbles()">show Bubbles</ion-bubtton>
      <ion-bubtton type="block" @click="showCircles()">show circles</ion-bubtton>
      <ion-bubtton type="block" @click="showCrescent()">show crescent</ion-bubtton>
      <ion-bubtton type="block" @click="showDots()">show dots</ion-bubtton>

      <p>showNoBackDrop</p>
      <ion-bubtton type="block" @click="showNoBackDrop()">showNoBackDrop</ion-bubtton>

      <p>showDefaultWithNoTime</p>
      <ion-bubtton type="block" @click="showDefaultWithNoTime()">3000ms</ion-bubtton>

      <p>在一个loading中定时打开另一个</p>
      <ion-bubtton type="block" @click="showOther()">show default</ion-bubtton>
      <!--<ion-bubtton type="block" @click="show2()">show default</ion-bubtton>-->

      <p>无spinner</p>
      <ion-bubtton type="block" @click="showNoSpinner()">showNoSpinner</ion-bubtton>

      <p>自定义内容</p>
      <ion-bubtton type="block" @click="showCusContent()">showCusContent</ion-bubtton>
    </ion-content>
  </ion-page>
</template>
<style scoped lang="scss">
  .loadingDemo {
    padding: 15px;
  }
</style>
<script type="text/ecmascript-6">
  import Button from '../components/button';
  import Loading from '../components/loading';
  export default{
    data(){
      return {}
    },
    watch: {},
    computed: {},
    methods: {
      showDefault: function () {
        let loading = Loading.create({
          content: 'Loading Please Wait...',
          cssClass: 'cssClass',
          showBackdrop: true,
          duration: 1000,
        });
        loading.present();
        loading.onDidDismiss(function () {
          console.debug('1 showDefault onDidDismiss')
        });
      },
      showIos: function () {
        let loading = Loading.create({
          spinner: 'ios',
          showBackdrop: true,
          duration: 1000,
          content: 'Loading Please Wait...'
        });
        loading.present();
        loading.onDidDismiss(function () {
          console.debug('2 showIos onDidDismiss')
        });
      },
      showIosSmall: function () {
        let loading = Loading.create({
          spinner: 'ios-small',
          showBackdrop: true,
          duration: 1000,
          content: 'Loading Please Wait...'
        });
        loading.present();
        loading.onDidDismiss(function () {
          console.debug('3 showIosSmall onDidDismiss')
        });
      },
      showBubbles: function () {
        let loading = Loading.create({
          spinner: 'bubbles',
          showBackdrop: true,
          duration: 1000,
          content: 'Loading Please Wait...'
        });
        loading.present();
        loading.onDidDismiss(function () {
          console.debug('4 showBubbles onDidDismiss')
        });
      },
      showCircles: function () {
        let loading = Loading.create({
          spinner: 'circles',
          showBackdrop: true,
          duration: 1000,
          content: 'Loading Please Wait...'
        });
        loading.present();
        loading.onDidDismiss(function () {
          console.debug('5 showCircles onDidDismiss')
        });
      },
      showCrescent: function () {
        let loading = Loading.create({
          spinner: 'crescent',
          showBackdrop: true,
          duration: 1000,
          content: 'Loading Please Wait...'
        });
        loading.present();
        loading.onDidDismiss(function () {
          console.debug('6 showCrescent onDidDismiss')
        });
      },
      showDots: function () {
        let loading = Loading.create({
          spinner: 'dots',
          showBackdrop: true,
          duration: 1000,
          content: 'Loading Please Wait...'
        });
        loading.present();
        loading.onDidDismiss(function () {
          console.debug('7 showDots onDidDismiss')
        });
      },

      showNoBackDrop: function () {
        let loading = Loading.create({
          spinner: 'ios',
          showBackdrop: false,
          duration: 1000,
          content: 'Loading Please Wait...'
        });
        loading.present();
        loading.onDidDismiss(function () {
          console.debug('7 showDots onDidDismiss')
        });
      },

      showDefaultWithNoTime: function () {
        let loading = Loading.create({
          content: 'Loading Please Wait...',
          cssClass: 'cssClass',
          showBackdrop: true,
        });
        loading.present();
        loading.onDidDismiss(function () {
          console.debug('showDefaultWithNoTime onDidDismiss')
        });

        setTimeout(function () {
          loading.dismiss();
        }, 3000)
      },
      //
      showOther: function () {
        let loading = Loading.create({
          content: '这个是开启的第一个',
          cssClass: 'cssClass',
          showBackdrop: true,
          duration: 1000,
        });

        loading.present();
        loading.onDidDismiss(function () {
          console.debug('show1 showDefault onDidDismiss')
        });

        //
        setTimeout(function () {
          let loading = Loading.create({
            content: '这个是再上一个的上面开启的，backdrop将不再重复开启',
            cssClass: 'cssClass',
            showBackdrop: false,
            duration: 2000,
          });
          loading.present();
          loading.onDidDismiss(function () {
            console.debug('show2 showDefault onDidDismiss')
          });
        }, 500)
      },

      showNoSpinner: function () {
        let loading = Loading.create({
          spinner: 'hide',
          content: '这个loading没有Spnner。。。',
          cssClass: 'cssClass',
          showBackdrop: true,
          duration: 1000,
        });

        loading.present();
        loading.onDidDismiss(function () {
          console.debug('show1 showDefault onDidDismiss')
        });
      },
      showCusContent: function () {
        let loading = Loading.create({
          spinner: 'hide',
          content: '<h1>Title</h1><p>Content</p>',
          cssClass: 'cssClass',
          showBackdrop: true,
          duration: 1000,
        });

        loading.present();
        loading.onDidDismiss(function () {
          console.debug('showCusContent')
        });
      }

    },
    created: function () {
    },
    mounted: function () {
    },
    activated: function () {
    },
    components: {
      'ion-bubtton': Button,
    }
  }
</script>

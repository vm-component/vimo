<template>
  <div class="toastDemo">
    <ion-button type="block" @click="toastTop()">Toast Top</ion-button>
    <ion-button type="block" @click="toastButtom()">Toast Bottom</ion-button>
    <ion-button type="block" @click="toastMiddle()">Toast Middle</ion-button>
    <ion-button type="block" @click="toastMiddleWithBtn()">Toast Middle With Button</ion-button>
    <ion-button type="block" @click="showCloseBtnToast()">Show Close Btn Toast</ion-button>


  </div>
</template>
<style scoped lang="scss">
  .toastDemo {
    text-align: center;
    padding: 30px;
  }
</style>
<script type="text/ecmascript-6">
  import Button from '../components/button';
  import Toast from '../components/toast';

  export default{
    data(){
      return {}
    },
    watch: {},
    computed: {},
    methods: {
      toastTop: function () {
        let toast = Toast.create({
          message: 'top was added successfully',
          duration: 3000,
          position: 'top'
        })
        toast.present();
        toast.onDidDismiss(function () {
          console.debug('1 onDidDismiss')
        })
      },
      toastButtom: function () {
        let toast = Toast.create({
          message: 'bottom was added successfully',
          duration: 3000,
          position: 'bottom'
        })
        toast.present();
        toast.onDidDismiss(function () {
          console.debug('2 onDidDismiss')
        })
      },
      toastMiddle: function () {
        let toast = Toast.create({
          message: 'bottom was added successfully',
          position: 'middle',
          duration: 3000,
        })
        toast.present();
        toast.onDidDismiss(function () {
          console.debug('3 onDidDismiss')
        })
      },
      toastMiddleWithBtn: function () {
        let toast = Toast.create({
          message: 'bottom was added successfully',
          position: 'middle',
          showCloseButton: true,
          closeButtonText:'OK',
        })
        toast.present();
        toast.onDidDismiss(function () {
          console.debug('4 onDidDismiss')
        })
      },
      showCloseBtnToast: function () {
        let toast = Toast.create({
          message: 'top was added successfully',
          duration: 3000,
          position: 'top',
          showCloseButton: true,
          closeButtonText:'OK',
          cssClass:'showCloseBtnToastCssClass',
        })
        toast.present();
        toast.onDidDismiss(function () {
          console.debug('5 onDidDismiss')
        })
      },

    },
    created: function () {
    },
    mounted: function () {
    },
    activated: function () {
    },
    components: {
      'ion-button': Button
    }
  }
</script>

<template>
  <div class="actionSheet">
    <br>
    <br>
    <ion-button  type="outline" shape="round" @click="showActionSheet()" color="primary">Instance_Show_ActionSheet</ion-button>
    <br>
    <br>
  </div>
</template>

<!--这个是actionsheet的模拟-->
<script type="text/ecmascript-6">
  import Button from '../components/button';
  import ActionSheet from '../components/action-sheet'
  // import Toast from './components/toast'

  export default {
    name: 'action-sheet',
    data: function () {
      return {}
    },
    methods: {
      showActionSheet: function () {
        let actionSheet = ActionSheet.create({
          title: '请选择操作',
          subTitle: '选择后不能撤销选择后不能撤销选择后不能撤销选择后不能撤销',
          cssClass: '  ActionSheetCssClass1 ActionSheetCssClass2  ',
          enableBackdropDismiss: true,
          //buttons:['1','2','3']
          buttons: [
            {
              text: '删除',
              role: 'destructive',
              icon: 'icon-Destructive',
              cssClass: '  DestructiveBtnCssClass1 DestructiveBtnCssClass2 ',
              handler: () => {
                console.log('Destructive clicked');
              }
            },
            {
              text: '翻转',
              handler: () => {
                console.log('Archive1 clicked');
              }
            },
            {
              text: '增加',
              handler: () => {
                console.log('Archive4 clicked');
              }
            },
            {
              text: '取消',
              role: 'cancel',
              handler: () => {
                actionSheet.dismiss().then(function (data) {
                  console.log('app dismiss data')
                  console.log(data)
                });
              }
            }
          ]
        });

        console.log('actionSheet')
        console.log(actionSheet)

        actionSheet.present().then(function (data) {
          console.log('ActionSheet present data')
          console.log(data)
        });
      },
    },
    components: {
      'ion-button':Button,
    },
    mounted: function () {
      // this.$on('click', function () {
      //   alert('BackDrop->bdClick')
      // })


      // Toast({
      //   message: 'hello',
      //   duration: 1000,
      // })


    }
  }

</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
  }

  body {
    position: fixed;
    width: 100%;
    height: 100%;
  }

  html {
    width: 100%;
    height: 100%;
    font-size: 62.5%;
  }

  .actionSheet {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /*position: absolute;*/
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }


</style>

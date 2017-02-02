<template>
  <ion-page>
    <ion-header>
      <ion-navbar>
        <ion-title slot="content">Action Sheet</ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content padding>

      <ion-button type="block" @click="showActionSheet1()" color="primary">
        Basic Action Sheet
      </ion-button>

      <ion-button type="block" @click="showActionSheet2()" color="primary">
        No Cancel Action Sheet
      </ion-button>


    </ion-content>
  </ion-page>
</template>

<!--这个是actionsheet的模拟-->
<script type="text/ecmascript-6">
  export default {
    name: 'action-sheet',
    data () {
      return {}
    },
    methods: {
      showActionSheet1 () {
        let actionSheet = this.$ActionSheet({
          title: '请选择操作',
          subTitle: '注意，选择后不能撤销！',
          cssClass: '  ActionSheetCssClass1 ActionSheetCssClass2  ',
          enableBackdropDismiss: true,
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

        actionSheet.present().then(function (data) {
          console.log('ActionSheet present data')
          console.log(data)
        });
      },
      showActionSheet2 () {
        let actionSheet = this.$ActionSheet({
          title: '请选择操作',
          subTitle: '注意，选择后不能撤销！',
          cssClass: '  ActionSheetCssClass1 ActionSheetCssClass2  ',
          enableBackdropDismiss: true,
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
            }
          ]
        });

        actionSheet.present().then(function (data) {
          console.log('ActionSheet present data')
          console.log(data)
        });
      },
    },
    components: {},

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

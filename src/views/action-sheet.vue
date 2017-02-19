<template>
  <Page>
    <Header>
      <Navbar>
        <Title>Action Sheet</Title>
      </Navbar>
    </Header>
    <Content padding>

      <Button type="block" @click="showActionSheet1()" color="primary">
        Basic Action Sheet
      </Button>

      <Button type="block" @click="showActionSheet2()" color="primary">
        No Cancel Action Sheet
      </Button>

    </Content>
  </Page>
</template>

<!--这个是actionsheet的模拟-->
<script type="text/ecmascript-6">
  export default{
    name: 'action-sheet',
    data () {
      return {}
    },
    methods: {
      showActionSheet1 () {
        const _this = this;
       _this.$actionSheet.present({
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
                _this.$actionSheet.dismiss().then(function (data) {
                  console.debug('promise的退出方式')
                });
              }
            }
          ]
        })
      },
      showActionSheet2 () {
        const _this = this;
       _this.$actionSheet.present({
          title: '请选择型号',
          subTitle: '必须选择, 点击backdrop不能取消',
          cssClass: '  ActionSheetCssClass1 ActionSheetCssClass2  ',
          enableBackdropDismiss: false,
          buttons: [
            {
              text: 'MacBook Pro',
              role: 'destructive',
              icon: 'icon-Destructive',
              cssClass: '  DestructiveBtnCssClass1 DestructiveBtnCssClass2 ',
              handler: () => {
                console.log('Destructive clicked');
              }
            },
            {
              text: 'MacMini',
              handler: () => {
                console.log('Archive1 clicked');
              }
            },
            {
              text: 'iPhone',
              handler: () => {
                console.log('Archive4 clicked');
              }
            }
          ]
        });
      },
    },

  }

</script>

<style lang="scss"></style>

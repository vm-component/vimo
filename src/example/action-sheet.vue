<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Action Sheet</Title>
            </Navbar>
        </Header>
        <Content padding>
            <Button block @click="showActionSheet1()" color="primary">
                <span>Basic Action Sheet</span>
            </Button>
            <Button block @click="showActionSheet2()" color="primary">
                <span>No Cancel Action Sheet</span>
            </Button>
            <Button block @click="showActionSheet3()" color="primary">
                <span> Action Sheet With Icon</span>
            </Button>

            <Button block @click="showActionSheet4()" color="primary">
                <span>Action Sheet With More Buttons</span>
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
              text: '再弹一次',
              role: 'destructive',
              cssClass: '  DestructiveBtnCssClass1 DestructiveBtnCssClass2 ',
              handler: () => {
                console.log('Destructive clicked');
                _this.$actionSheet.present({
                  title: '请选择操作',
                  subTitle: '注意，选择后不能撤销！',
                  cssClass: '  ActionSheetCssClass1 ActionSheetCssClass2  ',
                  enableBackdropDismiss: true,
                  buttons: [
                    {
                      text: '删除2',
                      role: 'destructive',
                      cssClass: '  DestructiveBtnCssClass1 DestructiveBtnCssClass2 ',
                      handler: () => {
                        console.log('Destructive clicked');
                      }
                    },
                    {
                      text: '翻转2',
                      handler: () => {
                        console.log('Archive1 clicked');
                      }
                    },
                    {
                      text: '增加2',
                      handler: () => {
                        console.log('Archive4 clicked');
                      }
                    },
                    {
                      text: '取消2',
                      role: 'cancel',
                      handler: () => {
                        _this.$actionSheet.dismiss().then(function (data) {
                          console.debug('promise的退出方式')
                        });
                      }
                    }
                  ]
                }).then(function () {
                  console.log('actionsheet2 present')
                })
              }
            },
            {
              text: '翻转',
              handler: () => {
                console.log('翻转 clicked');
              }
            },
            {
              text: '增加',
              handler: () => {
                console.log('增加 clicked');
              }
            },
            {
              text: '取消',
              role: 'cancel',
              handler: () => {
                console.debug('取消 clicked')
                _this.$actionSheet.dismiss().then(function (data) {
                  console.debug('promise的退出方式')
                });
              }
            }
          ]
        }).then(function () {
          console.log('actionsheet1 present')
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
      showActionSheet3 () {
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
              icon: 'trash',
              cssClass: '  DestructiveBtnCssClass1 DestructiveBtnCssClass2 ',
              handler: () => {
                console.log('Destructive clicked');
              }
            },
            {
              text: '分享',
              icon: 'share',
              handler: () => {
                console.log('Archive1 clicked');
              }
            },
            {
              text: '播放',
              icon: 'play',
              handler: () => {
                console.log('Archive4 clicked');
              }
            },
            {
              text: '取消',
              role: 'cancel',
              icon: 'close',
              handler: () => {
                _this.$actionSheet.dismiss().then(function (data) {
                  console.debug('promise的退出方式')
                });
              }
            }
          ]
        })
      },
      showActionSheet4 () {
        const _this = this;
        _this.$actionSheet.present({
          title: '请选择操作',
          subTitle: '这个是无脑的需求',
          enableBackdropDismiss: true,
          buttons: [

            {text: '按钮1', handler: () => {}},
            {text: '按钮2', handler: () => {}},
            {text: '按钮3', handler: () => {}},
            {text: '按钮4', handler: () => {}},
            {text: '按钮5', handler: () => {}},
            {text: '按钮6', handler: () => {}},
            {text: '按钮7', handler: () => {}},
            {text: '按钮8', handler: () => {}},
            {text: '按钮9', handler: () => {}},
            {text: '按钮10', handler: () => {}},
            {text: '按钮11', handler: () => {}},
            {text: '按钮12', handler: () => {}},
            {text: '按钮13', handler: () => {}},
            {text: '按钮14', handler: () => {}},
            {text: '按钮15', handler: () => {}},
            {text: '按钮16', handler: () => {}},
            {text: '按钮17', handler: () => {}},
            {text: '按钮18', handler: () => {}},
            {text: '按钮19', handler: () => {}},
            {text: '按钮20', handler: () => {}},

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
    },

  }

</script>

<style lang="scss"></style>

<template>
    <Page>
        <Header>
            <Navbar>
                <Title>{{$t('title')}}</Title>
            </Navbar>
        </Header>
        <Content padding>
            <Button block @click="showActionSheet1()" color="primary">
                <span>{{$t('btn1')}}</span>
            </Button>
            <Button block @click="showActionSheet2()" color="primary">
                <span>{{$t('btn2')}}</span>
            </Button>
            <Button block @click="showActionSheet3()" color="primary">
                <span>{{$t('btn3')}}</span>
            </Button>
            <Button block @click="showActionSheet4()" color="primary">
                <span>{{$t('btn4')}}</span>
            </Button>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus architecto blanditiis debitis dolores, magnam magni minus, molestiae odio
                perspiciatis possimus quam, quibusdam reiciendis repellat sint veniam. Blanditiis eaque excepturi quaerat.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus architecto blanditiis debitis dolores, magnam magni minus, molestiae odio
                perspiciatis possimus quam, quibusdam reiciendis repellat sint veniam. Blanditiis eaque excepturi quaerat.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus architecto blanditiis debitis dolores, magnam magni minus, molestiae odio
                perspiciatis possimus quam, quibusdam reiciendis repellat sint veniam. Blanditiis eaque excepturi quaerat.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus architecto blanditiis debitis dolores, magnam magni minus, molestiae odio
                perspiciatis possimus quam, quibusdam reiciendis repellat sint veniam. Blanditiis eaque excepturi quaerat.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus architecto blanditiis debitis dolores, magnam magni minus, molestiae odio
                perspiciatis possimus quam, quibusdam reiciendis repellat sint veniam. Blanditiis eaque excepturi quaerat.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus architecto blanditiis debitis dolores, magnam magni minus, molestiae odio
                perspiciatis possimus quam, quibusdam reiciendis repellat sint veniam. Blanditiis eaque excepturi quaerat.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus architecto blanditiis debitis dolores, magnam magni minus, molestiae odio
                perspiciatis possimus quam, quibusdam reiciendis repellat sint veniam. Blanditiis eaque excepturi quaerat.</p>
        </Content>
    </Page>
</template>
<script type="text/javascript">
  export default {
    name: 'DemoActionSheet',
    i18n: {
      messages: {
        'zh-CN': {
          title: '选择单',
          btn1: '最简单的',
          btn2: '没有Cancel的Actionsheet',
          btn3: '带有Icon的Actionsheet',
          btn4: 'Button很多',
          cancelText: '取消',
          deleteText: '删除',
          shareText: '分享',
          playText: '播放',
          chooseAction: '请选择操作',
          noRevoke: '注意，选择后不能撤销！',
          chooseType: '请选择型号',
          manyBtn: '这里按钮很多, 请滚动选择!'
        },
        'en-US': {
          title: 'Action Sheet',
          btn1: 'Simplest',
          btn2: 'ActionSheet without Cancel',
          btn3: 'ActionSheet with Icon',
          btn4: 'A lot of Button',
          cancelText: 'Cancel',
          deleteText: 'Delete',
          shareText: 'Share',
          playText: 'Play',
          chooseAction: 'Please select operation',
          noRevoke: 'Note that it cannot be revoked after selection!',
          chooseType: 'Please select a model',
          manyBtn: 'There are many buttons here, please scroll!'
        }
      }
    },
    data () {
      return {}
    },
    methods: {
      showActionSheet1 () {
        const _this = this
        _this.$actionSheet.present({
          title: this.$t('chooseAction'),
          subTitle: this.$t('noRevoke'),
          cssClass: '  ActionSheetCssClass1 ActionSheetCssClass2  ',
          enableBackdropDismiss: true,
          buttons: [
            {
              text: 'Another Sheet',
              role: 'destructive',
              cssClass: 'DestructiveBtnCssClass1 DestructiveBtnCssClass2 ',
              handler: () => {
                _this.$actionSheet.present({
                  title: this.$t('chooseAction'),
                  subTitle: this.$t('noRevoke'),
                  cssClass: 'ActionSheetCssClass1 ActionSheetCssClass2  ',
                  enableBackdropDismiss: true,
                  buttons: [
                    {
                      text: 'Delete',
                      role: 'destructive',
                      cssClass: '  DestructiveBtnCssClass1 DestructiveBtnCssClass2 ',
                      handler: () => {
                        console.log('删除2 clicked')
                      }
                    },
                    {
                      text: 'Text1',
                      handler: () => {
                        console.log('苹果 clicked')
                      }
                    },
                    {
                      text: 'Text2',
                      handler: () => {
                        console.log('香蕉 clicked')
                      }
                    },
                    {
                      text: 'Not Sure',
                      role: 'cancel',
                      handler: () => {
                        console.log('不确定 clicked')
                      }
                    }
                  ]
                }).then(function () {
                  console.log('actionsheet2 present')
                })
              }
            },
            {
              text: 'Text1',
              handler: () => {
                console.log('翻转 clicked')
              }
            },
            {
              text: 'Text2',
              handler: () => {
                console.log('增加 clicked')
              }
            },
            {
              text: this.$t('cancelText'),
              role: 'cancel',
              handler: () => {
                console.debug('取消 clicked')
              }
            }
          ]
        }).then(function () {
          console.log('请选择操作 present promise')
        })
      },
      showActionSheet2 () {
        const _this = this
        _this.$actionSheet.present({
          title: this.$t('chooseType'),
          subTitle: this.$t('noRevoke'),
          cssClass: '  ActionSheetCssClass1 ActionSheetCssClass2  ',
          enableBackdropDismiss: false,
          buttons: [
            {
              text: 'MacBook Pro',
              cssClass: '  DestructiveBtnCssClass1 DestructiveBtnCssClass2 ',
              handler: () => {
                console.log('MacBook Pro clicked')
              }
            },
            {
              text: 'MacMini',
              handler: () => {
                console.log('MacMini clicked')
              }
            },
            {
              text: 'iPhone',
              handler: () => {
                console.log('iPhone clicked')
              }
            }
          ]
        })
      },
      showActionSheet3 () {
        const _this = this
        _this.$actionSheet.present({
          title: this.$t('chooseAction'),
          subTitle: this.$t('noRevoke'),
          cssClass: '  ActionSheetCssClass1 ActionSheetCssClass2  ',
          enableBackdropDismiss: true,
          buttons: [
            {
              text: this.$t('deleteText'),
              role: 'destructive',
              icon: 'trash',
              cssClass: '  DestructiveBtnCssClass1 DestructiveBtnCssClass2 ',
              handler: () => {
                console.log('删除 clicked')
              }
            },
            {
              text: this.$t('shareText'),
              icon: 'share',
              handler: () => {
                console.log('分享 clicked')
              }
            },
            {
              text: this.$t('playText'),
              icon: 'play',
              handler: () => {
                console.log('播放 clicked')
              }
            },
            {
              text: this.$t('cancelText'),
              role: 'cancel',
              icon: 'close',
              handler: () => {
                _this.$actionSheet.dismiss().then(function (data) {
                  console.debug('取消 promise的退出方式')
                })
              }
            }
          ]
        })
      },
      showActionSheet4 () {
        const _this = this
        _this.$actionSheet.present({
          title: this.$t('chooseAction'),
          subTitle: this.$t('manyBtn'),
          enableBackdropDismiss: true,
          buttons: [
            {text: 'Btn1', handler: () => {}},
            {text: 'Btn2', handler: () => {}},
            {text: 'Btn3', handler: () => {}},
            {text: 'Btn4', handler: () => {}},
            {text: 'Btn5', handler: () => {}},
            {text: 'Btn6', handler: () => {}},
            {text: 'Btn7', handler: () => {}},
            {text: 'Btn8', handler: () => {}},
            {text: 'Btn9', handler: () => {}},
            {text: 'Btn10', handler: () => {}},
            {text: 'Btn11', handler: () => {}},
            {text: 'Btn12', handler: () => {}},
            {text: 'Btn13', handler: () => {}},
            {text: 'Btn14', handler: () => {}},
            {text: 'Btn15', handler: () => {}},
            {text: 'Btn16', handler: () => {}},
            {text: 'Btn17', handler: () => {}},
            {text: 'Btn18', handler: () => {}},
            {text: 'Btn19', handler: () => {}},
            {text: 'Btn20', handler: () => {}},
            {
              text: this.$t('cancelText'),
              role: 'cancel',
              handler: () => {
                _this.$actionSheet.dismiss().then(function (data) {
                  console.debug('promise的退出方式')
                })
              }
            }
          ]
        })
      }
    }
  }
</script>

<style lang="scss"></style>

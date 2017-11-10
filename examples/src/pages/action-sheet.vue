<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Action Sheet</Title>
            </Navbar>
        </Header>
        <Content padding>
            <h5>ActionSheet确认单组件</h5>
            <p>如果按钮组超过9个，则原生组件无法实现，只能使用H5组件</p>
            <Button block @click="showActionSheet1()" color="primary">
                <span>最简单的</span>
            </Button>
            <Button block @click="showActionSheet2()" color="primary">
                <span>没有Cancel的Actionsheet</span>
            </Button>
            <Button block @click="showActionSheet3()" color="primary">
                <span>带有Icon的Actionsheet</span>
            </Button>

            <Button block @click="showActionSheet4()" color="primary">
                <span>Button很多</span>
            </Button>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus architecto blanditiis debitis dolores, magnam magni minus, molestiae odio perspiciatis possimus quam, quibusdam reiciendis repellat sint veniam. Blanditiis eaque excepturi quaerat.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus architecto blanditiis debitis dolores, magnam magni minus, molestiae odio perspiciatis possimus quam, quibusdam reiciendis repellat sint veniam. Blanditiis eaque excepturi quaerat.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus architecto blanditiis debitis dolores, magnam magni minus, molestiae odio perspiciatis possimus quam, quibusdam reiciendis repellat sint veniam. Blanditiis eaque excepturi quaerat.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus architecto blanditiis debitis dolores, magnam magni minus, molestiae odio perspiciatis possimus quam, quibusdam reiciendis repellat sint veniam. Blanditiis eaque excepturi quaerat.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus architecto blanditiis debitis dolores, magnam magni minus, molestiae odio perspiciatis possimus quam, quibusdam reiciendis repellat sint veniam. Blanditiis eaque excepturi quaerat.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus architecto blanditiis debitis dolores, magnam magni minus, molestiae odio perspiciatis possimus quam, quibusdam reiciendis repellat sint veniam. Blanditiis eaque excepturi quaerat.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus architecto blanditiis debitis dolores, magnam magni minus, molestiae odio perspiciatis possimus quam, quibusdam reiciendis repellat sint veniam. Blanditiis eaque excepturi quaerat.</p>
        </Content>
    </Page>
</template>
<script type="text/javascript">
  export default {
    name: 'action-sheet',
    data () {
      return {}
    },
    methods: {
      showActionSheet1 () {
        const _this = this
        _this.$actionSheet.present({
          title: '请选择操作',
          subTitle: '注意，选择后不能撤销！',
          cssClass: '  ActionSheetCssClass1 ActionSheetCssClass2  ',
          enableBackdropDismiss: true,
          buttons: [
            {
              text: '再弹一次',
              role: 'destructive',
              cssClass: 'DestructiveBtnCssClass1 DestructiveBtnCssClass2 ',
              handler: () => {
                console.log('再弹一次 clicked')
                _this.$actionSheet.present({
                  title: '请选择操作',
                  subTitle: '注意，选择后不能撤销！',
                  cssClass: 'ActionSheetCssClass1 ActionSheetCssClass2  ',
                  enableBackdropDismiss: true,
                  buttons: [
                    {
                      text: '删除',
                      role: 'destructive',
                      cssClass: '  DestructiveBtnCssClass1 DestructiveBtnCssClass2 ',
                      handler: () => {
                        console.log('删除2 clicked')
                      }
                    },
                    {
                      text: '苹果',
                      handler: () => {
                        console.log('苹果 clicked')
                      }
                    },
                    {
                      text: '香蕉',
                      handler: () => {
                        console.log('香蕉 clicked')
                      }
                    },
                    {
                      text: '不确定',
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
              text: '翻转',
              handler: () => {
                console.log('翻转 clicked')
              }
            },
            {
              text: '增加',
              handler: () => {
                console.log('增加 clicked')
              }
            },
            {
              text: '取消',
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
          title: '请选择型号',
          subTitle: '必须选择, 点击backdrop不能取消',
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
                console.log('删除 clicked')
              }
            },
            {
              text: '分享',
              icon: 'share',
              handler: () => {
                console.log('分享 clicked')
              }
            },
            {
              text: '播放',
              icon: 'play',
              handler: () => {
                console.log('播放 clicked')
              }
            },
            {
              text: '取消',
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
          title: '请选择操作',
          subTitle: '这里按钮很多, 请滚动选择!',
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
                })
              }
            }
          ]
        })
      }
    }
  }
</script>

<style lang="less"></style>

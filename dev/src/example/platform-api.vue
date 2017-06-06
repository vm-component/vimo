<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Alipay API Test</Title>
            </Navbar>
        </Header>
        <Content padding class="outer-content">
            <h5>
                <span>当前平台：</span>
                <small>{{$platform.platforms().join(' -> ')}}</small>
            </h5>


            <h5>界面组件</h5>

            <Button small @click="openToast">打开Toast</Button>
            <Button small @click="openActionSheet">打开ActionSheet</Button>
            <Button small @click="openAlert">打开Alert</Button>
            <Button small @click="openConfirm">打开Confirm</Button>
            <Button small @click="openLoading">打开Loading</Button>


        </Content>
    </Page>
</template>
<style scoped lang="scss">

</style>
<script type="text/javascript">
  export default{
    name: 'name',
    data () {
      return {}
    },
    props: {},
    watch: {},
    computed: {},
    methods: {
      openToast () {
        this.$platform.do('toast', {
          message: '这里弹出的是弱提示',
          duration: 3000,
          onDismiss () {
            console.debug('Toast 关闭')
          }
        })
      },
      openActionSheet () {
        this.$platform.do('actionSheet', {
          title: '请选择操作',
          buttons: [
            {
              text: '再弹一次',
              role: 'destructive',
              handler: () => {
                console.log('再弹一次 clicked')
                this.$platform.do('actionSheet', {
                  title: '请选择操作',
                  buttons: [
                    {
                      text: '苹果',
                      handler: () => {
                        console.log('苹果 clicked')
                      }
                    },
                    {
                      text: '柠檬',
                      handler: () => {
                        console.log('柠檬 clicked')
                      }
                    },
                    {
                      text: '土豆',
                      handler: () => {
                        console.log('土豆 clicked')
                      }
                    },
                    {
                      text: '关闭',
                      role: 'cancel',
                      handler: () => {
                        console.debug('关闭 clicked')
                      }
                    }
                  ]
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
                console.log('取消 clicked')
              }
            }
          ]
        }).then(function () {
          console.log('actionsheet 开启')
        })
      },
      openAlert () {
        this.$platform.do('alert', {
          title: '温馨提示',
          message: '您的快递到了！',
          buttons: [
            {
              text: '确定',
              handler: () => {
                console.log('确定 clicked')
              }
            }
          ]
        })
      },
      openConfirm () {
        this.$platform.do('confirm', {
          title: '温馨提示',
          message: '您是否想查询快递单号：\n1234567890',
          buttons: [
            {
              text: '暂不需要',
              role: 'cancel',
              handler: () => {
                console.log('暂不需要 click')
              }
            },
            {
              text: '马上查询',
              handler: () => {
                console.log('马上查询 click')
              }
            }
          ]
        })
      },

      openLoading () {
        this.$platform.do('loading', {
          content: '正在加载'
        })

        window.setTimeout(() => {
          this.$platform.do('loading.dismiss')
        }, 3000)
      }
    },
    created () {},
    mounted () {},
    activated () {},
    deactivate () {},
    components: {},
    destroyed () {}
  }
</script>

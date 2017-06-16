<template>
    <Page>
        <Header>
            <Navbar ref="navbar">
                <Title ref="title">Alipay API Test</Title>
            </Navbar>
        </Header>
        <Content padding class="outer-content">
            <h5>
                <span>当前平台：</span>
                <small>{{$platform.platforms().join(' -> ')}}</small>
            </h5>

            <h5>界面组件</h5>

            <Button block @click="openToast">打开Toast</Button>
            <Button block @click="openActionSheet">打开ActionSheet</Button>
            <Button block @click="openAlert">打开Alert</Button>
            <Button block @click="openConfirm">打开Confirm</Button>
            <Button block @click="openPrompt">打开Prompt</Button>
            <Button block @click="openLoading">打开Loading</Button>

            <h5>导航栏</h5>

            <Button block @click="btnTitle">设置标题文字</Button>
            <Button block @click="btnImage">设置标题图片(url)</Button>
            <Button block @click="btnBgColor">设置导航栏背景色</Button>
            <Button block @click="btnBorderColor">设置导航栏底边颜色</Button>
            <Button block @click="btnReset">重置导航栏</Button>

            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, aliquid animi cumque cupiditate dolorem earum eligendi ipsa modi nobis possimus, provident quis quod reprehenderit sunt tempora ut veritatis, voluptas. Laboriosam.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, aliquid animi cumque cupiditate dolorem earum eligendi ipsa modi nobis possimus, provident quis quod reprehenderit sunt tempora ut veritatis, voluptas. Laboriosam.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, aliquid animi cumque cupiditate dolorem earum eligendi ipsa modi nobis possimus, provident quis quod reprehenderit sunt tempora ut veritatis, voluptas. Laboriosam.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, aliquid animi cumque cupiditate dolorem earum eligendi ipsa modi nobis possimus, provident quis quod reprehenderit sunt tempora ut veritatis, voluptas. Laboriosam.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, aliquid animi cumque cupiditate dolorem earum eligendi ipsa modi nobis possimus, provident quis quod reprehenderit sunt tempora ut veritatis, voluptas. Laboriosam.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, aliquid animi cumque cupiditate dolorem earum eligendi ipsa modi nobis possimus, provident quis quod reprehenderit sunt tempora ut veritatis, voluptas. Laboriosam.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, aliquid animi cumque cupiditate dolorem earum eligendi ipsa modi nobis possimus, provident quis quod reprehenderit sunt tempora ut veritatis, voluptas. Laboriosam.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, aliquid animi cumque cupiditate dolorem earum eligendi ipsa modi nobis possimus, provident quis quod reprehenderit sunt tempora ut veritatis, voluptas. Laboriosam.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, aliquid animi cumque cupiditate dolorem earum eligendi ipsa modi nobis possimus, provident quis quod reprehenderit sunt tempora ut veritatis, voluptas. Laboriosam.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, aliquid animi cumque cupiditate dolorem earum eligendi ipsa modi nobis possimus, provident quis quod reprehenderit sunt tempora ut veritatis, voluptas. Laboriosam.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, aliquid animi cumque cupiditate dolorem earum eligendi ipsa modi nobis possimus, provident quis quod reprehenderit sunt tempora ut veritatis, voluptas. Laboriosam.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, aliquid animi cumque cupiditate dolorem earum eligendi ipsa modi nobis possimus, provident quis quod reprehenderit sunt tempora ut veritatis, voluptas. Laboriosam.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, aliquid animi cumque cupiditate dolorem earum eligendi ipsa modi nobis possimus, provident quis quod reprehenderit sunt tempora ut veritatis, voluptas. Laboriosam.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, aliquid animi cumque cupiditate dolorem earum eligendi ipsa modi nobis possimus, provident quis quod reprehenderit sunt tempora ut veritatis, voluptas. Laboriosam.</p>
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
    computed: {
      titleComponent () {
        return this.$refs.title
      },
      navbarComponent () {
        return this.$refs.navbar
      }
    },
    methods: {
      // 界面组件部分
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
        this.$alert.present({
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
        this.$alert.present({
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
      openPrompt () {
        this.$alert.present({
          title: '登录iTunes Store',
          message: '请输入您Apple ID"apple@icloud.com"的密码',
          enableBackdropDismiss: true,
          inputs: [
            {
              type: 'password',
              name: 'password',
              placeholder: '密码',
              value: ''
            }
          ],
          buttons: [
            {
              text: '取消',
              role: 'cancel',
              handler: () => {}
            },
            {
              text: '确定',
              handler: (value) => {
                this.$alert.present({
                  title: '请确认',
                  message: '您输入的信息：' + JSON.stringify(value),
                  cssClass: '',
                  enableBackdropDismiss: true,
                  buttons: [
                    {
                      text: '确定',
                      role: 'cancel',
                      handler: (value) => {
                        this.$alert.dismiss().then(function () {
                          console.log('Alert 确定 click')
                        })
                      }
                    }
                  ]
                }).then(function () {
                  console.log('Alert present promise')
                })
              }
            }
          ]
        }).then(function () {
          console.log('Input present!')
        })
      },
      openLoading () {
        this.$platform.do('loading', {
          content: '正在加载'
        })

        window.setTimeout(() => {
          this.$platform.do('loading.dismiss')
        }, 3000)
      },

      // 导航栏部分
      btnTitle () {
        this.titleComponent.setTitle('支付宝-AlipayJSAPI', true)
      },
      btnImage () {
        this.titleComponent.setTitle({
          image: 'https://zos.alipayobjects.com/rmsportal/jFCQxeOXeKTQUfhrQFOo.png'
        })
      },
      btnBgColor () {
        this.titleComponent.setTitle('设置导航栏背景色', true)
        this.navbarComponent.setBackgroundColor('#ED4A4D')
      },
      btnBorderColor () {
        this.titleComponent.setTitle('设置导航栏底部边框色', true)
        this.navbarComponent.setBorderBottomColor('#108ee9')
      },
      btnReset () {
        this.titleComponent.setTitle('重置导航栏样式', true)
        this.navbarComponent.reset()
        this.titleComponent.reset()
      }
    },
    mounted () {
      this.$platform.on('titleClick', () => {
        alert('点击了顶部title, 确定后取消绑定')
        this.$platform.off('titleClick')
      })

//      window.ap.showNavigationBarLoading();
    },
    activated () {},
    deactivate () {},
    components: {},
    destroyed () {}
  }
</script>

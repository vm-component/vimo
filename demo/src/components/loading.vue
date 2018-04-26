<template>
    <Page>
        <Header>
            <Navbar>
                <Title :title="$t('title')"></Title>
            </Navbar>
        </Header>
        <Content padding>
            <p>{{$t('onlySpinner')}}</p>
            <Button block @click="spinnerOnly()">{{$t('open')}}</Button>
            <p>{{$t('onlyString')}}</p>
            <Button block @click="stringOnly()">{{$t('open')}}</Button>
            <p>{{$t('closeWhenPageChange')}}</p>
            <Button block @click="showDefault()">{{$t('open')}}(Default)</Button>
            <Button block @click="dismissWhenChangeUrl()">{{$t('open')}}</Button>
            <p>{{$t('type')}}: ios/ios-small/bubbles/circles/crescent/dots</p>
            <Button block @click="showIos()">{{$t('show')}} ios</Button>
            <Button block @click="showIosSmall()">{{$t('show')}} ios-small</Button>
            <Button block @click="showBubbles()">{{$t('show')}} Bubbles</Button>
            <Button block @click="showCircles()">{{$t('show')}} circles</Button>
            <Button block @click="showCrescent()">{{$t('show')}} crescent</Button>
            <Button block @click="showDots()">{{$t('show')}} dots</Button>

            <p>{{$t('noBackdrop')}}</p>
            <Button block @click="showNoBackDrop()">{{$t('open')}}</Button>

            <p>{{$t('openContinue')}}</p>
            <Button block @click="showOther()">{{$t('open')}}</Button>

            <p>{{$t('noSpinner')}}</p>
            <Button block @click="showNoSpinner()">{{$t('open')}}</Button>

            <p>{{$t('customer')}}</p>
            <Button block @click="showCusContent()">{{$t('open')}}</Button>

        </Content>
    </Page>
</template>
<style lang="scss">
    .loadingDemo {
        padding: 15px;
    }

    .customer-loading {
        text-align: center;
        .loading-box {
            text-align: center;
            img {
                height: 80px;
            }
        }
        p {
            text-align: center;
            margin: 0;
        }
    }
</style>
<script type="text/javascript">

  import loadinImg from '../assets/customer-loading.gif'

  export default {
    data () {
      return {}
    },
    i18n: {
      messages: {
        'zh-CN': {
          title: '加载提示',
          open: '打开Loading',
          onlySpinner: '只有Spinner',
          onlyString: '只传入String',
          closeWhenPageChange: '控制页面切换是否关闭loading',
          type: '类型',
          show: '显示',
          noBackdrop: '不显示Backdrop',
          openContinue: '在一个loading中定时打开另一个',
          noSpinner: '没有旋转样式',
          customer: '自定义内容'

        },
        'en-US': {
          title: 'Loading',
          open: 'Open Loading',
          onlySpinner: 'Only Spinner',
          onlyString: 'Only String',
          closeWhenPageChange: 'Control page switching is off loading',
          type: 'Type',
          show: 'Show',
          noBackdrop: 'Does not show Backdrop',
          openContinue: 'To open another one regularly during a loading',
          noSpinner: 'No rotation style',
          customer: 'Custom content'
        }
      }
    },
    methods: {
      // 只显示菊花
      spinnerOnly () {
        this.$loading.present()
        setTimeout(() => {
          this.$loading.dismiss().then(() => {
            console.debug('dismiss in promise success!')
          })
        }, 1000)
      },
      // 是显示name
      stringOnly () {
        this.$loading.present('只传入了String')
        setTimeout(() => {
          this.$loading.dismiss().then(() => {
            console.debug('dismiss in promise success!')
          })
        }, 1000)
      },

      // 普通的
      showDefault () {
        this.$loading.present({
          content: '正在加载, 6000ms后自动关闭...',
          dismissOnPageChange: false, // url变化后关闭loading(默认)
          showBackdrop: true
        })
        setTimeout(() => {
          this.$loading.dismiss().then(() => {
            console.debug('dismiss in promise success!')
          })
        }, 6000)
      },
      dismissWhenChangeUrl () {
        this.$loading.present({
          content: '正在加载, 6000ms后自动关闭...',
          dismissOnPageChange: true, // url变化后关闭loading
          showBackdrop: true
        })
        setTimeout(() => {
          this.$loading.dismiss().then(() => {
            console.debug('dismiss in promise success!')
          })
        }, 6000)
      },
      showIos () {
        this.$loading.present({
          spinner: 'ios',
          content: '正在加载, 1000ms后自动关闭...',
          cssClass: 'cssClass',
          dismissOnPageChange: true, // url变化后关闭loading
          showBackdrop: true
        })
        setTimeout(() => {
          this.$loading.dismiss().then(() => {
            console.debug('dismiss in promise success!')
          })
        }, 1000)
      },
      showIosSmall () {
        this.$loading.present({
          spinner: 'ios-small',
          content: '正在加载, 1000ms后自动关闭...',
          cssClass: 'cssClass',
          dismissOnPageChange: true, // url变化后关闭loading
          showBackdrop: true
        })
        setTimeout(() => {
          this.$loading.dismiss().then(() => {
            console.debug('dismiss in promise success!')
          })
        }, 1000)
      },
      showBubbles () {
        this.$loading.present({
          spinner: 'bubbles',
          content: '正在加载, 1000ms后自动关闭...',
          cssClass: 'cssClass',
          dismissOnPageChange: true, // url变化后关闭loading
          showBackdrop: true
        })
        setTimeout(() => {
          this.$loading.dismiss().then(() => {
            console.debug('dismiss in promise success!')
          })
        }, 1000)
      },
      showCircles () {
        this.$loading.present({
          spinner: 'circles',
          content: '正在加载, 1000ms后自动关闭...',
          cssClass: 'cssClass',
          dismissOnPageChange: true, // url变化后关闭loading
          showBackdrop: true
        })
        setTimeout(() => {
          this.$loading.dismiss().then(() => {
            console.debug('dismiss in promise success!')
          })
        }, 1000)
      },
      showCrescent () {
        this.$loading.present({
          spinner: 'crescent',
          content: '正在加载, 1000ms后自动关闭...',
          cssClass: 'cssClass',
          dismissOnPageChange: true, // url变化后关闭loading
          showBackdrop: true
        })
        setTimeout(() => {
          this.$loading.dismiss().then(() => {
            console.debug('dismiss in promise success!')
          })
        }, 1000)
      },
      showDots () {
        this.$loading.present({
          spinner: 'dots',
          content: '正在加载, 1000ms后自动关闭...',
          cssClass: 'cssClass',
          dismissOnPageChange: true, // url变化后关闭loading
          showBackdrop: true
        })
        setTimeout(() => {
          this.$loading.dismiss().then(() => {
            console.debug('dismiss in promise success!')
          })
        }, 1000)
      },

      // 打开没backdrop的loading
      showNoBackDrop () {
        this.$loading.present({
          content: '正在加载, 1000ms后自动关闭...',
          cssClass: 'cssClass',
          dismissOnPageChange: true, // url变化后关闭loading
          showBackdrop: false
        })
        setTimeout(() => {
          this.$loading.dismiss().then(() => {
            console.debug('dismiss in promise success!')
          })
        }, 1000)
      },

      // 同时开启两个
      showOther () {
        // 第一个
        this.$loading.present({
          content: '正在加载, 这个是开启的第一个, 没有Backdrop.',
          cssClass: 'cssClass',
          showBackdrop: false
        })

        // 第二个
        setTimeout(() => {
          this.$loading.present({
            content: '正在加载, 这个是开启的第二个, 打开Backdrop.',
            cssClass: 'cssClass',
            showBackdrop: true
          })

          // 第三个
          setTimeout(() => {
            this.$loading.present({
              content: '正在加载, 这个是开启的第三个, 没有Backdrop.',
              cssClass: 'cssClass',
              showBackdrop: false
            })
            setTimeout(() => {
              this.$loading.dismiss().then(() => {
                console.debug('所有Loading都关闭了')
              })
            }, 2000)
          }, 2000)
        }, 2000)
      },

      // 没有spinner
      showNoSpinner () {
        this.$loading.present({
          spinner: 'hide',
          content: '正在加载, 这个loading没有Spnner.',
          cssClass: 'cssClass',
          showBackdrop: true
        })
        setTimeout(() => {
          this.$loading.dismiss().then(() => {
            console.debug('dismiss in promise success!')
          })
        }, 1000)
      },

      // 自定义内容
      showCusContent () {
        this.$loading.present({
          spinner: 'hide',
          content: `<div class="loading-box"><img src="${loadinImg}"><p>Loading</p></div>`,
          cssClass: 'customer-loading',
          showBackdrop: true
        })
        setTimeout(() => {
          this.$loading.dismiss().then(() => {
            console.debug('dismiss in promise success!')
          })
        }, 3000)
      }
    }
  }
</script>

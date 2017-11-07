<template>
    <vm-page>
        <vm-header>
            <vm-navbar>
                <vm-title>Loading</vm-title>
            </vm-navbar>
        </vm-header>
        <vm-content padding>
            <p>显示不同的旋转样式, 默认打开Backdrop</p>

            <p>只有Spinner</p>
            <vm-button block @click="spinnerOnly()">点击打开</vm-button>
            <p>只传入string</p>
            <vm-button block @click="stringOnly()">点击打开默认Loading</vm-button>
            <vm-button block @click="stringOnlyH5Only()">点击打开默认Loading(强制使用H5模式)</vm-button>
            <p>控制页面切换是否关闭loading</p>


            <vm-button block @click="showDefault()">页面切换不关闭loading(默认)</vm-button>
            <vm-button block @click="dismissWhenChangeUrl()">页面切换关闭loading</vm-button>

            <p>类型有: ios/ios-small/bubbles/circles/crescent/dots</p>
            <vm-button block @click="showIos()">显示 ios</vm-button>
            <vm-button block @click="showIosSmall()">显示 ios-small</vm-button>
            <vm-button block @click="showBubbles()">显示 Bubbles</vm-button>
            <vm-button block @click="showCircles()">显示 circles</vm-button>
            <vm-button block @click="showCrescent()">显示 crescent</vm-button>
            <vm-button block @click="showDots()">显示 dots</vm-button>

            <p>不显示Backdrop</p>
            <vm-button block @click="showNoBackDrop()">不显示Backdrop</vm-button>


            <p>在一个loading中定时打开另一个</p>
            <vm-button block @click="showOther()">连续开启</vm-button>

            <p>没有旋转样式(NoSpinner)</p>
            <vm-button block @click="showNoSpinner()">showNoSpinner</vm-button>

            <p>自定义内容</p>
            <vm-button block @click="showCusContent()">showCusContent</vm-button>

        </vm-content>
    </vm-page>
</template>
<style scoped lang="less">
    .loadingDemo {
        padding: 15px;
    }
</style>
<script type="text/javascript">

  export default {
    data () {
      return {}
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

      stringOnlyH5Only () {
        this.$loading.present({
          content: '只传入了String',
          isH5: true
        })
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
          content: '<p>你好Vimo</p>',
          cssClass: 'cssClass',
          showBackdrop: true
        })
        setTimeout(() => {
          this.$loading.dismiss().then(() => {
            console.debug('dismiss in promise success!')
          })
        }, 1000)
      }
    }
  }
</script>

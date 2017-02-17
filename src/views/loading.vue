<template>
  <ion-page>
    <ion-header>
      <ion-navbar>
        <ion-title>Loading</ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content padding>
      <p>显示不同的旋转样式, 默认打开Backdrop</p>
      <p>类型有: ios/ios-small/bubbles/circles/crescent/dots</p>
      <ion-button type="block" @click="showDefault()">点击打开默认Loading</ion-button>
      <ion-button type="block" @click="showIos()">显示 ios</ion-button>
      <ion-button type="block" @click="showIosSmall()">显示 ios-small</ion-button>
      <ion-button type="block" @click="showBubbles()">显示 Bubbles</ion-button>
      <ion-button type="block" @click="showCircles()">显示 circles</ion-button>
      <ion-button type="block" @click="showCrescent()">显示 crescent</ion-button>
      <ion-button type="block" @click="showDots()">显示 dots</ion-button>

      <p>不显示Backdrop</p>
      <ion-button type="block" @click="showNoBackDrop()">不显示Backdrop</ion-button>


      <p>在一个loading中定时打开另一个</p>
      <ion-button type="block" @click="showOther()">连续开启</ion-button>

      <p>没有旋转样式(NoSpinner)</p>
      <ion-button type="block" @click="showNoSpinner()">showNoSpinner</ion-button>

      <p>自定义内容</p>
      <ion-button type="block" @click="showCusContent()">showCusContent</ion-button>
    </ion-content>
  </ion-page>
</template>
<style scoped lang="scss">
  .loadingDemo {
    padding: 15px;
  }
</style>
<script type="text/ecmascript-6">
  export default{
    data(){
      return {}
    },
    methods: {
      // 普通的
      showDefault () {
        const _this = this;
        _this.$loading.present({
          content: '正在加载, 4000ms后自动关闭...',
          cssClass: 'cssClass',
          dismissOnPageChange:true, // url变化后关闭loading
          showBackdrop: true,
        });
        setTimeout(function () {
          _this.$loading.dismiss().then(function () {
            console.debug('dismiss in promise success!')
          })
        },4000);
      },
      showIos () {
        const _this = this;
        _this.$loading.present({
          spinner: 'ios',
          content: '正在加载, 1000ms后自动关闭...',
          cssClass: 'cssClass',
          dismissOnPageChange:true, // url变化后关闭loading
          showBackdrop: true,
        });
        setTimeout(function () {
          _this.$loading.dismiss().then(function () {
            console.debug('dismiss in promise success!')
          })
        },1000);
      },
      showIosSmall () {
        const _this = this;
        _this.$loading.present({
          spinner: 'ios-small',
          content: '正在加载, 1000ms后自动关闭...',
          cssClass: 'cssClass',
          dismissOnPageChange:true, // url变化后关闭loading
          showBackdrop: true,
        });
        setTimeout(function () {
          _this.$loading.dismiss().then(function () {
            console.debug('dismiss in promise success!')
          })
        },1000);
      },
      showBubbles () {
        const _this = this;
        _this.$loading.present({
          spinner: 'bubbles',
          content: '正在加载, 1000ms后自动关闭...',
          cssClass: 'cssClass',
          dismissOnPageChange:true, // url变化后关闭loading
          showBackdrop: true,
        });
        setTimeout(function () {
          _this.$loading.dismiss().then(function () {
            console.debug('dismiss in promise success!')
          })
        },1000);
      },
      showCircles () {
        const _this = this;
        _this.$loading.present({
          spinner: 'circles',
          content: '正在加载, 1000ms后自动关闭...',
          cssClass: 'cssClass',
          dismissOnPageChange:true, // url变化后关闭loading
          showBackdrop: true,
        });
        setTimeout(function () {
          _this.$loading.dismiss().then(function () {
            console.debug('dismiss in promise success!')
          })
        },1000);
      },
      showCrescent () {
        const _this = this;
        _this.$loading.present({
          spinner: 'crescent',
          content: '正在加载, 1000ms后自动关闭...',
          cssClass: 'cssClass',
          dismissOnPageChange:true, // url变化后关闭loading
          showBackdrop: true,
        });
        setTimeout(function () {
          _this.$loading.dismiss().then(function () {
            console.debug('dismiss in promise success!')
          })
        },1000);
      },
      showDots () {
        const _this = this;
        _this.$loading.present({
          spinner: 'dots',
          content: '正在加载, 1000ms后自动关闭...',
          cssClass: 'cssClass',
          dismissOnPageChange:true, // url变化后关闭loading
          showBackdrop: true,
        });
        setTimeout(function () {
          _this.$loading.dismiss().then(function () {
            console.debug('dismiss in promise success!')
          })
        },1000);
      },

      // 打开没backdrop的loading
      showNoBackDrop () {
        const _this = this;
        _this.$loading.present({
          content: '正在加载, 1000ms后自动关闭...',
          cssClass: 'cssClass',
          dismissOnPageChange:true, // url变化后关闭loading
          showBackdrop: false,
        });
        setTimeout(function () {
          _this.$loading.dismiss().then(function () {
            console.debug('dismiss in promise success!')
          })
        },1000);
      },

      // 同时开启两个
      showOther () {
        const _this = this;
        _this.$loading.present({
          content: '正在加载, 这个是开启的第一个, 没有Backdrop.',
          cssClass: 'cssClass',
          showBackdrop: false,
        });

        setTimeout(function () {
          _this.$loading.present({
            content: '正在加载, 这个是开启的第二个, 打开Backdrop.',
            cssClass: 'cssClass',
            showBackdrop: true,
          });
          setTimeout(function () {
            _this.$loading.dismiss().then(function () {
              console.debug('全部的Loading都关闭了!')
            })
          },2000)
        },2000)
      },

      // 没有spinner
      showNoSpinner () {
        const _this = this;
        _this.$loading.present({
          spinner: 'hide',
          content: '正在加载, 这个loading没有Spnner.',
          cssClass: 'cssClass',
          showBackdrop: true,
        });
        setTimeout(function () {
          _this.$loading.dismiss().then(function () {
            console.debug('dismiss in promise success!')
          })
        },1000);
      },

      // 自定义内容
      showCusContent () {
        const _this = this;
        _this.$loading.present({
          spinner: 'hide',
          content: '<p>你好Vimo</p>',
          cssClass: 'cssClass',
          showBackdrop: true,
        });
        setTimeout(function () {
          _this.$loading.dismiss().then(function () {
            console.debug('dismiss in promise success!')
          })
        },1000);
      }
    },
  }
</script>

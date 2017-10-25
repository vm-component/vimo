<template>
    <Page>
        <Header>
            <Navbar ref="navbar" color="primary">
                <Title ref="title" @onTitleClick="onTitleClickHandler">API Test</Title>
                <Buttons right slot="buttons">
                    <Button @click="personHandler" role="bar-button">
                        <Icon name="icon-vue"></Icon>
                    </Button>
                    <Button @click="showPopMenu" role="bar-button">
                        <Icon name="icon-vimo"></Icon>
                    </Button>
                </Buttons>
            </Navbar>
        </Header>
        <Content padding class="outer-content">
            <h1>跨平台组件</h1>
            <p>第一点, 并不是所有组件都支持跨平台. 跨平台是指使用H5的组件能打开其余平台的UI控件. 比如: H5使用Alert组件在业务中书写, 如果配置正确, 则在钉钉和支付宝中打开平台对应的alert组件.</p>
            <p>所以, <strong>其他平台支持的UI控件 + 能用H5实现的 = 跨平台组件</strong></p>
            <p>以下是能实现化平台的组件Demo.</p>

            <h4>弹窗组件</h4>
            <!--提示框 Alert-->
            <strong>提示框 Alert</strong>
            <Button block @click="openAlert()">Alert</Button>
            <strong>结果</strong>
            <p class="result">{{alertResult}}</p>
            <!--确认框 Confirm-->
            <strong>确认框 Confirm</strong>
            <Button block @click="openConfirm">Confirm</Button>
            <strong>结果</strong>
            <p class="result">{{confirmResult}}</p>
            <!--输入框 Prompt-->
            <strong>输入框 Prompt</strong>
            <Button block @click="openPrompt">Prompt</Button>
            <strong>结果</strong>
            <p class="result">{{promptResult}}</p>
            <!--震动 Vibrate-->
            <strong>震动 Vibrate(Android Only)</strong>
            <Button block @click="vibrate">Vibrate</Button>
            <strong>结果</strong>
            <p class="result">{{vibrateResult}}</p>
            <!--等待 Loading-->
            <strong>等待 Loading</strong>
            <Button block @click="openLoading">Loading</Button>
            <strong>结果</strong>
            <p class="result">{{loadingResult}}</p>
            <!--弱提示 Toast-->
            <strong>弱提示 Toast</strong>
            <Button block @click="openToast">Toast</Button>
            <strong>结果</strong>
            <p class="result">{{toastResult}}</p>
            <!--选择器 ActionSheet-->
            <strong>选择器 ActionSheet</strong>
            <Button block @click="openActionSheet">ActionSheet</Button>
            <strong>结果</strong>
            <p class="result">{{actionsheetResult}}</p>

            <h5>导航栏</h5>
            <Button block @click="btnTitle">设置标题文字</Button>
            <Button block @click="btnImage">设置标题图片(url)</Button>
            <Button block @click="showOptionButton">显示右侧按钮</Button>
            <Button block @click="hideOptionButton">隐藏右侧按钮</Button>
            <Button block @click="btnReset">重置导航栏</Button>
            <Button block @click="showPopMenu">显示右侧按钮菜单</Button>

            <h5>选择器Picker</h5>
            <p>选择的数据: {{smoothie}}</p>
            <Button block @click="oneColumns">单列Picker</Button>
            <Button block @click="twoColumns">双列Picker</Button>

            <h5>图片预览</h5>
            <Button block @click="openAlbum">图片预览</Button>
            <h5>城市选择</h5>
            <Button block @click="$router.push({name:'chooseCity'})">城市选择</Button>

        </Content>
    </Page>
</template>
<style scoped lang="less">

    .result {
        border: 1px dashed #333;
        min-height: 20px;
        border-radius: 3px;
        overflow-y: scroll;
        white-space: pre-line;
        margin: 0 0 20px;
    }

    .icon-vue {
        height: 30px;
        width: 30px;
        box-sizing: content-box;
        background: url('http://cn.vuejs.org/images/logo.png') no-repeat left center/30px 30px;
    }

    .icon-more {
        height: 30px;
        width: 30px;
        box-sizing: content-box;
        background: url('https://avatars0.githubusercontent.com/u/26055200?v=3&s=200') no-repeat left center/30px 30px;
    }

    .icon-vimo {
        height: 30px;
        width: 30px;
        background: url('../assets/vimo.png') no-repeat center center/30px 30px;
    }

    .icon-alipay {
        height: 30px;
        width: 40px;
        background: url('../assets/alipay.png') no-repeat center center/cover;
    }

    .icon-wechat {
        height: 30px;
        width: 36px;
        background: url('../assets/wechat.png') no-repeat center center/cover;
    }
</style>
<script type="text/javascript">
  export default {
    name: 'name',
    data () {
      return {
        platformName: 'H5',
        smoothie: `Banana Watermelon`,

        // result
        alertResult: '',
        confirmResult: '',
        promptResult: '',
        vibrateResult: '',
        loadingResult: '',
        toastResult: '',
        actionsheetResult: '',

        test: ''
      }
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
      toDDTestPage () {
        this.$router.push({
          useNewWindow: true,
          name: 'crossPlatform.dd'
        })
      },
      // 点击navbar由此第一个vue的icon
      personHandler () {
        const _this = this
        this.$alert.present({
          title: '快上车',
          message: '老司机要开车了, 系好安全带!',
          buttons: [
            {
              text: '系好了',
              handler: () => {
                _this.alertResult = '系好了 clicked'
              }
            }
          ]
        })
      },
      /**
       * 弹窗组件
       * */
      openAlert () {
        const _this = this
        this.$alert.present({
          title: '温馨提示',
          message: '您的快递到了！',
          buttons: [
            {
              text: '确定',
              handler: () => {
                _this.alertResult = '系好了 clicked'
              }
            }
          ]
        })
      },
      openConfirm () {
        const _this = this
        this.$alert.present({
          title: '温馨提示',
          message: '您是否想查询快递单号：\n1234567890',
          buttons: [
            {
              text: '暂不需要',
              role: 'cancel',
              handler: () => {
                _this.confirmResult = '暂不需要 click'
              }
            },
            {
              text: '马上查询',
              handler: () => {
                _this.confirmResult = '马上查询 click'
              }
            }
          ]
        })
      },
      openPrompt () {
        const _this = this
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
              handler: () => {
                _this.promptResult = '取消 clicked'
              }
            },
            {
              text: '确定',
              handler: (value) => {
                _this.promptResult = `${JSON.stringify(value)}`
              }
            }
          ]
        }).then(() => {
          console.log('Input present!')
        })
      },
      vibrate () {
        const _this = this
        window.dd && window.dd.device.notification.vibrate({
          duration: 300,
          onSuccess (data) {
            _this.vibrateResult = `onSuccess: ${JSON.stringify(data)}`
          },
          onFail (error) {
            _this.vibrateResult = `onFail: ${JSON.stringify(error)}`
          }
        })
      },
      openLoading () {
        this.$loading.present({
          content: '正在加载'
        }).then(() => {
          this.loadingResult = `Loading打开成功, 3000ms后关闭`
        })
        window.setTimeout(() => {
          this.$loading.dismiss('loading.dismiss').then(() => {
            this.loadingResult = `Loading关闭成功`
          })
        }, 3000)
      },
      openToast () {
        const _this = this
        _this.toastResult = 'Toast 开启, 3000ms后关闭'
        this.$toast({
          type: 'success',
          message: '支付成功',
          duration: 3000,
          onDismiss () {
            _this.toastResult = 'Toast 关闭'
          }
        })
      },

      openActionSheet () {
        const _this = this
        this.$actionSheet.present({
          title: '请选择操作',
          buttons: [
            {
              text: '再弹一次',
              role: 'destructive',
              handler: () => {
                _this.actionsheetResult = '再弹一次 clicked'
              }
            },
            {
              text: '翻转',
              handler: () => {
                _this.actionsheetResult = '翻转 clicked'
              }
            },
            {
              text: '增加',
              handler: () => {
                _this.actionsheetResult = '增加 clicked'
              }
            },
            {
              text: '取消',
              role: 'cancel',
              handler: () => {
                _this.actionsheetResult = '取消 clicked'
              }
            }
          ]
        }).then(function () {
          _this.actionsheetResult = 'ActionSheet 开启 clicked'
        })
      },

      /**
       * 导航栏部分
       * */
      btnTitle () {
        this.titleComponent.setTitle('Hello Vimo', true)
      },
      btnImage () {
        this.titleComponent.setTitle({
          image: 'https://raw.githubusercontent.com/vm-component/vimo/master/examples/static/img/searchbar-fake.png'
        })
      },
      btnReset () {
        this.titleComponent.setTitle('重置导航栏样式', true)
        this.navbarComponent.reset()
        this.titleComponent.reset()
      },
      showPopMenu () {
        let data = [
          {
            title: '周边美食',
            icon: 'https://zos.alipayobjects.com/rmsportal/mzorSIxVEdkTuxumzzau.png',
            badge: '-1',
            handler () {
              console.log('index:0 选择了: 周边美食')
            }
          },
          {
            title: '购物攻略',
            icon: 'https://zos.alipayobjects.com/rmsportal/UoBNIZJosEXNQtAxCEUg.png',
            badge: '100',
            handler () {
              console.log('index:1 选择了: 购物攻略')
            }
          },
          {
            title: '摄影技巧',
            icon: 'https://zos.alipayobjects.com/rmsportal/QJeWMNUFFiDCQawMLPTr.png',
            badge: '12',
            handler () {
              console.log('index:2 选择了: 摄影技巧')
            }
          },
          {
            title: '搞笑段子',
            icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAQlBMVEUAAAC/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7++vr6/v78Ycp3SAAAAFXRSTlMAEPAwwCDQYEDgsIBwkJ+gf1CPb09zkeEOAAAFLUlEQVR42rzZ25KrIBAF0M0dFWM02f//qyeTmgpliaj05KzXaGgutjTikIGAg5iaIRAjpOIAgSQPIE0QGAdIDRYCdoSU1RDQFlKkQTNDQiiSAc0CGSGTSMEqnMgEmZ7s0Kwje8iQgkVg+AKRmRSM4sCXGRITXzwaeb5MEFCaPxyaOP7QEAh8G9Fk5FtAO0tJJzTfLJo5/poFw0c6QRL41TUmAeEQRH6klhz6EdFEeX5o1fAAfXRK2j7pDS4x67sbInCeKzrigqi50hlco27c6N3p4Htu3BzOMzfNklvECfHGEn0zOEUFz13dw6HKPTru8kHhgAs9D/iH22/d80AfKj2Ii+cp3fLcdEU9l46n+HssxP5cLC/xSzD4ZcLieYldng7Z3LOJnRWgZssm/QxkJvX62u0p4iOmnlfoPhhsmXR2DYwRG3E8uwaSwS6X/HHru/eb4xh8cjjgUuVfdG59LwZdiT23Xhen+rKp20slU8R5rhDC5GR3S9+GBhcYzRXvBPuB3H5zBL5tR9Kt22+PoFOSquBtaKzLhJWBlXRBafGuGFHUhZA3xc18fU/s4uN+f0RXHwIvrw0nFKiHz3uUYoSTvDZUfDOFX+6azPS9EIKpDJ/sfCBv++uFQ5eHTzQHY+Uhz/Rcrs8DIJ0Dc9i+t8VkZfii/v6UTHmu9ApQI6nVF07JhsIkTlzpP1nLFq4cIBO3pbnjmstZK25L9Pj3Z8U91/KV9IWzYinLcm7I1KexbbDaQ2q05eyYhXwiwvT33wvSVJuBvFdwuvTiG4e//2ZkubE846KLB3pphpQKm2e7ZvvVTCxijVXb74ZyghH4CssKje/rWWHxfYEVCd+nWGEgIZ8Dj//BcVeEkAv/irWzXUlBIACgxV6AoN331v//6nQnMzEGLFAkcx59EOICtZA9EVmduYreeuMTFC5rS0Qy/Cg4g/5YTVNs0liSBurUZol2HvkCb7uyqSTVqO7KazC9N5VFjZmNiksm1+/LBLp8mZvPC8rh6YRU1TyufwoiHjOjKNjhS1IUKcTVKSx2r73Vh2elIoO4PAUwuMS4oGEePsOwi9tYy0Nlals7l3f+r+T/O54oNri27ExzLaVejnkDDPv+RajComfBC2yUxZM6b18/iD/bV9CSrvKNT2C+PQH9T7A2AU9T+fYEAk2UiidQfgPR0SxS6fpCQAfqJWkKrxY6OBREdxqUpAmsEPJ44SzZWUAkepqMAOEshIzlVq0sPUobgBcdxb1zWlsjF0mPka9aLIvnu2EuWk9Dkiiri8cSpq1vVCZJGrRHa4FLo9LZVimipyH+XwyR2ZgMmc16Dy9GGuS5kUZ4Lm42S7g1umNDHl+0uLjIXbhwf/Ry/LIRZ9q5g3Brb38+vUS7pmGK9lTJlSfdY7DE0CF+Bz/KPZm0o5o31Bh8xZj0QYwR6+0zoanG9VXfrIFBKKnG99aepIMhb6pzUPDMNnIXeqrzl8pvm4BbTOBykpJn19PLzHa1moZ0TrJP4XJ2jFCViJN/oZdwmjiJqX5x/FtBh99MPC+YHh2nKPOVcNPUhHAqUQcZNoeidpZAU4/En1vpJfXHe/vIWmtL3bxonH2ZTCpgKZpMQYOjqRw0LTTRAh1WmmaFLokmSQN9qenvf/7fKNXVs3zjRk70iZUetQq4ynl6jHfQxPYkxvPjgaBuWDBwH1oaZBHGODs0vINxapV0i1wVPIQPMvn+yrg75SKZDDxOLZq66KhgFoyrJoZdIwqYTeESo/6gv/RHigsquO4PrWwzz9ROC40AAAAASUVORK5CYII=',
            badge: '0',
            handler () {
              console.log('index:3 选择了: 搞笑段子')
            }
          }
        ]
        this.navbarComponent.showPopMenu(data)
      },
      showOptionButton () {
        this.navbarComponent.showOptionButton()
      },
      hideOptionButton () {
        this.navbarComponent.hideOptionButton()
      },
      onTitleClickHandler () {
        alert('你点击了 platform-api.vue 页面的标题')
      },
      oneColumns () {
        let arr = this.smoothie.split(' ')
        let column1 = arr[0]
        if (!column1) {
          column1 = ''
        }

        let options = [
          {text: 'Mango'},
          {text: 'Banana'},
          {text: 'Cherry'},
          {text: 'Strawberry'},
          {text: 'Raspberry'},
          {text: 'Blueberry'},
          {text: 'Peach'},
          {text: 'Coconut'},
          {text: 'Pineapple'},
          {text: 'Honeydew'},
          {text: 'Watermelon'},
          {text: 'Grape'},
          {text: 'Avocado'},
          {text: 'Kiwi'},
          {text: 'Orange'},
          {text: 'Papaya'}
        ]
        let data = {
          buttons: [
            {
              text: '取消',
              role: 'cancel'
            },
            {
              text: '确定',
              handler: (data) => {
                this.smoothie = `${data.flavor1.value}`
              }
            }
          ],
          columns: [
            {
              name: 'flavor1',
              align: 'right',
              selectedIndex: options.indexOf(options.filter((item) => item.toString().toLowerCase() === column1.toLowerCase())),
              options
            }
          ]
        }

        this.$picker.present(data)
      },
      twoColumns () {
        let arr = this.smoothie.split(' ')

        let data = {
          buttons: [
            {
              text: '取消',
              role: 'cancel'
            },
            {
              text: '确定',
              handler: (data) => {
                this.smoothie = `${data.flavor1.value} ${data.flavor2.value}`
                console.log(data)
                console.log(data)
                console.log(JSON.stringify(data))
              }
            }
          ],
          columns: [
            {
              name: 'flavor1',
              align: 'right',
              selectedIndex: 1,
              options: [
                {text: 'Mango'},
                {text: 'Banana'},
                {text: 'Cherry'},
                {text: 'Strawberry'},
                {text: 'Raspberry'},
                {text: 'Blueberry'},
                {text: 'Peach'},
                {text: 'Coconut'},
                {text: 'Pineapple'},
                {text: 'Honeydew'},
                {text: 'Watermelon'},
                {text: 'Grape'},
                {text: 'Avocado'},
                {text: 'Kiwi'},
                {text: 'Orange'},
                {text: 'Papaya'}
              ]
            },
            {
              name: 'flavor2',
              align: 'left',
              selectedIndex: 3,
              options: [
                {text: 'Banana'},
                {text: 'Orange'},
                {text: 'Grape'},
                {text: 'Watermelon'},
                {text: 'Strawberry'},
                {text: 'Papaya'},
                {text: 'Kiwi'},
                {text: 'Cherry'},
                {text: 'Raspberry'},
                {text: 'Mango'},
                {text: 'Pineapple'},
                {text: 'Peach'},
                {text: 'Avocado'},
                {text: 'Honeydew'},
                {text: 'Blueberry'},
                {text: 'Coconut'}
              ]
            }
          ]
        }

        arr.forEach((item, index) => {
          let options = data.columns[index].options
          for (let i = 0, len = options.length; len > i; i++) {
            if (options[i].text === item) {
              data.columns[index].selectedIndex = i
            }
          }
        })
        this.$picker.present(data)
      },
      openAlbum () {
        this.$previewImage.present({
          current: 1,
          urls: [
            'https://img.alicdn.com/tps/TB1sXGYIFXXXXc5XpXXXXXXXXXX.jpg',
            'https://img.alicdn.com/tps/TB1pfG4IFXXXXc6XXXXXXXXXXXX.jpg',
            'https://img.alicdn.com/tps/TB1h9xxIFXXXXbKXXXXXXXXXXXX.jpg'
          ]
        })
      }
    },
    mounted () {
      let platforms = this.$platform.platforms()
      if (platforms.length === 3) {
        this.platformName = platforms[2].toUpperCase()
      }
    },
    activated () {},
    deactivate () {},
    destroyed () {}
  }
</script>

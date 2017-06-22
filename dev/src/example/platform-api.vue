<template>
    <Page>
        <Header>
            <Navbar ref="navbar" color="primary">
                <Title ref="title" @onTitleClick="onTitleClickHandler">API Test</Title>
                <Buttons right slot="buttons">
                    <Button color="dark" @click="personHandler" role="bar-button">
                        <Icon name="icon-vue"></Icon>
                    </Button>
                    <Button @click="moreHandler" color="dark" role="bar-button">
                        <Icon name="help"></Icon>
                    </Button>
                </Buttons>
            </Navbar>
        </Header>
        <Content padding class="outer-content">
            <h5>
                当前平台：{{platformName}}
            </h5>
            <p>Vimo框架会识别当前的平台 <strong>根据平台提供的JSSDK开启特定平台的组件</strong>, 比如下方列出的组件会根据平台展现不同的特性, <strong>默认使用H5模式</strong>, 目前支持Alipay和Dingtalk两个平台, 你可以试下在这两个平台打开这个页面体验下面的设置方法.
            </p>

            <h5 text-danger class="text-danger">弹窗组件</h5>
            <Button block @click="openToast">打开Toast</Button>
            <Button block @click="openActionSheet">打开ActionSheet</Button>
            <Button block @click="openAlert">打开Alert</Button>
            <Button block @click="openConfirm">打开Confirm</Button>
            <Button block @click="openPrompt">打开Prompt</Button>
            <Button block @click="openLoading">打开Loading</Button>

            <h5>导航栏</h5>
            <Button block @click="btnTitle">设置标题文字</Button>
            <Button block @click="btnImage">设置标题图片(url)</Button>
            <Button block @click="btnReset">重置导航栏</Button>

            <h5>导航栏菜单</h5>
            <Button block @click="showPopMenu">显示右侧按钮菜单</Button>
            <h5>选择器Picker</h5>
            <h5>图片</h5>
        </Content>
    </Page>
</template>
<style scoped lang="scss">
    .icon-vue {
        height: 30px;
        width: 30px;
        box-sizing: content-box;
        background: url('http://cn.vuejs.org/images/logo.png') no-repeat left center/30px 30px;
    }

    .icon-vimo {
        height: 30px;
        width: 30px;
        background: url('../assets/img/vimo.png') no-repeat center center/30px 30px;
    }

    .icon-alipay {
        height: 30px;
        width: 40px;
        background: url('../assets/img/alipay.png') no-repeat center center/cover;
    }

    .icon-wechat {
        height: 30px;
        width: 36px;
        background: url('../assets/img/wechat.png') no-repeat center center/cover;
    }
</style>
<script type="text/javascript">
  import { Badge } from 'vimo/components/badge'
  export default{
    name: 'name',
    data () {
      return {
        platformName: 'H5'
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
      personHandler () {
        alert('person')
      },
      moreHandler () {
        alert('more')
      },
      /**
       * 弹窗组件
       * */
      openToast () {
        this.$toast({
          type: 'success',
          message: '支付成功',
          duration: 3000,
          onDismiss () {
            console.debug('Toast 关闭')
          }
        })
      },
      openActionSheet () {
        this.$actionSheet.present({
          title: '请选择操作',
          buttons: [
            {
              text: '再弹一次',
              role: 'destructive',
              handler: () => {
                console.log('再弹一次 clicked')
                this.$actionSheet.present({
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
          console.log('actionsheet 开启 promise')
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
        this.$loading.present({
          content: '正在加载'
        })

        window.setTimeout(() => {
          this.$loading.dismiss('loading.dismiss')
        }, 3000)
      },

      /**
       * 导航栏部分
       * */
      btnTitle () {
        this.titleComponent.setTitle('Hello Vimo', true)
      },
      btnImage () {
        this.titleComponent.setTitle({
          image: 'https://zos.alipayobjects.com/rmsportal/jFCQxeOXeKTQUfhrQFOo.png'
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
            type: 'filter',
            title: 'filter'
          },
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
      onTitleClickHandler () {
        alert('你点击了 platform-api.vue 页面的标题')
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
    components: {Badge},
    destroyed () {}
  }
</script>

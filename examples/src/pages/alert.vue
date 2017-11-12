<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Alert</Title>
            </Navbar>
        </Header>
        <Content padding>
            <h5>对话框</h5>
            <p>如果没有原生支持的情况下使用H5组件，组件使用H5接口指纹。</p>
            <Button block @click="alert()">Alert</Button>
            <Button color="danger" block @click="confirm()">Confirm</Button>
            <Button color="secondary" block @click="threeBtn()">Three Button</Button>
            <Button color="dark" block @click="input()">Input</Button>
            <Button color="dark" block @click="checkbox()">Checkbox</Button>
            <Button color="primary" block @click="radio()">Radio</Button>
            <Button color="primary" block @click="image()">Image</Button>
            <article>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem consequatur debitis deleniti doloribus eius laborum magni maiores maxime, molestias quidem. Amet esse excepturi, facilis illum magnam nulla quo repudiandae vero.</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem consequatur debitis deleniti doloribus eius laborum magni maiores maxime, molestias quidem. Amet esse excepturi, facilis illum magnam nulla quo repudiandae vero.</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem consequatur debitis deleniti doloribus eius laborum magni maiores maxime, molestias quidem. Amet esse excepturi, facilis illum magnam nulla quo repudiandae vero.</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem consequatur debitis deleniti doloribus eius laborum magni maiores maxime, molestias quidem. Amet esse excepturi, facilis illum magnam nulla quo repudiandae vero.</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem consequatur debitis deleniti doloribus eius laborum magni maiores maxime, molestias quidem. Amet esse excepturi, facilis illum magnam nulla quo repudiandae vero.</p>
            </article>
        </Content>
    </Page>
</template>
<style lang="less">
    .alertCssOuterMain {
        .alert-image-box {
            display: flex;
            justify-content: center;
            align-items: center;
            padding-top: 16px;
            .alert-image {
                height: 100px;
                width: 100px;
            }
        }
    }
</style>
<script type="text/javascript">
  export default {
    name: 'AlertDemo',
    data () {
      return {}
    },
    watch: {},
    computed: {},
    methods: {
      alert () {
        this.$alert.present({
          title: 'Alert',
          message: '这是一个警告框. ',
          enableBackdropDismiss: true,
          buttons: [
            {
              text: '确定',
              role: '',
              handler: (value) => {
                console.log('Alert 确定 click')
              }
            }
          ]
        })
      },
      confirm () {
        this.$alert.present({
          title: 'Confirm',
          message: '这个是一个确认对话框, 包含取消按钮.',
          cssClass: 'alertCssOuterMain',
          enableBackdropDismiss: true,
          buttons: [
            {
              text: '取消',
              role: 'cancel',
              icon: 'icon-Destructive',
              cssClass: '',
              handler: () => {
                console.debug('Confirm 取消 click')
              }
            },
            {
              text: '确定',
              role: '',
              handler: () => {
                this.$alert.dismiss().then(function () {
                  console.debug('Confirm 确定 click')
                })
              }
            }
          ]
        })
      },
      threeBtn () {
        this.$alert.present({
          title: '三个按钮',
          message: '当传入的button超过三个时, 则纵向显示, 且这个message也可以传入html结构',
          enableBackdropDismiss: false,
          buttons: [
            {
              text: '不清楚',
              role: '',
              handler: () => {
                console.debug('Three 不清楚 click')
              }
            },
            {
              text: '取消',
              role: 'cancel',
              handler: () => {
                console.debug('Three 取消 click')
              }
            },
            {
              text: '确定',
              role: '',
              handler: () => {
                this.$alert.dismiss().then(function (data) {
                  console.debug('Three 确定 click')
                })
              }
            }
          ]
        })
        // threeBtn.present()
      },
      input () {
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
      checkbox () {
        this.$alert.present({
          title: '水果来了',
//          subTitle: '<small>必须选择不能取消</small>',
          message: '选择你喜欢吃的水果',
          enableBackdropDismiss: true,
          inputs: [
            {
              type: 'checkbox',
              value: 'apple',
              label: '苹果',
              checked: true,
              handler: function (val) {
                console.log('checkbox1 clicked')
                console.log(val)
              }
            },
            {
              type: 'checkbox',
              value: 'pear',
              label: '梨',
              checked: false,
              disabled: true,
              handler: function (val) {
                console.log('checkbox2 clicked')
                console.log(val)
              }
            },
            {
              type: 'checkbox',
              value: 'banana',
              label: '香蕉',
              checked: true,
              handler: function (val) {
                console.log('checkbox3 clicked')
                console.log(val)
              }
            },
            {
              type: 'checkbox',
              value: 'orange',
              label: '橘子',
              checked: false,
              handler: function (val) {
                console.log('checkbox4 clicked')
                console.log(val)
              }
            }
          ],
          buttons: [
            {
              text: '取消',
              role: 'cancel',
              handler: () => {
                console.log('必须选择')
                this.$toast('必须选择')
                return false
              }
            },
            {
              text: '确定',
              role: '',
              handler: (value) => {
                this.$alert.dismiss().then((msg) => {
                  this.$alert.present({
                    title: '请确认',
                    message: '您输入的信息：' + JSON.stringify(value),
                    cssClass: '',
                    enableBackdropDismiss: true,
                    buttons: [
                      {
                        text: '确定',
                        role: '',
                        handler: (value) => {}
                      }
                    ]
                  })
                })
              }
            }
          ]
        })
      },
      radio () {
        this.$alert.present({
          title: '水果来了',
          message: '你只能选择一个',
          enableBackdropDismiss: true,
          inputs: [
            {
              type: 'radio',
              value: 'apple',
              label: '苹果',
              checked: true,
              handler: function (val) {
                console.log('radio clicked')
                console.log(val)
              }
            },
            {
              type: 'radio',
              value: 'pear',
              label: '梨',
              checked: false,
              disabled: true,
              handler: function (val) {
                console.log('radio2 clicked')
                console.log(val)
              }
            },
            {
              type: 'radio',
              value: 'banana',
              label: '香蕉',
              checked: false,
              handler: function (val) {
                console.log('radio3 clicked')
                console.log(val)
              }
            },
            {
              type: 'radio',
              value: 'orange',
              label: '橘子',
              checked: false,
              handler: (val) => {
                console.log('radio4 clicked')
                console.log(val)
              }
            }
          ],
          buttons: [
            {
              text: '取消',
              role: 'cancel',
              handler: () => {
                console.log('必须选择')
                return false
              }
            },
            {
              text: '确定',
              role: '',
              handler: (value) => {
                this.$alert.dismiss().then((msg) => {
                  this.$alert.present({
                    title: '请确认',
                    message: '您输入的信息：' + JSON.stringify(value),
                    cssClass: '',
                    enableBackdropDismiss: true,
                    buttons: [
                      {
                        text: '确定',
                        role: '',
                        handler: (value) => {}
                      }
                    ]
                  })
                })
              }
            }
          ]
        })
      },
      image () {
        this.$alert.present({
//          image: 'http://gw.alicdn.com/tps/i2/TB1SlYwGFXXXXXrXVXX9vKJ2XXX-2880-1560.jpg_200x200.jpg',
          image: 'https://github.com/vm-component/Vimo/blob/master/examples/static/img/vimo.png?raw=true',
          title: '5.5版本更新',
          message: '1.功能更新 2.功能更新;',
          cssClass: 'alertCssOuterMain',
          enableBackdropDismiss: true,
          buttons: [
            {
              text: '知道了',
              role: 'cancel',
              icon: 'icon-Destructive',
              cssClass: '',
              handler: () => {
                console.debug('Confirm 取消 click')
              }
            },
            {
              text: '了解更多',
              role: '',
              handler: () => {
                this.$alert.dismiss().then(function () {
                  console.debug('Confirm 确定 click')
                })
              }
            }
          ]
        })
      }
    },
    created () {
    },
    mounted () {
    },
    activated () {
    },
    deactivated () {},
    components: {}
  }
</script>

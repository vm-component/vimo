<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Alert</Title>
            </Navbar>
        </Header>
        <Content padding>
            <Button block @click="alert()">Alert</Button>
            <Button color="danger" block @click="confirm()">Confirm</Button>
            <Button color="secondary" block @click="threeBtn()">Three Button</Button>
            <Button color="dark" block @click="input()">Input</Button>
            <Button color="dark" block @click="checkbox()">Checkbox</Button>
            <Button color="primary" block @click="radio()">Radio</Button>
        </Content>
    </Page>
</template>
<style scoped lang="scss">

</style>
<script type="text/javascript">
  export default{
    data () {
      return {}
    },
    watch: {},
    computed: {},
    methods: {
      alert () {
        this.$alert.present({
          title: 'Alert',
          message: '这是一个警告框, 点击背景可关闭. ',
          enableBackdropDismiss: true,
          buttons: [
            {
              text: '确定',
              role: '',
              handler: (value) => {}
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
                console.debug('button2 click')
              }
            },
            {
              text: '确定',
              role: '',
              handler: (value) => {
                this.$alert.dismiss().then(function (data) {
                  console.debug('button3 click')
                  console.debug(data)
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
              handler: (value) => {}
            },
            {
              text: '取消',
              role: 'cancel',
              handler: (value) => {}
            },
            {
              text: '确定',
              role: '',
              handler: (value) => {
                this.$alert.dismiss().then(function (data) {
                  console.debug('button3 click')
                  console.debug(data)
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
              role: '',
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
                        this.$alert.dismiss().then(function (msg) {
                          console.log('alert input2 dismiss promise')
                        })
                      }
                    }
                  ]
                }).then(function () {
                  console.log('alert input2 present promise')
                })
              }
            }
          ]
        }).then(function () {
          console.log('alert input1 present promise')
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
                // alert('必须选择');
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

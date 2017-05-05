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
        // confirm.present()
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
          title: 'checkbox',
          subTitle: '这个是多选组件, 这里是subTitle属性的值.',
          message: '这里是message传递的信息.',
          enableBackdropDismiss: true,
          inputs: [
            {
              type: 'checkbox',
              value: '  checkbox1_value  ',
              label: '  checkbox1_label  ',
              checked: true,
              handler: function (val) {
                console.log('checkbox1 clicked')
                console.log(val)
              }
            },
            {
              type: 'checkbox',
              value: 'checkbox2_value',
              label: 'checkbox2_label',
              checked: false,
              disabled: true,
              handler: function (val) {
                console.log('checkbox2 clicked')
                console.log(val)
              }
            },
            {
              type: 'checkbox',
              value: 'checkbox3_value',
              label: 'checkbox3_label',
              checked: true,
              handler: function (val) {
                console.log('checkbox3 clicked')
                console.log(val)
              }
            },
            {
              type: 'checkbox',
              value: 'checkbox4_value',
              label: 'checkbox4_label',
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
          title: 'radio',
          message: '这个是单选组件',
          enableBackdropDismiss: true,
          inputs: [
            {
              type: 'radio',
              value: 'radio1_value',
              label: 'radio1_label',
              checked: true,
              handler: function (val) {
                console.log('radio clicked')
                console.log(val)
              }
            },
            {
              type: 'radio',
              value: 'radio2_value',
              label: 'radio2_label',
              checked: false,
              disabled: true,
              handler: function (val) {
                console.log('radio2 clicked')
                console.log(val)
              }
            },
            {
              type: 'radio',
              value: 'radio3_value',
              label: 'radio3_label',
              checked: false,
              handler: function (val) {
                console.log('radio3 clicked')
                console.log(val)
              }
            },
            {
              type: 'radio',
              value: 'radio4_value',
              label: 'radio4_label',
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

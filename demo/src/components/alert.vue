<template>
    <Page>
        <Header>
            <Navbar>
                <Title>{{$t('title')}}</Title>
            </Navbar>
        </Header>
        <Content padding>
            <Button block @click="alert()">Alert</Button>
            <Button color="danger" block @click="confirm()">Confirm</Button>
            <Button color="secondary" block @click="threeBtn()">Three Button</Button>
            <Button color="dark" block @click="input()">Input</Button>
            <Button color="dark" block @click="checkbox()">Checkbox</Button>
            <Button color="primary" block @click="radio()">Radio</Button>
            <Button color="primary" block @click="image()">Image</Button>
            <article>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem consequatur debitis deleniti doloribus eius laborum magni maiores maxime,
                    molestias quidem. Amet esse excepturi, facilis illum magnam nulla quo repudiandae vero.</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem consequatur debitis deleniti doloribus eius laborum magni maiores maxime,
                    molestias quidem. Amet esse excepturi, facilis illum magnam nulla quo repudiandae vero.</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem consequatur debitis deleniti doloribus eius laborum magni maiores maxime,
                    molestias quidem. Amet esse excepturi, facilis illum magnam nulla quo repudiandae vero.</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem consequatur debitis deleniti doloribus eius laborum magni maiores maxime,
                    molestias quidem. Amet esse excepturi, facilis illum magnam nulla quo repudiandae vero.</p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem consequatur debitis deleniti doloribus eius laborum magni maiores maxime,
                    molestias quidem. Amet esse excepturi, facilis illum magnam nulla quo repudiandae vero.</p>
            </article>
        </Content>
    </Page>
</template>
<style lang="scss">
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
    i18n: {
      messages: {
        'zh-CN': {
          title: '对话框',
          cancel: '取消',
          confirm: '确认',
          notClear: '不清楚'
        },
        'en-US': {
          title: 'Alert',
          cancel: 'Cancel',
          confirm: 'Confirm',
          notClear: 'Not Clear'
        }
      }
    },
    methods: {
      alert () {
        this.$alert.present({
          title: 'Alert',
          message: 'This is a warning box.',
          enableBackdropDismiss: true,
          buttons: [
            {
              text: this.$t('confirm'),
              role: '',
              handler: () => {
                console.log('Alert 确定 click')
              }
            }
          ]
        })
      },
      confirm () {
        this.$alert.present({
          title: 'Confirm',
          message: 'This is a confirmation dialog containing the cancel button.',
          cssClass: 'alertCssOuterMain',
          enableBackdropDismiss: true,
          buttons: [
            {
              text: this.$t('cancel'),
              role: 'cancel',
              icon: 'icon-Destructive',
              cssClass: '',
              handler: () => {
                console.debug('Confirm 取消 click')
              }
            },
            {
              text: this.$t('confirm'),
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
          title: 'Three buttons',
          message: 'When the incoming button exceeds three, it is displayed vertically, and this message can also be passed into the html structure.',
          enableBackdropDismiss: false,
          buttons: [
            {
              text: this.$t('notClear'),
              role: '',
              handler: () => {
                console.debug('Three 不清楚 click')
              }
            },
            {
              text: this.$t('cancel'),
              role: 'cancel',
              handler: () => {
                console.debug('Three 取消 click')
              }
            },
            {
              text: this.$t('confirm'),
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
          title: 'Log in to iTunes Store',
          message: 'Please enter the password for your Apple ID "apple@icloud.com"',
          enableBackdropDismiss: true,
          inputs: [
            {
              type: 'password',
              name: 'password',
              placeholder: 'password',
              value: ''
            }
          ],
          buttons: [
            {
              text: this.$t('cancel'),
              role: 'cancel',
              handler: () => {}
            },
            {
              text: this.$t('confirm'),
              handler: (value) => {
                this.$alert.present({
                  title: 'Please confirm',
                  message: 'The information you entered：' + JSON.stringify(value),
                  cssClass: '',
                  enableBackdropDismiss: true,
                  buttons: [
                    {
                      text: this.$t('confirm'),
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
          title: 'Fruit comes',
          message: 'Choose the fruit you like to eat',
          enableBackdropDismiss: true,
          inputs: [
            {
              type: 'checkbox',
              value: 'apple',
              label: 'apple',
              checked: true,
              handler: function (val) {
                console.log('checkbox1 clicked')
                console.log(val)
              }
            },
            {
              type: 'checkbox',
              value: 'pear',
              label: 'pear',
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
              label: 'banana',
              checked: true,
              handler: function (val) {
                console.log('checkbox3 clicked')
                console.log(val)
              }
            },
            {
              type: 'checkbox',
              value: 'orange',
              label: 'orange',
              checked: false,
              handler: function (val) {
                console.log('checkbox4 clicked')
                console.log(val)
              }
            }
          ],
          buttons: [
            {
              text: this.$t('cancel'),
              role: 'cancel',
              handler: () => {
                console.log('必须选择')
                this.$toast('必须选择')
                return false
              }
            },
            {
              text: this.$t('confirm'),
              role: '',
              handler: (value) => {
                this.$alert.dismiss().then((msg) => {
                  this.$alert.present({
                    title: 'Please confirm',
                    message: 'The information you entered：' + JSON.stringify(value),
                    cssClass: '',
                    enableBackdropDismiss: true,
                    buttons: [
                      {
                        text: this.$t('confirm'),
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
          title: 'Fruit comes',
          message: 'You can only choose one',
          enableBackdropDismiss: true,
          inputs: [
            {
              type: 'radio',
              value: 'apple',
              label: 'apple',
              checked: true,
              handler: function (val) {
                console.log('radio clicked')
                console.log(val)
              }
            },
            {
              type: 'radio',
              value: 'pear',
              label: 'pear',
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
              label: 'banana',
              checked: false,
              handler: function (val) {
                console.log('radio3 clicked')
                console.log(val)
              }
            },
            {
              type: 'radio',
              value: 'orange',
              label: 'orange',
              checked: false,
              handler: (val) => {
                console.log('radio4 clicked')
                console.log(val)
              }
            }
          ],
          buttons: [
            {
              text: this.$t('cancel'),
              role: 'cancel',
              handler: () => {
                console.log('必须选择')
                return false
              }
            },
            {
              text: this.$t('confirm'),
              role: '',
              handler: (value) => {
                this.$alert.dismiss().then((msg) => {
                  this.$alert.present({
                    title: 'Please confirm',
                    message: 'The information you entered：' + JSON.stringify(value),
                    cssClass: '',
                    enableBackdropDismiss: true,
                    buttons: [
                      {
                        text: this.$t('confirm'),
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
          image: 'https://github.com/vm-component/Vimo/blob/master/examples/static/img/vimo.png?raw=true',
          title: '5.5 version update',
          message: '1. Function update 2. Function update;',
          cssClass: 'alertCssOuterMain',
          enableBackdropDismiss: true,
          buttons: [
            {
              text: 'Got it',
              role: 'cancel',
              icon: 'icon-Destructive',
              cssClass: '',
              handler: () => {
                console.debug('Confirm 取消 click')
              }
            },
            {
              text: 'More',
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
    }
  }
</script>

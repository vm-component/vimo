<template>
  <Page>
    <Header>
      <Navbar>
        <Title>Alert</Title>
      </Navbar>
    </Header>
    <Content padding>
      <Button type="block" @click="alert()">Alert</Button>
      <Button color="danger" type="block" @click="confirm()">Confirm</Button>
      <Button color="secondary" type="block" @click="threeBtn()">Three Button</Button>
      <Button color="dark" type="block" @click="input()">Input</Button>
      <Button color="dark" type="block" @click="checkbox()">Checkbox</Button>
      <Button color="primary" type="block" @click="radio()">Radio</Button>
    </Content>
  </Page>
</template>
<script type="text/ecmascript-6">
  export default{
    data(){
      return {
        a:1
      }
    },
    watch: {},
    computed: {

    },
    methods: {
      alert () {
        const _this = this;
        _this.$alert.present({
          title: 'Alert',
          // subTitle: '收到这个通知的人希望你今天能搞定这个alert组件',
          message: '收到这个通知的人希望你今天能搞定这个alert组件',
          cssClass: 'alertCssOuterMain  ',
          enableBackdropDismiss: true,
          //buttons:['1','2','3']
          buttons: [
            {
              text: '确定',
              role: '',
              handler: (value) => {
                _this.$alert.dismiss().then(function (data) {
                  console.debug('button3 click dismiss ')
                  console.debug(data)
                });
              }
            }
          ]
        });

      },
      confirm () {
        const _this = this;
        _this.$alert.present({
          title: 'Confirm',
          // subTitle: '收到这个通知的人希望你今天能搞定这个alert组件',
          message: '收到这个通知的人希望你今天能搞定这个alert组件',
          cssClass: 'alertCssOuterMain  ',
          enableBackdropDismiss: true,
          //buttons:['1','2','3']
          buttons: [
            {
              text: '取消',
              role: 'cancel',
              icon: 'icon-Destructive',
              cssClass: '  DestructiveBtnCssClass1 DestructiveBtnCssClass2 ',
              handler: () => {
                console.debug('button2 click');
              }
            },
            {
              text: '确定',
              role: '',
              handler: (value) => {
                _this.$alert.dismiss().then(function (data) {
                  console.debug('button3 click')
                  console.debug(data)
                });
              }
            }
          ]
        });
        // confirm.present()
      },
      threeBtn () {
        const _this = this;
        _this.$alert.present({
          title: 'ThreeBtn',
          // subTitle: '收到这个通知的人希望你今天能搞定这个alert组件',
          message: '收到这个通知的人希望你今天能搞定这个alert组件',
          cssClass: 'alertCssOuterMain  ',
          enableBackdropDismiss: false,
          //buttons:['1','2','3']
          buttons: [
            {
              text: 'Button1',
              role: '',
              handler: (value) => {
              }
            },
            {
              text: '取消',
              role: 'cancel',
              handler: (value) => {
              }
            },
            {
              text: '确定',
              role: '',
              handler: (value) => {
                _this.$alert.dismiss().then(function (data) {
                  console.debug('button3 click')
                  console.debug(data)
                });
              }
            }
          ]
        });
        // threeBtn.present()
      },
      input () {
        const _this = this;
        _this.$alert.present({
          title: '登录iTunes Store',
          // subTitle: '收到这个通知的人希望你今天能搞定这个alert组件',
          message: '请输入您Apple ID"apple@icloud.com"的密码',
          cssClass: 'alertCssOuterMain  ',
          enableBackdropDismiss: true,
          inputs: [
            {
              type: 'password',
              name: 'password',
              placeholder: '密码',
              value: '',
            },
          ],
          buttons: [
            {
              text: '取消',
              role: 'cancel',
              handler: () => {
              }
            },
            {
              text: '好',
              role: '',
              handler: (value) => {
                _this.$alert.dismiss().then(function (msg) {
                  _this.$alert.present({
                    title: '请确认',
                    // subTitle: '收到这个通知的人希望你今天能搞定这个alert组件',
                    message: '您输入的信息：' + JSON.stringify(value),
                    cssClass: '',
                    enableBackdropDismiss: true,
                    buttons: [
                      {
                        text: '确定',
                        role: 'cancel',
                        handler: (value) => {}
                      }
                    ]
                  });
                })
              }
            }
          ]
        });
      },
      checkbox () {
        const _this = this;
        _this.$alert.present({
          title: 'checkbox',
          // subTitle: '收到这个通知的人希望你今天能搞定这个alert组件',
          message: 'checkbox',
          cssClass: 'alertCssOuterMain  ',
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
                console.log('checkbox2 clicked');
                console.log(val)
              }
            },
            {
              type: 'checkbox',
              value: 'checkbox3_value',
              label: 'checkbox3_label',
              checked: true,
              handler: function (val) {
                console.log('checkbox3 clicked');
                console.log(val)
              }
            },
            {
              type: 'checkbox',
              value: 'checkbox4_value',
              label: 'checkbox4_label',
              checked: false,
              handler: function (val) {
                console.log('checkbox4 clicked');
                console.log(val)
              }
            },
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
                _this.$alert.dismiss().then(function (msg) {
                  _this.$alert.present({
                    title: '请确认',
                    // subTitle: '收到这个通知的人希望你今天能搞定这个alert组件',
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
                  });
                })
              }
            }
          ]
        });
      },
      radio () {
        const _this = this;
        _this.$alert.present({
          title: 'radio',
          // subTitle: '收到这个通知的人希望你今天能搞定这个alert组件',
          message: 'radio',
          cssClass: 'alertCssOuterMain  ',
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
                console.log('radio2 clicked');
                console.log(val)
              }
            },
            {
              type: 'radio',
              value: 'radio3_value',
              label: 'radio3_label',
              checked: false,
              handler: function (val) {
                console.log('radio3 clicked');
                console.log(val)
              }
            },
            {
              type: 'radio',
              value: 'radio4_value',
              label: 'radio4_label',
              checked: false,
              handler: function (val) {
                console.log('radio4 clicked');
                console.log(val)
              }
            },
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
                _this.$alert.dismiss().then(function (msg) {
                  _this.$alert.present({
                    title: '请确认',
                    // subTitle: '收到这个通知的人希望你今天能搞定这个alert组件',
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
                  });
                })
              }
            }
          ]
        });
      },
    },
    created () {
    },
    mounted () {
    },
    activated () {
    },
    deactivated(){}
  }
</script>
<style lang="scss"></style>

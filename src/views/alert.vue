<template>
  <ion-page>
    <ion-header>
      <ion-navbar>
        <ion-title slot="content">Alert</ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content padding>
      <ion-button type="block" @click="alert()">Alert</ion-button>
      <ion-button color="danger" type="block" @click="confirm()">Confirm</ion-button>
      <ion-button color="secondary" type="block" @click="threeBtn()">Three Button</ion-button>

      <ion-button color="dark" type="block" @click="input()">Input</ion-button>
      <ion-button color="dark" type="block" @click="checkbox()">Checkbox</ion-button>
      <ion-button color="primary" type="block" @click="radio()">Radio</ion-button>
    </ion-content>
  </ion-page>
</template>
<style scoped lang="scss">
  .alertDemo {
    text-align: center;
    padding: 30px;
  }
</style>
<script type="text/ecmascript-6">
  import Button from '../components/button';
  import Alert from '../components/alert'
  export default{
    data(){
      return {}
    },
    watch: {},
    computed: {},
    methods: {
      alert: function () {
        let alert = Alert.create({
          title: 'Alert',
          // subTitle: '收到这个通知的人希望你今天能搞定这个alert组件',
          message: '收到这个通知的人希望你今天能搞定这个alert组件',
          cssClass: 'alertCssOuterMain  ',
          enableBackdropDismiss: false,
          //buttons:['1','2','3']
          buttons: [
            {
              text: '确定',
              role: '',
              handler: (value) => {
                alert.dismiss().then(function (data) {
                  console.debug('button3 click')
                  console.debug(data)
                });
              }
            }
          ]
        });
        alert.present()
      },
      confirm: function () {
        let confirm = Alert.create({
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
                confirm.dismiss().then(function (data) {
                  console.debug('button3 click')
                  console.debug(data)
                });
              }
            }
          ]
        });
        confirm.present()
      },
      threeBtn: function () {
        let threeBtn = Alert.create({
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
                threeBtn.dismiss().then(function (data) {
                  console.debug('button3 click')
                  console.debug(data)
                });
              }
            }
          ]
        });
        threeBtn.present()
      },
      input: function () {
        let input = Alert.create({
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
                input.dismiss().then(function (msg) {
                  let alert = Alert.create({
                    title: '请确认',
                    // subTitle: '收到这个通知的人希望你今天能搞定这个alert组件',
                    message: '您输入的信息：'+JSON.stringify(value),
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
                  alert.present()
                })
              }
            }
          ]
        });
        input.present().then(function () {

        })
      },
      checkbox: function () {
        let checkbox = Alert.create({
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
              handler:function (val) {
                console.log('checkbox1 clicked')
                console.log(val)
              }
            },
            {
              type: 'checkbox',
              value: 'checkbox2_value',
              label: 'checkbox2_label',
              checked: false,
              disabled:true,
              handler:function (val) {
                console.log('checkbox2 clicked');
                console.log(val)
              }
            },
            {
              type: 'checkbox',
              value: 'checkbox3_value',
              label: 'checkbox3_label',
              checked: true,
              handler:function (val) {
                console.log('checkbox3 clicked');
                console.log(val)
              }
            },
            {
              type: 'checkbox',
              value: 'checkbox4_value',
              label: 'checkbox4_label',
              checked: false,
              handler:function (val) {
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
                alert('必须选择');
                return false
              }
            },
            {
              text: '确定',
              role: '',
              handler: (value) => {
                checkbox.dismiss().then(function (msg) {
                  console.log('输入的信息：'+JSON.stringify(value))
                  let alert = Alert.create({
                    title: '请确认',
                    // subTitle: '收到这个通知的人希望你今天能搞定这个alert组件',
                    message: '您输入的信息：'+JSON.stringify(value),
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
                  alert.present()
                })
              }
            }
          ]
        });
        checkbox.present()
      },
      radio: function () {
        let radio = Alert.create({
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
              handler:function (val) {
                console.log('radio clicked')
                console.log(val)
              }
            },
            {
              type: 'radio',
              value: 'radio2_value',
              label: 'radio2_label',
              checked: false,
              disabled:true,
              handler:function (val) {
                console.log('radio2 clicked');
                console.log(val)
              }
            },
            {
              type: 'radio',
              value: 'radio3_value',
              label: 'radio3_label',
              checked: false,
              handler:function (val) {
                console.log('radio3 clicked');
                console.log(val)
              }
            },
            {
              type: 'radio',
              value: 'radio4_value',
              label: 'radio4_label',
              checked: false,
              handler:function (val) {
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
                alert('必须选择');
                return false
              }
            },
            {
              text: '确定',
              role: '',
              handler: (value) => {
                radio.dismiss().then(function (msg) {
                  let alert = Alert.create({
                    title: '请确认',
                    // subTitle: '收到这个通知的人希望你今天能搞定这个alert组件',
                    message: '您输入的信息：'+JSON.stringify(value),
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
                  alert.present()
                })
              }
            }
          ]
        });
        radio.present()
      },






    },
    created: function () {
    },
    mounted: function () {
    },
    activated: function () {
    },
    components: {
      'ion-button': Button,
    }
  }
</script>

/* eslint-disable no-undef,no-unused-expressions */
import AlertController from '../index.js'
import Alert from '../alert.vue'
import { mount } from 'vue-test-utils'
import { createRenderer } from 'vue-server-renderer'

let opts = {
  propsData: {
    mode: 'ios',
    title: 'Alert',
    message: 'message',
    cssClass: '  alertCssOuterMain  ',
    enableBackdropDismiss: true,
    buttons: [
      {
        text: 'Confirm',
        handler: (value) => {}
      }
    ]
  },
  mocks: {
    $app: {
      setEnabled () {}
    }
  }
}
describe('Alert', function () {
  it('@base: renders the correct markup', function () {
    let wrapper = mount(Alert, opts)

    const markup = '<div class="ion-alert alert-ios alertCssOuterMain"><div class="ion-backdrop" style="left: 0px; top: 0px; display: none;"></div> <div class="alert-wrapper" style="display: none;" name="alert"><!----> <div class="alert-head"><h2 class="alert-title">Alert</h2> <!----></div> <div class="alert-message">message</div> <!----> <div class="alert-button-group"><button class="ion-button alert-button alert-button-ios alert-button-default alert-button-default-ios alert-button-ios-default"><span class="button-inner"><span>Confirm</span></span></button></div></div></div>'

    const text = 'Alert  message  Confirm'
    expect(wrapper.html()).toEqual(markup)
    expect(wrapper.text().trim()).toEqual(text)
    expect(wrapper.find('div')).toBeTruthy()
    expect(wrapper.name()).toEqual('Alert')
    expect(wrapper.hasClass('ion-alert')).toBeTruthy()
    expect(wrapper.hasClass('alertCssOuterMain')).toBeTruthy()
    expect(wrapper.hasClass('alert-ios')).toBeTruthy()
  })

  it('@action: present && dismiss', function () {
    let wrapper = mount(Alert, opts)
    wrapper.vm.present().then(() => {
      expect(wrapper.vm.isActive).toBeTruthy()
      return wrapper.vm.dismiss().then(() => {
        expect(wrapper.vm.isActive).toBeFalsy()
      })
    })
  })

  it('@action<controller>: present && dismiss', function () {
    let _opts = JSON.parse(JSON.stringify(opts))
    _opts.propsData.buttons = ['确定', '取消']
    AlertController.present(opts).then(() => {
      expect(AlertController._i.isActive).toBeTruthy()
      return AlertController.dismiss().then(() => {
        expect(AlertController._i.isActive).toBeFalsy()
      })
    })
  })

  it('@input', function () {
    let opts = {
      propsData: {
        title: '登录iTunes Store',
        mode: 'ios',
        message: '请输入您Apple ID"apple@icloud.com"的密码',
        enableBackdropDismiss: true,
        inputs: [
          {
            type: 'password',
            name: 'password',
            placeholder: '密码',
            value: 'testPassword'
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
              expect(JSON.stringify(value)).toEqual('{"password":"testPassword"}')
            }
          }
        ]
      }
    }

    const renderer = createRenderer()
    const wrapper = mount(Alert, opts)
    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) throw new Error(err)
      expect(str).toMatchSnapshot()
    })
  })

  it('@checkbox', function () {
    let opts = {
      propsData: {
        title: '水果来了',
        message: '选择你喜欢吃的水果',
        enableBackdropDismiss: true,
        inputs: [
          {
            type: 'checkbox',
            value: 'apple',
            label: '苹果',
            checked: true,
            handler: function (val) {}
          },
          {
            type: 'checkbox',
            value: 'pear',
            label: '梨',
            checked: false,
            disabled: true,
            handler: function (val) {}
          },
          {
            type: 'checkbox',
            value: 'banana',
            label: '香蕉',
            checked: true,
            handler: function (val) {}
          },
          {
            type: 'checkbox',
            value: 'orange',
            label: '橘子',
            checked: false,
            handler: function (val) {}
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
              expect(JSON.stringify(value)).toEqual('["apple","banana"]')
            }
          }
        ]
      }
    }

    const renderer = createRenderer()
    const wrapper = mount(Alert, opts)
    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) throw new Error(err)
      expect(str).toMatchSnapshot()
    })
  })

  it('@radio', function () {
    let opts = {
      propsData: {
        title: '水果来了',
        message: '你只能选择一个',
        enableBackdropDismiss: true,
        inputs: [
          {
            type: 'radio',
            value: 'apple',
            label: '苹果',
            checked: true,
            handler: function (val) {}
          },
          {
            type: 'radio',
            value: 'pear',
            label: '梨',
            checked: false,
            disabled: true,
            handler: function (val) {}
          },
          {
            type: 'radio',
            value: 'banana',
            label: '香蕉',
            checked: false,
            handler: function (val) {}
          },
          {
            type: 'radio',
            value: 'orange',
            label: '橘子',
            checked: false,
            handler: (val) => {}
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
              expect(value).toEqual('apple')
            }
          }
        ]
      }
    }

    const renderer = createRenderer()
    const wrapper = mount(Alert, opts)
    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) throw new Error(err)
      expect(str).toMatchSnapshot()
    })
  })
})

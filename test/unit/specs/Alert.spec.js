/* eslint-disable no-undef,no-unused-expressions */
import AlertController from '../../../components/alert/index.js'
import Alert from '../../../components/alert/alert.vue'
import { mount } from 'vue-test-utils'

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

    const markup = '<div class="ion-alert alert-ios alertCssOuterMain"><div class="ion-backdrop" style="left: 0px; top: 0px; display: none;"></div> <div class="alert-wrapper" style="display: none;"><!----> <div class="alert-head"><h2 class="alert-title">Alert</h2> <!----></div> <div class="alert-message">message</div> <!----> <div class="alert-button-group"><button class="disable-hover ion-button alert-button alert-button-ios alert-button-ios-default"><span class="button-inner"><span>Confirm</span></span></button></div></div></div>'

    const text = 'Alert  message  Confirm'
    expect(wrapper.html()).to.equal(markup)
    expect(wrapper.text().trim()).to.equal(text)
    expect(wrapper.find('div')).to.be.ok
    expect(wrapper.name()).to.equal('Alert')
    expect(wrapper.hasClass('ion-alert')).to.be.ok
    expect(wrapper.hasClass('alertCssOuterMain')).to.be.ok
    expect(wrapper.hasClass('alert-ios')).to.be.ok
  })

  it('@action: present && dismiss', function () {
    let wrapper = mount(Alert, opts)
    wrapper.vm.present().then(() => {
      expect(wrapper.vm.isActive).to.be.ok
      return wrapper.vm.dismiss().then(() => {
        expect(wrapper.vm.isActive).to.not.be.ok
      })
    })
  })

  it('@action<controller>: present && dismiss', function () {
    let _opts = JSON.parse(JSON.stringify(opts))
    _opts.propsData.buttons = ['确定', '取消']
    AlertController.present(opts).then(() => {
      expect(AlertController._i.isActive).to.be.ok
      return AlertController.dismiss().then(() => {
        expect(AlertController._i.isActive).to.not.be.ok
      })
    })
  })

  it('@action<controller>: time', (cb) => {
    AlertController.present(opts).then(() => {
      AlertController.present(opts).then(() => {
        expect(AlertController._i.isActive).to.be.ok
      })
      // expect(AlertController._i.isActive).to.be.ok
      setTimeout(() => {
        AlertController.dismiss()
        AlertController.dismiss().then(() => {
          expect(AlertController._i.isActive).to.not.be.ok
          cb()
        })
      }, 500)
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
              expect(JSON.stringify(value)).to.equal('{"password":"testPassword"}')
            }
          }
        ]
      }
    }

    let wrapper = mount(Alert, opts)
    return wrapper.vm.present().then(() => {
      expect(wrapper.vm.isActive).to.be.ok
      expect(wrapper.vm.$el.querySelectorAll('.alert-input-group').length > 0).to.be.ok
      expect(wrapper.vm.$el.querySelectorAll('.alert-button-group > button').length).to.equal(2)
      wrapper.vm.$el.querySelectorAll('.alert-button-group > button')[1].click()
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
              expect(JSON.stringify(value)).to.equal('["apple","banana"]')
            }
          }
        ]
      }
    }

    let wrapper = mount(Alert, opts)
    return wrapper.vm.present().then(() => {
      expect(wrapper.vm.isActive).to.be.ok
      expect(wrapper.vm.$el.querySelectorAll('.alert-checkbox-group > button').length).to.equal(4)
      expect(wrapper.vm.$el.querySelectorAll('.alert-button-group > button').length).to.equal(2)
      wrapper.vm.$el.querySelectorAll('.alert-button-group > button')[1].click()
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
              expect(value).to.equal('apple')
            }
          }
        ]
      }
    }

    let wrapper = mount(Alert, opts)
    return wrapper.vm.present().then(() => {
      expect(wrapper.vm.isActive).to.be.ok
      expect(wrapper.vm.$el.querySelectorAll('.alert-radio-group > button').length).to.equal(4)
      expect(wrapper.vm.$el.querySelectorAll('.alert-button-group > button').length).to.equal(2)
      // wrapper.vm.$el.querySelectorAll('.alert-button-group > button')[1].click()
    })
  })

  it('@platformHandled', function () {
    let options = {}

    window.VM.platform.alert = function (_opts) {
      console.log('alert组件 使用测试版本')
      options = _opts
      return true
    }

    AlertController.present(opts)
    expect(opts).to.equal(options)
    window.VM.platform.alert = undefined
  })
})

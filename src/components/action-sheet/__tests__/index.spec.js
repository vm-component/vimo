/* eslint-disable no-undef,no-unused-expressions */
import ActionSheetController from '../index.js'
import ActionSheet from '../action-sheet.vue'
import { mount } from 'vue-test-utils'
import { createRenderer } from 'vue-server-renderer'

let options = {
  propsData: {
    title: '请选择操作',
    subTitle: '注意，选择后不能撤销！',
    cssClass: '  ActionSheetCssClass1 ActionSheetCssClass2  ',
    enableBackdropDismiss: true,
    buttons: [
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
          console.debug('取消 clicked')
        }
      },
      {
        text: '删除',
        role: 'destructive',
        handler: () => {
          console.debug('删除 clicked')
        }
      },
      {
        text: '选择',
        role: 'selected',
        handler: () => {
          console.debug('删除 clicked')
        }
      }
    ]
  },
  mocks: {
    $app: {
      setEnabled () {},
      $_disableScroll () {},
      $_addChild () {}
    }
  }
}
describe('ActionSheet', function () {
  it('@base: renders the correct markup', function () {
    let wrapper = mount(ActionSheet, options)

    const markup = '<div class="ion-action-sheet action-sheet-ios ActionSheetCssClass1 ActionSheetCssClass2"><div class="ion-backdrop" style="left: 0px; top: 0px; display: none;"></div> <div class="action-sheet-wrapper" style="display: none;" name="action-sheet"><div class="action-sheet-container"><div class="action-sheet-group"><div class="action-sheet-title"><span>请选择操作</span> <div class="action-sheet-sub-title">注意，选择后不能撤销！</div></div> <div class="action-sheet-buttons"><button class="ion-button action-sheet-button action-sheet-button-ios action-sheet-button-default action-sheet-button-default-ios action-sheet-button-ios-default" icon-left=""><span class="button-inner"><!----> <span>增加</span></span></button><button class="ion-button action-sheet-button action-sheet-button-ios action-sheet-button-default action-sheet-button-default-ios action-sheet-button-ios-default  action-sheet-destructive" icon-left=""><span class="button-inner"><!----> <span>删除</span></span></button><button class="ion-button action-sheet-button action-sheet-button-ios action-sheet-button-default action-sheet-button-default-ios action-sheet-button-ios-default  action-sheet-selected" icon-left=""><span class="button-inner"><!----> <span>选择</span></span></button></div></div> <div class="action-sheet-group"><button class="ion-button action-sheet-cancel action-sheet-button action-sheet-button-ios action-sheet-button-default action-sheet-button-default-ios action-sheet-button-ios-default" icon-left=""><span class="button-inner"><!----> <span>取消</span></span></button></div></div></div></div>'

    expect(wrapper.html()).toEqual(markup)
  })

  it('@base: renders the correct markup(array button)', function () {
    let wrapper = mount(ActionSheet, {
      propsData: {
        title: '请选择操作',
        subTitle: '注意，选择后不能撤销！',
        cssClass: '  ActionSheetCssClass1 ActionSheetCssClass2  ',
        enableBackdropDismiss: true,
        buttons: ['增加', '取消']
      },
      mocks: {
        $app: {
          setEnabled () {}
        }
      }
    })

    const markup = '<div class="ion-action-sheet action-sheet-ios ActionSheetCssClass1 ActionSheetCssClass2"><div class="ion-backdrop" style="left: 0px; top: 0px; display: none;"></div> <div class="action-sheet-wrapper" style="display: none;" name="action-sheet"><div class="action-sheet-container"><div class="action-sheet-group"><div class="action-sheet-title"><span>请选择操作</span> <div class="action-sheet-sub-title">注意，选择后不能撤销！</div></div> <div class="action-sheet-buttons"><button class="ion-button action-sheet-button action-sheet-button-ios action-sheet-button-default action-sheet-button-default-ios action-sheet-button-ios-default" icon-left=""><span class="button-inner"><!----> <span>增加</span></span></button><button class="ion-button action-sheet-button action-sheet-button-ios action-sheet-button-default action-sheet-button-default-ios action-sheet-button-ios-default" icon-left=""><span class="button-inner"><!----> <span>取消</span></span></button></div></div> <!----></div></div></div>'

    expect(wrapper.html()).toEqual(markup)
  })

  it('@base: matches snapshot', () => {
    const renderer = createRenderer()
    const wrapper = mount(ActionSheet, options)
    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) throw new Error(err)
      expect(str).toMatchSnapshot()
    })
  })

  it('@action: present && dismiss', function () {
    let wrapper = mount(ActionSheet, options)
    wrapper.vm.present().then(() => {
      expect(wrapper.vm.isActive).toBeTruthy()
      return wrapper.vm.dismiss().then(() => {
        expect(wrapper.vm.isActive).toBeFalsy()
      })
    })
  })

  it('@action<controller>: present && dismiss', function () {
    let opts = JSON.parse(JSON.stringify(options))
    opts.propsData.buttons = ['确定', '取消']
    ActionSheetController.present(options).then(() => {
      expect(ActionSheetController._i.isActive).toBeTruthy()
      return ActionSheetController.dismiss().then(() => {
        expect(ActionSheetController._i.isActive).toBeFalsy()
      })
    })
  })

  it('@action<click>:false', function (cb) {
    let wrapper = mount(ActionSheet, options)
    wrapper.vm.enabled = true
    wrapper.vm.click({
      handler () { return false }
    })
    cb()
  })

  it('@action<click>:true', function (cb) {
    let wrapper = mount(ActionSheet, options)
    wrapper.vm.enabled = true
    wrapper.vm.click({
      handler () { return true }
    })
    cb()
  })
})

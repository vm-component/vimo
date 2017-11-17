/* eslint-disable no-undef,no-unused-expressions */
import ActionSheetController from '../../../components/action-sheet/index.js'
import ActionSheet from 'components/action-sheet/action-sheet.vue'
import { mount } from 'vue-test-utils'
let opts = {
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
      setEnabled () {}
    }
  }
}
describe('ActionSheet', function () {
  it('@base: renders the correct markup', function () {
    let wrapper = mount(ActionSheet, opts)

    const markup = '<div class="ion-action-sheet action-sheet-ios ActionSheetCssClass1 ActionSheetCssClass2"><div class="ion-backdrop" style="left: 0px; top: 0px; display: none;"></div> <div class="action-sheet-wrapper" style="display: none;"><div class="action-sheet-container"><div class="action-sheet-group"><div class="action-sheet-title"><span>请选择操作</span> <div class="action-sheet-sub-title">注意，选择后不能撤销！</div></div> <div class="action-sheet-buttons"><button class="ion-button action-sheet-button action-sheet-button-ios action-sheet-button-ios-default" icon-left=""><span class="button-inner"><!----> <span>增加</span></span></button><button class="ion-button action-sheet-button action-sheet-button-ios  action-sheet-destructive action-sheet-button-ios-default" icon-left=""><span class="button-inner"><!----> <span>删除</span></span></button><button class="ion-button action-sheet-button action-sheet-button-ios  action-sheet-selected action-sheet-button-ios-default" icon-left=""><span class="button-inner"><!----> <span>选择</span></span></button></div></div> <div class="action-sheet-group"><button class="ion-button action-sheet-cancel action-sheet-button action-sheet-button-ios action-sheet-button-ios-default" icon-left=""><span class="button-inner"><!----> <span>取消</span></span></button></div></div></div></div>'

    expect(wrapper.html()).to.equal(markup)
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

    const markup = '<div class="ion-action-sheet action-sheet-ios ActionSheetCssClass1 ActionSheetCssClass2"><div class="ion-backdrop" style="left: 0px; top: 0px; display: none;"></div> <div class="action-sheet-wrapper" style="display: none;"><div class="action-sheet-container"><div class="action-sheet-group"><div class="action-sheet-title"><span>请选择操作</span> <div class="action-sheet-sub-title">注意，选择后不能撤销！</div></div> <div class="action-sheet-buttons"><button class="ion-button action-sheet-button action-sheet-button-ios action-sheet-button-ios-default" icon-left=""><span class="button-inner"><!----> <span>增加</span></span></button><button class="ion-button action-sheet-button action-sheet-button-ios action-sheet-button-ios-default" icon-left=""><span class="button-inner"><!----> <span>取消</span></span></button></div></div> <!----></div></div></div>'

    expect(wrapper.html()).to.equal(markup)
  })

  it('@action: present && dismiss', function () {
    let wrapper = mount(ActionSheet, opts)
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
    ActionSheetController.present(opts).then(() => {
      expect(ActionSheetController._i.isActive).to.be.ok
      return ActionSheetController.dismiss().then(() => {
        expect(ActionSheetController._i.isActive).to.not.be.ok
      })
    })
  })

  it('@action<click>:false', function (cb) {
    let wrapper = mount(ActionSheet, opts)
    wrapper.vm.enabled = true
    wrapper.vm.click({
      handler () { return false }
    })
    cb()
  })

  it('@action<click>:true', function (cb) {
    let wrapper = mount(ActionSheet, opts)
    wrapper.vm.enabled = true
    wrapper.vm.click({
      handler () { return true }
    })
    cb()
  })
})

/* eslint-disable no-undef,no-unused-expressions */

import { mount } from 'vue-test-utils'
import vimo from '../../../components/dist'

let App = vimo.App
let wrapper = null
let attachToDocument = true

describe('App', () => {
  // 清除DOM痕迹
  afterEach(() => {
    if (wrapper) {
      wrapper.vm.$el.remove()
      wrapper = null
    }
  })

  it('@base: renders the correct markup', () => {
    wrapper = mount(App, {
      slots: {
        default: '<span>Name</span>'
      }
    })
    const result = `<article version="${window.VM.version}" class="ion-app ios platform-ios enable-hover"><section class="app-root"><span>Name</span></section> <aside id="modalPortal"></aside> <aside id="sheetPortal"></aside> <aside id="alertPortal"></aside> <aside id="loadingPortal"></aside> <aside id="toastPortal"></aside> <aside class="click-block click-block-enabled"></aside></article>`
    expect(wrapper.html()).to.equal(result)
  })

  it('@base: component must have a name', () => {
    wrapper = mount(App, {
      slots: {
        default: '<span>Name</span>'
      }
    })
    expect(wrapper.name()).to.equal('App')
  })

  it('@base: renders the correct text', () => {
    wrapper = mount(App, {
      slots: {
        default: '<span>Name</span>'
      }
    })
    expect(wrapper.text().trim()).to.equal('Name')
  })

  it('@props: mode', () => {
    let wrapper = mount(App, {
      propsData: {
        mode: 'md'
      },
      attachToDocument
    })
    expect(wrapper.hasClass('platform-md')).to.equal(true)
    expect(wrapper.hasClass('md')).to.equal(true)
  })

  it('setEnabled(false)', (cb) => {
    wrapper = mount(App, {
      attachToDocument
    })

    wrapper.vm.setEnabled(false, 400)
    expect(wrapper.vm.isEnabled).to.not.be.ok
    setTimeout(() => {
      expect(wrapper.vm.isEnabled).to.be.ok
      cb()
    }, 500)
  })

  it('setEnabled(true)', (cb) => {
    wrapper = mount(App, {
      attachToDocument
    })

    wrapper.vm.setEnabled(true)
    setTimeout(() => {
      expect(wrapper.vm.isEnabled).to.be.ok
      cb()
    }, 100)
  })

  it('setDisableScroll(false)', () => {
    wrapper = mount(App, {
      attachToDocument
    })

    wrapper.vm.setDisableScroll(false)
    expect(wrapper.vm.isScrollDisabled).to.not.be.ok
  })

  it('setDisableScroll(true)', (cb) => {
    wrapper = mount(App, {
      attachToDocument
    })

    wrapper.vm.setDisableScroll(true, 90)
    expect(wrapper.vm.isScrollDisabled).to.be.ok
    setTimeout(() => {
      expect(wrapper.vm.isScrollDisabled).to.not.be.ok
      cb()
    }, 100)
  })

  it('setClass()', () => {
    wrapper = mount(App, {
      attachToDocument
    })

    wrapper.vm.setClass('test123', true)
    expect(wrapper.hasClass('test123')).to.be.ok
  })

  it('setDocTitle()', (cb) => {
    wrapper = mount(App, {
      attachToDocument
    })

    wrapper.vm.setDocTitle('title123')
    setTimeout(() => {
      expect(document.title).to.equal('title123')
      cb()
    }, 100)
  })

  it('setDocTitle():in-some-platform', (cb) => {
    wrapper = mount(App, {
      attachToDocument
    })
    wrapper.vm.$platform.platforms = function () {
      return ['mobile', 'ios', 'alipay']
    }
    wrapper.vm.setDocTitle('title123')
    setTimeout(() => {
      expect(document.title).to.equal('title123')
      cb()
    }, 100)
  })

  it('setDocTitle():platformHandled', (cb) => {
    wrapper = mount(App, {
      attachToDocument
    })
    let opts = 'test123'
    let options = ''
    window.VM.platform.setNavbarTitle = function (_opts) {
      console.log('setDocTitle() 使用测试版本')
      options = _opts
      expect(JSON.stringify(options)).to.equal(JSON.stringify({title: opts}))
      window.VM.platform.setNavbarTitle = undefined
      cb()
      return true
    }

    wrapper.vm.setDocTitle(opts)
  })

  it('$on(onScrollStart)', (cb) => {
    wrapper = mount(App, {
      attachToDocument
    })
    wrapper.vm.$eventBus.$emit('onScrollStart')
    setTimeout(() => {
      expect(wrapper.vm.isScrolling).to.be.ok
      cb()
    }, 0)
  })

  it('$on(onScroll)', (cb) => {
    wrapper = mount(App, {
      attachToDocument
    })
    wrapper.vm.$eventBus.$emit('onScroll')
    setTimeout(() => {
      expect(wrapper.vm.isScrolling).to.be.ok
      cb()
    }, 0)
  })

  it('$on(onScrollEnd)', (cb) => {
    wrapper = mount(App, {
      attachToDocument
    })
    wrapper.vm.$eventBus.$emit('onScrollEnd')
    setTimeout(() => {
      expect(wrapper.vm.isScrolling).to.not.be.ok
      cb()
    }, 0)
  })
})

/* eslint-disable no-undef,no-unused-expressions */

import { mount } from 'vue-test-utils'
import { Navbar } from 'vimo'
import sinon from 'sinon'

let wrapper = null

describe('Navbar', function () {
  // 清除DOM痕迹
  afterEach(() => {
    if (wrapper) {
      wrapper.vm.$el.remove()
      wrapper = null
    }
  })

  it('@base: renders the correct markup', function () {
    wrapper = mount(Navbar, {
      slots: {
        default: '<span>Name</span>'
      }
    })
    const result = `<div class="toolbar ion-navbar" style="display: none;"><div class="toolbar-background"></div> <div class="toolbar-content"><span>Name</span></div> <!----> </div>`
    expect(wrapper.html()).to.equal(result)
  })

  it('@base: component must have a name', function () {
    wrapper = mount(Navbar, {
      slots: {
        default: '<span>Name</span>'
      }
    })
    expect(wrapper.name()).to.equal('Navbar')
  })

  it('@base: renders the correct text', function () {
    wrapper = mount(Navbar, {
      slots: {
        default: '<span>Name</span>'
      }
    })
    expect(wrapper.text().trim()).to.equal('Name')
  })

  it('@slots: buttons', function () {
    wrapper = mount(Navbar, {
      slots: {
        buttons: '<span>Name</span>'
      }
    })
    const result = `<div class="toolbar ion-navbar" style="display: none;"><div class="toolbar-background"></div> <div class="toolbar-content"></div> <!----> <span>Name</span></div>`
    expect(wrapper.html()).to.equal(result)
  })

  it('showOptionButton()', function () {
    window.VM.platform.showNavbarOptionButton = function () {}
    wrapper = mount(Navbar, {})
    sinon.spy(window.VM.platform, 'showNavbarOptionButton') // 监视crawler.launch，这是个function
    wrapper.vm.showOptionButton()
    expect(window.VM.platform.showNavbarOptionButton.callCount === 1).to.be.ok
    window.VM.platform.showNavbarOptionButton.restore() // 消除监视
  })

  it('hideOptionButton()', function () {
    window.VM.platform.hideNavbarOptionButton = function () {}
    wrapper = mount(Navbar, {})
    sinon.spy(window.VM.platform, 'hideNavbarOptionButton') // 监视crawler.launch，这是个function
    wrapper.vm.hideOptionButton()
    expect(window.VM.platform.hideNavbarOptionButton.callCount === 1).to.be.ok
    window.VM.platform.hideNavbarOptionButton.restore() // 消除监视
  })

  it('reset()', function () {
    window.VM.platform.resetNavbarTitleAndColor = function () {}
    window.VM.platform.resetNavbarOptionButton = function () {}
    wrapper = mount(Navbar, {})
    sinon.spy(window.VM.platform, 'resetNavbarTitleAndColor') // 监视crawler.launch，这是个function
    sinon.spy(window.VM.platform, 'resetNavbarOptionButton') // 监视crawler.launch，这是个function
    wrapper.vm.reset()
    expect(window.VM.platform.resetNavbarTitleAndColor.callCount === 1).to.be.ok
    expect(window.VM.platform.resetNavbarOptionButton.callCount === 1).to.be.ok
    window.VM.platform.resetNavbarTitleAndColor.restore() // 消除监视
    window.VM.platform.resetNavbarOptionButton.restore() // 消除监视
  })

  it('$_backButtonClickHandler()', function () {
    let $event = {
      preventDefault () {},
      stopPropagation () {}
    }
    // 防止页面切换
    window.history.back = function () {}
    sinon.spy($event, 'preventDefault') // 监视crawler.launch，这是个function
    sinon.spy($event, 'stopPropagation') // 监视crawler.launch，这是个function
    wrapper = mount(Navbar, {})
    wrapper.vm.$_backButtonClickHandler($event)
    expect($event.preventDefault.callCount === 1).to.be.ok
    expect($event.stopPropagation.callCount === 1).to.be.ok
    $event.preventDefault.restore() // 消除监视
    $event.stopPropagation.restore() // 消除监视
  })

  it('refreshBackButtonStatus()', function () {
    wrapper = mount(Navbar, {
      propsData: {
        hideBackButton: false
      },
      mocks: {
        $history: {
          canGoBack () {
            return false
          }
        }
      }
    })
    expect(wrapper.vm.hideBb).to.be.ok
    wrapper = mount(Navbar, {
      propsData: {
        hideBackButton: false
      },
      mocks: {
        $history: {
          canGoBack () {
            return true
          }
        }
      }
    })
    expect(wrapper.vm.hideBb).to.not.be.ok
  })

  it('initWhenInWebview():with color', function (cb) {
    let $platform = {
      platforms () {
        return [1, 2, 3]
      },
      ready () {
        return new Promise((resolve) => { resolve() })
      },
      setNavbarOptionButton () {
      },
      setNavbarBackgroundColor () {
      },
      resetNavbarTitleAndColor () {
      },
      is () {
        return true
      }
    }
    sinon.spy($platform, 'platforms') // 监视crawler.launch，这是个function
    sinon.spy($platform, 'ready') // 监视crawler.launch，这是个function
    sinon.spy($platform, 'setNavbarOptionButton') // 监视crawler.launch，这是个function
    sinon.spy($platform, 'is') // 监视crawler.launch，这是个function
    sinon.spy($platform, 'setNavbarBackgroundColor') // 监视crawler.launch，这是个function
    wrapper = mount(Navbar, {
      propsData: {
        color: 'danger'
      },
      attachToDocument: true,
      mocks: {
        $platform
      }
    })
    setTimeout(() => {
      expect($platform.platforms.callCount === 1).to.be.ok
      expect($platform.ready.callCount === 1).to.be.ok
      expect($platform.setNavbarOptionButton.callCount === 1).to.be.ok
      expect($platform.is.callCount === 1).to.be.ok
      expect($platform.setNavbarBackgroundColor.callCount === 1).to.be.ok
      expect($platform.setNavbarBackgroundColor.withArgs('#F53D3D').calledOnce).to.be.ok
      $platform.platforms.restore() // 消除监视
      $platform.ready.restore() // 消除监视
      $platform.setNavbarOptionButton.restore() // 消除监视
      $platform.is.restore() // 消除监视
      $platform.setNavbarBackgroundColor.restore() // 消除监视

      cb()
    }, 100)
  })

  it('initWhenInWebview():no color', function (cb) {
    let $platform = {
      platforms () {
        return [1, 2, 3]
      },
      ready () {
        return new Promise((resolve) => { resolve() })
      },
      setNavbarOptionButton () {
      },
      setNavbarBackgroundColor () {
      },
      resetNavbarTitleAndColor () {
      },
      is () {
        return true
      }
    }
    sinon.spy($platform, 'platforms') // 监视crawler.launch，这是个function
    sinon.spy($platform, 'ready') // 监视crawler.launch，这是个function
    sinon.spy($platform, 'setNavbarOptionButton') // 监视crawler.launch，这是个function
    sinon.spy($platform, 'is') // 监视crawler.launch，这是个function
    sinon.spy($platform, 'resetNavbarTitleAndColor') // 监视crawler.launch，这是个function
    wrapper = mount(Navbar, {
      mocks: {
        $platform
      }
    })
    setTimeout(() => {
      expect($platform.platforms.callCount === 1).to.be.ok
      expect($platform.ready.callCount === 1).to.be.ok
      expect($platform.setNavbarOptionButton.callCount === 1).to.be.ok
      expect($platform.is.callCount === 1).to.be.ok
      expect($platform.resetNavbarTitleAndColor.callCount === 1).to.be.ok
      $platform.platforms.restore() // 消除监视
      $platform.ready.restore() // 消除监视
      $platform.setNavbarOptionButton.restore() // 消除监视
      $platform.is.restore() // 消除监视
      $platform.resetNavbarTitleAndColor.restore() // 消除监视

      cb()
    }, 100)
  })
})

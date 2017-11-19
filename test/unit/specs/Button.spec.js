/* eslint-disable no-undef,no-unused-expressions */

import { mount } from 'vue-test-utils'
import sinon from 'sinon'
import deepAssign from 'deep-assign'
import cloneDeep from 'lodash.clonedeep'
import Vue from 'vue'
import vimo from '../../../src'

let Button = vimo.Button
let Icon = vimo.Icon
let Item = vimo.Item
let wrapper = null
let options = {
  propsData: {
    color: 'primary',
    mode: 'ios'
  },
  slots: {
    default: '<span>ButtonTest</span>'
  }
}

describe('Button', function () {
  // 清除DOM痕迹
  afterEach(() => {
    if (wrapper) {
      wrapper.vm.$el.remove()
      wrapper = null
    }
  })

  it('@config: renders the correct markup', function () {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        mode: 'md'
      }
    })
    wrapper = mount(Button, opts)
    const result = '<button class="disable-hover ion-button button button-md button-default button-default-md button-md-primary"> <span class="button-inner"><span>ButtonTest</span></span> <div class="button-effect"></div></button>'
    expect(wrapper.html()).to.equal(result)
  })

  // it's also easy to check for the existence of elements
  it('@config: has a button', function () {
    let opts = deepAssign(cloneDeep(options), {
      slots: {
        default: '<span>DOM</span>'
      }
    })
    wrapper = mount(Button, opts)
    expect(wrapper.find('button')).to.be.ok
    expect(wrapper.contains('span')).to.be.ok
  })

  it('@config: component must have a name', function () {
    let opts = deepAssign(cloneDeep(options), {
      slots: {
        default: '<span>Name</span>'
      }
    })
    wrapper = mount(Button, opts)
    expect(wrapper.name()).to.equal('vm-button')
  })

  it('@config: renders the correct text', function () {
    let opts = deepAssign(cloneDeep(options), {
      slots: {
        default: '<span>ButtonTest</span>'
      }
    })
    wrapper = mount(Button, opts)
    expect(wrapper.text().trim()).to.equal('ButtonTest')
  })

  it('@config: have the right className', function () {
    let opts = deepAssign(cloneDeep(options), {
      slots: {
        default: '<span>HasClass</span>'
      }
    })
    wrapper = mount(Button, opts)
    expect(wrapper.hasClass('ion-button')).to.be.ok
  })

  it('@props: color', function () {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        color: 'danger'
      },
      slots: {
        default: '<span>color</span>'
      }
    })
    wrapper = mount(Button, opts)
    expect(wrapper.hasStyle('background-color', '#f53d3d')).to.equal(true)
  })

  it('@props: mode', function () {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        mode: 'md'
      },
      slots: {
        default: '<span>mode</span>'
      }
    })
    wrapper = mount(Button, opts)
    expect(wrapper.hasClass('button-md')).to.equal(true)
  })

  it('@props: small', function () {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        mode: 'ios',
        small: true
      },
      slots: {
        default: '<span>small</span>'
      }
    })
    wrapper = mount(Button, opts)
    expect(wrapper.hasClass('button-small-ios')).to.equal(true)
  })

  it('@props: active', function () {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        mode: 'ios',
        active: true
      },
      slots: {
        default: '<span>active</span>'
      }
    })
    wrapper = mount(Button, opts)
    expect(wrapper.hasAttribute('active', 'true')).to.equal(true)
  })

  it('@props: default', function () {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        mode: 'ios',
        default: true
      },
      slots: {
        default: '<span>default</span>'
      }
    })
    wrapper = mount(Button, opts)
    expect(wrapper.hasClass('button-default-ios')).to.equal(true)
  })

  it('@props: large', function () {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        mode: 'ios',
        large: true
      },
      slots: {
        default: '<span>large</span>'
      }
    })
    wrapper = mount(Button, opts)
    expect(wrapper.hasClass('button-large-ios')).to.equal(true)
  })

  it('@props: round', function () {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        mode: 'ios',
        round: true
      },
      slots: {
        default: '<span>Round</span>'
      }
    })
    wrapper = mount(Button, opts)
    expect(wrapper.hasClass('button-round-ios')).to.equal(true)
  })

  it('@props: full', function () {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        mode: 'ios',
        full: true
      },
      slots: {
        default: '<span>Round</span>'
      }
    })
    wrapper = mount(Button, opts)
    expect(wrapper.hasClass('button-full-ios')).to.equal(true)
  })

  it('@props: block', function () {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        mode: 'ios',
        block: true
      },
      slots: {
        default: '<span>block</span>'
      }
    })
    wrapper = mount(Button, opts)
    expect(wrapper.hasClass('button-block-ios')).to.equal(true)
  })

  it('@props: menutoggle', function () {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        mode: 'ios',
        menutoggle: true
      },
      slots: {
        default: '<span>menutoggle</span>'
      }
    })
    wrapper = mount(Button, opts)
    expect(wrapper.hasClass('button-menutoggle-ios')).to.equal(true)
  })

  it('@props: outline', function () {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        mode: 'ios',
        outline: true
      },
      slots: {
        default: '<span>outline</span>'
      }
    })
    wrapper = mount(Button, opts)
    expect(wrapper.hasClass('button-outline-ios')).to.equal(true)
  })

  it('@props: clear', function () {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        mode: 'ios',
        clear: true
      },
      slots: {
        default: '<span>clear</span>'
      }
    })
    wrapper = mount(Button, opts)
    expect(wrapper.hasClass('button-clear-ios')).to.equal(true)
  })

  it('@props: solid', function () {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        mode: 'ios',
        solid: true
      },
      slots: {
        default: '<span>solid</span>'
      }
    })
    wrapper = mount(Button, opts)
    expect(wrapper.hasClass('button-solid-ios')).to.equal(true)
  })

  it('@props: role=action-sheet-button', function () {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        mode: 'ios',
        role: 'action-sheet-button'
      },
      slots: {
        default: '<span>role:action-sheet-button</span>'
      }
    })
    wrapper = mount(Button, opts)
    expect(wrapper.hasClass('action-sheet-button-ios')).to.equal(true)
  })

  it('@props: role=bar-button', function () {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        mode: 'ios',
        role: 'bar-button'
      },
      slots: {
        default: '<span>role:bar-button</span>'
      }
    })
    wrapper = mount(Button, opts)
    expect(wrapper.hasClass('bar-button')).to.equal(true)
  })

  it('@props: strong', function () {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        mode: 'ios',
        strong: true
      },
      slots: {
        default: '<span>strong</span>'
      }
    })
    wrapper = mount(Button, opts)
    expect(wrapper.hasClass('button-strong-ios')).to.equal(true)
    expect(wrapper.hasStyle('font-weight', '600')).to.equal(true)
  })

  it('@event: triger click', function () {
    let opts = deepAssign(cloneDeep(options), {
      slots: {
        default: '<span>Click</span>'
      }
    })
    wrapper = mount(Button, opts)
    sinon.spy(wrapper.vm, 'clickHandler') // 监视crawler.launch，这是个function
    wrapper.trigger('click')
    expect(wrapper.vm.clickHandler.callCount === 1).to.equal(true)
    wrapper.vm.clickHandler.restore() // 消除监视
  })

  it('@slots: icon-only', function () {
    var res = Vue.compile('<vm-button icon-only><vm-icon name="car"></vm-icon></vm-button>')
    let Temp = {
      components: {'vm-button': Button, 'vm-icon': Icon},
      render: res.render
    }
    wrapper = mount(Temp)
    expect(wrapper.hasAttribute('icon-only', '')).to.equal(true)
  })

  it('@slots: icon-left', function () {
    var res = Vue.compile('<vm-button icon-left><vm-icon name="car"></vm-icon>Icon</vm-button>')
    wrapper = mount({
      render: res.render,
      components: {'vm-button': Button, 'vm-icon': Icon}
    })
    expect(wrapper.hasAttribute('icon-left', '')).to.equal(true)
  })

  it('@slots: icon-right', function () {
    var res = Vue.compile('<vm-button icon-right>Icon<vm-icon name="car"></vm-icon></vm-button>')
    wrapper = mount({
      render: res.render,
      components: {'vm-button': Button, 'vm-icon': Icon}
    })
    expect(wrapper.hasAttribute('icon-right', '')).to.equal(true)
  })

  it('@parent: Item', function () {
    var res = Vue.compile('<vm-item><vm-button>Icon<vm-icon name="car"></vm-icon></vm-button></vm-item>')
    wrapper = mount({
      render: res.render,
      components: {'vm-button': Button, 'vm-item': Item, 'vm-icon': Icon}
    })
    expect(wrapper.html().indexOf('item-button') > -1).to.equal(true)
  })
})

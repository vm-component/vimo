/* eslint-disable no-undef,no-unused-expressions */

import { mount } from 'vue-test-utils'
import sinon from 'sinon'
import deepAssign from 'deep-assign'
import cloneDeep from 'lodash.clonedeep'
import Button from '../index'
import Icon from '../../icon/index'
import Item from '../../item/index'
import Vue from 'vue'
import { createRenderer } from 'vue-server-renderer'

let options = {
  propsData: {
    color: 'primary',
    mode: 'ios'
  },
  slots: {
    default: '<span>Test</span>'
  }
}

describe('Button', function () {
  it('@base: renders the correct markup', function () {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        mode: 'md'
      }
    })
    let wrapper = mount(Button, opts)
    const result = '<button class="ion-button button button-md button-default button-default-md button-md-primary"><span class="button-inner"><span>Test</span></span></button>'
    expect(wrapper.html()).toEqual(result)
  })

  it('@base: renders the correct text', function () {
    let opts = deepAssign(cloneDeep(options), {
      slots: {
        default: '<span>Test</span>'
      }
    })
    let wrapper = mount(Button, opts)
    expect(wrapper.text()).toEqual('Test')
  })

  // it's also easy to check for the existence of elements
  it('@base: has a button', function () {
    let opts = deepAssign(cloneDeep(options), {
      slots: {
        default: '<span>DOM</span>'
      }
    })
    let wrapper = mount(Button, opts)
    expect(wrapper.find('button')).toBeTruthy()
    expect(wrapper.contains('span')).toBeTruthy()
  })

  it('@base: component must have a name', function () {
    let opts = deepAssign(cloneDeep(options), {
      slots: {
        default: '<span>Name</span>'
      }
    })
    let wrapper = mount(Button, opts)
    expect(wrapper.name()).toEqual('Button')
  })

  it('@base: have the right className', function () {
    let opts = deepAssign(cloneDeep(options), {
      slots: {
        default: '<span>HasClass</span>'
      }
    })
    let wrapper = mount(Button, opts)
    expect(wrapper.hasClass('ion-button')).toBeTruthy()
  })

  it('@base: matches snapshot', () => {
    const renderer = createRenderer()
    const wrapper = mount(Button, options)
    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) throw new Error(err)
      expect(str).toMatchSnapshot()
    })
  })

  it('@props: color', function () {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        color: 'danger',
        mode: 'md'
      },
      slots: {
        default: '<span>color</span>'
      }
    })
    let wrapper = mount(Button, opts)
    expect(wrapper.hasClass('button-md-danger')).toBeTruthy()
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
    let wrapper = mount(Button, opts)
    expect(wrapper.hasClass('button-md')).toBeTruthy()
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
    let wrapper = mount(Button, opts)
    expect(wrapper.hasClass('button-small-ios')).toBeTruthy()
  })

  it('@props: active', function () {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        mode: 'ios',
        active: true
      },
      slots: {
        default: '<span>small</span>'
      }
    })
    let wrapper = mount(Button, opts)
    expect(wrapper.hasAttribute('active', 'true')).toBeTruthy()
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
    let wrapper = mount(Button, opts)
    expect(wrapper.hasClass('button-default-ios')).toBeTruthy()
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
    let wrapper = mount(Button, opts)
    expect(wrapper.hasClass('button-large-ios')).toBeTruthy()
  })

  it('@props: round', function () {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        mode: 'ios',
        round: true
      },
      slots: {
        default: '<span>round</span>'
      }
    })
    let wrapper = mount(Button, opts)
    expect(wrapper.hasClass('button-round-ios')).toBeTruthy()
  })

  it('@props: full', function () {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        mode: 'ios',
        full: true
      },
      slots: {
        default: '<span>round</span>'
      }
    })
    let wrapper = mount(Button, opts)
    expect(wrapper.hasClass('button-full-ios')).toBeTruthy()
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
    let wrapper = mount(Button, opts)
    expect(wrapper.hasClass('button-block-ios')).toBeTruthy()
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
    let wrapper = mount(Button, opts)
    expect(wrapper.hasClass('button-menutoggle-ios')).toBeTruthy()
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
    let wrapper = mount(Button, opts)
    expect(wrapper.hasClass('button-outline-ios')).toBeTruthy()
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
    let wrapper = mount(Button, opts)
    expect(wrapper.hasClass('button-clear-ios')).toBeTruthy()
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
    let wrapper = mount(Button, opts)
    expect(wrapper.hasClass('button-solid-ios')).toBeTruthy()
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
    let wrapper = mount(Button, opts)
    expect(wrapper.hasClass('action-sheet-button-ios')).toBeTruthy()
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
    let wrapper = mount(Button, opts)
    expect(wrapper.hasClass('bar-button')).toBeTruthy()
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
    let wrapper = mount(Button, opts)
    expect(wrapper.hasClass('button-strong-ios')).toBeTruthy()
  })

  it('@event: triger click', function () {
    let opts = deepAssign(cloneDeep(options), {
      slots: {
        default: '<span>Click</span>'
      }
    })
    let wrapper = mount(Button, opts)
    sinon.spy(wrapper.vm, '$_clickHandler') // 监视crawler.launch，这是个function
    wrapper.trigger('click')
    expect(wrapper.vm.$_clickHandler.callCount === 1).toBeTruthy()
    wrapper.vm.$_clickHandler.restore() // 消除监视
  })

  it('@slots: icon-only', function () {
    var res = Vue.compile('<vm-button><Icon name="car"></Icon></vm-button>')
    let Temp = {
      components: {'vm-button': Button, Icon},
      render: res.render
    }
    let wrapper = mount(Temp)
    expect(wrapper.hasAttribute('icon-only', 'icon-only')).toBeTruthy()
  })

  it('@slots: icon-left', function () {
    var res = Vue.compile('<vm-button><Icon name="car"></Icon>Icon</vm-button>')
    let wrapper = mount({
      render: res.render,
      components: {'vm-button': Button, Icon}
    })
    expect(wrapper.hasAttribute('icon-left', 'icon-left')).toBeTruthy()
  })

  it('@slots: icon-right', function () {
    var res = Vue.compile('<vm-button>Icon<Icon name="car"></Icon></vm-button>')
    let wrapper = mount({
      render: res.render,
      components: {'vm-button': Button, Icon}
    })
    expect(wrapper.hasAttribute('icon-right', 'icon-right')).toBeTruthy()
  })

  it('@parent: Item', function () {
    var res = Vue.compile('<Item><vm-button>Icon<Icon name="car"></Icon></vm-button></Item>')
    let wrapper = mount({
      render: res.render,
      components: {'vm-button': Button, Item, Icon}
    })
    expect(wrapper.html().indexOf('item-button') > -1).toBeTruthy()
  })
})

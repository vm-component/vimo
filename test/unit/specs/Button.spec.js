/* eslint-disable no-undef,no-unused-expressions */
// import { App, Header, Footer } from '../../../components/app'
import '../../../dist/style.css'

import { Button } from '../../../components/button'
import { Icon } from '../../../components/icon'
import 'ionicons/dist/css/ionicons.css'

import { mount } from '../vue-test-utils.js'
import sinon from 'sinon'
import deepAssign from 'deep-assign'
import cloneDeep from 'lodash.clonedeep'
import Vue from 'vue'

Vue.config.devtools = false
Vue.config.silent = true
Vue.config.errorHandler = (err) => !~err.toString().indexOf('$el') && console.error(err)

let options = {
  propsData: {
    color: 'primary',
    mode: 'ios'
  },
  attachToDocument: true,
  slots: {
    default: '<span>ButtonTest</span>'
  }
}

describe('Button', () => {

  it('renders the correct markup', () => {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        mode: 'md'
      }
    })
    const wrapper = mount(Button, opts)
    const result = '<button class="disable-hover ion-button button-md button button-md-primary"><span class="button-inner"><span>ButtonTest</span></span></button>'
    expect(wrapper.html()).to.equal(result)
  })

  it('renders the correct text', () => {
    let opts = deepAssign(cloneDeep(options), {
      slots: {
        default: '<span>ButtonTest</span>'
      }
    })
    const wrapper = mount(Button, opts)
    expect(wrapper.text()).to.equal('ButtonTest')
  })

  // it's also easy to check for the existence of elements
  it('has a button', () => {
    let opts = deepAssign(cloneDeep(options), {
      slots: {
        default: '<span>DOM</span>'
      }
    })
    const wrapper = mount(Button, opts)
    expect(wrapper.find('button')).to.be.ok
    expect(wrapper.contains('span')).to.be.ok
  })

  it('component must have a name', () => {
    let opts = deepAssign(cloneDeep(options), {
      slots: {
        default: '<span>Name</span>'
      }
    })
    const wrapper = mount(Button, opts)
    expect(wrapper.name()).to.equal('Button')
  })

  it('have the right className', () => {
    let opts = deepAssign(cloneDeep(options), {
      slots: {
        default: '<span>HasClass</span>'
      }
    })
    const wrapper = mount(Button, opts)
    expect(wrapper.hasClass('ion-button')).to.be.ok
  })

  // triger click
  it('triger click', () => {
    let opts = deepAssign(cloneDeep(options), {
      slots: {
        default: '<span>Click</span>'
      }
    })
    const wrapper = mount(Button, opts)
    sinon.spy(wrapper.vm, 'clickHandler') // 监视crawler.launch，这是个function
    wrapper.trigger('click')
    expect(wrapper.vm.clickHandler.callCount === 1).to.equal(true)
    wrapper.vm.clickHandler.restore() // 消除监视
  })

  it('color', () => {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        color: 'danger'
      },
      slots: {
        default: '<span>color</span>'
      }
    })
    const wrapper = mount(Button, opts)
    expect(wrapper.hasStyle('background-color', '#f53d3d')).to.equal(true)
  })

  it('mode', () => {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        mode: 'md'
      },
      slots: {
        default: '<span>mode</span>'
      }
    })
    const wrapper = mount(Button, opts)
    expect(wrapper.hasClass('button-md')).to.equal(true)
  })

  it('small', () => {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        mode: 'ios',
        small: true
      },
      slots: {
        default: '<span>small</span>'
      }
    })
    const wrapper = mount(Button, opts)
    expect(wrapper.hasClass('button-small-ios')).to.equal(true)
  })

  it('default', () => {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        mode: 'ios',
        default: true
      },
      slots: {
        default: '<span>default</span>'
      }
    })
    const wrapper = mount(Button, opts)
    expect(wrapper.hasClass('button-default-ios')).to.equal(true)
  })

  it('large', () => {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        mode: 'ios',
        large: true
      },
      slots: {
        default: '<span>large</span>'
      }
    })
    const wrapper = mount(Button, opts)
    expect(wrapper.hasClass('button-large-ios')).to.equal(true)
  })

  it('round', () => {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        mode: 'ios',
        round: true
      },
      slots: {
        default: '<span>round</span>'
      }
    })
    const wrapper = mount(Button, opts)
    expect(wrapper.hasClass('button-round-ios')).to.equal(true)
  })

  it('full', () => {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        mode: 'ios',
        full: true
      },
      slots: {
        default: '<span>round</span>'
      }
    })
    const wrapper = mount(Button, opts)
    expect(wrapper.hasClass('button-full-ios')).to.equal(true)
  })

  it('block', () => {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        mode: 'ios',
        block: true
      },
      slots: {
        default: '<span>block</span>'
      }
    })
    const wrapper = mount(Button, opts)
    expect(wrapper.hasClass('button-block-ios')).to.equal(true)
  })

  it('menutoggle', () => {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        mode: 'ios',
        menutoggle: true
      },
      slots: {
        default: '<span>menutoggle</span>'
      }
    })
    const wrapper = mount(Button, opts)
    expect(wrapper.hasClass('button-menutoggle-ios')).to.equal(true)
  })

  it('outline', () => {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        mode: 'ios',
        outline: true
      },
      slots: {
        default: '<span>outline</span>'
      }
    })
    const wrapper = mount(Button, opts)
    expect(wrapper.hasClass('button-outline-ios')).to.equal(true)
  })

  it('clear', () => {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        mode: 'ios',
        clear: true
      },
      slots: {
        default: '<span>clear</span>'
      }
    })
    const wrapper = mount(Button, opts)
    expect(wrapper.hasClass('button-clear-ios')).to.equal(true)
  })

  it('solid', () => {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        mode: 'ios',
        solid: true
      },
      slots: {
        default: '<span>solid</span>'
      }
    })
    const wrapper = mount(Button, opts)
    expect(wrapper.hasClass('button-solid-ios')).to.equal(true)
  })

  it('role:action-sheet-button', () => {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        mode: 'ios',
        role: 'action-sheet-button'
      },
      slots: {
        default: '<span>role:action-sheet-button</span>'
      }
    })
    const wrapper = mount(Button, opts)
    expect(wrapper.hasClass('action-sheet-button-ios')).to.equal(true)
  })

  it('role:bar-button', () => {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        mode: 'ios',
        role: 'bar-button'
      },
      slots: {
        default: '<span>role:bar-button</span>'
      }
    })
    const wrapper = mount(Button, opts)
    expect(wrapper.hasClass('bar-button-ios')).to.equal(true)
  })

  it('strong', () => {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        mode: 'ios',
        strong: true
      },
      slots: {
        default: '<span>strong</span>'
      }
    })
    const wrapper = mount(Button, opts)
    expect(wrapper.hasClass('button-strong-ios')).to.equal(true)
    expect(wrapper.hasStyle('font-weight', '600')).to.equal(true)
  })

  it('with icon only', () => {
    const wrapper = mount({
      template: '<Button><Icon name="car"></Icon></Button>',
      components: {Button, Icon}
    }, {
      attachToDocument: true
    })
    expect(wrapper.hasAttribute('icon-only', '')).to.equal(true)
  })

  it('with icon-left', () => {
    const wrapper = mount({
      template: '<Button><Icon name="car"></Icon>Icon</Button>',
      components: {Button, Icon}
    }, {
      attachToDocument: true
    })
    expect(wrapper.hasAttribute('icon-left', '')).to.equal(true)
  })

  it('with icon-right', () => {
    const wrapper = mount({
      template: '<Button>Icon<Icon name="car"></Icon></Button>',
      components: {Button, Icon}
    }, {
      attachToDocument: true
    })
    expect(wrapper.hasAttribute('icon-right', '')).to.equal(true)
  })
})

/* eslint-disable no-undef,no-unused-expressions */

import { mount } from 'vue-test-utils'
import deepAssign from 'deep-assign'
import cloneDeep from 'lodash.clonedeep'
import vimo from '../../../components/dist'

let Badge = vimo.Badge
let wrapper = null
let options = {
  propsData: {
    color: 'primary',
    mode: 'ios'
  },
  slots: {
    default: '<span>Test</span>'
  }
}

describe('Badge', () => {
  // 清除DOM痕迹
  afterEach(() => {
    if (wrapper) {
      wrapper.vm.$el.remove()
      wrapper = null
    }
  })

  it('@base: renders the correct markup', () => {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        mode: 'md'
      }
    })
    wrapper = mount(Badge, opts)
    const result = '<div class="ion-badge badge badge-md badge-md-primary"><span>Test</span></div>'
    expect(wrapper.html()).to.equal(result)
  })

  it('@base: renders the correct text', () => {
    let opts = deepAssign(cloneDeep(options), {
      slots: {
        default: '<span>Test</span>'
      }
    })
    wrapper = mount(Badge, opts)
    expect(wrapper.text()).to.equal('Test')
  })

  it('@base: component must have a name', () => {
    let opts = deepAssign(cloneDeep(options), {
      slots: {
        default: '<span>Name</span>'
      }
    })
    wrapper = mount(Badge, opts)
    expect(wrapper.name()).to.equal('Badge')
  })

  it('@base: have the right className', () => {
    let opts = deepAssign(cloneDeep(options), {
      slots: {
        default: '<span>HasClass</span>'
      }
    })
    wrapper = mount(Badge, opts)
    expect(wrapper.hasClass('ion-badge')).to.be.ok
  })

  it('@props: color', () => {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        color: 'danger'
      },
      slots: {
        default: '<span>color</span>'
      }
    })
    wrapper = mount(Badge, opts)
    expect(wrapper.hasStyle('background-color', '#f53d3d')).to.equal(true)
  })

  it('@props: mode', () => {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        mode: 'md'
      },
      slots: {
        default: '<span>mode</span>'
      }
    })
    wrapper = mount(Badge, opts)
    expect(wrapper.hasClass('badge-md')).to.equal(true)
  })

  it('@props: mode(default)', () => {
    wrapper = mount(Badge)
    expect(wrapper.hasClass('badge-ios')).to.equal(true)
  })
})

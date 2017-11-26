/* eslint-disable no-undef,no-unused-expressions */

import { mount } from 'vue-test-utils'
import deepAssign from 'deep-assign'
import cloneDeep from 'lodash.clonedeep'
import Badge from '../index'
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

describe('Badge', function () {
  // 清除DOM痕迹
  it('@base: renders the correct markup', function () {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        mode: 'md'
      }
    })
    let wrapper = mount(Badge, opts)
    const result = '<div class="ion-badge badge badge-md badge-md-primary"><span>Test</span></div>'
    expect(wrapper.html()).toEqual(result)
  })

  it('@base: renders the correct text', function () {
    let opts = deepAssign(cloneDeep(options), {
      slots: {
        default: '<span>Test</span>'
      }
    })
    let wrapper = mount(Badge, opts)
    expect(wrapper.text()).toEqual('Test')
  })

  it('@base: component must have a name', function () {
    let opts = deepAssign(cloneDeep(options), {
      slots: {
        default: '<span>Name</span>'
      }
    })
    let wrapper = mount(Badge, opts)
    expect(wrapper.name()).toEqual('Badge')
  })

  it('@base: have the right className', function () {
    let opts = deepAssign(cloneDeep(options), {
      slots: {
        default: '<span>HasClass</span>'
      }
    })
    let wrapper = mount(Badge, opts)
    expect(wrapper.hasClass('ion-badge')).toBeTruthy()
  })

  it('@base: matches snapshot', () => {
    const renderer = createRenderer()
    const wrapper = mount(Badge, options)
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
    let wrapper = mount(Badge, opts)
    expect(wrapper.hasClass('badge-md-danger')).toBeTruthy()
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
    let wrapper = mount(Badge, opts)
    expect(wrapper.hasClass('badge-md')).toBeTruthy()
  })

  it('@props: mode(default)', function () {
    let wrapper = mount(Badge)
    expect(wrapper.hasClass('badge-ios')).toBeTruthy()
  })
})

/* eslint-disable no-undef,no-unused-expressions */

import { mount } from 'vue-test-utils'
import deepAssign from 'deep-assign'
import cloneDeep from 'lodash.clonedeep'
import vimo from '../../../src/dist'

let Item = vimo.Item
let wrapper = null
let options = {
  propsData: {
    color: 'primary',
    mode: 'ios'
  },
  slots: {
    'item-start': '<span>item-left</span>',
    default: '<span>Test</span>',
    'item-end': '<span>item-right</span>'
  }
}

describe('Item', function () {
  // 清除DOM痕迹
  afterEach(() => {
    if (wrapper) {
      wrapper.vm.$el.remove()
      wrapper = null
    }
  })

  it('@base: renders the correct markup', function () {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        mode: 'md'
      }
    })
    wrapper = mount(Item, opts)
    const result = '<div class="ion-item item item-md item-block item-md-primary"><span item-start="">item-left</span> <div class="item-inner"><div class="input-wrapper"><span>Test</span></div> <span item-end="">item-right</span></div></div>'
    expect(wrapper.html()).to.equal(result)
  })

  it('@base: renders the correct text', function () {
    let opts = deepAssign(cloneDeep(options), {
      slots: {
        default: '<span>Test</span>'
      }
    })
    wrapper = mount(Item, opts)
    expect(wrapper.text()).to.equal('item-left Test item-right')
  })

  it('@base: component must have a name', function () {
    let opts = deepAssign(cloneDeep(options), {
      slots: {
        default: '<span>Name</span>'
      }
    })
    wrapper = mount(Item, opts)
    expect(wrapper.name()).to.equal('vm-item')
  })

  it('@base: have the right className', function () {
    let opts = deepAssign(cloneDeep(options), {
      slots: {
        default: '<span>HasClass</span>'
      }
    })
    wrapper = mount(Item, opts)
    expect(wrapper.hasClass('ion-item')).to.be.ok
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
    wrapper = mount(Item, opts)
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
    wrapper = mount(Item, opts)
    expect(wrapper.hasClass('item-md')).to.equal(true)
  })

  it('@props: mode(default)', function () {
    wrapper = mount(Item)
    expect(wrapper.hasClass('item-ios')).to.equal(true)
  })
})

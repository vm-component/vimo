/* eslint-disable no-undef,no-unused-expressions */

import { mount } from 'vue-test-utils'
import deepAssign from 'deep-assign'
import cloneDeep from 'lodash.clonedeep'
import Item from '../index'

let options = {
  propsData: {
    color: 'primary',
    mode: 'ios'
  },
  slots: {
    'item-left': '<span>item-left</span>',
    default: '<span>Test</span>',
    'item-right': '<span>item-right</span>'
  }
}

describe('Item', function () {
  it('@base: renders the correct markup', function () {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        mode: 'md'
      }
    })
    let wrapper = mount(Item, opts)
    const result = '<div class="ion-item item-md item-block item-md-primary"><span item-left="">item-left</span> <div class="item-inner"><div class="input-wrapper"><span>Test</span></div> <span item-right="">item-right</span></div></div>'
    expect(wrapper.html()).toEqual(result)
  })

  it('@base: renders the correct text', function () {
    let opts = deepAssign(cloneDeep(options), {
      slots: {
        default: '<span>Test</span>'
      }
    })
    let wrapper = mount(Item, opts)
    expect(wrapper.text()).toEqual('item-left Test item-right')
  })

  it('@base: component must have a name', function () {
    let opts = deepAssign(cloneDeep(options), {
      slots: {
        default: '<span>Name</span>'
      }
    })
    let wrapper = mount(Item, opts)
    expect(wrapper.name()).toEqual('Item')
  })

  it('@base: have the right className', function () {
    let opts = deepAssign(cloneDeep(options), {
      slots: {
        default: '<span>HasClass</span>'
      }
    })
    let wrapper = mount(Item, opts)
    expect(wrapper.hasClass('ion-item')).toBeTruthy()
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
    let wrapper = mount(Item, opts)
    expect(wrapper.hasClass('item-md-danger')).toBeTruthy()
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
    let wrapper = mount(Item, opts)
    expect(wrapper.hasClass('item-md')).toBeTruthy()
  })

  it('@props: mode(default)', function () {
    let wrapper = mount(Item)
    expect(wrapper.hasClass('item-ios')).toBeTruthy()
  })
})

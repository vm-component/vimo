/* eslint-disable no-undef,no-unused-expressions */

import { mount } from 'vue-test-utils'
import deepAssign from 'deep-assign'
import cloneDeep from 'lodash.clonedeep'
import Card from '../index'

let options = {
  propsData: {
    color: 'primary',
    mode: 'ios'
  },
  slots: {
    default: '<span>Test</span>'
  }
}

describe('Card', function () {
  it('@base: renders the correct markup', function () {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        mode: 'md'
      }
    })
    let wrapper = mount(Card, opts)
    const result = '<div class="ion-card card card-md card-md-primary"><span>Test</span></div>'
    expect(wrapper.html()).toEqual(result)
  })

  it('@base: renders the correct text', function () {
    let opts = deepAssign(cloneDeep(options), {
      slots: {
        default: '<span>Test</span>'
      }
    })
    let wrapper = mount(Card, opts)
    expect(wrapper.text()).toEqual('Test')
  })

  it('@base: component must have a name', function () {
    let opts = deepAssign(cloneDeep(options), {
      slots: {
        default: '<span>Name</span>'
      }
    })
    let wrapper = mount(Card, opts)
    expect(wrapper.name()).toEqual('Card')
  })

  it('@base: have the right className', function () {
    let opts = deepAssign(cloneDeep(options), {
      slots: {
        default: '<span>HasClass</span>'
      }
    })
    let wrapper = mount(Card, opts)
    expect(wrapper.hasClass('ion-card')).toBeTruthy()
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
    let wrapper = mount(Card, opts)
    expect(wrapper.hasClass('card-md-danger')).toBeTruthy()
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
    let wrapper = mount(Card, opts)
    expect(wrapper.hasClass('card-md')).toBeTruthy()
  })

  it('@props: mode(default)', function () {
    let wrapper = mount(Card)
    expect(wrapper.hasClass('card-ios')).toBeTruthy()
  })
})

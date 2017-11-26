/* eslint-disable no-undef,no-unused-expressions */

import { mount } from 'vue-test-utils'
import Avatar from '../index'
import deepAssign from 'deep-assign'
import cloneDeep from 'lodash.clonedeep'

let options = {
  propsData: {},
  slots: {
    default: '<span>Test</span>'
  }
}

describe('Avatar', function () {
  it('@base: renders the correct markup', function () {
    let wrapper = mount(Avatar)
    const result = '<div class="ion-avatar"></div>'
    expect(wrapper.html()).toEqual(result)
  })

  it('@base: renders the correct text', function () {
    let opts = deepAssign(cloneDeep(options), {
      slots: {
        default: '<span>Test</span>'
      }
    })
    let wrapper = mount(Avatar, opts)
    expect(wrapper.text()).toEqual('Test')
  })

  it('@base: component must have a name', function () {
    let opts = deepAssign(cloneDeep(options), {
      slots: {
        default: '<span>Name</span>'
      }
    })
    let wrapper = mount(Avatar, opts)
    expect(wrapper.name()).toEqual('Avatar')
  })

  it('@base: have the right className', function () {
    let opts = deepAssign(cloneDeep(options), {
      slots: {
        default: '<span>HasClass</span>'
      }
    })
    let wrapper = mount(Avatar, opts)
    expect(wrapper.hasClass('ion-avatar')).toBeTruthy()
  })
})

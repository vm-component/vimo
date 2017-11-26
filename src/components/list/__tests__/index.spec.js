/* eslint-disable no-undef,no-unused-expressions */

import { mount } from 'vue-test-utils'
import List from '../index'

let options = {
  propsData: {
    mode: 'md',
    sliding: true,
    radioGroup: true,
    value: 'here',
    disabled: true
  },
  slots: {
    default: '<span>Test</span>'
  }
}

describe('List', function () {
  it('@base: renders the correct markup', function () {
    let wrapper = mount(List, options)
    const result = `<div class="ion-list list-md"><span>Test</span></div>`
    expect(wrapper.html()).toEqual(result)
  })

  it('@base: component must have a name', function () {
    let wrapper = mount(List, options)
    expect(wrapper.name()).toEqual('List')
  })

  it('@base: have the right className', function () {
    let wrapper = mount(List, options)
    expect(wrapper.hasClass('ion-list')).toBeTruthy()
  })
})

/* eslint-disable no-undef,no-unused-expressions */

import { mount } from 'vue-test-utils'
import ItemSliding from '../index'

let options = {
  propsData: {
    disabled: true
  },
  slots: {
    default: '<span>Test</span>'
  }
}

describe('ItemSliding', function () {
  it('@base: renders the correct markup', function () {
    let wrapper = mount(ItemSliding, options)
    const result = `<div class="ion-item-sliding item-wrapper"><span>Test</span></div>`
    expect(wrapper.html()).toEqual(result)
  })

  it('@base: component must have a name', function () {
    let wrapper = mount(ItemSliding, options)
    expect(wrapper.name()).toEqual('ItemSliding')
  })

  it('@base: have the right className', function () {
    let wrapper = mount(ItemSliding, options)
    expect(wrapper.hasClass('ion-item-sliding')).toBeTruthy()
  })
})

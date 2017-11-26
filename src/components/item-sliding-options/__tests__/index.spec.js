/* eslint-disable no-undef,no-unused-expressions */

import { mount } from 'vue-test-utils'
import ItemSlidingOptions from '../index'

let options = {
  propsData: {
    side: 'right'
  },
  slots: {
    default: '<span>Test</span>'
  }
}

describe('ItemSlidingOptions', function () {
  it('@base: renders the correct markup', function () {
    let wrapper = mount(ItemSlidingOptions, options)
    const result = `<div side="right" class="ion-item-options"><span>Test</span></div>`
    expect(wrapper.html()).toEqual(result)
  })

  it('@base: component must have a name', function () {
    let wrapper = mount(ItemSlidingOptions, options)
    expect(wrapper.name()).toEqual('ItemSlidingOptions')
  })

  it('@base: have the right className', function () {
    let wrapper = mount(ItemSlidingOptions, options)
    expect(wrapper.hasClass('ion-item-options')).toBeTruthy()
  })
})

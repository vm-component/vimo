/* eslint-disable no-undef,no-unused-expressions */

import { mount } from 'vue-test-utils'
import ItemCollapseGroup from '../index'

let wrapper = null
let options = {
  propsData: {
    accordion: true
  },
  slots: {
    default: '<span>Test</span>'
  }
}

describe('ItemCollapseGroup', function () {
  it('@base: renders the correct markup', function () {
    wrapper = mount(ItemCollapseGroup, options)
    const result = `<div class="ion-item-collapse-group"><span>Test</span></div>`
    expect(wrapper.html()).toEqual(result)
  })

  it('@base: component must have a name', function () {
    wrapper = mount(ItemCollapseGroup, options)
    expect(wrapper.name()).toEqual('ItemCollapseGroup')
  })

  it('@base: have the right className', function () {
    wrapper = mount(ItemCollapseGroup, options)
    expect(wrapper.hasClass('ion-item-collapse-group')).toBeTruthy()
  })
})

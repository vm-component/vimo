/* eslint-disable no-undef,no-unused-expressions */

import { mount } from 'vue-test-utils'
import { ItemSlidingOptions } from 'vimo'

let wrapper = null
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
    wrapper = mount(ItemSlidingOptions, options)
    const result = `<div side="right" class="ion-item-options"><span>Test</span></div>`
    expect(wrapper.html()).to.equal(result)
  })

  it('@base: component must have a name', function () {
    wrapper = mount(ItemSlidingOptions, options)
    expect(wrapper.name()).to.equal('ItemSlidingOptions')
  })

  it('@base: have the right className', function () {
    wrapper = mount(ItemSlidingOptions, options)
    expect(wrapper.hasClass('ion-item-options')).to.be.ok
  })
})

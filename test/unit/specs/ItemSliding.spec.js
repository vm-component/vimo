/* eslint-disable no-undef,no-unused-expressions */

import { mount } from 'vue-test-utils'
import { ItemSliding } from 'vimo'

let wrapper = null
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
    wrapper = mount(ItemSliding, options)
    const result = `<div class="ion-item-sliding item-wrapper"><span>Test</span></div>`
    expect(wrapper.html()).to.equal(result)
  })

  it('@base: component must have a name', function () {
    wrapper = mount(ItemSliding, options)
    expect(wrapper.name()).to.equal('ItemSliding')
  })

  it('@base: have the right className', function () {
    wrapper = mount(ItemSliding, options)
    expect(wrapper.hasClass('ion-item-sliding')).to.be.ok
  })
})

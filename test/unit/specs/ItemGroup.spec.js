/* eslint-disable no-undef,no-unused-expressions */

import { mount } from 'vue-test-utils'
import { ItemGroup } from 'vimo'

let wrapper = null
let options = {
  propsData: {
    mode: 'md',
    color: 'danger'
  }
}

describe('ItemGroup', function () {
  it('@base: renders the correct markup', function () {
    wrapper = mount(ItemGroup, options)
    const result = `<div class="ion-item-group"></div>`
    expect(wrapper.html()).to.equal(result)
  })

  it('@base: component must have a name', function () {
    wrapper = mount(ItemGroup, options)
    expect(wrapper.name()).to.equal('ItemGroup')
  })

  it('@base: have the right className', function () {
    wrapper = mount(ItemGroup, options)
    expect(wrapper.hasClass('ion-item-group')).to.be.ok
  })
})

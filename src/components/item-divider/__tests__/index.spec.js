/* eslint-disable no-undef,no-unused-expressions */

import { mount } from 'vue-test-utils'
import ItemDivider from '../index'

let options = {
  propsData: {
    mode: 'md',
    color: 'danger'
  }
}

describe('ItemDivider', function () {
  it('@base: renders the correct markup', function () {
    let wrapper = mount(ItemDivider, options)
    const result = `<div class="ion-item item-md ion-item-divider item-divider item-divider-md item-divider-md-danger"> <div class="item-inner"><div class="input-wrapper"></div> </div></div>`
    expect(wrapper.html()).toEqual(result)
  })

  it('@base: component must have a name', function () {
    let wrapper = mount(ItemDivider, options)
    expect(wrapper.name()).toEqual('ItemDivider')
  })

  it('@base: have the right className', function () {
    let wrapper = mount(ItemDivider, options)
    expect(wrapper.hasClass('ion-item-divider')).toBeTruthy()
  })
})

/* eslint-disable no-undef,no-unused-expressions */

import { mount } from 'vue-test-utils'
import ListHeader from '../index'

let options = {
  propsData: {
    mode: 'md',
    color: 'danger'
  }
}

describe('ListHeader', function () {
  it('@base: renders the correct markup', function () {
    let wrapper = mount(ListHeader, options)
    const result = `<div class="ion-item item-md ion-list-header list-header list-header-md list-header-md-danger"> <div class="item-inner"><div class="input-wrapper"></div> </div></div>`
    expect(wrapper.html()).toEqual(result)
  })

  it('@base: component must have a name', function () {
    let wrapper = mount(ListHeader, options)
    expect(wrapper.name()).toEqual('ListHeader')
  })

  it('@base: have the right className', function () {
    let wrapper = mount(ListHeader, options)
    expect(wrapper.hasClass('ion-list-header')).toBeTruthy()
  })
})

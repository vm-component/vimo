/* eslint-disable no-undef,no-unused-expressions */

import { mount } from 'vue-test-utils'
import FabList from '../index'

let wrapper = null
let options = {
  propsData: {
    side: 'top',
    mode: 'md'
  },
  slots: {
    default: '<span>Test</span>'
  }
}

describe('FabList', function () {
  it('@base: renders the correct markup', function () {
    wrapper = mount(FabList, options)
    const result = `<div side="top" class="ion-fab-list"><span>Test</span></div>`
    expect(wrapper.html()).toEqual(result)
  })

  it('@base: component must have a name', function () {
    wrapper = mount(FabList, options)
    expect(wrapper.name()).toEqual('FabList')
  })

  it('@base: have the right className', function () {
    wrapper = mount(FabList, options)
    expect(wrapper.hasClass('ion-fab-list')).toBeTruthy()
  })
})

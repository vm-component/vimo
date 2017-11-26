/* eslint-disable no-undef,no-unused-expressions */

import { mount } from 'vue-test-utils'
import Column from '../index'

let options = {
  slots: {
    default: '<span>Test</span>'
  }
}

describe('Column', function () {
  it('@base: renders the correct markup', function () {
    let wrapper = mount(Column, options)
    const result = `<div class="col"><span>Test</span></div>`
    expect(wrapper.html()).toEqual(result)
  })

  it('@base: component must have a name', function () {
    let wrapper = mount(Column, options)
    expect(wrapper.name()).toEqual('Column')
  })

  it('@base: have the right className', function () {
    let wrapper = mount(Column, options)
    expect(wrapper.hasClass('col')).toBeTruthy()
  })
})

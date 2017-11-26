/* eslint-disable no-undef,no-unused-expressions */

import { mount } from 'vue-test-utils'
import Row from '../index'

let options = {
  slots: {
    default: '<span>Test</span>'
  }
}

describe('Row', function () {
  it('@base: renders the correct markup', function () {
    let wrapper = mount(Row, options)
    const result = `<div class="row"><span>Test</span></div>`
    expect(wrapper.html()).toEqual(result)
  })

  it('@base: component must have a name', function () {
    let wrapper = mount(Row, options)
    expect(wrapper.name()).toEqual('Row')
  })

  it('@base: have the right className', function () {
    let wrapper = mount(Row, options)
    expect(wrapper.hasClass('row')).toBeTruthy()
  })
})

/* eslint-disable no-undef,no-unused-expressions */

import { mount } from 'vue-test-utils'
import vimo from '../../../components/dist'

let Column = vimo.Column
let wrapper = null
let options = {
  slots: {
    default: '<span>Test</span>'
  }
}

describe('Column', function () {
  it('@base: renders the correct markup', function () {
    wrapper = mount(Column, options)
    const result = `<div class="col"><span>Test</span></div>`
    expect(wrapper.html()).to.equal(result)
  })

  it('@base: component must have a name', function () {
    wrapper = mount(Column, options)
    expect(wrapper.name()).to.equal('Column')
  })

  it('@base: have the right className', function () {
    wrapper = mount(Column, options)
    expect(wrapper.hasClass('col')).to.be.ok
  })
})

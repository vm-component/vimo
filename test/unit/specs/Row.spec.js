/* eslint-disable no-undef,no-unused-expressions */

import { mount } from 'vue-test-utils'
import { Row } from 'vimo'

let wrapper = null
let options = {
  slots: {
    default: '<span>Test</span>'
  }
}

describe('Row', function () {
  it('@base: renders the correct markup', function () {
    wrapper = mount(Row, options)
    const result = `<div class="row"><span>Test</span></div>`
    expect(wrapper.html()).to.equal(result)
  })

  it('@base: component must have a name', function () {
    wrapper = mount(Row, options)
    expect(wrapper.name()).to.equal('Row')
  })

  it('@base: have the right className', function () {
    wrapper = mount(Row, options)
    expect(wrapper.hasClass('row')).to.be.ok
  })
})

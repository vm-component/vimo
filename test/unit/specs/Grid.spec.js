/* eslint-disable no-undef,no-unused-expressions */

import { mount } from 'vue-test-utils'
import { Grid } from 'vimo'

let wrapper = null
let options = {
  slots: {
    default: '<span>Test</span>'
  }
}

describe('Grid', function () {
  it('@base: renders the correct markup', function () {
    wrapper = mount(Grid, options)
    const result = `<div class="grid"><span>Test</span></div>`
    expect(wrapper.html()).to.equal(result)
  })

  it('@base: component must have a name', function () {
    wrapper = mount(Grid, options)
    expect(wrapper.name()).to.equal('Grid')
  })

  it('@base: have the right className', function () {
    wrapper = mount(Grid, options)
    expect(wrapper.hasClass('grid')).to.be.ok
  })
})

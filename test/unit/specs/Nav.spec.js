/* eslint-disable no-undef,no-unused-expressions */

import { mount } from 'vue-test-utils'
import vimo from '../../../components/dist'

let Nav = vimo.Nav
let wrapper = null
let opts = {
  slots: {
    default: '<span>default</span>'
  }
}

describe('Nav', function () {
  it('@base: renders the correct markup', function () {
    wrapper = mount(Nav, opts)
    const result = `<nav class="ion-nav"><!----> <span>default</span></nav>`

    expect(wrapper.html()).to.equal(result)
  })

  it('@base: component must have a name', function () {
    wrapper = mount(Nav, opts)
    expect(wrapper.name()).to.equal('Nav')
  })
})

/* eslint-disable no-undef,no-unused-expressions */

import { mount } from 'vue-test-utils'
import vimo from '../../../components/dist'

let List = vimo.List
let wrapper = null
let options = {
  propsData: {
    mode: 'md',
    sliding: true,
    radioGroup: true,
    value: 'here',
    disabled: true
  },
  slots: {
    default: '<span>Test</span>'
  }
}

describe('List', function () {
  it('@base: renders the correct markup', function () {
    wrapper = mount(List, options)
    const result = `<div class="ion-list list-md"><span>Test</span></div>`
    expect(wrapper.html()).to.equal(result)
  })

  it('@base: component must have a name', function () {
    wrapper = mount(List, options)
    expect(wrapper.name()).to.equal('List')
  })

  it('@base: have the right className', function () {
    wrapper = mount(List, options)
    expect(wrapper.hasClass('ion-list')).to.be.ok
  })
})

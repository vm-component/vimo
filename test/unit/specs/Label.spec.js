/* eslint-disable no-undef,no-unused-expressions */

import { mount } from 'vue-test-utils'
import vimo from '../../../components/dist'

let Label = vimo.Label
let wrapper = null
let options = {
  propsData: {
    mode: 'md',
    color: 'danger',
    fixed: true,
    floating: true,
    stacked: true
  },
  slots: {
    default: '<span>Test</span>'
  }
}

describe('Label', function () {
  it('@base: renders the correct markup', function () {
    wrapper = mount(Label, options)
    const result = `<label fixed="true" floating="true" stacked="true" class="ion-label label label-md label-md-danger"><span>Test</span></label>`
    expect(wrapper.html()).to.equal(result)
  })

  it('@base: component must have a name', function () {
    wrapper = mount(Label, options)
    expect(wrapper.name()).to.equal('Label')
  })

  it('@base: have the right className', function () {
    wrapper = mount(Label, options)
    expect(wrapper.hasClass('ion-label')).to.be.ok
  })
})

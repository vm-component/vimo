/* eslint-disable no-undef,no-unused-expressions */

import { mount } from 'vue-test-utils'
import vimo from '../../../components/dist'

let FabList = vimo.FabList
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
    expect(wrapper.html()).to.equal(result)
  })

  it('@base: component must have a name', function () {
    wrapper = mount(FabList, options)
    expect(wrapper.name()).to.equal('FabList')
  })

  it('@base: have the right className', function () {
    wrapper = mount(FabList, options)
    expect(wrapper.hasClass('ion-fab-list')).to.be.ok
  })
})

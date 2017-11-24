/* eslint-disable no-undef,no-unused-expressions */

import { mount } from 'vue-test-utils'
import { FabButton } from 'vimo'

let wrapper = null
let options = {
  propsData: {
    mini: true,
    mode: 'md',
    color: 'danger'
  },
  slots: {
    default: '<span>Test</span>'
  }
}

describe('FabButton', function () {
  it('@base: renders the correct markup', function () {
    wrapper = mount(FabButton, options)
    const result = `<button mini="true" class="fab fab-md fab-md-danger fab-in-list fab-md-in-list"><i class="ion-icon fab-close-icon ion-ios-close"></i> <span class="button-inner"><span>Test</span></span></button>`
    expect(wrapper.html()).to.equal(result)
  })

  it('@base: component must have a name', function () {
    wrapper = mount(FabButton, options)
    expect(wrapper.name()).to.equal('FabButton')
  })

  it('@base: have the right className', function () {
    wrapper = mount(FabButton, options)
    expect(wrapper.hasClass('fab')).to.be.ok
  })
})

/* eslint-disable no-undef,no-unused-expressions */

import { mount } from 'vue-test-utils'
import vimo from '../../../components/dist'

let ListHeader = vimo.ListHeader
let wrapper = null
let options = {
  propsData: {
    mode: 'md',
    color: 'danger'
  }
}

describe('ListHeader', function () {
  it('@base: renders the correct markup', function () {
    wrapper = mount(ListHeader, options)
    const result = `<div class="ion-item item-md ion-list-header list-header list-header-md list-header-md-danger"> <div class="item-inner"><div class="input-wrapper"></div> </div></div>`
    expect(wrapper.html()).to.equal(result)
  })

  it('@base: component must have a name', function () {
    wrapper = mount(ListHeader, options)
    expect(wrapper.name()).to.equal('ListHeader')
  })

  it('@base: have the right className', function () {
    wrapper = mount(ListHeader, options)
    expect(wrapper.hasClass('ion-list-header')).to.be.ok
  })
})

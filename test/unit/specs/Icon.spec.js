/* eslint-disable no-undef,no-unused-expressions */

import { mount } from 'vue-test-utils'
import vimo from '../../../components/dist'

let Icon = vimo.Icon
let wrapper = null
let options = {
  propsData: {
    mode: 'ios',
    color: 'danger',
    name: 'star',
    activeName: 'star-outline',
    isActive: true,
    ios: 'ios-star',
    md: 'md-star'
  }
}

describe('Icon', function () {
  it('@base: renders the correct markup', function () {
    wrapper = mount(Icon, options)
    const result = `<i class="ion-icon icon-ios-danger ion-ios-star"></i>`
    expect(wrapper.html()).to.equal(result)
  })

  it('@base: component must have a name', function () {
    wrapper = mount(Icon, options)
    expect(wrapper.name()).to.equal('Icon')
  })

  it('@base: have the right className', function () {
    wrapper = mount(Icon, options)
    expect(wrapper.hasClass('ion-icon')).to.be.ok
  })
})

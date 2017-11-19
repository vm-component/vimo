/* eslint-disable no-undef,no-unused-expressions */

import 'ionicons/dist/css/ionicons.css'
import { mount } from 'vue-test-utils'
import vimo from '../../../src'

let Footer = vimo.Footer
let wrapper = null
let options = {
  slots: {
    default: '<span>Test</span>'
  }
}

describe('Footer', function () {
  // 清除DOM痕迹
  afterEach(() => {
    if (wrapper) {
      wrapper.vm.$el.remove()
      wrapper = null
    }
  })

  it('@config: renders the correct markup', function () {
    wrapper = mount(Footer, options)
    const result = '<footer class="ion-footer footer footer-ios"><span>Test</span></footer>'
    expect(wrapper.html().trim()).to.equal(result)
  })

  it('@config: renders the correct text', function () {
    wrapper = mount(Footer, options)
    expect(wrapper.text().trim()).to.equal('Test')
  })

  it('@config: component must have a name', function () {
    wrapper = mount(Footer, options)
    expect(wrapper.name()).to.equal('vm-footer')
  })

  it('@config: have the right className', function () {
    wrapper = mount(Footer, options)
    expect(wrapper.hasClass('ion-footer')).to.be.ok
  })

  it('hide()', function () {
    wrapper = mount(Footer)
    wrapper.vm.hide()
    expect(wrapper.vm.isHide).to.be.ok
  })

  it('show()', function () {
    wrapper = mount(Footer)
    wrapper.vm.show()
    expect(wrapper.vm.isHide).to.not.be.ok
  })

  it('toggle()', function () {
    wrapper = mount(Footer)
    let isHide = !wrapper.vm.isHide
    wrapper.vm.toggle()
    expect(wrapper.vm.isHide).to.equal(isHide)
  })

  it('setStyle()', (cb) => {
    wrapper = mount(Footer)
    wrapper.vm.setStyle({
      color: '#EEEEEE'
    })
    setTimeout(() => {
      expect(wrapper.hasStyle('color', '#EEEEEE')).to.equal(true)
      cb()
    }, 100)
  })
})

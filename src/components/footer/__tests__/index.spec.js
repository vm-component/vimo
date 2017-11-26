/* eslint-disable no-undef,no-unused-expressions */

import { mount } from 'vue-test-utils'
import Footer from '../index'

let options = {
  slots: {
    default: '<span>Test</span>'
  }
}

describe('Footer', function () {
  it('@base: renders the correct markup', function () {
    let wrapper = mount(Footer, options)
    const result = '<footer class="ion-footer"><span>Test</span></footer>'
    expect(wrapper.html().trim()).toEqual(result)
  })

  it('@base: renders the correct text', function () {
    let wrapper = mount(Footer, options)
    expect(wrapper.text().trim()).toEqual('Test')
  })

  it('@base: component must have a name', function () {
    let wrapper = mount(Footer, options)
    expect(wrapper.name()).toEqual('Footer')
  })

  it('@base: have the right className', function () {
    let wrapper = mount(Footer, options)
    expect(wrapper.hasClass('ion-footer')).toBeTruthy()
  })

  it('hide()', function () {
    let wrapper = mount(Footer)
    wrapper.vm.hide()
    expect(wrapper.vm.isHide).toBeTruthy()
  })

  it('show()', function () {
    let wrapper = mount(Footer)
    wrapper.vm.show()
    expect(wrapper.vm.isHide).toBeFalsy()
  })

  it('toggle()', function () {
    let wrapper = mount(Footer)
    let isHide = !wrapper.vm.isHide
    wrapper.vm.toggle()
    expect(wrapper.vm.isHide).toEqual(isHide)
  })

  it('setStyle()', (cb) => {
    let wrapper = mount(Footer)
    wrapper.vm.setStyle({
      color: '#EEEEEE'
    })
    setTimeout(() => {
      expect(wrapper.hasStyle('color', '#EEEEEE')).toBeTruthy()
      cb()
    }, 100)
  })
})

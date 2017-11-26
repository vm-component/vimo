/* eslint-disable no-undef,no-unused-expressions */

import { mount } from 'vue-test-utils'
import Header from '../index'

let options = {
  slots: {
    default: '<span>Test</span>'
  }
}

describe('Header', function () {
  it('@base: renders the correct markup', function () {
    let wrapper = mount(Header, options)
    const result = '<header class="ion-header"><div id="rightButtonPlaceholder"></div> <span>Test</span></header>'
    expect(wrapper.html().trim()).toEqual(result)
  })

  it('@base: renders the correct text', function () {
    let wrapper = mount(Header, options)
    expect(wrapper.text().trim()).toEqual('Test')
  })

  it('@base: component must have a name', function () {
    let wrapper = mount(Header, options)
    expect(wrapper.name()).toEqual('Header')
  })

  it('@base: have the right className', function () {
    let wrapper = mount(Header, options)
    expect(wrapper.hasClass('ion-header')).toBeTruthy()
  })

  it('hide()', function () {
    let wrapper = mount(Header)
    wrapper.vm.hide()
    expect(wrapper.vm.isHide).toBeTruthy()
  })

  it('show()', function () {
    let wrapper = mount(Header)
    wrapper.vm.show()
    expect(wrapper.vm.isHide).toBeFalsy()
  })

  it('toggle()', function () {
    let wrapper = mount(Header)
    let isHide = !wrapper.vm.isHide
    wrapper.vm.toggle()
    expect(wrapper.vm.isHide).toEqual(isHide)
  })

  it('setStyle()', (cb) => {
    let wrapper = mount(Header)
    wrapper.vm.setStyle({
      color: '#EEEEEE'
    })
    setTimeout(() => {
      expect(wrapper.hasStyle('color', '#EEEEEE')).toBeTruthy()
      cb()
    }, 100)
  })
})

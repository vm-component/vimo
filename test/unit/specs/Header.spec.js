/* eslint-disable no-undef,no-unused-expressions */

import 'ionicons/dist/css/ionicons.css'
import { mount } from 'vue-test-utils'
import vimo from '../../../src/dist'

let Header = vimo.Header
let wrapper = null
let options = {
  slots: {
    default: '<span>Test</span>'
  }
}

describe('Header', function () {
  // 清除DOM痕迹
  afterEach(() => {
    if (wrapper) {
      wrapper.vm.$el.remove()
      wrapper = null
    }
  })

  it('@base: renders the correct markup', function () {
    wrapper = mount(Header, options)
    const result = '<header class="ion-header"><div id="rightButtonPlaceholder"></div> <span>Test</span></header>'
    expect(wrapper.html().trim()).to.equal(result)
  })

  it('@base: renders the correct text', function () {
    wrapper = mount(Header, options)
    expect(wrapper.text().trim()).to.equal('Test')
  })

  it('@base: component must have a name', function () {
    wrapper = mount(Header, options)
    expect(wrapper.name()).to.equal('Header')
  })

  it('@base: have the right className', function () {
    wrapper = mount(Header, options)
    expect(wrapper.hasClass('ion-header')).to.be.ok
  })

  it('hide()', function () {
    wrapper = mount(Header)
    wrapper.vm.hide()
    expect(wrapper.vm.isHide).to.be.ok
  })

  it('show()', function () {
    wrapper = mount(Header)
    wrapper.vm.show()
    expect(wrapper.vm.isHide).to.not.be.ok
  })

  it('toggle()', function () {
    wrapper = mount(Header)
    let isHide = !wrapper.vm.isHide
    wrapper.vm.toggle()
    expect(wrapper.vm.isHide).to.equal(isHide)
  })

  it('setStyle()', (cb) => {
    wrapper = mount(Header)
    wrapper.vm.setStyle({
      color: '#EEEEEE'
    })
    setTimeout(() => {
      expect(wrapper.hasStyle('color', '#EEEEEE')).to.equal(true)
      cb()
    }, 100)
  })
})

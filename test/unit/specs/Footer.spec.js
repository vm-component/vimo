/* eslint-disable no-undef,no-unused-expressions */

import 'ionicons/dist/css/ionicons.css'
import { mount } from 'vue-test-utils'
import vimo from '../../../components/dist'

let Footer = vimo.Footer
let wrapper = null
let options = {
  slots: {
    default: '<span>Test</span>'
  }
}

describe('Footer', () => {
  // 清除DOM痕迹
  afterEach(() => {
    if (wrapper) {
      wrapper.vm.$el.remove()
      wrapper = null
    }
  })

  it('@base: renders the correct markup', () => {
    wrapper = mount(Footer, options)
    const result = '<footer class="ion-footer"><span>Test</span></footer>'
    expect(wrapper.html().trim()).to.equal(result)
  })

  it('@base: renders the correct text', () => {
    wrapper = mount(Footer, options)
    expect(wrapper.text().trim()).to.equal('Test')
  })

  it('@base: component must have a name', () => {
    wrapper = mount(Footer, options)
    expect(wrapper.name()).to.equal('Footer')
  })

  it('@base: have the right className', () => {
    wrapper = mount(Footer, options)
    expect(wrapper.hasClass('ion-footer')).to.be.ok
  })

  it('hide()', () => {
    wrapper = mount(Footer)
    wrapper.vm.hide()
    expect(wrapper.vm.isHide).to.be.ok
  })

  it('show()', () => {
    wrapper = mount(Footer)
    wrapper.vm.show()
    expect(wrapper.vm.isHide).to.not.be.ok
  })

  it('toggle()', () => {
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

/* eslint-disable no-undef,no-unused-expressions */

import { mount } from 'vue-test-utils'
import vimo from '../../../components/dist'

let Page = vimo.Page
let wrapper = null
let opts = {
  slots: {
    default: '<span>Name</span>'
  }
}

describe('Page', function () {
  // 清除DOM痕迹
  afterEach(() => {
    if (wrapper) {
      wrapper.vm.$el.remove()
      wrapper = null
    }
  })

  it('@base: renders the correct markup', function () {
    wrapper = mount(Page, opts)
    const result = `<article class="ion-page" style="z-index: 1001;"><span>Name</span></article>`
    expect(wrapper.html()).to.equal(result)
  })

  it('@base: component must have a name', function () {
    wrapper = mount(Page, opts)
    expect(wrapper.name()).to.equal('Page')
  })

  it('@base: renders the correct text', function () {
    wrapper = mount(Page, opts)
    expect(wrapper.text().trim()).to.equal('Name')
  })

  it('@base: z-index > 1000', function () {
    wrapper = mount(Page, opts)
    let zIndex = parseInt(wrapper.vm.$el.style.zIndex)
    expect(zIndex > 1000).to.be.ok
  })

  it('@base: forward/backward/null', function () {
    window.VM.history._direction = 'forward'
    wrapper = mount(Page, opts)
    let forwardZIndex = parseInt(wrapper.vm.$el.style.zIndex)

    wrapper = null
    window.VM.history._direction = 'backward'
    wrapper = mount(Page, opts)
    let backwardZIndex = parseInt(wrapper.vm.$el.style.zIndex)

    wrapper = null
    window.VM.history._direction = null
    wrapper = mount(Page, opts)
    let nullZIndex = parseInt(wrapper.vm.$el.style.zIndex)

    expect(forwardZIndex > backwardZIndex && backwardZIndex === nullZIndex && nullZIndex >= 1000).to.be.ok
  })
})

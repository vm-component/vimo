/* eslint-disable no-undef,no-unused-expressions */

import { mount } from 'vue-test-utils'
import vimo from '../../../components/dist'

let Page = vimo.Page
let wrapper = null

describe('Page', () => {
  // 清除DOM痕迹
  afterEach(() => {
    if (wrapper) {
      wrapper.vm.$el.remove()
      wrapper = null
    }
  })

  it('@base: renders the correct markup', () => {
    wrapper = mount(Page, {
      slots: {
        default: '<span>Name</span>'
      }
    })
    const result = `<article class="ion-page" style="z-index: 1001;"><span>Name</span></article>`
    expect(wrapper.html()).to.equal(result)
  })

  it('@base: component must have a name', () => {
    wrapper = mount(Page, {
      slots: {
        default: '<span>Name</span>'
      }
    })
    expect(wrapper.name()).to.equal('Page')
  })

  it('@base: renders the correct text', () => {
    wrapper = mount(Page, {
      slots: {
        default: '<span>Name</span>'
      }
    })
    expect(wrapper.text().trim()).to.equal('Name')
  })

  it('@base: z-index > 1000', () => {
    wrapper = mount(Page, {
      slots: {
        default: '<span>Name</span>'
      }
    })
    let zIndex = parseInt(wrapper.vm.$el.style.zIndex)
    expect(zIndex > 1000).to.be.ok
  })

  it('@base: forward/backward/null', () => {
    window.VM.history._direction = 'forward'
    wrapper = mount(Page, {
      slots: {
        default: '<span>Name</span>'
      }
    })
    let forwardZIndex = parseInt(wrapper.vm.$el.style.zIndex)

    wrapper = null
    window.VM.history._direction = 'backward'
    wrapper = mount(Page, {
      slots: {
        default: '<span>Name</span>'
      }
    })
    let backwardZIndex = parseInt(wrapper.vm.$el.style.zIndex)

    wrapper = null
    window.VM.history._direction = null
    wrapper = mount(Page, {
      slots: {
        default: '<span>Name</span>'
      }
    })
    let nullZIndex = parseInt(wrapper.vm.$el.style.zIndex)

    expect(forwardZIndex > backwardZIndex && backwardZIndex === nullZIndex && nullZIndex >= 1000).to.be.ok
  })
})

/* eslint-disable no-undef,no-unused-expressions */

import { mount } from 'vue-test-utils'
import Page from '../index'

let wrapper = null
let opts = {
  slots: {
    default: '<span>Name</span>'
  },
  mocks: {
    // $history: {
    //   getDirection () {
    //     return 'forward'
    //   }
    // }
  }
}

describe('Page', function () {
  it('@base: renders the correct markup', function () {
    wrapper = mount(Page, opts)
    const result = `<article class="ion-page" style="z-index: 1001;"><span>Name</span></article>`
    expect(wrapper.html()).toEqual(result)
  })

  it('@base: component must have a name', function () {
    wrapper = mount(Page, opts)
    expect(wrapper.name()).toEqual('Page')
  })

  it('@base: renders the correct text', function () {
    wrapper = mount(Page, opts)
    expect(wrapper.text().trim()).toEqual('Name')
  })

  it('@base: z-index > 1000', function () {
    wrapper = mount(Page, opts)
    let zIndex = parseInt(wrapper.vm.$el.style.zIndex)
    expect(zIndex > 1000).toBeTruthy()
  })

  // it('@base: forward/backward/null', function () {
  //   window.VM.history._direction = 'forward'
  //   wrapper = mount(Page, opts)
  //   let forwardZIndex = parseInt(wrapper.vm.$el.style.zIndex)
  //
  //   wrapper = null
  //   window.VM.history._direction = 'backward'
  //   wrapper = mount(Page, opts)
  //   let backwardZIndex = parseInt(wrapper.vm.$el.style.zIndex)
  //
  //   wrapper = null
  //   window.VM.history._direction = null
  //   wrapper = mount(Page, opts)
  //   let nullZIndex = parseInt(wrapper.vm.$el.style.zIndex)
  //
  //   expect(forwardZIndex > backwardZIndex && backwardZIndex === nullZIndex && nullZIndex >= 1000).toBeTruthy()
  // })
})

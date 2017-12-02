/* eslint-disable no-undef,no-unused-expressions */

import { mount } from 'vue-test-utils'
import App from '../index'
import deepAssign from 'deep-assign'
import cloneDeep from 'lodash.clonedeep'

let opts = {
  slots: {
    default: '<span>Name</span>'
  }
}

describe('App', function () {
  it('@base: renders the correct markup', function () {
    const wrapper = mount(App, opts)
    const result = `<article id="ios" class="ion-app ios app-ios platform-ios"><section class="app-root"><span>Name</span></section> <aside id="modalPortal"></aside> <aside id="sheetPortal"></aside> <aside id="alertPortal"></aside> <aside id="loadingPortal"></aside> <aside id="toastPortal"></aside> <aside class="click-block"></aside> </article>`
    expect(wrapper.html()).toEqual(result)
  })

  it('@base: component must have a name', function () {
    let wrapper = mount(App, opts)
    expect(wrapper.name()).toEqual('App')
  })

  it('@base: renders the correct text', function () {
    let wrapper = mount(App, opts)
    expect(wrapper.text().trim()).toEqual('Name')
  })

  it('@props: mode', function () {
    let wrapper = mount(App, deepAssign(cloneDeep(opts), {
      propsData: {
        mode: 'md'
      }
    }))
    expect(wrapper.hasClass('platform-md')).toBeTruthy()
    expect(wrapper.hasClass('md')).toBeTruthy()
  })

  it('setEnabled(false)', (cb) => {
    let wrapper = mount(App)

    wrapper.vm.setEnabled(false, 10)
    expect(wrapper.vm.isEnabled).toBeFalsy()
    setTimeout(() => {
      expect(wrapper.vm.isEnabled).toBeTruthy()
      cb()
    }, 1000)
  })

  it('setEnabled(true)', (cb) => {
    let wrapper = mount(App)

    wrapper.vm.setEnabled(true)
    setTimeout(() => {
      expect(wrapper.vm.isEnabled).toBeTruthy()
      cb()
    }, 1000)
  })

  it('setDisableScroll(false)', function () {
    let wrapper = mount(App)

    wrapper.vm.setDisableScroll(false)
    expect(wrapper.vm.isScrollDisabled).toBeFalsy()
  })

  it('setDisableScroll(true)', (cb) => {
    let wrapper = mount(App)
    wrapper.vm.setDisableScroll(true, 90)
    expect(wrapper.vm.isScrollDisabled).toBeTruthy()
    setTimeout(() => {
      expect(wrapper.vm.isScrollDisabled).toBeFalsy()
      cb()
    }, 100)
  })

  it('setClass()', function () {
    let wrapper = mount(App)

    wrapper.vm.setClass('test123', true)
    expect(wrapper.hasClass('test123')).toBeTruthy()
  })

  it('setDocTitle()', (cb) => {
    let wrapper = mount(App)

    wrapper.vm.setDocTitle('title123')
    setTimeout(() => {
      expect(document.title).toEqual('title123')
      cb()
    }, 100)
  })

  it('$on(onScrollStart)', (cb) => {
    let wrapper = mount(App)
    wrapper.vm.$root.$emit('onScrollStart')
    setTimeout(() => {
      expect(wrapper.vm.isScrolling).toBeTruthy()
      cb()
    }, 0)
  })

  it('$on(onScroll)', (cb) => {
    let wrapper = mount(App)
    wrapper.vm.$root.$emit('onScroll')
    setTimeout(() => {
      expect(wrapper.vm.isScrolling).toBeTruthy()
      cb()
    }, 0)
  })

  it('$on(onScrollEnd)', (cb) => {
    let wrapper = mount(App)
    wrapper.vm.$root.$emit('onScrollEnd')
    setTimeout(() => {
      expect(wrapper.vm.isScrolling).toBeFalsy()
      cb()
    }, 0)
  })
})

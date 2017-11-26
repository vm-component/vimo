/* eslint-disable no-undef,no-unused-expressions */

import { mount } from 'vue-test-utils'
import deepAssign from 'deep-assign'
import cloneDeep from 'lodash.clonedeep'
import Fab from '../index'

let wrapper = null
let options = {
  slots: {
    default: '<span>Test</span>'
  }
}

describe('Fab', function () {
  it('@base: renders the correct markup', function () {
    wrapper = mount(Fab, options)
    const result = `<div class="ion-fab"><span>Test</span></div>`
    expect(wrapper.html()).toEqual(result)
  })

  it('@base: component must have a name', function () {
    wrapper = mount(Fab, options)
    expect(wrapper.name()).toEqual('Fab')
  })

  it('@base: have the right className', function () {
    wrapper = mount(Fab, options)
    expect(wrapper.hasClass('ion-fab')).toBeTruthy()
  })

  it('@props: top && left', function (cb) {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        top: true,
        left: true
      }
    })
    wrapper = mount(Fab, opts)
    window.setTimeout(() => {
      const result = `<div class="ion-fab" style="top: 10px; left: 10px;"><span>Test</span></div>`
      expect(wrapper.html()).toEqual(result)
      cb()
    }, 0)
  })

  it('@props: top && right && edge', function (cb) {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        top: true,
        edge: true,
        right: true
      }
    })
    wrapper = mount(Fab, opts)
    window.setTimeout(() => {
      const result = `<div class="ion-fab" style="top: 0px; right: 10px;"><span>Test</span></div>`
      expect(wrapper.html()).toEqual(result)
      cb()
    }, 0)
  })

  it('@props: bottom && left', function (cb) {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        bottom: true,
        left: true
      }
    })
    wrapper = mount(Fab, opts)
    window.setTimeout(() => {
      const result = `<div class="ion-fab" style="bottom: 10px; left: 10px;"><span>Test</span></div>`
      expect(wrapper.html()).toEqual(result)
      cb()
    }, 0)
  })

  it('@props: bottom && right', function (cb) {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        bottom: true,
        right: true
      }
    })
    wrapper = mount(Fab, opts)
    window.setTimeout(() => {
      const result = `<div class="ion-fab" style="bottom: 10px; right: 10px;"><span>Test</span></div>`
      expect(wrapper.html()).toEqual(result)
      cb()
    }, 0)
  })

  it('@props: middle && center', function (cb) {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        middle: true,
        center: true
      }
    })
    wrapper = mount(Fab, opts)
    window.setTimeout(() => {
      const result = `<div class="ion-fab" style="left: 50%; margin-left: 0px; top: 50%; position: fixed;"><span>Test</span></div>`
      expect(wrapper.html()).toEqual(result)
      cb()
    }, 0)
  })
})

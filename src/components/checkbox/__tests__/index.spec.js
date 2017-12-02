/* eslint-disable no-undef,no-unused-expressions */

import { mount } from 'vue-test-utils'
import deepAssign from 'deep-assign'
import cloneDeep from 'lodash.clonedeep'
import Checkbox from '../index'

let options = {
  propsData: {
    color: 'primary',
    mode: 'ios'
  }
}

describe('Checkbox', function () {
  it('@base: renders the correct markup', function () {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        mode: 'md'
      }
    })
    let wrapper = mount(Checkbox, opts)
    const result = `<div class="ion-checkbox checkbox checkbox-md checkbox-md-primary"><div class="checkbox-icon"><div class="checkbox-inner"></div></div> <button class="ion-button item-cover item-cover item-cover-md item-cover-default item-cover-default-md item-cover-md-default" type="button"><span class="button-inner"></span></button></div>`
    expect(wrapper.html()).toEqual(result)
  })

  it('@base: component must have a name', function () {
    let opts = deepAssign(cloneDeep(options), {
      slots: {
        default: '<span>Name</span>'
      }
    })
    let wrapper = mount(Checkbox, opts)
    expect(wrapper.name()).toEqual('Checkbox')
  })

  it('@base: have the right className', function () {
    let wrapper = mount(Checkbox, options)
    expect(wrapper.hasClass('ion-checkbox')).toBeTruthy()
  })

  it('@props: color', function () {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        value: true,
        color: 'danger',
        mode: 'ios'
      }
    })
    let wrapper = mount(Checkbox, opts)
    expect(wrapper.hasClass('checkbox-ios-danger')).toBeTruthy()
  })

  it('@props: mode', function () {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        mode: 'md'
      }
    })
    let wrapper = mount(Checkbox, opts)
    expect(wrapper.hasClass('checkbox-md')).toBeTruthy()
  })

  it('@props: mode(default)', function () {
    let wrapper = mount(Checkbox)
    expect(wrapper.hasClass('checkbox-ios')).toBeTruthy()
  })

  it('@props: disabled', function () {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        mode: 'md',
        disabled: true
      }
    })
    let wrapper = mount(Checkbox, opts)
    expect(wrapper.hasClass('checkbox-disabled')).toBeTruthy()
  })

  it('@props: value', function () {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        value: true
      }
    })
    let wrapper = mount(Checkbox, opts)
    let html = `<div class="ion-checkbox checkbox checkbox-ios checkbox-ios-primary"><div class="checkbox-icon checkbox-checked"><div class="checkbox-inner"></div></div> <button class="ion-button item-cover item-cover item-cover-ios item-cover-default item-cover-default-ios item-cover-ios-default" type="button"><span class="button-inner"></span></button></div>`
    expect(wrapper.html()).toEqual(html)
  })
})

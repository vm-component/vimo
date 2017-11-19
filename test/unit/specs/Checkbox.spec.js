/* eslint-disable no-undef,no-unused-expressions */

import { mount } from 'vue-test-utils'
import deepAssign from 'deep-assign'
import cloneDeep from 'lodash.clonedeep'
import vimo from '../../../components/dist'

let Checkbox = vimo.Checkbox
let wrapper = null
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
    wrapper = mount(Checkbox, opts)
    const result = `<div class="ion-checkbox checkbox checkbox-md checkbox-md-primary"><div class="checkbox-icon"><div class="checkbox-inner"></div></div> <button class="ion-button item-cover item-cover item-cover-md item-cover-md-default" type="button"><span class="button-inner"></span></button></div>`
    expect(wrapper.html()).to.equal(result)
  })

  it('@base: component must have a name', function () {
    let opts = deepAssign(cloneDeep(options), {
      slots: {
        default: '<span>Name</span>'
      }
    })
    wrapper = mount(Checkbox, opts)
    expect(wrapper.name()).to.equal('Checkbox')
  })

  it('@base: have the right className', function () {
    wrapper = mount(Checkbox, options)
    expect(wrapper.hasClass('ion-checkbox')).to.be.ok
  })

  it('@props: color', function () {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        value: true,
        color: 'danger',
        mode: 'ios'
      }
    })
    wrapper = mount(Checkbox, opts)
    expect(wrapper.hasClass('checkbox-ios-danger')).to.equal(true)
  })

  it('@props: mode', function () {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        mode: 'md'
      }
    })
    wrapper = mount(Checkbox, opts)
    expect(wrapper.hasClass('checkbox-md')).to.equal(true)
  })

  it('@props: mode(default)', function () {
    wrapper = mount(Checkbox)
    expect(wrapper.hasClass('checkbox-ios')).to.equal(true)
  })

  it('@props: disabled', function () {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        mode: 'md',
        disabled: true
      }
    })
    wrapper = mount(Checkbox, opts)
    expect(wrapper.hasClass('checkbox-disabled')).to.equal(true)
  })

  it('@props: value', function () {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        value: true
      }
    })
    wrapper = mount(Checkbox, opts)
    let html = `<div class="ion-checkbox checkbox checkbox-ios checkbox-ios-primary"><div class="checkbox-icon checkbox-checked"><div class="checkbox-inner"></div></div> <button class="ion-button item-cover item-cover item-cover-ios item-cover-ios-default" type="button"><span class="button-inner"></span></button></div>`
    expect(wrapper.html()).to.equal(html)
  })

})

/* eslint-disable no-undef,no-unused-expressions */

import { mount } from 'vue-test-utils'
import Input from '../index'

let options = {
  propsData: {
    showFocusHighlight: true,
    showValidHighlight: true,
    showInvalidHighlight: true,
    clearInput: true,
    clearOnEdit: true,
    disabled: true,
    max: 100,
    min: 1,
    decimal: 3,
    autofocus: true,
    readonly: true,
    check: true,
    step: 1,
    debounce: 1000,
    mode: 'md',
    type: 'text',
    value: 'this is a text',
    placeholder: 'this is a placeholder'
  }
}

describe('Input', function () {
  it('@base: renders the correct markup', function () {
    let wrapper = mount(Input, options)
    const result = `<div class="ion-input input-md clearInput"><div class="input-innerWrap"><input type="text" placeholder="this is a placeholder" disabled="disabled" readonly="readonly" max="100" min="1" step="1" autofocus="autofocus" class="text-input text-input-md"></div> <button class="ion-button text-input-clear-icon button button-ios button-clear button-clear-ios button-clear-ios-default"><span class="button-inner"></span></button></div>`
    expect(wrapper.html()).toEqual(result)
  })

  it('@base: component must have a name', function () {
    let wrapper = mount(Input, options)
    expect(wrapper.name()).toEqual('Input')
  })

  it('@base: have the right className', function () {
    let wrapper = mount(Input, options)
    expect(wrapper.hasClass('ion-input')).toBeTruthy()
  })
})

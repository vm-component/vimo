/* eslint-disable no-undef,no-unused-expressions */

import { mount } from 'vue-test-utils'
import InfiniteScroll from '../index'

let options = {
  propsData: {
    enabled: false,
    threshold: '15%'
  }
}

describe('InfiniteScroll', function () {
  it('@base: renders the correct markup', function () {
    let wrapper = mount(InfiniteScroll, options)
    const result = `<div threshold="15%" state="disabled" class="ion-infinite-scroll"></div>`
    expect(wrapper.html()).toEqual(result)
  })

  it('@base: component must have a name', function () {
    let wrapper = mount(InfiniteScroll, options)
    expect(wrapper.name()).toEqual('InfiniteScroll')
  })

  it('@base: have the right className', function () {
    let wrapper = mount(InfiniteScroll, options)
    expect(wrapper.hasClass('ion-infinite-scroll')).toBeTruthy()
  })
})

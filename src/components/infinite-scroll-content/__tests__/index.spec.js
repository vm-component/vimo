/* eslint-disable no-undef,no-unused-expressions */

import { mount } from 'vue-test-utils'
import InfiniteScrollContent from '../index'

let options = {
  propsData: {
    loadingSpinner: 'some',
    loadingText: 'Loading more data...'
  }
}

describe('InfiniteScrollContent', function () {
  it('@base: renders the correct markup', function () {
    let wrapper = mount(InfiniteScrollContent, options)
    const result = `<div class="ion-infinite-scroll-content"><div class="infinite-loading"><div class="infinite-loading-spinner"><div class="spinner"> </div></div> <div class="infinite-loading-text">Loading more data...</div></div></div>`
    expect(wrapper.html()).toEqual(result)
  })

  it('@base: component must have a name', function () {
    let wrapper = mount(InfiniteScrollContent, options)
    expect(wrapper.name()).toEqual('InfiniteScrollContent')
  })

  it('@base: have the right className', function () {
    let wrapper = mount(InfiniteScrollContent, options)
    expect(wrapper.hasClass('ion-infinite-scroll-content')).toBeTruthy()
  })
})

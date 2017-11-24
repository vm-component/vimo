/* eslint-disable no-undef,no-unused-expressions */

import { mount } from 'vue-test-utils'
import { InfiniteScrollContent } from 'vimo'

let wrapper = null
let options = {
  propsData: {
    loadingSpinner: 'some',
    loadingText: 'Loading more data...'
  }
}

describe('InfiniteScrollContent', function () {
  it('@base: renders the correct markup', function () {
    wrapper = mount(InfiniteScrollContent, options)
    const result = `<div class="ion-infinite-scroll-content"><div class="infinite-loading"><div class="infinite-loading-spinner"><div class="spinner"> </div></div> <div class="infinite-loading-text">Loading more data...</div></div></div>`
    expect(wrapper.html()).to.equal(result)
  })

  it('@base: component must have a name', function () {
    wrapper = mount(InfiniteScrollContent, options)
    expect(wrapper.name()).to.equal('InfiniteScrollContent')
  })

  it('@base: have the right className', function () {
    wrapper = mount(InfiniteScrollContent, options)
    expect(wrapper.hasClass('ion-infinite-scroll-content')).to.be.ok
  })
})

/* eslint-disable no-undef,no-unused-expressions */

import { mount } from 'vue-test-utils'
import vimo from '../../../components/dist'

let InfiniteScroll = vimo.InfiniteScroll
let wrapper = null
let options = {
  propsData: {
    enabled: false,
    threshold: '15%'
  }
}

describe('InfiniteScroll', function () {
  it('@base: renders the correct markup', function () {
    wrapper = mount(InfiniteScroll, options)
    const result = `<div threshold="15%" state="disabled" class="ion-infinite-scroll"></div>`
    expect(wrapper.html()).to.equal(result)
  })

  it('@base: component must have a name', function () {
    wrapper = mount(InfiniteScroll, options)
    expect(wrapper.name()).to.equal('InfiniteScroll')
  })

  it('@base: have the right className', function () {
    wrapper = mount(InfiniteScroll, options)
    expect(wrapper.hasClass('ion-infinite-scroll')).to.be.ok
  })
})

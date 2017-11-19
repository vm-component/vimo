/* eslint-disable no-undef,no-unused-expressions */

import { mount } from 'vue-test-utils'
import vimo from '../../../components/dist'

let InfiniteScrollContent = vimo.InfiniteScrollContent
let wrapper = null
let options = {
  propsData: {
    loadingSpinner: 'circles',
    loadingText: 'Loading more data...'
  }
}

describe('InfiniteScrollContent', function () {
  it('@base: renders the correct markup', function () {
    wrapper = mount(InfiniteScrollContent, options)
    const result = `<div class="ion-infinite-scroll-content"><div class="infinite-loading"><div class="infinite-loading-spinner"><div class="spinner spinner-circles spinner-ios-circles"><svg viewBox="0 0 64 64" style="top: 0px; left: 9px; -webkit-animation: 1000ms -1000ms;"><circle r="5" transform="translate(32,32)"></circle></svg><svg viewBox="0 0 64 64" style="top: 6.363961030678928px; left: 6.3639610306789285px; -webkit-animation: 1000ms -875ms;"><circle r="5" transform="translate(32,32)"></circle></svg><svg viewBox="0 0 64 64" style="top: 9px; left: 0.000000000000000551091059616309px; -webkit-animation: 1000ms -750ms;"><circle r="5" transform="translate(32,32)"></circle></svg><svg viewBox="0 0 64 64" style="top: 6.3639610306789285px; left: -6.363961030678928px; -webkit-animation: 1000ms -625ms;"><circle r="5" transform="translate(32,32)"></circle></svg><svg viewBox="0 0 64 64" style="top: 0.000000000000001102182119232618px; left: -9px; -webkit-animation: 1000ms -500ms;"><circle r="5" transform="translate(32,32)"></circle></svg><svg viewBox="0 0 64 64" style="top: -6.363961030678928px; left: -6.363961030678929px; -webkit-animation: 1000ms -375ms;"><circle r="5" transform="translate(32,32)"></circle></svg><svg viewBox="0 0 64 64" style="top: -9px; left: -0.0000000000000016532731788489267px; -webkit-animation: 1000ms -250ms;"><circle r="5" transform="translate(32,32)"></circle></svg><svg viewBox="0 0 64 64" style="top: -6.363961030678929px; left: 6.363961030678928px; -webkit-animation: 1000ms -125ms;"><circle r="5" transform="translate(32,32)"></circle></svg> </div></div> <div class="infinite-loading-text">Loading more data...</div></div></div>`
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

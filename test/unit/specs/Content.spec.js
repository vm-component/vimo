/* eslint-disable no-undef,no-unused-expressions */

import { mount } from 'vue-test-utils'
import vimo from '../../../components/dist'

let Content = vimo.Content
let wrapper = null
let opts = {
  slots: {
    fixed: '<span>fixed</span>',
    'fixed-top': '<span>fixed-top</span>',
    'fixed-bottom': '<span>fixed-bottom</span>',
    default: '<span>default</span>',
    refresher: '<span>refresher</span>'
  }
}

describe('Content', function () {

  it('@base: renders the correct markup', function () {
    wrapper = mount(Content, opts)
    const result = `<article class="ion-content"><span refresher="">refresher</span> <div class="fixed-content fixed-top" style="top: 0px;"><span fixed="">fixed</span> <span fixed-top="">fixed-top</span></div> <div class="fixed-content fixed-bottom" style="bottom: 0px;"><span fixed-bottom="">fixed-bottom</span></div> <section class="scroll-content"><span>default</span></section></article>`

    expect(wrapper.html()).to.equal(result)
  })

  it('@base: component must have a name', function () {
    wrapper = mount(Content, opts)
    expect(wrapper.name()).to.equal('Content')
  })

})

/* eslint-disable no-undef,no-unused-expressions */

import { mount } from 'vue-test-utils'
import { Avatar } from 'vimo'
import deepAssign from 'deep-assign'
import cloneDeep from 'lodash.clonedeep'

let wrapper = null
let options = {
  propsData: {},
  slots: {
    default: '<span>Test</span>'
  }
}

describe('Avatar', function () {
  // 清除DOM痕迹
  afterEach(() => {
    if (wrapper) {
      wrapper.vm.$el.remove()
      wrapper = null
    }
  })

  it('@base: renders the correct markup', function () {
    wrapper = mount(Avatar)
    const result = '<div class="ion-avatar"></div>'
    expect(wrapper.html()).to.equal(result)
  })

  it('@base: renders the correct text', function () {
    let opts = deepAssign(cloneDeep(options), {
      slots: {
        default: '<span>Test</span>'
      }
    })
    wrapper = mount(Avatar, opts)
    expect(wrapper.text()).to.equal('Test')
  })

  it('@base: component must have a name', function () {
    let opts = deepAssign(cloneDeep(options), {
      slots: {
        default: '<span>Name</span>'
      }
    })
    wrapper = mount(Avatar, opts)
    expect(wrapper.name()).to.equal('Avatar')
  })

  it('@base: have the right className', function () {
    let opts = deepAssign(cloneDeep(options), {
      slots: {
        default: '<span>HasClass</span>'
      }
    })
    wrapper = mount(Avatar, opts)
    expect(wrapper.hasClass('ion-avatar')).to.be.ok
  })
})

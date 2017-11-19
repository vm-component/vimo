/* eslint-disable no-undef,no-unused-expressions */

import { mount } from 'vue-test-utils'
import deepAssign from 'deep-assign'
import cloneDeep from 'lodash.clonedeep'
import vimo from '../../../components/dist'

let Card = vimo.Card
let wrapper = null
let options = {
  propsData: {
    color: 'primary',
    mode: 'ios'
  },
  slots: {
    default: '<span>Test</span>'
  }
}

describe('Card', function () {
  // 清除DOM痕迹
  afterEach(() => {
    if (wrapper) {
      wrapper.vm.$el.remove()
      wrapper = null
    }
  })

  it('@base: renders the correct markup', function () {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        mode: 'md'
      }
    })
    wrapper = mount(Card, opts)
    const result = '<div class="ion-card card card-md card-md-primary"><span>Test</span></div>'
    expect(wrapper.html()).to.equal(result)
  })

  it('@base: renders the correct text', function () {
    let opts = deepAssign(cloneDeep(options), {
      slots: {
        default: '<span>Test</span>'
      }
    })
    wrapper = mount(Card, opts)
    expect(wrapper.text()).to.equal('Test')
  })

  it('@base: component must have a name', function () {
    let opts = deepAssign(cloneDeep(options), {
      slots: {
        default: '<span>Name</span>'
      }
    })
    wrapper = mount(Card, opts)
    expect(wrapper.name()).to.equal('Card')
  })

  it('@base: have the right className', function () {
    let opts = deepAssign(cloneDeep(options), {
      slots: {
        default: '<span>HasClass</span>'
      }
    })
    wrapper = mount(Card, opts)
    expect(wrapper.hasClass('ion-card')).to.be.ok
  })

  it('@props: color', function () {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        color: 'danger'
      },
      slots: {
        default: '<span>color</span>'
      }
    })
    wrapper = mount(Card, opts)
    expect(wrapper.hasStyle('background-color', '#f53d3d')).to.equal(true)
  })

  it('@props: mode', function () {
    let opts = deepAssign(cloneDeep(options), {
      propsData: {
        mode: 'md'
      },
      slots: {
        default: '<span>mode</span>'
      }
    })
    wrapper = mount(Card, opts)
    expect(wrapper.hasClass('card-md')).to.equal(true)
  })

  it('@props: mode(default)', function () {
    wrapper = mount(Card)
    expect(wrapper.hasClass('card-ios')).to.equal(true)
  })
})

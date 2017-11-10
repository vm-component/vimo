/* eslint-disable no-undef,no-unused-expressions */
import * as appComponentManager from '../../../components/util/appComponentManager'

// ,isString,isNumber,isFunction
describe('appComponentManager', function () {
  before(() => {
    window.VM = {
      $app: {
        $children: []
      }
    }
  })

  after(() => {
    window.VM = null
  })

  it('addChild', function () {
    appComponentManager.addChild({
      _uid: 1
    })
    expect(window.VM.$app.$children.length).to.equal(1)
  })

  it('removeChild', function () {
    appComponentManager.removeChild({
      _uid: 1
    })
    expect(window.VM.$app.$children.length).to.equal(0)
  })
})

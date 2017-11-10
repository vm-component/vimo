/* eslint-disable no-undef,no-unused-expressions */
import componentIsMatch from '../../../components/util/componentIsMatch'

// ,isString,isNumber,isFunction
describe('componentIsMatch', function () {
  it('componentIsMatch', function () {
    let component = {
      $options: {
        _componentTag: 'TestName'
      }
    }
    let name = 'testname'
    expect(componentIsMatch(component, name)).to.be.ok
  })
})

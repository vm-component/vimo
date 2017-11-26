/* eslint-disable no-undef,no-unused-expressions */
import componentIsMatch from '../component-is-match'

// ,isString,isNumber,isFunction
describe('componentIsMatch', function () {
  it('componentIsMatch', function () {
    let component = {
      $options: {
        _componentTag: 'TestName'
      }
    }
    let name = 'testname'
    expect(componentIsMatch(component, name)).toBeTruthy()
  })
})

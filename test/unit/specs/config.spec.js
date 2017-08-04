/* eslint-disable no-undef,no-unused-expressions */
// config = {}, plt = {}
import { setupConfig } from '../../../components/base/config'
import { setupPlatform } from '../../../components/base/platform'

const MOCK_CONFIG = {
  urlString: 'http://www.xx.com/api/dashboard',
  urlFunction: function (platform) {
    let type = platform.platforms()[0]
    return `http://www.xx.com/api/${type}/dashboard`
  },
  booleanValueTrue: true,
  booleanValueFalse: false
}
describe('Test config.js', () => {
  var configInstance
  var platformInstance
  before(() => {
    platformInstance = setupPlatform()
    configInstance = setupConfig(MOCK_CONFIG, platformInstance)
  })
  after(() => {
    platformInstance = null
    configInstance = null
  })

  it('get():string', () => {
    expect(configInstance.get('urlString')).to.equal('http://www.xx.com/api/dashboard')
  })
  it('get():function', () => {
    expect(configInstance.get('urlFunction')).to.equal('http://www.xx.com/api/mobile/dashboard')
  })
  it('get():default', () => {
    expect(configInstance.get('whatever', 'here')).to.equal('here')
  })
  it('getBoolean():true', () => {
    expect(configInstance.get('booleanValueTrue')).to.be.ok
  })
  it('getBoolean():false', () => {
    expect(configInstance.get('booleanValueFalse')).to.not.be.ok
  })
  it('getNumber()', () => {
    expect(configInstance.get('booleanValueFalse')).to.not.be.ok
  })

})

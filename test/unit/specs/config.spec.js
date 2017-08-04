/* eslint-disable no-undef,no-unused-expressions */
import { setupConfig } from '../../../components/base/config'
import { setupPlatform } from '../../../components/base/platform'

const MOCK_CONFIG = {
  urlString: 'http://www.xx.com/api/dashboard',
  urlFunction: function (platform) {
    let type = platform.platforms()[0]
    return `http://www.xx.com/api/${type}/dashboard`
  },
  booleanValueTrue: true,
  booleanValueFalse: false,
  numberValue: 10
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
    expect(configInstance.getNumber('numberValue')).to.equal(10)
  })
  it('set(type, key, value)', () => {
    configInstance.set('mobile', 'name', 'Hsiang')
    expect(configInstance.get('name')).to.equal('Hsiang')
  })
  it('set(key, value)', () => {
    configInstance.set('name', 'Hsiang')
    expect(configInstance.get('name')).to.equal('Hsiang')
  })
  it('settings(type:{key:value})', () => {
    configInstance.settings('mobile', {
      age: '10'
    })
    expect(configInstance.get('age')).to.equal('10')
  })
  it('settings({key:value})', () => {
    configInstance.settings({
      age: '10'
    })
    expect(configInstance.get('age')).to.equal('10')
  })
})

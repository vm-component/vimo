/* eslint-disable no-undef,no-unused-expressions */
import { setupConfig } from '../../../components/base/config'
import { QueryParams, setupPlatform } from '../../../components/base/platform'
const MOCK_CONFIG = {
  urlString: 'http://www.xx.com/api/dashboard',
  urlFunction: function (platform) {
    let type = platform.platforms()[0]
    return `http://www.xx.com/api/${type}/dashboard`
  },
  booleanValueTrue: true,
  stringValueTrue: 'true',
  booleanValueFalse: false,
  'nullValue': null,
  numberValue: 10
}
describe('config.js', function () {
  var configInstance
  var platformInstance
  before(() => {
    platformInstance = setupPlatform()
    platformInstance.setQueryParams(new QueryParams('https://xxx.github.io/xxx?vmPageTransition=fade-right-transition&vmRecordPosition=false&vmTabsHighlight=true#/action-sheet'))
    configInstance = setupConfig(MOCK_CONFIG, platformInstance)
  })
  after(() => {
    platformInstance = null
    configInstance = null
  })
  it('get():string', function () {
    expect(configInstance.get('urlString')).to.equal('http://www.xx.com/api/dashboard')
  })
  it('get():function', function () {
    expect(configInstance.get('urlFunction')).to.equal('http://www.xx.com/api/core/dashboard')
  })
  it('get():default', function () {
    expect(configInstance.get('whatever', 'here')).to.equal('here')
  })
  it('get():undefined', function () {
    expect(() => { configInstance.get(undefined) }).to.throw('config key is not defined')
  })
  it('get():withQueryParam:string', function () {
    expect(configInstance.get('pageTransition')).to.equal('fade-right-transition')
  })
  it('get():withQueryParamL:true', function () {
    expect(configInstance.get('tabsHighlight')).to.be.ok
  })
  it('get():withQueryParamL:false', function () {
    expect(configInstance.get('recordPosition')).to.not.be.ok
  })
  it('get():platform-mode', function () {
    expect(configInstance.get('mode')).to.equal('ios')
  })
  it('getBoolean():true<boolean>', function () {
    expect(configInstance.getBoolean('booleanValueTrue')).to.be.ok
  })
  it('getBoolean():true<string>', function () {
    expect(configInstance.getBoolean('stringValueTrue')).to.be.ok
  })
  it('getBoolean():false<boolean>', function () {
    expect(configInstance.getBoolean('booleanValueFalse')).to.not.be.ok
  })
  it('getBoolean():nullValue', function () {
    expect(configInstance.getBoolean('nullValue', '123')).to.equal('123')
  })
  it('getBoolean():object', function () {
    expect(configInstance.getBoolean({a: 123})).to.not.be.ok
  })
  it('getNumber()', function () {
    expect(configInstance.getNumber('numberValue')).to.equal(10)
  })
  it('getNumber():fallback', function () {
    expect(configInstance.getNumber('numberValueNull', 100)).to.equal(100)
  })
  it('set(mode, key, value)', function () {
    configInstance.set('core', 'name', 'Hsiang')
    expect(configInstance.get('name')).to.equal('Hsiang')
  })
  it('set(key, value)', function () {
    configInstance.set('name', 'Hsiang')
    expect(configInstance.get('name')).to.equal('Hsiang')
  })
  it('settings()', function () {
    expect(configInstance.settings()).to.equal(MOCK_CONFIG)
  })
  it('settings(mode:{key:value})', function () {
    configInstance.settings('core', {
      age: '10'
    })
    expect(configInstance.get('age')).to.equal('10')
  })
  it('settings({key:value})', function () {
    configInstance.settings({
      age: '10'
    })
    expect(configInstance.get('age')).to.equal('10')
  })
  it('cache()', function () {
    configInstance.settings({
      age: '10'
    })
    expect(configInstance.get('age')).to.equal('10')
    expect(JSON.stringify(configInstance.cache())).to.equal('{"age":"10"}')
  })
})

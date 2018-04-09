/* eslint-disable no-undef,no-unused-expressions */
import { setupConfig } from '../config'
import { QueryParams, setupPlatform } from '../../platform/platform'
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
  beforeAll(() => {
    platformInstance = setupPlatform()
    platformInstance.setQueryParams(new QueryParams('https://xxx.github.io/xxx?vmPageTransition=fade-right-transition&vmRecordPosition=false&vmTabsHighlight=true#/action-sheet'))
    configInstance = setupConfig(MOCK_CONFIG, platformInstance)
  })
  afterAll(() => {
    platformInstance = null
    configInstance = null
  })
  it('get():string', function () {
    expect(configInstance.get('urlString')).toEqual('http://www.xx.com/api/dashboard')
  })
  it('get():function', function () {
    expect(configInstance.get('urlFunction')).toEqual('http://www.xx.com/api/core/dashboard')
  })
  it('get():default', function () {
    expect(configInstance.get('whatever', 'here')).toEqual('here')
  })
  it('get():undefined', function () {
    expect(() => { configInstance.get(undefined) }).toThrow('config key is not defined')
  })
  it('get():withQueryParam:string', function () {
    expect(configInstance.get('pageTransition')).toEqual('fade-right-transition')
  })
  it('get():withQueryParamL:true', function () {
    expect(configInstance.get('tabsHighlight')).toBeTruthy()
  })
  it('get():withQueryParamL:false', function () {
    expect(configInstance.get('recordPosition')).toBeFalsy()
  })
  it('get():platform-mode', function () {
    expect(configInstance.get('mode')).toEqual('ios')
  })
  it('getBoolean():true<boolean>', function () {
    expect(configInstance.getBoolean('booleanValueTrue')).toBeTruthy()
  })
  it('getBoolean():true<string>', function () {
    expect(configInstance.getBoolean('stringValueTrue')).toBeTruthy()
  })
  it('getBoolean():false<boolean>', function () {
    expect(configInstance.getBoolean('booleanValueFalse')).toBeFalsy()
  })
  it('getBoolean():nullValue', function () {
    expect(configInstance.getBoolean('nullValue', '123')).toEqual('123')
  })
  it('getBoolean():object', function () {
    expect(configInstance.getBoolean({a: 123})).toBeFalsy()
  })
  it('getNumber()', function () {
    expect(configInstance.getNumber('numberValue')).toEqual(10)
  })
  it('getNumber():fallback', function () {
    expect(configInstance.getNumber('numberValueNull', 100)).toEqual(100)
  })
  it('set(mode, key, value)', function () {
    configInstance.set('core', 'name', 'Hsiang')
    expect(configInstance.get('name')).toEqual('Hsiang')
  })
  it('set(key, value)', function () {
    configInstance.set('name', 'Hsiang')
    expect(configInstance.get('name')).toEqual('Hsiang')
  })
  it('settings()', function () {
    expect(configInstance.settings()).toEqual(MOCK_CONFIG)
  })
  it('settings(mode:{key:value})', function () {
    configInstance.settings('core', {
      age: '10'
    })
    expect(configInstance.get('age')).toEqual('10')
  })
  it('settings({key:value})', function () {
    configInstance.settings({
      age: '10'
    })
    expect(configInstance.get('age')).toEqual('10')
  })
  it('cache()', function () {
    configInstance.settings({
      age: '10'
    })
    expect(configInstance.get('age')).toEqual('10')
    expect(JSON.stringify(configInstance.cache())).toEqual('{"age":"10"}')
  })
})

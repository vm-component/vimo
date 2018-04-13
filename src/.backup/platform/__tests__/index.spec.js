/* eslint-disable no-undef,no-unused-expressions */
import { setupPlatform } from '../platform'
import platformAliPayConfig from '../../../../examples/src/config/platforms/platform-alipay-config.js'
// alipay useragent
const MOCK_CONFIG = {
  useragent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_2_1 like Mac OS X)   AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30   AlipayDefined(nt:WIFI,ws:360|640|1.5) AliApp(AP/9.0.1.073001) AlipayClient/9.0.1.073001   GCanvas/1.4.2.15'
}

describe('Test platform.js without mock config', function () {
  var platform
  beforeAll(() => {
    platform = setupPlatform()
  })
  afterAll(() => {
    platform = null
  })

  it('is()', function () {
    expect(platform.is('core')).toBeTruthy()
  })

  it('ready()', function () {
    return platform.ready().then((data) => {
      expect(data).toEqual('H5 Initialization Process!')
    })
  })

  it('platforms()', function () {
    expect(platform.platforms().toString()).toMatch('core')
  })

  // setCssProps()
  it('setCssProps()', function () {
    expect(platform.Css).toEqual({
      'animationDelay': 'webkitAnimationDelay',
      'transform': 'webkitTransform',
      'transformOrigin': '-webkit-transform-origin',
      'transition': 'webkitTransition',
      'transitionDelay': '-webkit-transition-delay',
      'transitionDuration': '-webkit-transition-duration',
      'transitionEnd': 'webkitTransitionEnd transitionend',
      'transitionStart': null,
      'transitionTimingFn': '-webkit-transition-timing-function'
    })
  })
})

describe('Test platform.js with mock config', function () {
  var platform
  beforeAll(() => {
    platform = setupPlatform({
      alipay: platformAliPayConfig
    })
    platform.setUserAgent(MOCK_CONFIG.useragent)
    platform.init()
    platform.beforeReady()
  })
  afterAll(() => {
    platform = null
  })

  it('is()', function () {
    expect(platform.is('alipay')).toBeTruthy()
  })

  it('versions()', function () {
    expect(JSON.stringify(platform.versions())).toEqual('{"ios":{"str":"10.2.0","num":10.2,"major":10,"minor":2,"patch":0},"alipay":{"str":"9.0.1","num":9,"major":9,"minor":0,"patch":1}}')
  })

  it('version()', function () {
    expect(JSON.stringify(platform.version())).toEqual('{"str":"10.2.0","num":10.2,"major":10,"minor":2,"patch":0}')
  })

  it('platforms()', function () {
    expect(platform.platforms().toString())
    .toEqual('mobile,ios,alipay')
  })
})

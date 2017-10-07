/* eslint-disable no-undef,no-unused-expressions */
import { setupPlatform } from '../../../components/base/platform'
import platformAliPayConfig from '../../../examples/src/config/platforms/platform-alipay-config'
console.log(typeof window.VM)
// alipay useragent
const MOCK_CONFIG = {
  useragent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_2_1 like Mac OS X)   AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30   AlipayDefined(nt:WIFI,ws:360|640|1.5) AliApp(AP/9.0.1.073001) AlipayClient/9.0.1.073001   GCanvas/1.4.2.15'
}

describe('Test platform.js without mock config', () => {
  var platform
  before(() => {
    platform = setupPlatform()
  })
  after(() => {
    platform = null
  })

  it('is()', () => {
    expect(platform.is('core')).to.be.ok
  })

  it('ready()', () => {
    return platform.ready().then((data) => {
      expect(data).to.equal('H5 Initialization Process!')
    })
  })

  it('platforms()', () => {
    expect(platform.platforms().toString())
    .to.include('core')
  })

  // setCssProps()
  it('setCssProps()', () => {
    expect(platform.css)
    .to.be.an('object')
  })
})

describe('Test platform.js with mock config', () => {
  var platform
  before(() => {
    platform = setupPlatform({
      alipay: platformAliPayConfig
    })
    platform.setUserAgent(MOCK_CONFIG.useragent)
    platform.init()
    platform.beforeReady()
  })
  after(() => {
    platform = null
  })

  it('is()', () => {
    expect(platform.is('alipay')).to.ok
  })

  it('versions()', () => {
    expect(JSON.stringify(platform.versions())).to.equal('{"ios":{"str":"10.2.0","num":10.2,"major":10,"minor":2,"third":0},"alipay":{"str":"9.0.1","num":9,"major":9,"minor":0,"third":1}}')
  })

  it('version()', () => {
    expect(JSON.stringify(platform.version())).to.equal('{"str":"10.2.0","num":10.2,"major":10,"minor":2,"third":0}')
  })

  it('platforms()', () => {
    expect(platform.platforms().toString())
    .to.equal('mobile,ios,alipay')
  })
})

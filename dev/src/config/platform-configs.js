/**
 * Created by Hsiang on 2017/3/22.
 *
 * 用户自定义配置
 */
export default {
  mobile: {
    beforeInitialize (plt) {
      require('./bridge-h5')['h5Bridge'](plt)
    }
  },
  ios: {},
  android: {},
  wechat: {
    bridgeReady (plt) {
      require('./bridge-wechat')['wechatBridge'](plt)
    }
  },
  alipay: {
    bridgeReady (plt) {
      require('./bridge-alipay')['alipayBridge'](plt)
    }
  },
  dingtalk: {},
  qq: {},
  dtdream: {}
}

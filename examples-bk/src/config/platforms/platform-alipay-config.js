/**
 * 平台配置信息
 * 1. 通过userAgent匹配当前平台
 * 2. 加载平台的 JSSDK 脚本
 * 3. 加载完毕执行 bridgeReady 钩子
 * 4. 执行平台相关的驱动, 比如UI组件/导航条/页面切换等可用前端实现的通用部分(如果没有则不执行)
 * 5. 执行完毕触发 $platform.ready(), 平台就绪
 * */
import { docReady } from '../../util/util'
import { PLATFORM_INIT_TIMEOUT } from './variable'
import platformAliPayDrive from './platform-alipay-drive'
import loadScript from '../../util/load-script'
import checkProtocol from '../../util/check-protocol'

export default {
  initialize (plt) {
    let val
    const _this = this
    let jsSDKUrl = checkProtocol(this.settings['jsSDKUrl'])

    /**
     * 在ready之前进行处理
     * @override
     * */
    plt.beforeReady = function () {
      loadScript(jsSDKUrl, () => {
        docReady(() => {
          function beforeBridgeReady () {
            // 解除绑定
            if (document.removeEventListener) {
              document.removeEventListener('AlipayJSBridgeReady', beforeBridgeReady)
            }
            // 执行自定义的bridge ready钩子
            _this.bridgeReady(plt)
            // 触发平台的统一ready事件
            plt.triggerReady('Alipay Init Success!')
            plt.timer && window.clearTimeout(plt.timer)

            // 平台方法注册
            platformAliPayDrive(plt)
          }

          if (typeof window.AlipayJSBridge === 'undefined') {
            if (document.addEventListener) {
              document.addEventListener('AlipayJSBridgeReady', beforeBridgeReady, false)
            }
          } else {
            beforeBridgeReady()
          }
        })
      })
      plt.timer = window.setTimeout(() => {
        plt.triggerFail('Alipay Init Timeout!')
      }, PLATFORM_INIT_TIMEOUT)
    }

    /**
     * 支付宝的userAgent中包含了网络类型和当前语言
     * AlipayDefined(nt:WIFI,ws:320|548|2.0)
     * Language/zh-Hans
     * */
    // 获取网络类型
    val = plt.userAgent().match(/AlipayDefined\(nt:(\w+),/i)
    if (!!val && val.length > 0 && !!val[1]) {
      plt.setNetworkType(val[1].toString().toLowerCase())
    }

    // 获取语言类型
    // Language/zh-CN
    val = plt.userAgent().match(/Language\/(.+)/i)
    if (!!val && val.length > 0 && !!val[1]) {
      plt.setLang(val[1].toString().toLowerCase(), true)
    }
  },
  // 由业务完成部分
  bridgeReady (plt) {},
  settings: {
    usePushWindow: false, // 页面切换使用alipay提供的 pushWindow() 方法开启新页面
    jsSDKUrl: '//a.alipayobjects.com/g/h5-lib/alipayjsapi/3.0.2/alipayjsapi.min.js',
    hideNavBar: true
  },
  isMatch (plt) {
    return plt.isPlatformMatch('alipay', ['alipay', 'alipayclient'])
  },
  versionParser (plt) {
    return plt.matchUserAgentVersion(/alipayclient\/(\d+).(\d+).(\d+)?/i)
  }
}

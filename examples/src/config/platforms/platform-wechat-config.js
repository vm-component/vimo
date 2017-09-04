/**
 * 平台配置信息
 * 1. 通过userAgent匹配当前平台
 * 2. 加载平台的 JSSDK 脚本
 * 3. 加载完毕执行 bridgeReady 钩子
 * 4. 执行平台相关的驱动, 比如UI组件/导航条/页面切换等可用前端实现的通用部分(如果没有则不执行)
 * 5. 执行完毕触发 $platform.ready(), 平台就绪
 * */
import { docReady} from '../../../../components/util/util'
import { PLATFORM_INIT_TIMEOUT } from './variable'
import { loadScript } from '../../../../components/util/loadScript'
import { checkProtocol } from '../../../../components/util/checkProtocol'

export default {
  initialize (plt) {
    /**
     * 加载JSSDK
     * */
    let val
    const _this = this
    let jsSDKUrl = checkProtocol(this.settings['jsSDKUrl'])

    /**
     * 在ready之前进行处理
     * 执行用户定义的onBridgeReady钩子
     * */
    plt.beforeReady = () => {
      loadScript(jsSDKUrl, () => {
        // document 准备好后才能启动监听
        docReady(() => {
          function beforeBridgeReady () {
            // 解除绑定
            if (document.removeEventListener) {
              document.removeEventListener('WeixinJSBridgeReady', beforeBridgeReady)
            }

            // 执行自定义的bridge ready钩子
            _this.bridgeReady(plt)
            // 触发平台的统一ready事件
            plt.triggerReady('Wechat Init Success!')
            plt.timer && window.clearTimeout(plt.timer)
          }

          if (typeof window.WeixinJSBridge === 'undefined') {
            if (document.addEventListener) {
              document.addEventListener('WeixinJSBridgeReady', beforeBridgeReady, false)
            }
          } else {
            beforeBridgeReady()
          }
        })
      })

      plt.timer = window.setTimeout(() => {
        plt.triggerFail('Wechat Init Timeout!')
      }, PLATFORM_INIT_TIMEOUT)
    }

    /**
     * 微信的userAgent中包含了网络类型和当前语言
     * */
    // 获取网络类型 可能的字段: NetType/WIFI, NetType/2G, NetType/3G+, NetType/4G
    val = plt.userAgent().match(/NetType\/(\w+) /i)
    if (!!val && val.length > 0 && !!val[1]) {
      plt.setNetworkType(val[1].toString().toLowerCase())
    }

    // 获取语言类型 Language/zh-CN
    val = plt.userAgent().match(/Language\/(.+)/i)
    if (!!val && val.length > 0 && !!val[1]) {
      plt.setLang(val[1].toString().toLowerCase(), true)
    }
  },
  // 由业务完成部分
  bridgeReady (plt) {},
  settings: {
    jsSDKUrl: '//res.wx.qq.com/open/js/jweixin-1.0.0.js',
    hideNavBar: true
  },
  isMatch (plt) {
    return plt.isPlatformMatch('wechat', ['micromessenger'])
  },
  versionParser (plt) {
    return plt.matchUserAgentVersion(/micromessenger\/(\d+).(\d+).(\d+)?/i)
  }
}

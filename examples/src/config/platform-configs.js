/**
 * Created by Hsiang on 2017/3/22.
 *
 * 用户自定义配置
 */
import { docReady } from '../../../components/util/util'

const TIMEOUT = 10000 // 平台初始化需要的最大时间
export default {
  dingtalk: {
    bridgeReady (plt) {
      window.dd.config({})
      window.dd.ready(readFun)
      window.dd.error(readFun)

      function readFun (err) {
        if (err) {
          alert(err)
        }
        // ready
        window.dd.xxxx

      }
    }
  },
  qq: {
    initialize (plt) {
      // 获取网络类型
      // 可能的字段: NetType/WIFI, NetType/2G, NetType/3G+, NetType/4G
      let val = plt.userAgent().match(/NetType\/(\w+)/i)
      if (!!val && val.length > 0 && !!val[1]) {
        plt.setNetworkType(val[1].toString().toLowerCase())
      }

      this.bridgeReady(plt)
      // 触发外层的ready
      plt.triggerReady('qq Init Success!')
    },

    // 由业务完成部分
    bridgeReady (plt) {},
    settings: {
      hideNavBar: true
    },
    isMatch (plt) {
      return plt.isPlatformMatch('qq')
    },
    versionParser (plt) {
      return plt.matchUserAgentVersion(/qq\/(\d+).(\d+).(\d+)?/i)
    }
  },
  dtdream: {
    initialize (plt) {
      /**
       * 加载JSSDK
       * */
      const _this = this
      let jsSDKUrl = this.settings['jsSDKUrl']
      let splitArr = jsSDKUrl.split('//')
      if (window.location.protocol.toLowerCase().indexOf('https') > -1) {
        splitArr[0] = 'https:'
      } else {
        splitArr[0] = 'http:'
      }

      /**
       * 在ready之前进行处理
       * 执行用户定义的onBridgeReady钩子
       * */
      plt.beforeReady = () => {
        loadScript(splitArr.join('//'), () => {
          docReady(() => {
            // 执行自定义的bridge ready钩子
            _this.bridgeReady(plt)
            plt.triggerReady('Dtdream Init Success!')
            plt.timer && window.clearTimeout(plt.timer)
          })
        })

        plt.timer = window.setTimeout(() => {
          plt.triggerFail('Dtdream Init Timeout!')
        }, TIMEOUT)
      }
    },

    // 由业务完成部分
    bridgeReady (plt) {},
    settings: {
      jsSDKUrl: '//dtdreamapp.oss-cn-shanghai.aliyuncs.com/DTHybridEngine/v1.0.0/hybridapi.js',
      hideNavBar: true
    },
    isMatch (plt) {
      return plt.isPlatformMatch('dtdream')
    },
    versionParser (plt) {
      // 无用
      return plt.matchUserAgentVersion(/dtdream\/(\d+).(\d+).(\d+)?/i)
    }
  }
}

/**
 * 下载script脚本
 * @private
 * */
function loadScript (url, cb) {
  let _head = document.getElementsByTagName('head')[0]
  let _script = document.createElement('script')
  _script.setAttribute('type', 'text/javascript')
  _script.setAttribute('src', url)
  _head.appendChild(_script)
  _script.onload = function () {
    cb && cb()
  }
}

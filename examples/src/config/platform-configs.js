/**
 * Created by Hsiang on 2017/3/22.
 *
 * 用户自定义配置
 */
export default {
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

        // 注册平台 setTitle 方法, 参数在platform.js中
        plt.setTitle = (titleInfo) => {
          window.dd.biz.navigation.setTitle({
            title: titleInfo.title || '' // 控制标题文本，空字符串表示显示默认文本
          })
        }
      }
    },

    // 由业务完成部分
    bridgeReady (plt) {},
    settings: {
      jsSDKUrl: '//115.29.248.20/testjs/test.js',
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

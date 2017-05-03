/**
 * Created by Hsiang on 2017/2/9.
 *
 * # 平台层级的 "默认" 配置
 *
 * @private
 */
import { docReady } from '../util/util'
//  platform supported list
export const SUBSET_LIST = ['wechat', 'alipay', 'dingtalk', 'qq']

// platform default configs
export const PLATFORM_DEFAULT_CONFIGS = {
  mobile: {
    settings: {
      mode: 'md'
    }
  },
  android: {
    superset: 'mobile',
    subsets: SUBSET_LIST,
    settings: {
      toolbarMinHeight: 56,
      hoverCSS: false,
      mode: 'md',
      backButtonText: '',
      backButtonIcon: 'md-arrow-back',
      iconMode: 'md',
      menuType: 'overlay',
      pickerRotateFactor: 0,
      pickerScaleFactor: 0.81,
      spinner: 'crescent',
      tabsHighlight: true,
      tabsPlacement: 'bottom',
      tabsHideOnSubPages: false,
      pageTransition: 'zoom-transition', // 'zoom-transition'
      scrollAssist: false,
      maxLoadingDuration: 5000, // loading组件最大开启时间
      maxIndicatorDuration: 10000, // indicator组件最大开启时间


      inputCloning: true,
      autoFocusAssist: 'immediate'
    },
    isMatch(plt) {
      return plt.isPlatformMatch('android', ['android', 'silk'], ['windows phone'])
    },
    versionParser(plt) {
      return plt.matchUserAgentVersion(/Android (\d+).(\d+)?/)
    }
  },
  ios: {
    superset: 'mobile',
    subsets: SUBSET_LIST,
    settings: {
      hideNavBar: false,
      toolbarMinHeight: 44,
      hoverCSS: false,
      mode: 'ios',
      backButtonText: 'Back',
      backButtonIcon: 'ios-arrow-back',
      iconMode: 'ios',
      menuType: 'reveal',
      spinner: 'ios',
      tabsHighlight: false,
      tabsPlacement: 'bottom',
      tabsHideOnSubPages: false,
      pageTransition: 'fade-right-transition', // 'ios-transition'
      statusbarPadding: false,
      scrollAssist: false,                      // 是否开启滚动辅助(jsScroll)
      maxLoadingDuration: 5000, // loading组件最大开启时间
      maxIndicatorDuration: 10000, // indicator组件最大开启时间


      activator: 'highlight',
      pickerRotateFactor: -0.46,
      pickerScaleFactor: 1,
      autoFocusAssist: 'delay',
      inputBlurring: true,
      inputCloning: true,
      tapPolyfill: isIosUIWebView,
      virtualScrollEventAssist: isIosUIWebView
    },
    isMatch(plt) {
      return plt.isPlatformMatch('ios', ['iphone', 'ipad', 'ipod'], ['windows phone'])
    },
    versionParser(plt) {
      return plt.matchUserAgentVersion(/OS (\d+)_(\d+)?/)
    }
  },

  /**
   * 开放平台及内嵌式App初始化
   * 如果添加新环境,记得在SUBSET_LIST注册
   * */
  wechat: {
    initialize (plt) {
      /**
       * 加载JSSDK
       * */
      let val
      const _this = this
      let jsSDKUrl = this.settings['jsSDKUrl'] || 'http://res.wx.qq.com/open/js/jweixin-1.0.0.js'
      let splitArr = jsSDKUrl.split('//')
      if (window.location.protocol.toLowerCase().indexOf('https') > -1) {
        splitArr[0] = 'https:'
      } else {
        splitArr[0] = 'http:'
      }
      loadScript(splitArr.join('//'))

      /**
       * 微信的userAgent中包含了网络类型和当前语言
       * */
      // 获取网络类型 可能的字段: NetType/WIFI, NetType/2G, NetType/3G+, NetType/4G
      val = plt.userAgent().match(/NetType\/(\w+) /i)
      if (!!val && val.length > 0 && !!val[1]) {
        plt.setNetType(val[1].toString().toLowerCase())
      }

      // 获取语言类型 Language/zh-CN
      val = plt.userAgent().match(/Language\/(.+)/i)
      if (!!val && val.length > 0 && !!val[1]) {
        plt.setLang(val[1].toString().toLowerCase(), true)
      }

      /**
       * 在ready之前进行处理
       * 执行用户定义的onBridgeReady钩子
       * */
      plt.beforeReady = () => {
        // document 准备好后才能启动监听
        docReady(() => {
          function beforeBridgeReady () {
            // 解除绑定
            if (document.removeEventListener) {
              document.removeEventListener('WeixinJSBridgeReady', beforeBridgeReady)
            } else if (document.detachEvent) {
              document.detachEvent('WeixinJSBridgeReady', beforeBridgeReady)
              document.detachEvent('onWeixinJSBridgeReady', beforeBridgeReady)
            }

            // 执行自定义的bridge ready钩子
            _this.onBridgeReady(plt)

            // 触发平台的统一ready事件
            plt.triggerReady('wechat')
          }

          if (typeof WeixinJSBridge === 'undefined') {
            if (document.addEventListener) {
              document.addEventListener('WeixinJSBridgeReady', beforeBridgeReady, false)
            } else if (document.attachEvent) {
              document.attachEvent('WeixinJSBridgeReady', beforeBridgeReady)
              document.attachEvent('onWeixinJSBridgeReady', beforeBridgeReady)
            }
          } else {
            beforeBridgeReady()
          }
        })
      }
    },
    onBridgeReady(plt){},
    settings: {
      hideNavBar: true
    },
    isMatch(plt) {
      return plt.isPlatformMatch('wechat', ['micromessenger'])
    },
    versionParser(plt) {
      return plt.matchUserAgentVersion(/micromessenger\/(\d+).(\d+).(\d+)?/i)
    }
  },
  alipay: {
    initialize(plt){
      /**
       * 支付宝的userAgent中包含了网络类型和当前语言
       * AlipayDefined(nt:WIFI,ws:320|548|2.0)
       * Language/zh-Hans
       * */
      let val
      // 获取网络类型
      val = plt.userAgent().match(/AlipayDefined\(nt:(\w+),/i)
      if (!!val && val.length > 0 && !!val[1]) {
        plt.setNetType(val[1].toString().toLowerCase())
      }

      // 获取语言类型
      // Language/zh-CN
      val = plt.userAgent().match(/Language\/(.+)/i)
      if (!!val && val.length > 0 && !!val[1]) {
        plt.setLang(val[1].toString().toLowerCase(), true)
      }

      this.onBridgeReady(plt)
      // 触发外层的ready
      plt.triggerReady('alipay Init Success!')
    },
    onBridgeReady(plt){},
    settings: {
      hideNavBar: true
    },
    isMatch(plt) {
      return plt.isPlatformMatch('alipay', ['alipay', 'alipayclient'])
    },
    versionParser(plt) {
      return plt.matchUserAgentVersion(/alipayclient\/(\d+).(\d+).(\d+)?/i)
    }
  },
  dingtalk: {
    initialize(plt){
      /**
       * 钉钉的userAgent中包含了网络类型和当前语言
       * AlipayDefined(nt:WIFI,ws:320|548|2.0)
       * Language/zh-Hans
       * */
      let val = plt.userAgent().match(/language\/(.+)/i)
      if (!!val && val.length > 0 && !!val[1]) {
        plt.setLang(val[1].toString().toLowerCase(), true)
      }

      this.onBridgeReady(plt)
      plt.triggerReady('dingtalk Init Success!')
    },
    onBridgeReady(plt){},
    settings: {
      hideNavBar: true
    },
    isMatch(plt) {
      return plt.isPlatformMatch('dingtalk')
    },
    versionParser(plt) {
      return plt.matchUserAgentVersion(/dingtalk\/(\d+).(\d+).(\d+)?/i)
    }
  },
  qq: {
    initialize(plt){
      // 获取网络类型
      // 可能的字段: NetType/WIFI, NetType/2G, NetType/3G+, NetType/4G
      let val = plt.userAgent().match(/NetType\/(\w+)/i)
      if (!!val && val.length > 0 && !!val[1]) {
        plt.setNetType(val[1].toString().toLowerCase())
      }

      this.onBridgeReady(plt)
      // 触发外层的ready
      plt.triggerReady('qq Init Success!')
    },
    onBridgeReady(plt){},
    settings: {
      hideNavBar: true
    },
    isMatch(plt) {
      return plt.isPlatformMatch('qq')
    },
    versionParser(plt) {
      return plt.matchUserAgentVersion(/qq\/(\d+).(\d+).(\d+)?/i)
    }
  }

}

/**
 * @param {Platform} plt
 * @return {boolean}
 * @private
 * */
function isIOS (plt) {
  // shortcut function to be reused internally
  // checks navigator.platform to see if it's an actual iOS device
  // this does not use the user-agent string because it is often spoofed
  // an actual iPad will return true, a chrome dev tools iPad will return false
  return plt.testNavigatorPlatform('iphone|ipad|ipod')
}
/**
 * @param {Platform} plt
 * @return {boolean}
 * @private
 * */
function isSafari (plt) {
  return plt.testUserAgent('Safari')
}

/**
 * @param {Platform} plt
 * @return {boolean}
 * @private
 * */
function isWKWebView (plt) {
  return isIOS(plt) && !!window['webkit']
}

/**
 * @param {Platform} plt
 * @return {boolean}
 * @private
 * */
function isIosUIWebView (plt) {
  return isIOS(plt) && !isWKWebView(plt) && !isSafari(plt)
}

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
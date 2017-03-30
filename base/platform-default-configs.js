/**
 * Created by Hsiang on 2017/2/9.
 *
 * # 平台层级的 "默认" 配置
 *
 */
import { ready } from '../util/dom'
import { loadScript } from '../util/util'
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
      pageTransition: 'fade-bottom-transition', // 'zoom-transition'
      scrollAssist: true,
      inputCloning: true,
      autoFocusAssist: 'immediate',
    },
    isMatch(p) {
      return p.isPlatformMatch('android', ['android', 'silk'], ['windows phone'])
    },
    versionParser(p) {
      return p.matchUserAgentVersion(/Android (\d+).(\d+)?/)
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
      activator: 'highlight',
      backButtonText: 'Back',
      backButtonIcon: 'ios-arrow-back',
      iconMode: 'ios',
      menuType: 'reveal',
      pickerRotateFactor: -0.46,
      pickerScaleFactor: 1,
      spinner: 'ios',
      tabsHighlight: false,
      tabsPlacement: 'bottom',
      tabsHideOnSubPages: false,
      pageTransition: 'fade-right-transition', // 'ios-transition'
      statusbarPadding: false,
      autoFocusAssist: 'delay',
      inputBlurring: true,
      inputCloning: true,
      scrollAssist: true,
      swipeBackEnabled: true,
      tapPolyfill: isIosUIWebView,
      virtualScrollEventAssist: isIosUIWebView,
      disableScrollAssist: true,
    },
    isMatch(p) {
      return p.isPlatformMatch('ios', ['iphone', 'ipad', 'ipod'], ['windows phone'])
    },
    versionParser(p) {
      return p.matchUserAgentVersion(/OS (\d+)_(\d+)?/)
    }
  },

  /**
   * 开放平台及内嵌式App初始化
   * 如果添加新环境,记得在SUBSET_LIST注册
   * */
  wechat: {
    initialize (p) {
      const config = this
      // 在ready之前进行处理
      p.prepareReady = () => {
        let val
        let userAgent = window.navigator.userAgent.toString().trim()
        let jsSDKUrl = config.settings['jsSDKUrl']
        let splitArr = jsSDKUrl.split('//')
        if (window.location.protocol.toLowerCase().indexOf('https') > -1) {
          splitArr[0] = 'https:'
        } else {
          splitArr[0] = 'http:'
        }
        jsSDKUrl = splitArr.join('//')

        /**
         * 微信的userAgent中包含了网络类型和当前语言
         * */
        p.setUserAgent(userAgent)

        // 获取网络类型
        // 可能的字段: NetType/WIFI, NetType/2G, NetType/3G+, NetType/4G
        val = userAgent.match(/NetType\/(\w+) /i)
        if (!!val && val.length > 0 && !!val[1]) {
          p.setNetType(val[1].toString().toLowerCase())
        }

        // 获取语言类型
        // Language/zh-CN
        val = userAgent.match(/Language\/(.+)/i)
        if (!!val && val.length > 0 && !!val[1]) {
          p.setLang(val[1].toString().toLowerCase(), true)
        }

        if (jsSDKUrl) {
          // loadScript
          loadScript(jsSDKUrl, function () {
            p.triggerReady('Wechat Init Success with jsSDK!')
          })
        } else {
          p.triggerReady('Wechat Init Success without jsSDK!')
        }
      }
    },
    settings: {
      hideNavBar: true,
    },
    isMatch(p) {
      return p.isPlatformMatch('wechat', ['micromessenger'])
    },
    versionParser(p) {
      return p.matchUserAgentVersion(/micromessenger\/(\d+).(\d+).(\d+)?/i)
    }
  },
  alipay: {
    initialize(p){
      //alert('Alipay Init: from platform-registry.js');
      let userAgent = window.navigator.userAgent.toString().trim()
      let val

      /**
       * 支付宝的userAgent中包含了网络类型和当前语言
       * AlipayDefined(nt:WIFI,ws:320|548|2.0)
       * Language/zh-Hans
       * */
      p.setUserAgent(userAgent)

      // 获取网络类型
      val = userAgent.match(/AlipayDefined\(nt:(\w+),/i)
      if (!!val && val.length > 0 && !!val[1]) {
        p.setNetType(val[1].toString().toLowerCase())
      }

      // 获取语言类型
      // Language/zh-CN
      val = userAgent.match(/Language\/(.+)/i)
      if (!!val && val.length > 0 && !!val[1]) {
        p.setLang(val[1].toString().toLowerCase(), true)
      }

      // 触发外层的ready
      p.triggerReady('alipay Init Success!')
    },
    settings: {
      hideNavBar: true,
    },
    isMatch(p) {
      return p.isPlatformMatch('alipay', ['alipay', 'alipayclient'])
    },
    versionParser(p) {
      return p.matchUserAgentVersion(/alipayclient\/(\d+).(\d+).(\d+)?/i)
    }
  },
  dingtalk: {
    initialize(p){
      // alert('Dingtalk Init: from platform-registry.js');
      let userAgent = window.navigator.userAgent.toString().trim()
      let val

      /**
       * 钉钉的userAgent中包含了网络类型和当前语言
       * AlipayDefined(nt:WIFI,ws:320|548|2.0)
       * Language/zh-Hans
       * */
      p.setUserAgent(userAgent)

      // 获取网络类型
      // dingtalk未给出

      // 获取语言类型
      // Language/zh-CN
      val = userAgent.match(/language\/(.+)/i)
      if (!!val && val.length > 0 && !!val[1]) {
        p.setLang(val[1].toString().toLowerCase(), true)
      }

      // 触发外层的ready
      p.triggerReady('dingtalk Init Success!')
    },
    settings: {
      hideNavBar: true,
    },
    isMatch(p) {
      return p.isPlatformMatch('dingtalk')
    },
    versionParser(p) {
      return p.matchUserAgentVersion(/dingtalk\/(\d+).(\d+).(\d+)?/i)
    }
  },
  qq: {
    initialize(p){
      //alert('QQ Init: from platform-registry.js');
      let userAgent = window.navigator.userAgent.toString().trim()
      let val

      p.setUserAgent(userAgent)

      // 获取网络类型
      // 可能的字段: NetType/WIFI, NetType/2G, NetType/3G+, NetType/4G
      val = userAgent.match(/NetType\/(\w+)/i)
      if (!!val && val.length > 0 && !!val[1]) {
        p.setNetType(val[1].toString().toLowerCase())
      }

      // 触发外层的ready
      p.triggerReady('qq Init Success!')
    },
    settings: {
      hideNavBar: true,
    },
    isMatch(p) {
      return p.isPlatformMatch('qq')
    },
    versionParser(p) {
      return p.matchUserAgentVersion(/qq\/(\d+).(\d+).(\d+)?/i)
    }
  }

}

/**
 * @param {Platform} p
 * @return {boolean}
 * */
function isIOS (p) {
  // shortcut function to be reused internally
  // checks navigator.platform to see if it's an actual iOS device
  // this does not use the user-agent string because it is often spoofed
  // an actual iPad will return true, a chrome dev tools iPad will return false
  return p.testNavigatorPlatform('iphone|ipad|ipod')
}
/**
 * @param {Platform} p
 * @return {boolean}
 * */
function isSafari (p) {
  return p.testUserAgent('Safari')
}

/**
 * @param {Platform} plt
 * @return {boolean}
 * */
function isWKWebView (plt) {
  return isIOS(plt) && !!window['webkit']
}

/**
 * @param {Platform} plt
 * @return {boolean}
 * */
function isIosUIWebView (plt) {
  return isIOS(plt) && !isWKWebView(plt) && !isSafari(plt)
}

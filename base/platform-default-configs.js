/**
 * Created by Hsiang on 2017/2/9.
 *
 * # 平台层级的 "默认" 配置
 *
 */
import { ready } from '../util/dom'
//  platform supported list
export const SUBSET_LIST = ['wechat', 'alipay', 'dingtalk', 'qq']

// platform default configs
export const PLATFORM_DEFAULT_CONFIGS = {
  mobile: {
    settings: {
      mode: 'md',
    }
  },
  /**
   * 移动端基础平台(android/IOS)
   * */
  android: {
    superset: 'mobile',
    subsets: SUBSET_LIST,
    settings: {
      toolbarMinHeight: 56,
      hoverCSS: false,
      mode: 'md',
      activator: function () {
        // md mode defaults to use ripple activator
        // however, under-powered devices shouldn't use ripple
        // if this a linux device, and is using Android Chrome v36 (Android 5.0)
        // or above then use ripple, otherwise do not use a ripple effect
        if (p.testNavigatorPlatform('linux')) {
          let chromeVersion = p.matchUserAgentVersion(/Chrome\/(\d+).(\d+)?/)
          if (chromeVersion) {
            // linux android device using modern android chrome browser gets ripple
            if (parseInt(chromeVersion.major, 10) < 36 || p.version().major < 5) {
              return 'none'
            } else {
              return 'ripple'
            }
          }
          // linux android device not using chrome browser checks just android's version
          if (p.version().major < 5) {
            return 'none'
          }
        }
        // fallback to always use ripple
        return 'ripple'
      },

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
      pageTransition: 'fade-bottom-transition',
      // pageTransition: 'zoom-transition',

      // actionSheetEnter: 'action-sheet-md-slide-in',
      // actionSheetLeave: 'action-sheet-md-slide-out',
      // alertEnter: 'alert-md-pop-in',
      // alertLeave: 'alert-md-pop-out',
      // loadingEnter: 'loading-md-pop-in',
      // loadingLeave: 'loading-md-pop-out',
      // modalEnter: 'modal-md-slide-in',
      // modalLeave: 'modal-md-slide-out',
      //
      // pickerEnter: 'picker-slide-in',
      // pickerLeave: 'picker-slide-out',
      // popoverEnter: 'popover-md-pop-in',
      // popoverLeave: 'popover-md-pop-out',
      // toastEnter: 'toast-md-slide-in',
      // toastLeave: 'toast-md-slide-out',

      // scrollAssist: true,
      // inputCloning: true,
      // autoFocusAssist: 'immediate',
    },

    /**
     * @param {Platform} p
     * */
    isMatch(p) {
      return p.isPlatformMatch('android', ['android', 'silk'], ['windows phone'])
    },

    /**
     * @param {Platform} p
     * */
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
      pageTransition: 'fade-right-transition',
      // pageTransition: 'ios-transition',
      // loadingEnter: 'loading-pop-in',
      // loadingLeave: 'loading-pop-out',
      // modalEnter: 'modal-slide-in',
      // modalLeave: 'modal-slide-out',

      // pickerEnter: 'picker-slide-in',
      // pickerLeave: 'picker-slide-out',
      // popoverEnter: 'popover-pop-in',
      // popoverLeave: 'popover-pop-out',
      // actionSheetEnter: 'action-sheet-slide-in',
      // actionSheetLeave: 'action-sheet-slide-out',
      // alertEnter: 'alert-pop-in',
      // alertLeave: 'alert-pop-out',
      // toastEnter: 'toast-slide-in',
      // toastLeave: 'toast-slide-out',

      // autoFocusAssist: 'delay',
      // inputBlurring: isIOS,
      // inputCloning: isIOS,
      // scrollAssist: isIOS,
      // statusbarPadding: isCordova,
      // swipeBackEnabled: isIOS,
      // tapPolyfill: isIosUIWebView,
      // virtualScrollEventAssist: isIosUIWebView,
      // disableScrollAssist: isIOS,
    },

    /**
     * @param {Platform} p
     * */
    isMatch(p) {
      return p.isPlatformMatch('ios', ['iphone', 'ipad', 'ipod'], ['windows phone'])
    },

    /**
     * @param {Platform} p
     * */
    versionParser(p) {
      return p.matchUserAgentVersion(/OS (\d+)_(\d+)?/)
    }
  },

  /**
   * 开放平台及内嵌式App初始化
   * 如果添加新环境,记得在SUBSET_LIST注册
   * */
  wechat: {
    // initialize(p){
    //   // 在ready之前进行处理
    //   p.prepareReady = function () {
    //     let _userAgent = window.navigator.userAgent.toString().trim();
    //     let val;
    //     //alert('Wechat Init: from platform-registry.js')
    //     /**
    //      * 执行默认的domReady, 如果有定制化的初始化任务,
    //      * 手动执行p.triggerReady
    //      *
    //      * @example
    //      *
    //      *  ready(function () {
    //      *      p.triggerReady('Wechat Init Success!');
    //      *  });
    //      * */
    //
    //     /**
    //      * 微信的userAgent中包含了网络类型和当前语言
    //      * */
    //     p.setUserAgent(_userAgent);
    //
    //     // 获取网络类型
    //     // 可能的字段: NetType/WIFI, NetType/2G, NetType/3G+, NetType/4G
    //     val = _userAgent.match(/NetType\/(\w+) /i);
    //     if (!!val && val.length > 0 && !!val[1]) {
    //       p.setNetType(val[1].toString().toLowerCase());
    //     }
    //
    //     // 获取语言类型
    //     // Language/zh-CN
    //     val = _userAgent.match(/Language\/(.+)/i);
    //     if (!!val && val.length > 0 && !!val[1]) {
    //       p.setLang(val[1].toString().toLowerCase(), true);
    //     }
    //
    //     // 触发外层的ready
    //     ready(function () {
    //       // 触发
    //       p.triggerReady('Wechat Init Success!');
    //     })
    //   }
    // },
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
    // initialize(p){
    //   //alert('Alipay Init: from platform-registry.js');
    //   let _userAgent = window.navigator.userAgent.toString().trim();
    //   let val;
    //
    //   /**
    //    * 支付宝的userAgent中包含了网络类型和当前语言
    //    * AlipayDefined(nt:WIFI,ws:320|548|2.0)
    //    * Language/zh-Hans
    //    * */
    //   p.setUserAgent(_userAgent);
    //
    //   // 获取网络类型
    //   val = _userAgent.match(/AlipayDefined\(nt:(\w+),/i);
    //   if (!!val && val.length > 0 && !!val[1]) {
    //     p.setNetType(val[1].toString().toLowerCase());
    //   }
    //
    //   // 获取语言类型
    //   // Language/zh-CN
    //   val = _userAgent.match(/Language\/(.+)/i);
    //   if (!!val && val.length > 0 && !!val[1]) {
    //     p.setLang(val[1].toString().toLowerCase(), true);
    //   }
    //
    //   // 触发外层的ready
    //   ready(function () {
    //     p.triggerReady('alipay Init Success!');
    //   })
    // },
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
    // initialize(p){
    //   //alert('Dingtalk Init: from platform-registry.js');
    //   let _userAgent = window.navigator.userAgent.toString().trim();
    //   let val;
    //
    //   /**
    //    * 钉钉的userAgent中包含了网络类型和当前语言
    //    * AlipayDefined(nt:WIFI,ws:320|548|2.0)
    //    * Language/zh-Hans
    //    * */
    //   p.setUserAgent(_userAgent);
    //
    //   // 获取网络类型
    //   // dingtalk未给出
    //
    //   // 获取语言类型
    //   // Language/zh-CN
    //   val = _userAgent.match(/language\/(.+)/i);
    //   if (!!val && val.length > 0 && !!val[1]) {
    //     p.setLang(val[1].toString().toLowerCase(), true);
    //   }
    //
    //   // 触发外层的ready
    //   ready(() => {
    //     p.triggerReady('dingtalk Init Success!');
    //   })
    // },
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
    // initialize(p){
    //   //alert('QQ Init: from platform-registry.js');
    //   let _userAgent = window.navigator.userAgent.toString().trim();
    //   let val;
    //
    //   p.setUserAgent(_userAgent);
    //
    //   // 获取网络类型
    //   // 可能的字段: NetType/WIFI, NetType/2G, NetType/3G+, NetType/4G
    //   val = _userAgent.match(/NetType\/(\w+)/i);
    //   if (!!val && val.length > 0 && !!val[1]) {
    //     p.setNetType(val[1].toString().toLowerCase());
    //   }
    //
    //   // DOMReady后触发外层的ready
    //   ready(() => {
    //     p.triggerReady('qq Init Success!');
    //   })
    //
    // },
    settings: {
      hideNavBar: true,
    },
    isMatch(p) {
      return p.isPlatformMatch('qq')
    },
    versionParser(p) {
      return p.matchUserAgentVersion(/qq\/(\d+).(\d+).(\d+)?/i)
    }
  },

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

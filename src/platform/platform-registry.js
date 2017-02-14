/**
 * Created by Hsiang on 2017/2/9.
 *
 * 平台注册中心,在这里配置各个平台的特性
 *
 *
 */

import { ready } from '../util/dom';

export const PLATFORM_CONFIGS = {

  /**
   * core
   */
  core: {
    settings: {
      mode: 'ios',
      keyboardHeight: 290
    }
  },

  /**
   * mobile
   */
  mobile: {},

  /**
   * phablet手机平板
   */
  phablet: {
    /**
     * @param {Platform} p
     * */
    isMatch(p) {
      let smallest = Math.min(p.width(), p.height());
      let largest = Math.max(p.width(), p.height());
      return (smallest > 390 && smallest < 520) &&
        (largest > 620 && largest < 800);
    }
  },

  /**
   * tablet
   */
  tablet: {
    /**
     * @param {Platform} p
     * */
    isMatch(p) {
      let smallest = Math.min(p.width(), p.height());
      let largest = Math.max(p.width(), p.height());
      return (smallest > 460 && smallest < 820) &&
        (largest > 780 && largest < 1400);
    }
  },

  /**
   * android
   */
  android: {
    superset: 'mobile',
    subsets: [
      'phablet',
      'tablet'
    ],
    settings: {
      /**
       * 点触出现水纹的动画开关
       * @return {Platform}
       * */
      activator: function () {
        // md mode defaults to use ripple activator
        // however, under-powered devices shouldn't use ripple
        // if this a linux device, and is using Android Chrome v36 (Android 5.0)
        // or above then use ripple, otherwise do not use a ripple effect
        if (p.testNavigatorPlatform('linux')) {
          let chromeVersion = p.matchUserAgentVersion(/Chrome\/(\d+).(\d+)?/);
          if (chromeVersion) {
            // linux android device using modern android chrome browser gets ripple
            if (parseInt(chromeVersion.major, 10) < 36 || p.version().major < 5) {
              return 'none';
            } else {
              return 'ripple';
            }
          }
          // linux android device not using chrome browser checks just android's version
          if (p.version().major < 5) {
            return 'none';
          }
        }
        // fallback to always use ripple
        return 'ripple';
      },
      autoFocusAssist: 'immediate',
      inputCloning: true,
      scrollAssist: true,
      hoverCSS: false,
      keyboardHeight: 300,
      mode: 'md',
    },

    /**
     * @param {Platform} p
     * */
    isMatch(p) {
      return p.isPlatformMatch('android', ['android', 'silk'], ['windows phone']);
    },

    /**
     * @param {Platform} p
     * */
    versionParser(p) {
      return p.matchUserAgentVersion(/Android (\d+).(\d+)?/);
    }
  },

  /**
   * ios
   */
  ios: {
    superset: 'mobile',
    subsets: [
      'ipad',
      'iphone'
    ],
    settings: {
      autoFocusAssist: 'delay',
      hoverCSS: false,
      inputBlurring: isIOS,
      inputCloning: isIOS,
      keyboardHeight: 300,
      mode: 'ios',
      scrollAssist: isIOS,
      statusbarPadding: isCordova,
      swipeBackEnabled: isIOS,
      tapPolyfill: isIOSUI,
      virtualScrollEventAssist: isIOSUI,
      disableScrollAssist: isIOS,
    },

    /**
     * @param {Platform} p
     * */
    isMatch(p) {
      return p.isPlatformMatch('ios', ['iphone', 'ipad', 'ipod'], ['windows phone']);
    },

    /**
     * @param {Platform} p
     * */
    versionParser(p) {
      return p.matchUserAgentVersion(/OS (\d+)_(\d+)?/);
    }
  },

  /**
   * ipad
   */
  ipad: {
    superset: 'tablet',
    settings: {
      keyboardHeight: 500,
    },
    /**
     * @param {Platform} p
     * */
    isMatch(p) {
      return p.isPlatformMatch('ipad');
    }
  },

  /**
   * iphone
   */
  iphone: {
    superset: 'mobile',
    subsets: [
      'phablet'
    ],
    /**
     * @param {Platform} p
     * */
    isMatch(p) {
      return p.isPlatformMatch('iphone');
    }
  },

  /**
   * Windows
   */
  windows: {
    superset: 'mobile',
    subsets: [
      'phablet',
      'tablet'
    ],
    settings: {
      mode: 'wp',
      autoFocusAssist: 'immediate',
      hoverCSS: false
    },
    /**
     * @param {Platform} p
     * @return {boolean}
     * */
    isMatch(p) {
      return p.isPlatformMatch('windows', ['windows phone']);
    },
    /**
     * @param {Platform} p
     * @return {any}
     * */
    versionParser(p) {
      return p.matchUserAgentVersion(/Windows Phone (\d+).(\d+)?/);
    }
  },

  /**
   * 开放平台及内嵌式App初始化
   * */
  wechat: {
    isEngine: true,
    initialize(p){
      let _userAgent = window.navigator.userAgent.toString().trim();
      let val;
      alert('Wechat Init: from platform-registry.js')
      /**
       * 执行默认的domReady, 如果有定制化的初始化任务,
       * 则去除prepareReady,手动执行p.triggerReady
       *
       * @example
       *
       *  p.prepareReady();
       *
       *  or:
       *
       *  ready(function () {
       *      p.triggerReady('Wechat Init Success!');
       *  });
       * */

      /**
       * 微信的userAgent中包含了网络类型和当前语言
       * */
      p.setUserAgent(_userAgent);

      // 获取网络类型
      // 可能的字段: NetType/WIFI, NetType/2G, NetType/3G+, NetType/4G
      val = _userAgent.match(/NetType\/(\w+) /i);
      if (!!val && val.length > 0 && !!val[1]) {
        p.setNetType(val[1].toString().toLowerCase());
      }

      // 获取语言类型
      // Language/zh-CN
      val = _userAgent.match(/Language\/(.+)/i);
      if (!!val && val.length > 0 && !!val[1]) {
        p.setLang(val[1].toString().toLowerCase(),true);
      }

      // 触发外层的ready
      ready(function () {
        p.triggerReady('Wechat Init Success!');
      })
    },
    settings: {
      mode: 'wechat',
      autoFocusAssist: 'immediate',
      hoverCSS: false
    },
    /**
     * @param {Platform} p
     * */
    isMatch(p) {

      return p.isPlatformMatch('wechat', ['micromessenger']);
    },
  },
  alipay: {
    isEngine: true,
    initialize(p){
      alert('Alipay Init: from platform-registry.js');
      let _userAgent = window.navigator.userAgent.toString().trim();
      let val;

      /**
       * 支付宝的userAgent中包含了网络类型和当前语言
       * AlipayDefined(nt:WIFI,ws:320|548|2.0)
       * Language/zh-Hans
       * */
      p.setUserAgent(_userAgent);

      // 获取网络类型
      val = _userAgent.match(/AlipayDefined\(nt:(\w+),/i);
      if (!!val && val.length > 0 && !!val[1]) {
        p.setNetType(val[1].toString().toLowerCase());
      }

      // 获取语言类型
      // Language/zh-CN
      val = _userAgent.match(/Language\/(.+)/i);
      if (!!val && val.length > 0 && !!val[1]) {
        p.setLang(val[1].toString().toLowerCase(),true);
      }

      // 触发外层的ready
      ready(function () {
        p.triggerReady('alipay Init Success!');
      })
    },

    /**
     * @param {Platform} p
     * */
    isMatch(p) {
      return p.isPlatformMatch('alipay', ['alipay', 'alipayclient']);
    }
  },
  dingtalk: {
    isEngine: true,
    initialize(p){
      alert('Dingtalk Init: from platform-registry.js');
      let _userAgent = window.navigator.userAgent.toString().trim();
      let val;

      /**
       * 钉钉的userAgent中包含了网络类型和当前语言
       * AlipayDefined(nt:WIFI,ws:320|548|2.0)
       * Language/zh-Hans
       * */
      p.setUserAgent(_userAgent);

      // 获取网络类型
      // dingtalk未给出

      // 获取语言类型
      // Language/zh-CN
      val = _userAgent.match(/language\/(.+)/i);
      if (!!val && val.length > 0 && !!val[1]) {
        p.setLang(val[1].toString().toLowerCase(),true);
      }

      // 触发外层的ready
      ready(()=>{
        p.triggerReady('dingtalk Init Success!');
      })
    },

    /**
     * @param {Platform} p
     * */
    isMatch(p) {
      return p.isPlatformMatch('dingtalk');
    }
  },
  qq: {
    isEngine: true,
    initialize(p){
      alert('QQ Init: from platform-registry.js');
      let _userAgent = window.navigator.userAgent.toString().trim();
      let val;

      p.setUserAgent(_userAgent);

      // 获取网络类型
      // 可能的字段: NetType/WIFI, NetType/2G, NetType/3G+, NetType/4G
      val = _userAgent.match(/NetType\/(\w+)/i);
      if (!!val && val.length > 0 && !!val[1]) {
        p.setNetType(val[1].toString().toLowerCase());
      }

      // DOMReady后触发外层的ready
      ready(()=>{
        p.triggerReady('qq Init Success!');
      })

    },

    /**
     * @param {Platform} p
     * */
    isMatch(p) {
      return p.isPlatformMatch('qq');
    }
  },

  dtdream: {
    isEngine: true,
    initialize(p){
      alert('QQ Init: from platform-registry.js')

      p.prepareReady();

    },

    /**
     * @param {Platform} p
     * */
    isMatch(p) {
      return p.isPlatformMatch('dtdream');
    }
  },

  // /**
  //  * cordova
  //  */
  // cordova: {
  //   isEngine: true,
  //   /**
  //    * @param {Platform} p
  //    * @return {any}
  //    * */
  //   initialize (p) {
  //
  //     // prepare a custom "ready" for cordova "deviceready"
  //     p.prepareReady = function () {
  //       // 1) ionic bootstrapped
  //       windowLoad(function () {
  //
  //         alert('initialize')
  //         // 2) window onload triggered or completed
  //         document.addEventListener('deviceready', function () {
  //           // 3) cordova deviceready event triggered
  //
  //           // add cordova listeners to emit platform events
  //           document.addEventListener('backbutton', function (ev) {
  //             p.zone.run(() => {
  //               p.backButton.emit(ev);
  //             });
  //           });
  //           document.addEventListener('pause', function (ev) {
  //             p.zone.run(() => {
  //               p.pause.emit(ev);
  //             });
  //           });
  //           document.addEventListener('resume', function (ev) {
  //             p.zone.run(() => {
  //               p.resume.emit(ev);
  //             });
  //           });
  //
  //           // cordova has its own exitApp method
  //           p.exitApp = function () {
  //             !!window.navigator.app && !!window.navigator.app.exitApp && window.navigator.app.exitApp();
  //           };
  //
  //           // cordova has fully loaded and we've added listeners
  //           p.triggerReady('cordova');
  //         });
  //       });
  //     };
  //
  //   },
  //   /**
  //    * @return {any}
  //    * */
  //   isMatch() {
  //     return !!(window.cordova || window.PhoneGap || window.phonegap);
  //   }
  // }
};
/**
 * @return {boolean}
 * */
function isCordova () {
  return !!window.cordova;
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
  return p.testNavigatorPlatform('iphone|ipad|ipod');
}
/**
 * @param {Platform} p
 * @return {boolean}
 * */
function isSafari (p) {
  return p.testUserAgent('Safari');
}

/**
 * @return {boolean}
 * */
function isWK () {
  return !!window['webkit'];
}

/**
 * @param {Platform} p
 * @return {boolean}
 * */
function isIOSUI (p) {
  return isIOS(p) && !isWK() && !isSafari(p);
}

export function providePlatformConfigs () {
  return PLATFORM_CONFIGS;
}

/**
 * @param {Platform} plt
 * @return {boolean}
 * */
export function isWKWebView (plt) {
  return isIOS(plt) && !!window['webkit'];
}

/**
 * @param {Platform} plt
 * @return {boolean}
 * */
export function isIosUIWebView (plt) {
  return isIOS(plt) && !isWKWebView(plt) && !isSafari(plt);
}

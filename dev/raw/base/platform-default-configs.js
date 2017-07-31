/**
 * Created by Hsiang on 2017/2/9.
 *
 * # 平台层级的 "默认" 配置
 *
 * @private
 */
import { docReady } from '../util/util'
// 平台支持列表
export const SUBSET_LIST = ['wechat', 'alipay', 'dingtalk', 'qq', 'dtdream']
const TIMEOUT = 10000 // 平台初始化需要的最大时间

// platform default configs
export const PLATFORM_DEFAULT_CONFIGS = {
  mobile: {
    settings: {
      mode: 'ios'
    }
  },
  android: {
    superset: 'mobile',
    subsets: SUBSET_LIST,
    settings: {
      toolbarMinHeight: 56,               // toolbar的默认最小高度
      mode: 'md',                         // 模式
      backButtonText: '返回',             // 后退按钮文字
      backButtonIcon: 'icon-md-arrow-back', // 后退图标
      onPullIcon: 'icon-md-arrow-down',
      iconMode: 'md',                     // icon的模式
      menuType: 'overlay',                // menu组件的展开默认类型
      spinner: 'crescent',
      scrollAssist: false,                // 是否需要使用jsScroll
      tabsHighlight: true,                // tab是否显示下划线
      tabsPlacement: 'bottom',
      tabsHideOnSubPages: false,          // 切换到子页面后隐藏tab组件
      showIndicatorWhenPageChange: true,  // 页面切换是否显示Indicator提示
      pageTransition: 'zoom-transition',  // 转场动画
      pickerRotateFactor: 0,
      pickerScaleFactor: 0.81
    },
    isMatch (plt) {
      return plt.isPlatformMatch('android', ['android', 'silk'], ['windows phone'])
    },
    versionParser (plt) {
      return plt.matchUserAgentVersion(/Android (\d+).(\d+)?/)
    }
  },
  ios: {
    superset: 'mobile',
    subsets: SUBSET_LIST,
    settings: {
      toolbarMinHeight: 44,
      mode: 'ios',
      backButtonText: '返回',
      backButtonIcon: 'icon-ios-arrow-back',  // 后退图标
      onPullIcon: 'icon-ios-arrow-down',
      iconMode: 'ios',
      menuType: 'reveal',
      spinner: 'ios',
      scrollAssist: false,                // 是否需要使用jsScroll
      tabsHighlight: false,
      tabsPlacement: 'bottom',
      tabsHideOnSubPages: false,
      showIndicatorWhenPageChange: true,  // 页面切换是否显示Indicator提示
      pageTransition: 'fade-right-transition', // 'ios-transition'
      statusbarPadding: false,
      pickerRotateFactor: -0.46,
      pickerScaleFactor: 1
    },
    isMatch (plt) {
      return plt.isPlatformMatch('ios', ['iphone', 'ipad', 'ipod'], ['windows phone'])
    },
    versionParser (plt) {
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
        }, TIMEOUT)
      }

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
  },
  alipay: {
    initialize (plt) {
      /**
       * 加载JSSDK
       * */
      let val
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
        }, TIMEOUT)
      }

      /**
       * 支付宝的userAgent中包含了网络类型和当前语言
       * AlipayDefined(nt:WIFI,ws:320|548|2.0)
       * Language/zh-Hans
       * */
      // 获取网络类型
      val = plt.userAgent().match(/AlipayDefined\(nt:(\w+),/i)
      if (!!val && val.length > 0 && !!val[1]) {
        plt.setNetType(val[1].toString().toLowerCase())
      }

      plt.netType = function () {
        window.ap && window.ap.getNetworkType((res) => {
          return res.networkType
        })
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
      jsSDKUrl: '//a.alipayobjects.com/g/h5-lib/alipayjsapi/3.0.2/alipayjsapi.min.js',
      hideNavBar: true
    },
    isMatch (plt) {
      return plt.isPlatformMatch('alipay', ['alipay', 'alipayclient'])
    },
    versionParser (plt) {
      return plt.matchUserAgentVersion(/alipayclient\/(\d+).(\d+).(\d+)?/i)
    }
  },
  dingtalk: {
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
        'use strict'
        loadScript(splitArr.join('//'), () => {
          docReady(() => {
            // 执行自定义的bridge ready钩子
            _this.bridgeReady(plt)
            plt.triggerReady('Dingtalk Init Success!')
            plt.timer && window.clearTimeout(plt.timer)
          })
        })

        plt.timer = window.setTimeout(() => {
          plt.triggerFail('Dingtalk Init Timeout!')
        }, TIMEOUT)
      }

      /**
       * 钉钉的userAgent中包含了网络类型和当前语言
       * AlipayDefined(nt:WIFI,ws:320|548|2.0)
       * Language/zh-Hans
       * */
      let val = plt.userAgent().match(/language\/(.+)/i)
      if (!!val && val.length > 0 && !!val[1]) {
        plt.setLang(val[1].toString().toLowerCase(), true)
      }
    },
    // 由业务完成部分
    bridgeReady (plt) {},
    settings: {
      jsSDKUrl: '//g.alicdn.com/dingding/open-develop/1.5.1/dingtalk.js',
      hideNavBar: true
    },
    isMatch (plt) {
      return plt.isPlatformMatch('dingtalk')
    },
    versionParser (plt) {
      return plt.matchUserAgentVersion(/dingtalk\/(\d+).(\d+).(\d+)?/i)
    }
  },
  qq: {
    initialize (plt) {
      // 获取网络类型
      // 可能的字段: NetType/WIFI, NetType/2G, NetType/3G+, NetType/4G
      let val = plt.userAgent().match(/NetType\/(\w+)/i)
      if (!!val && val.length > 0 && !!val[1]) {
        plt.setNetType(val[1].toString().toLowerCase())
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

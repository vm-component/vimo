/**
 * # 平台层级的 "默认" 配置
 * @private
 */
import { docReady } from '../util/util'
import platformRegisterAlipay from './platform-register-alipay.js'
import platformRegisterDingtalk from './platform-register-dingtalk'

const TIMEOUT = 10000 // 平台初始化需要的最大时间
// platform default configs
export default {
  mobile: {
    settings: {
      mode: 'ios'
    }
  },
  android: {
    superset: 'mobile',
    subsets: [], // 平台支持列表, 由 setupPlatform() 完成
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
      showIndicatorWhenPageChange: false,  // 页面切换是否显示Indicator提示
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
    subsets: [], // 平台支持列表, 由 setupPlatform() 完成
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
      showIndicatorWhenPageChange: false,  // 页面切换是否显示Indicator提示
      pageTransition: 'fade-right-transition', // 'ios-transition'

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
  },
  /**
   * 支付宝平台
   * 这里是针对支付宝平台的初始化配置代码
   *
   * 说明:
   * - 不建议使用 `pause` 和 `resume` 两个事件, 一般的做法是通过这两个事件传递数据, 这部分因为和webapp兼容度低, 因此建议使用 `localStorage` 做数据转移(不是
   * `sessionStorage` )
   * - 如果业务在支付宝中, 则页面切换 `this.$router.push()` 将默认使用 `pushWindow` 替换, 如果业务特殊可自行关闭
   * - 同上, 如果通过 `this.$router.back()` 后退, 则默认使用 `popWindow` 替换, 如果业务特殊可自行关闭. 注意不是 `window.history.back()` , 它不起作用.
   * - subtitleClick(点击导航栏副标题触发回调)这个事件很鸡肋, Vimo只做了对 `titleClick` 的监听, 请参考 `<Title>` 组件
   * - 通过在 `platform.onNetworkChange()` 注册网络变化的回调函数, 回调参数是当前网络类型
   * - 平台初始化完毕注册 `exitApp` 方法, 用法: `this.$platform.exitApp()`
   * */
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
      plt.beforeReady = function () {
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

              // 平台方法注册
              platformRegisterAlipay(plt)
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
      usePushWindow: true, // 页面切换使用alipay提供的 pushWindow() 方法开启新页面
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
            window.dd.ready(init)
            window.dd.error(init)

            function init (err) {
              if (err) {
                console.error('dd error: ' + JSON.stringify(err))
              }
              plt.triggerReady('Dingtalk Init Success!')
              plt.timer && window.clearTimeout(plt.timer)
              // 平台方法注册
              platformRegisterDingtalk(plt)
            }
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
      usePushWindow: true, // 页面切换使用 dingding 提供的 dd.biz.util.openLink 方法开启新页面
      jsSDKUrl: '//g.alicdn.com/dingding/open-develop/1.6.9/dingtalk.js',
      hideNavBar: true
    },
    isMatch (plt) {
      return plt.isPlatformMatch('dingtalk')
    },
    versionParser (plt) {
      return plt.matchUserAgentVersion(/dingtalk\/(\d+).(\d+).(\d+)?/i)
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

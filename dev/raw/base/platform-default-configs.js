/**
 * Created by Hsiang on 2017/2/9.
 *
 * # 平台层级的 "默认" 配置
 *
 * @private
 */
import { docReady } from '../util/util'
//  platform supported list
export const SUBSET_LIST = ['wechat', 'alipay', 'dingtalk', 'qq', 'dtdream']
const TIMEOUT = 10000 // 平台初始化需要的最大时间
// platform default configs
export const PLATFORM_DEFAULT_CONFIGS = {
  mobile: {
    settings: {
      mode: 'ios',
      showIndicatorWhenPageChange: true, // 页面切换是否显示Indicator提示
      regexps: {
        // 整数(包含正负)
        integer: /^-?[1-9]\d*$/,
        // 正整数
        positiveInteger: /^[1-9]\d*$/,
        // 负整数
        negativeInteger: /^-[1-9]\d*$/,
        // 邮箱
        email: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // IP地址
        ip: /(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)\.(25[0-5]|2[0-4]\d|[0-1]\d{2}|[1-9]?\d)/,
        // 身份证
        idCard (num) {
          if (!num) return false
          num = num.toUpperCase()
          const cityCode = {
            11: '北京',
            12: '天津',
            13: '河北',
            14: '山西',
            15: '内蒙古',
            21: '辽宁',
            22: '吉林',
            23: '黑龙江 ',
            31: '上海',
            32: '江苏',
            33: '浙江',
            34: '安徽',
            35: '福建',
            36: '江西',
            37: '山东',
            41: '河南',
            42: '湖北 ',
            43: '湖南',
            44: '广东',
            45: '广西',
            46: '海南',
            50: '重庆',
            51: '四川',
            52: '贵州',
            53: '云南',
            54: '西藏 ',
            61: '陕西',
            62: '甘肃',
            63: '青海',
            64: '宁夏',
            65: '新疆',
            71: '台湾',
            81: '香港',
            82: '澳门',
            91: '国外 '
          }

          if (!cityCode[num.substr(0, 2)]) {
            console.debug('地址编码错误')
            return false
          }
          // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
          if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
            console.debug('输入的身份证号长度不对，或者号码不符合规定！\n15位号码应全为数字，18位号码末位可以为数字或X。')
            return false
          }
          // 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
          // 下面分别分析出生日期和校验位
          var re, len, arrSplit, dtmBirth, bGoodDay, arrInt, arrCh, nTemp, k
          len = num.length
          if (len === 15) {
            re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/)
            arrSplit = num.match(re)

            // 检查生日日期是否正确
            dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4])
            bGoodDay = (dtmBirth.getYear() === Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) === Number(arrSplit[3])) && (dtmBirth.getDate() === Number(arrSplit[4]))
            if (!bGoodDay) {
              console.debug('输入的身份证号里出生日期不对！')
              return false
            } else {
              // 将15位身份证转成18位
              // 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
              arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
              arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
              nTemp = 0
              num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6)
              for (k = 0; k < 17; k++) {
                nTemp += num.substr(k, 1) * arrInt[k]
              }
              num += arrCh[nTemp % 11]
              return true
            }
          }
          if (len === 18) {
            re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/)
            arrSplit = num.match(re)

            // 检查生日日期是否正确
            dtmBirth = new Date(arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4])
            bGoodDay = (dtmBirth.getFullYear() === Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) === Number(arrSplit[3])) && (dtmBirth.getDate() === Number(arrSplit[4]))
            if (!bGoodDay) {
              console.debug('输入的身份证号里出生日期不对！')
              return false
            } else {
              // 检验18位身份证的校验码是否正确。
              // 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
              var valnum
              arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
              arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
              nTemp = 0
              for (k = 0; k < 17; k++) {
                nTemp += num.substr(k, 1) * arrInt[k]
              }
              valnum = arrCh[nTemp % 11]
              if (valnum !== num.substr(17, 1)) {
                console.debug('18位身份证的校验码不正确！应该为：' + valnum)
                return false
              }
              return true
            }
          }
          return false
        },
        // 密码需6-18位，以字母开头可含数字
        password: /^[a-zA-Z]\w{5,17}$/,
        // 国内电话, 正确格式为：XXXX-XXXXXXX，XXXX- XXXXXXXX，XXX-XXXXXXX，XXX-XXXXXXXX，XXXXXXX，XXXXXXXX。
        tel: /^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$/,
        // 国内手机号, 13/14/15/18/17开头
        mobile: /^((13[0-9])|(14[0-9])|(15[0-9])|(18[0-9])|(17[0-9]))\d{8}$/,
        // 验证汉字
        cn: /[\u4e00-\u9fa5]/,
        // 验证码, 至少4位
        securityCode: /^\d{4,}$/,
        // 昵称: 可由中英文字母、数字、"-"、"_"组成。
        nickName: /[A-Za-z0-9_\-\u4e00-\u9fa5]+/,
        // qq: 1-9开头，最少5位。
        qq: /^[1-9][0-9]{4,}$/,
        // 网址URL, 必须以(https|http|ftp|rtsp|mms)开头
        url: /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/
      },
      jsScrollOptions: {
        bounce: true,              // 关闭滚动回弹
        bindToWrapper: true        // 绑定scroll事件到当前容器而不是window上
      }
    }
  },
  android: {
    superset: 'mobile',
    subsets: SUBSET_LIST,
    settings: {
      toolbarMinHeight: 56,               // toolbar的默认最小高度
      mode: 'md',                         // 模式
      backButtonText: '返回',             // 后退按钮文字
      backButtonIcon: 'md-arrow-back',    // 后退图标
      iconMode: 'md',                     // icon的模式
      menuType: 'overlay',                // menu组件的展开默认类型
      spinner: 'crescent',
      tabsHighlight: true,                // tab是否显示下划线
      tabsPlacement: 'bottom',
      tabsHideOnSubPages: false,          // 切换到子页面后隐藏tab组件
      pageTransition: 'zoom-transition',  // 转场动画
      scrollAssist: false,                // Content组件是否开启jsScroll
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
      backButtonIcon: 'ios-arrow-back',
      iconMode: 'ios',
      menuType: 'reveal',
      spinner: 'ios',
      tabsHighlight: false,
      tabsPlacement: 'bottom',
      tabsHideOnSubPages: false,
      pageTransition: 'fade-right-transition', // 'ios-transition'
      statusbarPadding: false,
      scrollAssist: false, // Content组件是否开启jsScroll
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
      this.bridgeReady(plt)
      plt.triggerReady('dtdream Init Success!')
    },
    // 由业务完成部分
    bridgeReady (plt) {},
    settings: {
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

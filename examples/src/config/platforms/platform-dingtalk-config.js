/**
 * 平台配置信息
 * 1. 通过userAgent匹配当前平台
 * 2. 加载平台的 JSSDK 脚本
 * 3. 加载完毕执行 bridgeReady 钩子
 * 4. 执行平台相关的驱动, 比如UI组件/导航条/页面切换等可用前端实现的通用部分(如果没有则不执行)
 * 5. 执行完毕触发 $platform.ready(), 平台就绪
 * */
import { checkProtocol, docReady, loadScript } from '../../../../components/util/util'
import { PLATFORM_INIT_TIMEOUT } from './variable'
import platformDingTalkDrive from './platform-dingtalk-drive'

export default {
  initialize (plt) {
    const _this = this
    let jsSDKUrl = checkProtocol(this.settings['jsSDKUrl'])

    /**
     * 在ready之前进行处理
     * */
    plt.beforeReady = () => {
      'use strict'
      loadScript(jsSDKUrl, () => {
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
            platformDingTalkDrive(plt)
          }
        })
      })

      plt.timer = window.setTimeout(() => {
        plt.triggerFail('Dingtalk Init Timeout!')
      }, PLATFORM_INIT_TIMEOUT)
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
  bridgeReady (plt) {
    /**
     * 完成config操作, 配置完成后将自动执行
     * window.dd.ready
     * window.dd.error
     * 两个方法
     * */
    window.dd.config({})
  },
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
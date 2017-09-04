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
import platformDtDreamDrive from './platform-dtdream-drive'

export default {
  initialize (plt) {
    const _this = this
    let jsSDKUrl = checkProtocol(this.settings['jsSDKUrl'])

    /**
     * 在ready之前进行处理
     * */
    plt.beforeReady = () => {
      loadScript(jsSDKUrl, () => {
        docReady(() => {
          window.setupWebViewJavascriptBridge(() => {
            // 执行自定义的bridge ready钩子
            _this.bridgeReady(plt)
            platformDtDreamDrive(plt)
            plt.triggerReady('Dtdream Init Success!')
            plt.timer && window.clearTimeout(plt.timer)
          })
        })
      })

      plt.timer = window.setTimeout(() => {
        plt.triggerFail('Dtdream Init Timeout!')
      }, PLATFORM_INIT_TIMEOUT)
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
    jsSDKUrl: '//hzmetro.dtdream.com:8080/ddhybirdengine/hybridapi.js ',
    hideNavBar: true
  },
  isMatch (plt) {
    return plt.isPlatformMatch('14g60')
  },
  versionParser (plt) {
    // 无用
    return plt.matchUserAgentVersion(/14g60\/(\d+).(\d+).(\d+)?/i)
  }
}

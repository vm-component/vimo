/**
 * 开启
 * @desc
 * 如果上一个实例是开启状态, 则自动关闭后开启新的
 * @param {object} options - 传入参数
 * @return {Promise} - 开启动画结束的promise
 * @private
 * */
/**
 * 关闭
 * @return {Promise} - 关闭动画结束的promise
 * @private
 * */
import { isString } from '../util/util'
import LoadingComponent from './loading.vue'
import GeneratePopUpInstance from '../util/GeneratePopUpInstance.js'

class LoadingInstance extends GeneratePopUpInstance {
  normalizeOptions (options) {
    if (isString(options)) {
      options = {content: options}
    }
    return options
  }

  isPresentHandled (options) {
    return (!!options && !options.isH5) &&
      window.VM &&
      window.VM.platform &&
      window.VM.platform.showLoading &&
      window.VM.platform.showLoading(options)
  }

  isDismissHandled () {
    return window.VM &&
      window.VM.platform &&
      window.VM.platform.hideLoading &&
      window.VM.platform.hideLoading()
  }
}

export default new LoadingInstance(LoadingComponent, 'loadingPortal')

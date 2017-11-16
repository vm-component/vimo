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
import PopoverComponent from './popover.vue'
import GeneratePopUpInstance from '../util/GeneratePopUpInstance.js'

class PopoverInstance extends GeneratePopUpInstance {
  normalizeOptions (options) {
    options.recordInHistory = false
    return options
  }
}

export default new PopoverInstance(PopoverComponent, 'modalPortal')

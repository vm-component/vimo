import PickerComponent from './picker.vue'
import GeneratePopUpInstance from '../../util/GeneratePopUpInstance.js'

/**
 * @function present
 * @param {object} options - 传入参数
 * @param {Object} options.buttons - 组件初始化的button数据
 * @param {Array} options.columns - 组件初始化的column数据
 * @param {String} options.column.name - 组件初始化的column数据
 * @param {String} options.columns.align - 组件初始化的column数据
 * @param {String} [options.mode='ios'] - 模式
 * @param {String} [options.cssClass] - 样式
 * @param {Boolean} [options.enableBackdropDismiss=true] - 点击backdrop是否能关闭
 * @param {Function} [options.onChange=noop] - picker数据变化时触发, 某一个col变化也触发, 返回最新值
 * @param {Function} [options.onSelect=noop] - 某一列发生变化时触发
 * @description
 * 开启
 * */
/**
 * @function dismiss
 * @description
 * 关闭
 * */
class PickerInstance extends GeneratePopUpInstance {
  isPresentHandled (options) {
    return !options.isH5 &&
      window.VM &&
      window.VM.platform &&
      window.VM.platform.picker &&
      window.VM.platform.picker(options)
  }

  /**
   * 刷新
   * @private
   * */
  refresh () {
    this._ins && this._ins.refresh()
  }

  /**
   * 列重置
   * @private
   * */
  resetColumn (index) {
    this._ins && this._ins.resetColumn(index)
  }
}

export default new PickerInstance(PickerComponent, 'sheetPortal')

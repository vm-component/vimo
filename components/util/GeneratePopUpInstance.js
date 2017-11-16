import Vue from 'vue'
import getInsertPosition from './get-insert-position'
import { isObject } from './util'

/**
 * 当前类用于生成PopUp对象
 * @private
 * */
export default class GeneratePopUpInstance {
  /**
   * @param {Object} component - 组件对象
   * @param {String} position - 组件在DOM中插入位置
   * */
  constructor (component, position) {
    this._component = component        // 组件对象
    this._position = position || null  // popup插入位置(id)
    this._ins = null                   // PopUp实例
  }

  /**
   * 外部复写 promise 方法, 比如钉钉或者alipay平台
   * @param {Object} options - 参数
   * @override
   * */
  isPresentHandled (options) {
    return false
  }

  /**
   * 外部复写 dismiss 方法, 比如钉钉或者alipay平台
   * @param {Object} options - 参数
   * @override
   * */
  isDismissHandled (options) {
    return false
  }

  /**
   * 将传给present的参数对象化, 因为propsData需要传入对象,
   * 但是业务调用传入的options可能是多个参数
   * @param {Object} options - 参数
   * @override
   * */
  normalizeOptions (options) {
    let _args = Array.prototype.slice.call(arguments)
    if (isObject(_args[0])) {
      return _args[0]
    } else {
      return {}
    }
  }

  /**
   * 构建组件实例
   * @param {Object} options - 参数
   * @private
   * */
  generateInstance (options) {
    let el = getInsertPosition(this._position).appendChild(
      document.createElement('div')
    )
    let PreviewImage = Vue.extend(this._component)
    let _ins = new PreviewImage({propsData: options})
    _ins.$mount(el)
    return _ins
  }

  /**
   * 开启组件
   * @return {Promise}
   * @public
   * */
  present () {
    let options = this.normalizeOptions(...arguments)
    return new Promise((resolve) => {
      if (!this.isPresentHandled(options)) {
        if (this._ins && this._ins.isActive) {
          this._ins.dismiss().then(() => {
            this._ins = this.generateInstance(options)
            this._ins.present().then(() => resolve())
          })
        } else {
          // normal present
          this._ins = this.generateInstance(options)
          this._ins.present().then(() => resolve())
        }
      } else {
        resolve()
      }
    })
  }

  /**
   * 关闭组件
   * @return {Promise}
   * @public
   * */
  dismiss () {
    return new Promise((resolve) => {
      if (!this.isDismissHandled()) {
        /* istanbul ignore else */
        if (this._ins && this._ins.isActive) {
          this._ins.dismiss().then(() => {
            this._ins = null
            resolve()
          })
        } else {
          this._ins = null
          resolve()
        }
      } else {
        resolve()
      }
    })
  }
}

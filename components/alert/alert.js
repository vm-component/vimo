import Vue from 'vue'
import { getInsertPosition } from '../util/getInsertPosition'
import alertComponent from './alert.vue'

const Alert = Vue.extend(alertComponent)

// ---------- functions ----------

function AlertFactory (options) {
  let el = getInsertPosition('alertPortal').appendChild(document.createElement('div'))
  return new Alert({el, propsData: options})
}

function getPresentDismissIns (Factory) {
  return {
    /**
     * 组件实例
     * @private
     * */
    _i: null, // instance

    /**
     * 开启
     * @desc
     * 如果上一个实例是开启状态, 则自动关闭后开启新的
     * @param {object} options - 传入参数
     * @return {Promise} - 开启动画结束的promise
     * @private
     * */
    present (options) {
      if (!options.buttons) {
        options.buttons = []
      }
      return new Promise((resolve) => {
        let isHandled = window.VM && window.VM.platform && window.VM.platform.alert(options)
        if (isHandled) {
          resolve()
        } else {
          console.info('Alert 组件使用H5模式!')
          if (this._i && this._i.isActive) {
            this._i.dismiss().then(() => {
              this._i = Factory(options)
              // 自动开启
              this._i.present().then(() => { resolve() })
            })
          } else {
            this._i = Factory(options)
            // 自动开启
            this._i.present().then(() => { resolve() })
          }
        }
      })
    },

    /**
     * 关闭
     * @return {Promise} - 关闭动画结束的promise
     * @private
     * */
    dismiss () {
      return new Promise((resolve) => {
        if (this._i && this._i.isActive) {
          this._i.dismiss().then(() => { resolve() })
        } else {
          resolve()
        }
      })
    }
  }
}

let alertInstance = getPresentDismissIns(AlertFactory)

export default alertInstance

import Vue from 'vue'
import getInsertPosition from '../util/getInsertPosition'
import { isString } from '../util/util'
import LoadingComponent from './loading.vue'

const Loading = Vue.extend(LoadingComponent)

// -------- function --------

function LoadingFactory (options) {
  let el = getInsertPosition('loadingPortal').appendChild(
    document.createElement('div')
  )
  if (isString(options)) {
    options = { content: options }
  }
  return new Loading({ el, propsData: options })
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
    present (options = {}) {
      return new Promise(resolve => {
        if (isString(options)) {
          options = { content: options }
        }
        let isHandled =
          !options.isH5 &&
          window.VM &&
          window.VM.platform &&
          window.VM.platform.showLoading &&
          window.VM.platform.showLoading(options)
        if (isHandled) {
          resolve()
        } else {
          console.debug('Loading 组件使用H5模式!')
          if (this._i && this._i.isActive) {
            this._i.dismiss().then(() => {
              this._i = Factory(options)
              // 自动开启
              this._i.present().then(() => {
                resolve()
              })
            })
          } else {
            this._i = Factory(options)
            // 自动开启
            this._i.present().then(() => {
              resolve()
            })
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
      return new Promise(resolve => {
        window.VM &&
          window.VM.platform &&
          window.VM.platform.hideLoading &&
          window.VM.platform.hideLoading()
        if (this._i && this._i.isActive) {
          this._i.dismiss().then(() => {
            resolve()
          })
        } else {
          resolve()
        }
      })
    }
  }
}

let loadingInstance = getPresentDismissIns(LoadingFactory)

export default loadingInstance

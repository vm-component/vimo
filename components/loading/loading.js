import Vue from 'vue'
import { getInsertPosition } from '../util/getInsertPosition'
import { isString } from '../util/util'
import loadingComponent from './loading.vue'
const Loading = Vue.extend(loadingComponent)

// -------- function --------

function LoadingFactory (options) {
  let el = getInsertPosition('loadingPortal').appendChild(document.createElement('div'))
  if (isString(options)) {
    options = {content: options}
  }
  return new Loading({el, propsData: options})
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
      let isAlipayReady = !!window.VM && !!window.VM.platform && window.VM.platform.is('alipay') && window.AlipayJSBridge && !options.isH5
      let isDingTalkReady = !!window.VM && !!window.VM.platform && window.VM.platform.is('dingtalk') && window.dd && !options.isH5
      let isDtDreamReady = !!window.VM && !!window.VM.platform && window.VM.platform.is('dtdream') && window.dd && !options.isH5

      if (isString(options)) {
        options = {content: options}
      }

      if (isAlipayReady) {
        console.info('Loading 组件使用Alipay模式!')
        return new Promise((resolve) => {
          window.AlipayJSBridge.call('showLoading', {
            delay: options.delay || 0,
            text: options.content || ''
          })
          resolve()
        })
      }

      if (isDingTalkReady) {
        console.info('Loading 组件使用DingTalk模式!')
        return new Promise((resolve) => {
          window.dd.device.notification.showPreloader({
            text: options.content || '',
            showIcon: true // 是否显示icon，默认true
          })
          resolve()
        })
      }

      if (isDtDreamReady) {
        console.info('Loading 组件使用 DtDream 模式!')
        return new Promise((resolve) => {
          window.dd.device.notification.showPreloader({
            text: options.content || '',
            showIcon: true // 是否显示icon，默认true
          })
          resolve()
        })
      }

      console.info('Loading 组件使用H5模式!')
      return new Promise((resolve) => {
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
      })
    },

    /**
     * 关闭
     * @return {Promise} - 关闭动画结束的promise
     * @private
     * */
    dismiss () {
      return new Promise((resolve) => {
        if (window.AlipayJSBridge) {
          window.AlipayJSBridge.call('hideLoading')
        }

        if (window.dd) {
          window.dd.device.notification.hidePreloader()
        }

        if (this._i && this._i.isActive) {
          this._i.dismiss().then(() => { resolve() })
        } else {
          resolve()
        }
      })
    }
  }
}

let loadingInstance = getPresentDismissIns(LoadingFactory)

export default loadingInstance

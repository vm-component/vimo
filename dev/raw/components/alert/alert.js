/**
 * Created by Hsiang on 2016/12/23.
 */
import Vue from 'vue'
import { getInsertPosition } from '../../util/getInsertPosition'
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
      let isAlipayReady = window.VM.platform.is('alipay') && window.AlipayJSBridge && !options.isH5

      /**
       * 如果是alipay环境
       * */
      if (isAlipayReady && options.buttons.length === 1) {
        console.info('Alert 组件使用Alipay模式!')
        // alert
        return new Promise((resolve) => {
          window.AlipayJSBridge.call('alert', {
            title: options.title,
            message: options.message,
            button: options.buttons[0].text || '确定'
          }, function () {
            options.buttons[0] && options.buttons[0].handler && options.buttons[0].handler()
          })
          resolve()
        })
      } else if (isAlipayReady && options.buttons.length === 2 && !options.inputs) {
        console.info('Alert 组件使用Alipay模式!')
        // confirm
        let cancelButton = {}
        let confirmButton = {}
        options.buttons.forEach((button) => {
          if (button.role === 'cancel') {
            cancelButton = button
          } else {
            confirmButton = button
          }
        })

        return new Promise((resolve) => {
          window.AlipayJSBridge.call('confirm', {
            title: options.title,
            message: options.message,
            okButton: confirmButton.text || '确定',
            cancelButton: cancelButton.text || '取消'
          }, function (result) {
            if (result.ok) {
              confirmButton.handler && confirmButton.handler()
            } else {
              cancelButton.handler && cancelButton.handler()
            }
          })
          resolve()
        })
      } else if (isAlipayReady && options.buttons.length === 2 && options.inputs.length === 1 && (options.inputs[0].type !== 'radio' || options.inputs[0].type !== 'checkbox')) {
        console.info('Alert 组件使用Alipay模式!')
        // prompt
        let cancelButton = {}
        let confirmButton = {}
        options.buttons.forEach((button) => {
          if (button.role === 'cancel') {
            cancelButton = button
          } else {
            confirmButton = button
          }
        })

        return new Promise((resolve) => {
          window.AlipayJSBridge.call('prompt', {
            title: options.title,
            message: options.message,
            okButton: confirmButton.text || '确定',
            cancelButton: cancelButton.text || '取消',
            placeholder: options.inputs[0].placeholder
          }, function (result) {
            // result.ok     bool型  用户是否点击确定
            // result.inputValue     用户输入的内容
            if (result.ok) {
              confirmButton.handler && confirmButton.handler({[options.inputs[0].name]: result.inputValue})
            } else {
              cancelButton.handler && cancelButton.handler({[options.inputs[0].name]: result.inputValue})
            }
          })

          resolve()
        })
      } else {
        /**
         * 以上如果未全部匹配则使用H5组件
         * */
        console.info('Alert 组件使用H5模式!')
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
      }
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

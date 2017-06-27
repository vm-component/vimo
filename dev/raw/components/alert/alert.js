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
      let isDingTalkReady = window.VM.platform.is('dingtalk') && window.dd && !options.isH5
      let isDtDreamReady = window.VM.platform.is('dtdream') && window.dd && !options.isH5

      if (!options.buttons) {
        options.buttons = []
      }
      // alert 模式
      if (options.buttons.length === 1) {
        if (isAlipayReady) {
          console.info('Alert 组件使用Alipay模式!')
          // alert
          return new Promise((resolve) => {
            window.AlipayJSBridge.call('alert', {
              title: options.title || '',
              message: options.message || '',
              button: options.buttons[0].text || '确定'
            }, function () {
              options.buttons[0] && options.buttons[0].handler && options.buttons[0].handler()
            })
            resolve()
          })
        }

        if (isDingTalkReady) {
          console.info('Alert 组件使用DingTalk模式!')
          // alert
          return new Promise((resolve) => {
            window.dd.device.notification.alert({
              title: options.title || '',
              message: options.message || '',
              buttonName: options.buttons[0].text || '确定',
              onSuccess () {
                options.buttons[0] && options.buttons[0].handler && options.buttons[0].handler()
              }
            })
            resolve()
          })
        }

        if (isDtDreamReady) {
          console.info('Alert 组件使用 DtDream 模式!')
          // alert
          return new Promise((resolve) => {
            window.dd.device.notification.alert({
              title: options.title || '',
              message: options.message || '',
              buttonName: options.buttons[0].text || '确定',
              onSuccess () {
                options.buttons[0] && options.buttons[0].handler && options.buttons[0].handler()
              }
            })
            resolve()
          })
        }
      }

      // confirm 模式
      if (options.buttons.length === 2 && !options.inputs) {
        let cancelButton = {}
        let confirmButton = {}
        options.buttons.forEach((button) => {
          if (button.role === 'cancel') {
            cancelButton = button
          } else {
            confirmButton = button
          }
        })

        if (isAlipayReady) {
          console.info('Confirm 组件使用Alipay模式!')
          return new Promise((resolve) => {
            window.AlipayJSBridge.call('confirm', {
              title: options.title || '',
              message: options.message || '',
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
        }

        if (isDingTalkReady) {
          console.info('Confirm 组件使用DingTalk模式!')
          return new Promise((resolve) => {
            window.dd.device.notification.confirm({
              message: options.message || '',
              title: options.title || '',
              buttonLabels: [cancelButton.text || '取消', confirmButton.text || '确定'],
              onSuccess (result) {
                // onSuccess将在点击button之后回调
                // {buttonIndex: 0 //被点击按钮的索引值，Number类型，从0开始}
                if (result.buttonIndex === 0) {
                  cancelButton.handler && cancelButton.handler()
                } else {
                  confirmButton.handler && confirmButton.handler()
                }
              }
            })
            resolve()
          })
        }

        if (isDtDreamReady) {
          console.info('Confirm 组件使用 DtDream 模式!')
          return new Promise((resolve) => {
            window.dd.device.notification.confirm({
              message: options.message || '',
              title: options.title || '',
              buttonLabels: [cancelButton.text || '取消', confirmButton.text || '确定'],
              onSuccess (result) {
                // onSuccess将在点击button之后回调
                // {buttonIndex: 0 //被点击按钮的索引值，Number类型，从0开始}
                if (result.buttonIndex === 0) {
                  cancelButton.handler && cancelButton.handler()
                } else {
                  confirmButton.handler && confirmButton.handler()
                }
              }
            })
            resolve()
          })
        }
      }

      // prompt 模式
      if (options.buttons.length === 2 && options.inputs && options.inputs.length === 1 && (options.inputs[0].type !== 'radio' || options.inputs[0].type !== 'checkbox')) {
        let cancelButton = {}
        let confirmButton = {}
        options.buttons.forEach((button) => {
          if (button.role === 'cancel') {
            cancelButton = button
          } else {
            confirmButton = button
          }
        })

        if (isAlipayReady) {
          console.info('Prompt 组件使用Alipay模式!')
          return new Promise((resolve) => {
            window.AlipayJSBridge.call('prompt', {
              title: options.title || '',
              message: options.message || '',
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
        }

        if (isDingTalkReady) {
          console.info('Prompt 组件使用DingTalk模式!')
          return new Promise((resolve) => {
            window.dd.device.notification.prompt({
              title: options.title || '',
              message: options.message || '',
              buttonLabels: [cancelButton.text || '取消', confirmButton.text || '确定'],
              onSuccess (result) {
                // onSuccess将在点击button之后回调
                // {buttonIndex: 0, value: ''}
                if (result.buttonIndex === 0) {
                  cancelButton.handler && cancelButton.handler({[options.inputs[0].name]: result.value})
                } else {
                  confirmButton.handler && confirmButton.handler({[options.inputs[0].name]: result.value})
                }
              }
            })
            resolve()
          })
        }

        if (isDtDreamReady) {
          console.info('Prompt 组件使用 DtDream 模式!')
          return new Promise((resolve) => {
            window.dd.device.notification.prompt({
              title: options.title || '',
              message: options.message || '',
              buttonLabels: [cancelButton.text || '取消', confirmButton.text || '确定'],
              onSuccess (result) {
                // onSuccess将在点击button之后回调
                // {buttonIndex: 0, value: ''}
                if (result.buttonIndex === 0) {
                  cancelButton.handler && cancelButton.handler({[options.inputs[0].name]: result.value})
                } else {
                  confirmButton.handler && confirmButton.handler({[options.inputs[0].name]: result.value})
                }
              }
            })
            resolve()
          })
        }
      }

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

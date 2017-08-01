/**
 * Created by Hsiang on 2016/12/23.
 */
import Vue from 'vue'
import { getInsertPosition } from '../../util/getInsertPosition'
import actionSheetComponent from './action-sheet.vue'
const ActionSheet = Vue.extend(actionSheetComponent)

// ---------- functions ----------

function ActionSheetFactory (options) {
  let el = getInsertPosition('sheetPortal').appendChild(document.createElement('div'))
  return new ActionSheet({el, propsData: options})
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

      // 如果btn太多, 则原生组件放不下
      if (options.buttons.length < 9) {
        let items = []
        let cancelButton = {
          text: '取消',
          role: 'cancel',
          handler: () => {}
        }
        let destructiveButtonIndex = -1
        for (let i = 0; options.buttons.length > i; i++) {
          if (options.buttons[i].role === 'cancel') {
            cancelButton = options.buttons[i]
            options.buttons.splice(i, 1)
            i--
          } else if (options.buttons[i].role === 'destructive') {
            destructiveButtonIndex = i
            items.push(options.buttons[i].text)
          } else {
            items.push(options.buttons[i].text)
          }
        }

        options.buttons.push(cancelButton)

        if (isAlipayReady) {
          console.info('ActionSheet 组件使用Alipay模式!')
          return new Promise((resolve) => {
            window.AlipayJSBridge && window.AlipayJSBridge.call('actionSheet', {
              title: options.title || '',
              btns: items || [],
              cancelBtn: cancelButton.text || '取消',
              destructiveBtnIndex: destructiveButtonIndex || -1
            }, function (res) {
              // index标示用户点击的按钮，在actionSheet中的位置，从0开始
              if (res.index !== -1) {
                options.buttons[res.index] && options.buttons[res.index].handler && options.buttons[res.index].handler()
              } else {
                cancelButton.handler && cancelButton.handler()
              }
            })

            resolve()
          })
        }

        if (isDingTalkReady) {
          console.info('ActionSheet 组件使用DingTalk模式!')
          return new Promise((resolve) => {
            window.dd.device.notification.actionSheet({
              title: options.title || '',
              cancelButton: cancelButton.text || '取消',
              otherButtons: items || [],
              onSuccess (result) {
                // onSuccess将在点击button之后回调
                // {buttonIndex: 0 //被点击按钮的索引值，Number，从0开始, 取消按钮为-1 }
                if (result.buttonIndex !== -1) {
                  options.buttons[result.buttonIndex] && options.buttons[result.buttonIndex].handler && options.buttons[result.buttonIndex].handler()
                } else {
                  cancelButton.handler && cancelButton.handler()
                }
              }
            })

            resolve()
          })
        }

        if (isDtDreamReady) {
          console.info('ActionSheet 组件使用 DtDream 模式!')
          return new Promise((resolve) => {
            window.dd.device.notification.actionSheet({
              title: options.title || '',
              cancelButton: cancelButton.text || '取消',
              otherButtons: items || [],
              onSuccess (result) {
                // onSuccess将在点击button之后回调
                // {buttonIndex: 0 //被点击按钮的索引值，Number，从0开始, 取消按钮为-1 }
                if (result.buttonIndex !== -1) {
                  options.buttons[result.buttonIndex] && options.buttons[result.buttonIndex].handler && options.buttons[result.buttonIndex].handler()
                } else {
                  cancelButton.handler && cancelButton.handler()
                }
              }
            })
            resolve()
          })
        }
      }

      console.info('ActionSheet 组件使用H5模式!')
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

let actionsheetInstance = getPresentDismissIns(ActionSheetFactory)

export default actionsheetInstance

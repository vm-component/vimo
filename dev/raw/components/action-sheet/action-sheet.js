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

      let isAlipayReady = window.VM.platform.is('alipay') && window.AlipayJSBridge

      if (isAlipayReady && options.buttons.length < 9) {
        let items = []
        let cancelButton = {}
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

        return new Promise((resolve) => {
          window.AlipayJSBridge.call('actionSheet', {
            title: options.title,
            btns: items,
            cancelBtn: cancelButton.text || '取消',
            destructiveBtnIndex: destructiveButtonIndex
          }, function (res) {
            // index标示用户点击的按钮，在actionSheet中的位置，从0开始
            if (res.index !== -1) {
              options.buttons[res.index].handler()
            } else {
              cancelButton.handler()
            }
          })

          resolve()
        })

      } else {
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

let actionsheetInstance = getPresentDismissIns(ActionSheetFactory)

export default actionsheetInstance

import Vue from 'vue'
import { getInsertPosition } from '../util/getInsertPosition'
import { isNumber, isPresent, isString } from '../util/util'
import pickerComponent from './picker.vue'
const Picker = Vue.extend(pickerComponent)

// ---------- functions ----------

function PickerFactory (options) {
  let el = getInsertPosition('sheetPortal').appendChild(document.createElement('div'))
  return new Picker({el, propsData: options})
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
      if (isAlipayReady && (options.columns.length === 1 || options.columns.length === 2)) {
        console.info('Picker 组件使用Alipay模式!')
        return new Promise((resolve) => {
          /**
           * normalize the data
           * */
          options.buttons = options.buttons.map(button => {
            if (isString(button)) {
              return {text: button}
            }
            if (button.role) {
              // role: cancel / button
              button.cssRole = `picker-toolbar-${button.role}`
            }
            return button
          })

          /**
           * clean up dat data
           * */
          options.columns = options.columns.map(column => {
            if (!isPresent(column.options)) {
              column.options = []
            }
            // column.selectedIndex = 0
            column.options = column.options.map(inputOpt => {
              // PickerColumnOption
              let opt = {
                text: '',
                value: '',
                disabled: inputOpt.disabled
              }

              if (isPresent(inputOpt)) {
                if (isString(inputOpt) || isNumber(inputOpt)) {
                  opt.text = inputOpt.toString()
                  opt.value = inputOpt
                } else {
                  opt.text = isPresent(inputOpt.text) ? inputOpt.text : inputOpt.value
                  opt.value = isPresent(inputOpt.value) ? inputOpt.value : inputOpt.text
                }
              }
              return opt
            })
            return column
          })

          let buttons = options.buttons
          let cancelBtn
          let confirmBtn
          if (buttons[0].role === 'cancel') {
            cancelBtn = buttons[0]
            confirmBtn = buttons[1]
          } else {
            cancelBtn = buttons[1]
            confirmBtn = buttons[0]
          }

          // H5 Picker返回的数据结构:
          // {"flavor1":{"text":"Mango","value":"Mango","columnIndex":0},"flavor2":{"text":"Banana","value":"Banana","columnIndex":1}}
          let columns = options.columns
          let column1 = []
          let column1SelectedIndex = 0
          let column2 = []
          let column2SelectedIndex = 0
          let columnsLength = columns.length
          for (let i = 0, len = columnsLength; len > i; i++) {
            if (i === 0) {
              column1 = []
              column1SelectedIndex = columns[0].selectedIndex || 0
              columns[0].options.forEach((option) => {
                column1.push(option.text.toString())
              })
            }
            if (i === 1) {
              column2 = []
              column2SelectedIndex = columns[1].selectedIndex || 0
              columns[1].options.forEach((option) => {
                column2.push(option.text.toString())
              })
            }
          }

          // window.AlipayJSBridge.call('beehiveOptionsPicker', {
          //   title: '出生年月选择',
          //   optionsOne: ['2014年', '2013年', '2012年', '2011年', '2010年', '2009年', '2008年'],
          //   optionsTwo: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          //   selectedOneIndex: 3,
          //   selectedTwoIndex: 5,
          //   positiveString: '11',
          //   negativeString: '22',
          // }, function (result) {
          //   alert(JSON.stringify(result))
          // })

          window.AlipayJSBridge.call('beehiveOptionsPicker', {
            title: '',
            positiveString: confirmBtn.text,
            negativeString: cancelBtn.text,
            optionsOne: column1,
            optionsTwo: column2,
            selectedOneIndex: column1SelectedIndex,
            selectedTwoIndex: column2SelectedIndex
          }, function (result) {
            // Alipay Picker 返回的数据结构:
            // result.selectedOneIndex
            // result.selectedOneOption
            // result.selectedTwoIndex
            // result.selectedTwoOption
            // 确认
            let data = {}
            if (result.selectedOneOption) {
              if (result.selectedOneOption) {
                data[columns[0].name] = {
                  'text': columns[0].options[result.selectedOneIndex].text,
                  'value': columns[0].options[result.selectedOneIndex].value,
                  'columnIndex': parseInt(result.selectedOneIndex)
                }
              }

              if (result.selectedTwoOption) {
                data[columns[1].name] = {
                  'text': columns[1].options[result.selectedTwoIndex].text,
                  'value': columns[1].options[result.selectedTwoIndex].value,
                  'columnIndex': parseInt(result.selectedTwoIndex)
                }
              }

              confirmBtn.handler && confirmBtn.handler(data)
            } else {
              // 取消
              cancelBtn.handler && cancelBtn.handler(data)
            }
          })
          resolve()
        })
      } else {
        console.info('Picker 组件使用H5模式!')
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
    },
    /**
     * 刷新
     * @private
     * */
    refresh () {
      this._i && this._i.refresh()
    },
    /**
     * 列重置
     * @private
     * */
    resetColumn (index) {
      this._i && this._i.resetColumn(index)
    }
  }
}

let methods = getPresentDismissIns(PickerFactory)
export default methods

/**
 * 说明:
 * platform.js中关于平台方法的复写
 * 当前处于平台初始化完毕阶段, window.AlipayJSBridge等私有变量存在且可用
 * */
import { isArray, isNumber, isPresent, isString } from '../util/util'

export default function (plt) {
  // 设置网络类型
  // 网络环境发生变化，可调用getNetworkType接口获取详细信息
  window.AlipayJSBridge.call('getNetworkType', (result) => {
    /**
     * result 参数
     * @param {boolean} result.networkAvailable - true              | true              | false
     * @param {boolean} result.networkInfo      - WIFI              | 3G                | NOTREACHABLE
     * @param {boolean} result.err_msg          - network_type:wifi | network_type:wwan | network_type:fail
     * @param {boolean} result.networkType      - wifi              | wwan              | fail
     * */
    plt.setNetworkType(result.networkInfo.toString().toLowerCase())
  })

  // 注册平台退出方法 `exitApp`
  plt.exitApp = () => {
    window.AlipayJSBridge.call('exitApp')
  }

  // 注册平台 setTitle 方法, 参数在platform.js中
  plt.setTitle = (titleInfo) => {
    window.AlipayJSBridge.call('setTitle', titleInfo)
  }

  // actionSheet
  plt.actionSheet = (options) => {
    if (options && options.buttons && isArray(options.buttons) && options.buttons.length < 9) {
      console.info('ActionSheet 组件使用Alipay模式!')
      let buttons = []
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
          buttons.push(options.buttons[i].text)
        } else {
          buttons.push(options.buttons[i].text)
        }
      }
      options.buttons.push(cancelButton)
      window.AlipayJSBridge.call('actionSheet', {
        title: options.title || '',
        btns: buttons || [],
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
      return true
    }
    return false
  }

  // alert
  plt.alert = (options) => {
    // alert
    if (options.buttons.length === 1) {
      console.debug('Alert 组件使用Alipay模式!')
      window.AlipayJSBridge.call('alert', {
        title: options.title || '',
        message: options.message || '',
        button: options.buttons[0].text || '确定'
      }, function () {
        options.buttons[0] && options.buttons[0].handler && options.buttons[0].handler()
      })
      return true
    }

    // Confirm
    if (options.buttons.length === 2 && !options.inputs) {
      console.debug('Confirm 组件使用Alipay模式!')
      let cancelButton = {}
      let confirmButton = {}
      options.buttons.forEach((button) => {
        if (button.role === 'cancel') {
          cancelButton = button
        } else {
          confirmButton = button
        }
      })
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
      return true
    }

    // prompt 模式
    if (options.buttons.length === 2 && options.inputs && options.inputs.length === 1 && (options.inputs[0].type !== 'radio' || options.inputs[0].type !== 'checkbox')) {
      console.info('Prompt 组件使用Alipay模式!')
      let cancelButton = {}
      let confirmButton = {}
      options.buttons.forEach((button) => {
        if (button.role === 'cancel') {
          cancelButton = button
        } else {
          confirmButton = button
        }
      })
      window.AlipayJSBridge.call('prompt', {
        title: options.title || '',
        message: options.message || '',
        okButton: confirmButton.text || '确定',
        cancelButton: cancelButton.text || '取消',
        placeholder: options.inputs[0].placeholder
      }, function (result) {
        /**
         * @param {object} result - 结果
         * @param {boolean} result.ok - 用户是否点击确定
         * @param {string} result.inputValue - 用户输入的内容
         * */
        if (result.ok) {
          confirmButton.handler && confirmButton.handler({[options.inputs[0].name]: result.inputValue})
        } else {
          cancelButton.handler && cancelButton.handler({[options.inputs[0].name]: result.inputValue})
        }
      })
      return true
    }

    return false
  }

  // loading
  plt.loading = (options) => {
    console.debug('Loading 组件使用Alipay模式!')
    window.AlipayJSBridge.call('showLoading', {
      delay: options.delay || 0,
      text: options.content || ''
    })
    return true
  }

  // showToast
  plt.showToast = (options) => {
    console.debug('Toast 组件使用Alipay模式!')
    window.ap.showToast({
      content: options.message || '',
      type: options.type || '', // toast 类型，展示相应图标，默认 none，支持 success / fail / exception / none’。其中 exception //
                                // 类型必须传文字信息
      duration: options.duration || 2000
    }, function () {
      options.onDismiss && options.onDismiss()
    })
    return true
  }

  // hideToast
  plt.hideToast = () => {
    window.ap.hideToast()
    return true
  }

  // picker
  plt.picker = (options) => {
    if (options.columns.length === 1 || options.columns.length === 2) {
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
      return true
    }
    return false
  }
}

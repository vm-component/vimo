/**
 * 说明:
 * platform.js中关于平台方法的复写
 * 当前处于平台初始化完毕阶段, window.AlipayJSBridge等私有变量存在且可用
 * 只有通用组件、不需要鉴权的组件才做平台化处理， 比如setTitle
 * */
import { isArray, isFunction, isNumber, isPresent, isString } from '../../util/type'

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

  // 监听网络变化
  window.document.addEventListener('h5NetworkChange', () => {
    window.AlipayJSBridge.call('getNetworkType', (result) => {
      plt.setNetworkType(result.networkInfo.toString().toLowerCase())
      plt._networkChangeCallbacks.forEach((fn) => {
        isFunction(fn) && fn(result.networkInfo.toString().toLowerCase())
      })
    })
  }, false)

  // 注册平台退出方法 `exitApp`
  plt.exitApp = () => {
    window.AlipayJSBridge.call('exitApp')
  }

  // actionSheet
  plt.actionSheet = (options) => {
    if (isPresent(options) && isPresent(options.buttons) && isArray(options.buttons) && options.buttons.length < 9) {
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
        title: options.title,
        btns: buttons || [],
        cancelBtn: cancelButton.text || '取消',
        destructiveBtnIndex: destructiveButtonIndex || -1
      }, function (res) {
        // index标示用户点击的按钮，在actionSheet中的位置，从0开始
        if (res.index !== -1) {
          isPresent(options.buttons[res.index]) && isFunction(options.buttons[res.index].handler) && options.buttons[res.index].handler()
        } else {
          isFunction(cancelButton.handler) && cancelButton.handler()
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
        isPresent(options.buttons[0]) && isFunction(options.buttons[0].handler) && options.buttons[0].handler()
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
          isFunction(confirmButton.handler) && confirmButton.handler()
        } else {
          isFunction(cancelButton.handler) && cancelButton.handler()
        }
      })
      return true
    }

    // prompt 模式
    if (options.buttons.length === 2 && isArray(options.inputs) && options.inputs.length === 1 && (options.inputs[0].type !== 'radio' || options.inputs[0].type !== 'checkbox')) {
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
          isFunction(confirmButton.handler) && confirmButton.handler({[options.inputs[0].name]: result.inputValue})
        } else {
          isFunction(cancelButton.handler) && cancelButton.handler({[options.inputs[0].name]: result.inputValue})
        }
      })
      return true
    }

    return false
  }

  // showLoading
  plt.showLoading = (options) => {
    console.debug('Loading:showLoading 组件使用Alipay模式!')
    window.AlipayJSBridge.call('showLoading', {
      delay: options.delay || 0,
      text: options.content || ''
    })
    return true
  }

  // hideLoading
  plt.hideLoading = () => {
    console.debug('Loading:hideLoading 组件使用Alipay模式!')
    window.AlipayJSBridge.call('hideLoading')
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
      isFunction(options.onDismiss) && options.onDismiss()
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
        column.selectedIndex = Math.max(0, parseInt(column.selectedIndex))
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

      window.AlipayJSBridge.call('beehiveOptionsPicker', {
        title: '',
        positiveString: confirmBtn.text,
        negativeString: cancelBtn.text,
        optionsOne: column1,
        optionsTwo: column2,
        selectedOneIndex: column1SelectedIndex,
        selectedTwoIndex: column2SelectedIndex
      }, function (result) {
        /**
         * @param {object} result - result
         * @param {string} result.selectedOneIndex - selectedOneIndex
         * @param {string} result.selectedOneOption - selectedOneOption
         * @param {string} result.selectedTwoIndex - selectedTwoIndex
         * @param {string} result.selectedTwoOption - selectedTwoOption
         * */
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
          isFunction(confirmBtn.handler) && confirmBtn.handler(data)
        } else {
          // 取消
          isFunction(cancelBtn.handler) && cancelBtn.handler(data)
        }
      })
      return true
    }
    return false
  }

  // 重置navbar
  plt.resetNavbarOptionButton = () => {
    window.ap.setOptionButton({
      reset: true
    })
    return true
  }

  // 设置导航条右侧按钮
  plt.setNavbarOptionButton = (buttons) => {
    // 获取导航条右侧的按钮组件集合
    let rightButtonComponents = []
    if (buttons && isArray(buttons)) {
      buttons.forEach((buttons) => {
        let position = buttons.componentInstance.getPosition()
        if (position === 'right') {
          rightButtonComponents = [].concat(rightButtonComponents, buttons.componentInstance.$children)
        }
      })
    }
    if (rightButtonComponents.length > 0) {
      // 1. 获取数据 -> title/icon(图片/base64)/color/badge/type
      let items = []
      rightButtonComponents.forEach((component) => {
        let tmp = {
          title: '', // 必填
          icon: '', // 按钮图标，支持 base64
          type: '', // 按钮图标类型，与 title、icon 三选一。支持 user / filter / search / add / settings / scan / info / help / locate
                    // / more
          color: '#000000', // '#ED4A4D'
          badge: '-1' // 按钮红色气泡，默认 -1。其中 0 表示小红点，-1 表示不显示，其他值展示出来
        }

        /**
         * rgb(rgba) -> #000
         * */
        let getColor = function (element) {
          // 找到color
          var rgb = window.getComputedStyle(element).color
          // "rgb(56, 126, 245)"
          // "rgba(56, 126, 245,0.8)"
          if (rgb) {
            rgb = rgb.replace('rgb(', '')
            rgb = rgb.replace('rgba(', '')
            rgb = rgb.replace(')', '')
            rgb = rgb.split(',').map(val => val.trim())
            let r = parseInt(rgb[0]).toString(16)
            let g = parseInt(rgb[1]).toString(16)
            let b = parseInt(rgb[2]).toString(16)
            return `#${r}${g}${b}`
          }
          return '#000000'
        }

        // 提取title
        let buttonInnerElement = component.$el.querySelector('.button-inner')
        if (buttonInnerElement && buttonInnerElement.innerHTML.trim() === buttonInnerElement.innerText.trim()) {
          tmp.title = buttonInnerElement.innerText.trim()
          tmp.color = getColor(buttonInnerElement)
        } else {
          let spanElement = buttonInnerElement.querySelector('span')
          if (spanElement) {
            tmp.title = spanElement.innerText.trim()
            tmp.color = getColor(spanElement)
          }
        }

        component.$children.forEach((child) => {
          if (child.$options._componentTag.toLowerCase() === 'icon') {
            let icon = null
            if (child.name && child.name.indexOf('icon') === 0) {
              icon = window.getComputedStyle(child.$el).backgroundImage
              if (icon) {
                icon = icon.substring(4, icon.length - 1)
                tmp.icon = icon
              }
            } else {
              tmp.type = child.name
            }
          }

          if (child.$options._componentTag.toLowerCase() === 'badge') {
            let badge = child.$el.innerText
            if (!badge) {
              badge = -1
            }
            tmp.badge = badge
          }
        })
        items.push(tmp)
      })

      // 2. 当前页面存在右侧的按钮, 如果是在平台中, 则通知平台更新状态
      if (items.length > 2) {
        console.warn('在Webview中不建议右侧的Navbar按钮超过两个, 即使超过两个在Alipay中也不显示.')
      }
      // 支持 user / filter / search / add / settings / scan / info / help / locate / more
      // 这部分可能需要放到config中
      const map = {
        'person': 'user',
        'glasses': 'filter',
        'search': 'search',
        'add': 'add',
        'settings': 'settings',
        'qr-scanner': 'scan',
        'information-circle': 'info',
        'help': 'help',
        'pin': 'locate',
        'more': 'more'
      }
      // 需要对原始的icon数据进行转义
      items.forEach((item) => {
        if (item.type) {
          if (map[item.type]) {
            item.type = map[item.type]
          } else {
            console.warn(`在Navbar右侧设置的按钮name在支付宝中没有找到对应type: ${item.type}, iconName<->type 的对应关系请参考手册!`)
          }
        }
      })

      // bugfix: 如果之前设置过两个btn, 如果下一次设置一个的话, 则会有上次设置的残留, 因此给一个空值, 且title属性必须有值
      if (items.length === 1) {
        rightButtonComponents.unshift({})
        items.unshift({
          title: ' '
        })
      }

      // 首次进入页面如果可能没有ap变量, 设置需要等待ready
      window.ap.setOptionButton({
        items: items,
        preventDefault: false,
        onClick (data) {
          // index 被点击的菜单项的索引，从0开始，从左到右
          isFunction(rightButtonComponents[data.index].clickHandler) && rightButtonComponents[data.index].clickHandler()
        },
        success () {
          console.log('Alipay:setOptionButton 设置成功')
        },
        fail () {
          console.log('Alipay:setOptionButton 设置失败')
        }
      })
    } else {
      // 导航条右侧没有按钮, 此时对平台进行重置, 因为平台的设置是惰性的.
      plt.resetNavbarOptionButton()
    }
    return true
  }

  // 显示
  plt.showNavbarOptionButton = () => {
    // window.ap.showOptionButton()
    window.AlipayJSBridge.call('showOptionMenu')
    return true
  }

  // 隐藏
  plt.hideNavbarOptionButton = () => {
    // window.ap.hideOptionButton()
    window.AlipayJSBridge.call('hideOptionMenu')
    return true
  }

  // 设置Navbar背景色
  plt.setNavbarBackgroundColor = (backgroundColor) => {
    // backgroundColor: #f8f8f8
    window.ap.setNavigationBar({
      backgroundColor: backgroundColor
    })
    return true
  }

  // 注册平台 setTitle 方法, 参数在platform.js中
  plt.setNavbarTitle = (titleInfo) => {
    if (titleInfo.title) {
      window.AlipayJSBridge.call('setTitle', {
        title: titleInfo.title || null
      })
    } else if (titleInfo.image) {
      window.AlipayJSBridge.call('setTitle', {
        image: titleInfo.image || null
      })
    }
    return true
  }

  plt.resetNavbarTitleAndColor = () => {
    window.ap.setNavigationBar({
      reset: true
    })
    return true
  }

  plt.showNavbarPopMenu = (options) => {
    window.ap.showPopMenu({
      items: options
    }, function (res) {
      let selectedItem = options[res.index]
      isFunction(selectedItem.handler) && selectedItem.handler()
    })
    return true
  }

  plt.chooseCity = (options) => {
    window.ap.chooseCity(options, options.onDismiss)
    return true
  }

  // alipay模式只能显示完整url路径的图片, 不能显示base64格式的图片
  plt.previewImage = (options) => {
    console.debug('PreviewImage 组件使用Alipay模式!')
    window.ap.previewImage({
      current: options.current || 0,
      urls: options.urls
    })
    return true
  }

  plt.pushWindow = (url) => {
    // rgba转化为10位int方法
    // // rgb(239, 239, 244) rgba(239, 239, 244, 0.8)
    // let rgb = window.getComputedStyle(document.querySelector('.ion-content')).backgroundColor
    // if (!rgb) { return false }
    // rgb = rgb.replace('rgb(', '')
    // rgb = rgb.replace('rgba(', '')
    // rgb = rgb.replace(')', '')
    // rgb = rgb.split(',').map(val => val.trim())
    //
    // // let color = rgb[0] + rgb[1] * 256 + rgb[2] * 256 * 256
    // let color = null
    // if (rgb.length === 3) {
    //   color = rgb[0] << 16 | rgb[1] << 8 | rgb[2]
    // }
    // if (rgb.length === 4) {
    //   color = rgb[3] << 24 | rgb[0] << 16 | rgb[1] << 8 | rgb[2]
    // }
    window.AlipayJSBridge.call('pushWindow', {
      url: url,
      param: {
        readTitle: true,
        showLoading: !!window.VM && !!window.VM.config && window.VM.config.getBoolean('showIndicatorWhenPageChange'),
        showOptionMenu: true
      }
    })
    return true
  }

  plt.popWindow = () => {
    window.AlipayJSBridge.call('popWindow')
    return true
  }

  plt.popTo = (index) => {
    window.AlipayJSBridge.call('popTo', {
      index: index // 回退到上一个页面，假如这个时候没有上一个页面，就会报错
    }, function (e) { // 添加回调，因为popTo不一定会成功（当前页面是唯一打开的页面的时候，会报错）
      console.error(`history.js go(): ${JSON.stringify(e)}`)
    })
    return true
  }

  plt.popToRoot = () => {
    window.AlipayJSBridge.call('popTo', {
      urlPattern: window.location.origin + window.location.pathname
    }, function (e) {
      console.error(`history.js toRoot(): ${JSON.stringify(e)}`)
    })
    return true
  }
}

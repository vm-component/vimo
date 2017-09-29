/**
 * 说明:
 * platform.js中关于平台方法的复写
 * 当前处于平台初始化完毕阶段
 * 只有通用组件、不需要鉴权的组件才做平台化处理， 比如setTitle
 * */
import { isArray, isFunction, isNumber, isPresent, isString } from '../../../../components/util/util'
import Vue from 'vue'

export default function (plt) {
  if (!window.dd) {
    console.error('设置DingTalk的驱动失败，变量 window.dd 不存在！')
    return
  }
  // 获取网络环境
  window.dd.device.connection.getNetworkType({
    onSuccess (data) {
      // { result: 'wifi' // result值: wifi 2g 3g 4g unknown none   none表示离线 }
      plt.setNetworkType(data.result.toString().toLowerCase())
    }
  })

  // 设置Navbar背景色
  plt.setNavbarBackgroundColor = () => {
    // 设置背景色需要当页重定向，因此使用体验不好，建议看钉钉文档，在url中配置背景色，下方代码方便你计算rgb的转化问题
    // if (false) {
    //   // 如果在navbar中有颜色指示的字段,
    //   // 比如: primary, secondary, danger, light, dark, 则设置webview的导航条颜色,
    //   // 其余情况不作处理
    //   let navbarElement = document.querySelector('.ion-navbar')
    //   if (!navbarElement || !navbarElement.classList) { return false }
    //   let classList = navbarElement.classList.toString() || ''
    //   let isColorLegal = false
    //   let colors = ['primary', 'secondary', 'danger', 'light', 'dark']
    //   for (let i = 0, len = colors.length; len > i; i++) {
    //     if (classList.indexOf(colors[i]) > -1) {
    //       isColorLegal = true
    //       break
    //     }
    //   }
    //   if (isColorLegal) {
    //     // 1. 获取背景色
    //     let toolbarBackgroundElement = document.querySelector('.toolbar-background')
    //     if (!toolbarBackgroundElement) { return false }
    //     var rgb = window.getComputedStyle(toolbarBackgroundElement).backgroundColor
    //     // "rgb(56, 126, 245)"
    //     // "rgba(56, 126, 245,0.8)"
    //     if (!rgb) { return false }
    //     rgb = rgb.replace('rgb(', '')
    //     rgb = rgb.replace('rgba(', '')
    //     rgb = rgb.replace(')', '')
    //     rgb = rgb.split(',').map(val => val.trim())
    //     let r = parseInt(rgb[0]).toString(16).toUpperCase()
    //     let g = parseInt(rgb[1]).toString(16).toUpperCase()
    //     let b = parseInt(rgb[2]).toString(16).toUpperCase()
    //     let a = rgb[3] ? parseInt(rgb[3]).toString(16) : 'FF'
    //     let backgroundColor = `${a}${r}${g}${b}`
    //
    //     // 2. 设置背景色
    //
    //     // dd_nav_bgcolor=FF5E97F6
    //     let ddNavBgcolor = plt.getQueryParam('dd_nav_bgcolor') || ''
    //     if (ddNavBgcolor.toString().toLowerCase() !== backgroundColor.toLowerCase()) {
    //       // alert('更换navbar的背景颜色')
    //       let search = window.location.search
    //       if (search.indexOf('?') === 0) {
    //         // "?dd_nav_bgcolor=FF5E97F6"
    //         let to = `${window.location.origin}${search}&dd_nav_bgcolor=${backgroundColor.toUpperCase()}${window.location.hash}`
    //         window.location.replace(to)
    //       } else {
    //         let to = `${window.location.origin}?dd_nav_bgcolor=${backgroundColor.toUpperCase()}${window.location.hash}`
    //         window.location.replace(to)
    //       }
    //     }
    //     return true
    //   }
    // }
    return false
  }

  // 注册平台 setTitle 方法, 参数在platform.js中
  plt.setNavbarTitle = (titleInfo) => {
    if (titleInfo.title) {
      window.dd.biz.navigation.setTitle({
        title: titleInfo.title // 控制标题文本，空字符串表示显示默认文本
      })
      return true
    }
    return false
  }

  // title 点击事件
  document.addEventListener('navTitle', function () {
    Vue.prototype.$eventBus && Vue.prototype.$eventBus.$emit('onTitleClick')
  })

  // actionSheet
  plt.actionSheet = (options) => {
    if (isPresent(options) && isPresent(options.buttons) && isArray(options.buttons) && options.buttons.length < 9) {
      console.info('ActionSheet 组件使用DingTalk模式!')
      let buttons = []
      let cancelButton = {
        text: '取消',
        role: 'cancel',
        handler: () => {}
      }
      // let destructiveButtonIndex = -1
      for (let i = 0; options.buttons.length > i; i++) {
        if (options.buttons[i].role === 'cancel') {
          cancelButton = options.buttons[i]
          options.buttons.splice(i, 1)
          i--
        } else if (options.buttons[i].role === 'destructive') {
          // destructiveButtonIndex = i
          buttons.push(options.buttons[i].text)
        } else {
          buttons.push(options.buttons[i].text)
        }
      }
      options.buttons.push(cancelButton)
      window.dd.device.notification.actionSheet({
        title: options.title,
        cancelButton: cancelButton.text || '取消',
        otherButtons: buttons || [],
        onSuccess (result) {
          // onSuccess将在点击button之后回调
          // {buttonIndex: 0 //被点击按钮的索引值，Number，从0开始, 取消按钮为-1 }
          if (result.buttonIndex !== -1) {
            isPresent(options.buttons[result.buttonIndex]) && isFunction(options.buttons[result.buttonIndex].handler) && options.buttons[result.buttonIndex].handler()
          } else {
            isFunction(cancelButton.handler) && cancelButton.handler()
          }
        }
      })
      return true
    }
    return false
  }

  // alert
  plt.alert = (options) => {
    // modal
    if (options.image) {
      console.info('modal 组件使用DingTalk模式!')
      let cancelButton = {}
      let confirmButton = {}
      options.buttons.forEach((button) => {
        if (button.role === 'cancel') {
          cancelButton = button
        } else {
          confirmButton = button
        }
      })

      window.dd.device.notification.modal({
        image: options.image,
        title: options.title,
        content: options.message,
        buttonLabels: [cancelButton.text || '取消', confirmButton.text || '确定'],
        onSuccess (result) {
          // {buttonIndex: 0 //被点击按钮的索引值，Number类型，从0开始}
          if (result.buttonIndex === 0) {
            isFunction(cancelButton.handler) && cancelButton.handler()
          } else {
            isFunction(confirmButton.handler) && confirmButton.handler()
          }
        }
      })

      return true
    }

    // alert 模式
    if (options.buttons.length === 1) {
      console.debug('Alert 组件使用DingTalk模式!')
      window.dd.device.notification.alert({
        title: options.title,
        message: options.message,
        buttonName: options.buttons[0].text || '确定',
        onSuccess () {
          isPresent(options.buttons[0]) && isFunction(options.buttons[0].handler) && options.buttons[0].handler()
        }
      })
      return true
    }

    // Confirm
    if (options.buttons.length === 2 && !options.inputs) {
      console.debug('Confirm 组件使用DingTalk模式!')
      let cancelButton = {}
      let confirmButton = {}
      options.buttons.forEach((button) => {
        if (button.role === 'cancel') {
          cancelButton = button
        } else {
          confirmButton = button
        }
      })
      window.dd.device.notification.confirm({
        message: options.message,
        title: options.title,
        buttonLabels: [cancelButton.text || '取消', confirmButton.text || '确定'],
        onSuccess (result) {
          // onSuccess将在点击button之后回调
          // {buttonIndex: 0 //被点击按钮的索引值，Number类型，从0开始}
          if (result.buttonIndex === 0) {
            isFunction(cancelButton.handler) && cancelButton.handler()
          } else {
            isFunction(confirmButton.handler) && confirmButton.handler()
          }
        }
      })
      return true
    }

    // prompt 模式
    if (options.buttons.length === 2 && options.inputs && options.inputs.length === 1 && (options.inputs[0].type !== 'radio' || options.inputs[0].type !== 'checkbox')) {
      console.info('Prompt 组件使用DingTalk模式!')
      let cancelButton = {}
      let confirmButton = {}
      options.buttons.forEach((button) => {
        if (button.role === 'cancel') {
          cancelButton = button
        } else {
          confirmButton = button
        }
      })
      window.dd.device.notification.prompt({
        title: options.title,
        message: options.message,
        buttonLabels: [cancelButton.text || '取消', confirmButton.text || '确定'],
        onSuccess (result) {
          // onSuccess将在点击button之后回调
          // {buttonIndex: 0, value: ''}
          if (result.buttonIndex === 0) {
            isFunction(cancelButton.handler) && cancelButton.handler({[options.inputs[0].name]: result.value})
          } else {
            isFunction(confirmButton.handler) && confirmButton.handler({[options.inputs[0].name]: result.value})
          }
        }
      })
      return true
    }

    return false
  }

  // showLoading
  plt.showLoading = (options) => {
    console.debug('Loading:showLoading 组件使用DingTalk模式!')
    window.dd.device.notification.showPreloader({
      text: options.content || '',
      showIcon: true // 是否显示icon，默认true
    })
    return true
  }

  // hideLoading
  plt.hideLoading = () => {
    console.debug('Loading:hideLoading 组件使用DingTalk模式!')
    window.dd.device.notification.hidePreloader()
    return true
  }

  // showToast
  plt.showToast = (options) => {
    console.debug('Toast 组件使用DingTalk模式!')
    if (options.type === 'fail') { options.type = 'error' }
    window.dd.device.notification.toast({
      icon: options.type, // icon样式，有success和error，默认为空 0.0.2
      text: options.message, // 提示信息
      duration: options.duration / 1000 || 2, // 显示持续时间，单位秒，默认按系统规范[android只有两种(<=2s >2s)]
      delay: options.delay, // 延迟显示，单位秒，默认0
      onSuccess () {
        window.setTimeout(() => {
          isFunction(options.onDismiss) && options.onDismiss()
        }, options.duration)
      }
    })
    return true
  }

  // hideToast
  plt.hideToast = () => {
    return false
  }

  plt.picker = (options) => {
    if (options.columns.length === 1) {
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
            disabled: inputOpt.disabled || false
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

      let columns = options.columns || []
      let column = columns[0]
      let columnOptions = column.options || []
      let selectedIndex = Math.max(0, column.selectedIndex)
      let selectedKey = columnOptions[selectedIndex].value
      let source = columnOptions.map((item) => {
        if (!item.disabled) {
          return {
            key: item.text,
            value: item.value
          }
        }
      })

      window.dd.biz.util.chosen({
        source: source,
        selectedKey: selectedKey, // 默认选中的key
        onSuccess (result) {
          let data = {}
          if (result) {
            data[column.name] = {
              'text': result.key,
              'value': result.value,
              'columnIndex': 0
            }
            isFunction(confirmBtn.handler) && confirmBtn.handler(data)
          } else {
            // 取消
            isFunction(cancelBtn.handler) && cancelBtn.handler(data)
          }
        },
        onFail () {}
      })
      return true
    }
    return false
  }

  // 设置导航条右侧按钮, 最多只能设置两个
  plt.setNavbarOptionButton = (buttons) => {
    // 获取导航条右侧的按钮组件集合
    let rightButtonComponents = []
    if (buttons && isArray(buttons)) {
      buttons.forEach((buttons) => {
        if (buttons.componentInstance.getPosition() === 'right') {
          rightButtonComponents = [].concat(rightButtonComponents, buttons.componentInstance.$children)
        }
      })
    }

    //  && rightButtonComponents.length <= 2
    if (rightButtonComponents.length > 0) {
      // 1. 获取数据 -> title/icon(图片/base64)/color/badge/type
      let items = []
      let id = 0
      rightButtonComponents.forEach((component) => {
        let idName = (id++).toString()
        let tmp = {
          id: idName, // 必填
          text: 'text_' + idName // 必填
        }

        // 提取 text
        let buttonInnerElement = component.$el.querySelector('.button-inner')
        if (buttonInnerElement && buttonInnerElement.innerHTML.trim() === buttonInnerElement.innerText.trim()) {
          tmp.text = buttonInnerElement.innerText.trim()
        } else {
          let spanElement = buttonInnerElement.querySelector('span')
          if (spanElement) {
            tmp.text = spanElement.innerText.trim()
          }
        }

        component.$children.forEach((child) => {
          if (child.$options._componentTag.toLowerCase() === 'icon') {
            let icon = null
            if (child.name && child.name.indexOf('icon') === 0) {
              icon = window.getComputedStyle(child.$el).backgroundImage
              if (icon) {
                icon = icon.substring(4, icon.length - 1)
                tmp.url = icon
              }
            } else {
              tmp.iconId = child.name
            }
          }
        })
        items.push(tmp)
      })

      // 2. 当前页面存在右侧的按钮, 如果是在平台中, 则通知平台更新状态
      if (items.length > 2) {
        console.warn('在Webview中不建议右侧的Navbar按钮超过两个, 即使超过两个在Alipay中也不显示.')
        items = items.splice(0, 2)
      }
      // 支持
      // 这部分可能需要放到config中
      // key: H5的Icon样式 value: DingTalk支持的Icon
      const map = {
        'trash': 'trash',
        'time': 'time',
        'settings': 'setting',
        'send': 'send',
        'qr-scanner': 'scan',

        'redo': 'reply',
        'image': 'photo',
        'person': 'personal',
        'glasses': 'org',
        'checkmark': 'ok',

        'more': 'more', // ng, 降级为将text设置为：'更多'
        'contact': 'group',
        'undo': 'forward',
        'folder': 'folder',
        'paper': 'file',

        'brush': 'edit',
        'calendar': 'calendar',
        'person-add': 'addfriend',
        'add': 'add',

        'search': 'search'
      }
      // 需要对原始的icon数据进行转义
      items.forEach((item) => {
        if (item.iconId) {
          if (map[item.iconId]) {
            item.iconId = map[item.iconId]
            if (item.iconId === 'more') {
              item.text = '更多'
            }
          } else {
            console.warn(`在Navbar右侧设置的按钮name在支付宝中没有找到对应type: ${item.iconId}, iconName<->type 的对应关系请参考手册!`)
          }
        }
      })

      // alert(JSON.stringify(items))
      window.dd.biz.navigation.setMenu({
        backgroundColor: '#000000',
        textColor: '#ffffff',
        items: items,
        onSuccess (data) {
          // {"id":"1"}
          // index 被点击的菜单项的索引，从0开始，从左到右
          let index = parseInt(data.id) || 0
          if (isFunction(rightButtonComponents[index].clickHandler)) {
            rightButtonComponents[index].clickHandler()
          }
        },
        onFail () {
          console.error('Dingtalk:setNavbarOptionButton 设置失败')
        }
      })
      return true
    } else {
      // 导航条右侧没有按钮
      return false
    }
  }

  plt.previewImage = (options) => {
    console.debug('PreviewImage 组件使用 Dingtalk 模式!')
    window.dd.biz.util.previewImage({
      current: options.urls[options.current] || '',
      urls: options.urls
    })
    return true
  }

  plt.pushWindow = (url) => {
    window.dd.biz.util.openLink({
      url: url, // 要打开链接的地址
      onFail (err) {
        console.error(`history.js _pushHistory(): ${JSON.stringify(err)}`)
      }
    })
    return true
  }

  plt.popWindow = () => {
    window.dd.biz.navigation.close()
    return true
  }

  plt.popTo = () => {
    return false
  }
}

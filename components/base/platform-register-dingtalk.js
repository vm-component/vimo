/**
 * 说明:
 * platform.js中关于平台方法的复写
 * 当前处于平台初始化完毕阶段, window.AlipayJSBridge等私有变量存在且可用
 * */
import { isArray } from '../util/util'

export default function (plt) {
  // 注册平台 setTitle 方法, 参数在platform.js中
  plt.setTitle = (titleInfo) => {
    window.dd.biz.navigation.setTitle({
      title: titleInfo.title || '' // 控制标题文本，空字符串表示显示默认文本
    })
  }

  // actionSheet
  plt.actionSheet = (options) => {
    if (options && options.buttons && isArray(options.buttons) && options.buttons.length < 9) {
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
        title: options.title || '',
        cancelButton: cancelButton.text || '取消',
        otherButtons: buttons || [],
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
      return true
    }
    return false
  }

  // alert
  plt.alert = (options) => {
    // alert 模式
    if (options.buttons.length === 1) {
      console.debug('Alert 组件使用DingTalk模式!')
      window.dd.device.notification.alert({
        title: options.title || '',
        message: options.message || '',
        buttonName: options.buttons[0].text || '确定',
        onSuccess () {
          options.buttons[0] && options.buttons[0].handler && options.buttons[0].handler()
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
      return true
    }

    return false
  }

  // loading
  plt.loading = (options) => {
    console.debug('Loading 组件使用DingTalk模式!')
    window.dd.device.notification.showPreloader({
      text: options.content || '',
      showIcon: true // 是否显示icon，默认true
    })
    return true
  }

}

/**
 * 说明:
 * platform.js中关于平台方法的复写
 * 当前处于平台初始化完毕阶段, window.AlipayJSBridge等私有变量存在且可用
 * */
export default function (plt) {
  // 注册平台 setTitle 方法, 参数在platform.js中
  plt.setTitle = (titleInfo) => {
    window.dd.biz.navigation.setTitle({
      title: titleInfo.title || '' // 控制标题文本，空字符串表示显示默认文本
    })
  }

  // actionSheet
  plt.actionSheet = (options) => {
    console.info('ActionSheet 组件使用DingTalk模式!')

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
}
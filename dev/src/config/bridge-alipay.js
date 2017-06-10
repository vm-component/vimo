/**
 * Created by Hsiang on 2017/6/5.
 */
export function alipayBridge (plt) {
  /**
   * 界面提示（6）
   * ps: toast建议使用duration关闭
   * */
  // toast
  // plt.registerMethod('toast', (options) => {
  //   window.ap.showToast({
  //     content: options.message,
  //     type: options.type,
  //     duration: options.duration || 2000
  //   }, function () {
  //     options.onDismiss()
  //   })
  // })
  // action-sheet
  // plt.registerMethod('actionSheet', (options) => {
  //   let items = []
  //   let cancelButton
  //   for (let i = 0; options.buttons.length > i; i++) {
  //     if (options.buttons[i].role !== 'cancel') {
  //       items.push(options.buttons[i].text)
  //     } else {
  //       cancelButton = options.buttons[i]
  //       options.buttons.splice(i, 1)
  //       i--
  //     }
  //   }
  //
  //   return new Promise((resolve) => {
  //     window.ap.showActionSheet({
  //       title: options.title,
  //       items: items,
  //       cancelButtonText: cancelButton.text || '取消'
  //     }, function (res) {
  //       if (res.index !== -1) {
  //         options.buttons[res.index].handler()
  //       } else {
  //         cancelButton.handler()
  //       }
  //     })
  //     resolve()
  //   })
  // })
  // // alert
  // plt.registerMethod('alert', (options) => {
  //   return new Promise((resolve) => {
  //     window.ap.alert({
  //       title: options.title,
  //       content: options.message,
  //       buttonText: options.buttons[0].text || '确定'
  //     }, function () {
  //       options.buttons[0] && options.buttons[0].handler && options.buttons[0].handler()
  //     })
  //     resolve()
  //   })
  // })
  //
  // // confirm
  // plt.registerMethod('confirm', (options) => {
  //   let cancelButton = {}
  //   let confirmButton = {}
  //   options.buttons.forEach((button) => {
  //     if (button.role === 'cancel') {
  //       cancelButton = button
  //     } else {
  //       confirmButton = button
  //     }
  //   })
  //
  //   return new Promise((resolve) => {
  //     window.ap.confirm({
  //       title: options.title,
  //       content: options.message,
  //       confirmButtonText: confirmButton.text || '确定',
  //       cancelButtonText: cancelButton.text || '取消'
  //     }, function (result) {
  //       if (result.confirm) {
  //         confirmButton.handler && confirmButton.handler()
  //       } else {
  //         cancelButton.handler && cancelButton.handler()
  //       }
  //     })
  //     resolve()
  //   })
  // })

  // loading
  // plt.registerMethod('loading', (options) => {
  //   return new Promise((resolve) => {
  //     window.ap.showLoading({
  //       delay: options.delay || 0,
  //       content: options.content || ''
  //     })
  //     resolve()
  //   })
  // })
  // // loading.dismiss
  // plt.registerMethod('loading.dismiss', () => {
  //   return new Promise((resolve) => {
  //     window.ap.hideLoading()
  //     resolve()
  //   })
  // })

  /**
   * 导航栏部分
   * */
  // 监听顶部点击
  window.ap.onTitleClick(() => {
    plt.emit('titleClick')
  })

  // 页面切换就重置导航栏的修改样式
  plt.on('onRouteChangeBefore', () => {
    window.ap.setNavigationBar({
      reset: true
    })
  })
}

/**
 * Created by Hsiang on 2017/6/5.
 */
export function h5Bridge (plt) {
  /**
   * 界面提示（6）
   * ps: toast建议使用duration关闭
   * */
  plt.registerMethod('toast', function (options) {
    let Toast = require('vimo/components/toast').Toast
    return Toast(options)
  })
  plt.registerMethod('actionSheet', function (options) {
    let ActionSheet = require('vimo/components/action-sheet').ActionSheet
    return ActionSheet.present(options)
  })
  plt.registerMethod('alert', function (options) {
    let Alert = require('vimo/components/alert').Alert
    return Alert.present(options)
  })
  plt.registerMethod('confirm', function (options) {
    let Alert = require('vimo/components/alert').Alert
    return Alert.present(options)
  })
  plt.registerMethod('loading', function (options) {
    let Loading = require('vimo/components/loading').Loading
    return Loading.present(options)
  })
  plt.registerMethod('loading.dismiss', function () {
    let Loading = require('vimo/components/loading').Loading
    return Loading.dismiss()
  })
}

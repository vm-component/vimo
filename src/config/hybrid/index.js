/**
 * Created by Hsiang on 2017/2/15.
 * @name HyBrid Init Adapter
 * @description
 * 此文件为Adapter文件, 组件调用的的传参指纹为h5的传参指纹, 这里进行等效转化
 *
 * 注册[提示]组件, 组件包括:
 * Alert/Confirm/Prompt/Preloader/Toast/ActionSheet/Vibrate
 *
 * 其余无法使用H5实现的组件则直接导出
 */

let _alert = '';

export const notification = {
  alert: _alert,
}

export const util = {}

/**
 * @param {object} options - H5的传参指纹
 * return Promise
 * */
export function actionSheet (options) {

  let title = options.title;
  let cancelButton;
  let otherButtons = [];
  let params;

  let resolveCallback = null;
  let rejectCallback = null;

  options.buttons.forEach(function (item) {
    if (item.role === 'cancel') {
      cancelButton = item.text;
    } else {
      otherButtons.push(item.text);
    }

  })

  params = {
    title: title, //标题
    cancelButton: cancelButton, //取消按钮文本
    otherButtons: otherButtons,
    onSuccess: function (result) {
      resolveCallback()
    },
    onFail: function (err) {
      rejectCallback()
    }
  }

  dd.device.notification.actionSheet(params);

  return new Promise(function (resolve, reject) {
    resolveCallback = resolve;
    rejectCallback = reject;
  })







}

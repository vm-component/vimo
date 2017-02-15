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
  alert:_alert,
}


export const util = {

}

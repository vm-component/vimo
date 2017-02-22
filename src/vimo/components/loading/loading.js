/**
 * Created by Hsiang on 2016/12/26.
 *
 * 关于实例化的方法请参考actionSheet的处理
 *
 * 单例模式实例化调用, 一次只能开启一个实例, 开启之前需要判断
 */
import Vue from 'vue';
import { urlChange } from '../../util/dom';
const loadingComponent = require('./loading.vue');
const LoadingConstructor = Vue.extend(loadingComponent);
// 自动关闭后的callback注册,loading的话只会有一个是当期打开的
let _onDidDismissCallBacks = [];
// 当前开启的序号
const LOADING_Z_INDEX = 1000;
let _loadingIndex = 0;
let _insertPosition;
let _optionsArr = [];
let _unRegisterUrlChange = null;
LoadingConstructor.prototype.present = present;
LoadingConstructor.prototype.dismiss = dismiss;

// /**
//  * 执行输入位置的_onDidDismissCallBacks内部callback
//  * @param {Number} index -  _onDidDismissCallBacks中待执行的的序列号，执行完毕后更新数组
//  * */
// function _doThisToastIndex (index) {
//   for (let i = 0, _len = _onDidDismissCallBacks.length; _len > i; i++) {
//     let _tmp = _onDidDismissCallBacks[i];
//     if (parseInt(_tmp.i) === parseInt(index)) {
//       _tmp.cb();
//       _onDidDismissCallBacks.splice(i, 1);
//       break;
//     }
//   }
// }
// /**
//  * onDidDismiss(撤销) the callback.
//  * 注册自动关闭后的回调
//  */
// LoadingConstructor.prototype.onDidDismiss = function (callback) {
//   const _this = this;
//   if (!!callback && typeof callback === 'function') {
//     // 推入缓存数组
//     _onDidDismissCallBacks.push({
//       i: _this.loadingIndex,
//       cb: callback,
//     });
//   }
// };

/**
 * 获取示例，保持单利状态
 */
function getAnInstance () {
  if (!Vue.prototype._loading) {
    Vue.prototype._loading = new LoadingConstructor({
      el: document.createElement('div')
    })
  }
  return Vue.prototype._loading
}

/**
 * 打开
 * @param {object} options - 传参指纹
 * */
function present (options = {}) {
  const _this = this;
  if (_this.isActive) {
    // _optionsArr.push(options);
    // console.log('JSON.stringify(_optionsArr)')
    // console.log(JSON.stringify(_optionsArr))

    _this.dismiss().then(function () {
      _this.present(options)
    })
    return
  }

  // 参数传入
  _this.spinner = !!options.spinner ? options.spinner.trim() : '';
  _this.content = !!options.content ? options.content.trim() : '';
  _this.cssClass = !!options.cssClass ? options.cssClass.trim() : '';
  _this.showBackdrop = !!options.showBackdrop;
  _this.dismissOnPageChange = !!options.dismissOnPageChange;

  // 重置
  _this.isActive = false;
  _this.enabled = false;


  // 插入DOM中
  _insertPosition = document.getElementById('loadingPortal');
  if (!!_insertPosition) {
    _insertPosition.appendChild(_this.$el);
  } else {
    document.body.appendChild(_this.$el);
  }

  // url切换则关闭
  if(_this.dismissOnPageChange){
    _unRegisterUrlChange = urlChange(function () {
      _this.isActive && _this.dismiss();
    });
  }

  // 是否开启backdrop
  if(_this.showBackdrop){
    _this.$backdrop.present();
  }

  return _this._present();
}

/**
 * Dismiss(撤销) instance.
 * @returns {Promise}
 */
function dismiss() {
  const _this = this;


  !!_unRegisterUrlChange && _unRegisterUrlChange();
  _unRegisterUrlChange = null;

  // 关闭backdrop
  _this.$backdrop.dismiss();


  if (_optionsArr.length > 0) {

  }

  return _this._dismiss();
}


export default getAnInstance;



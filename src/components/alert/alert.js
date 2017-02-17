/**
 * Created by Hsiang on 2016/12/23.
 * 关于设计构思参考actionSheet设计
 */

import Vue from 'vue';
import { urlChange } from '../../util/dom';
import { assert } from '../../util/util';
const alertComponent = require('./alert.vue');
const AlertConstructor = Vue.extend(alertComponent);
let _insertPosition;
let _unRegisterUrlChange;
AlertConstructor.prototype.present = present;
AlertConstructor.prototype.dismiss = dismiss;

// ---------- functions ----------

/**
 * open
 * @param {object} options
 * */
function present (options = {}) {
  const _this = this;
  if(_this.isActive){
    assert(!_this.isActive,'alert实例当前只能开启一个!')
    return
  }

  // 参数传入
  _this.title = !!options.title ? options.title.trim() : '';
  _this.subTitle = !!options.subTitle ? options.subTitle.trim() : '';
  _this.message = !!options.message ? options.message.trim() : '';
  _this.cssClass = !!options.cssClass ? options.cssClass.trim() : '';
  _this.buttons = options.buttons;
  _this.inputs = options.inputs;
  _this.enableBackdropDismiss = !!options.enableBackdropDismiss;
  _this.inputsForDispaly = [];

  // 重置
  _this.isActive = false;
  _this.enabled = false;
  _this.inputType = null;
  _this.activeId = null;
  _this.isAlertTop = false;

  // 插入DOM中
  _insertPosition = document.getElementById('alertPortal');
  if (!!_insertPosition) {
    _insertPosition.appendChild(_this.$el)
  } else {
    document.body.appendChild(_this.$el);
  }

  // url切换则关闭alert
  _unRegisterUrlChange = urlChange(function () {
    _this.isActive && _this.dismiss();
  });

  return this._present();
}

/**
 * close
 * */
function dismiss () {
  !!_unRegisterUrlChange && _unRegisterUrlChange();
  return this._dismiss();
}

/**
 * 获取示例，保持单利状态
 */
function getAnInstance () {
  if (!Vue.prototype._alert) {
    Vue.prototype._alert = new AlertConstructor({
      el: document.createElement('div')
    })
  }
  return Vue.prototype._alert
}

export default getAnInstance;

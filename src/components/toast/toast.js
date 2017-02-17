/**
 * 保持一次只能有一个Toast开启，
 * 设计一个缓存池
 * 当一个Toast结束后执行缓存池下一个
 * */
import Vue from 'vue';

let toast = require('./toast.vue');
const ToastConstructor = Vue.extend(toast);
const POSITIONS = ['top', 'middle', 'bottom'];
// 当前开启的toast序号
let _toastIndex = -1;

// 自动关闭后的callback注册
let _onDidDismissCallBacks = [];
let _insertPosition = null;
let getAnInstance = () => {
	return new ToastConstructor({
		el: document.createElement('div')
	});
};


/**
 * Present(呈现) the toast instance.
 * @returns {Promise} Returns a promise which is resolved when the transition has completed.
 */
ToastConstructor.prototype.present = function () {
	const _this = this;
	if (!!_this.duration && typeof _this.duration === 'number' && _this.duration > 0) {
		// 如果有持续时间->时间到期后如果注册了onDidDismiss回调的话
		// 保存当前的序号
		let _index = parseInt(_this.toastIndex);
		setTimeout(function () {
			_this.dismiss(_index)
		}, _this.duration);
	}
	// this为组件实例，调用组件自己的方法。
	return _this._present();
};

/**
 * Dismiss(撤销) the instance.
 * @returns {Promise} Returns a promise which is resolved when the transition has completed.
 */
ToastConstructor.prototype.dismiss = function (index) {
	const _this = this;
	return _this._dismiss().then(function () {
		if (index != null) {
			_doThisToastIndex(parseInt(index))
		} else {
			_doThisToastIndex(parseInt(_this.toastIndex))
		}
	});
};

/**
 * 执行输入位置的_onDidDismissCallBacks内部callback
 * @param {Number} index -  _onDidDismissCallBacks中待执行的的序列号，执行完毕后更新数组
 * */
function _doThisToastIndex(index) {
	for (let i = 0, _len = _onDidDismissCallBacks.length; _len > i; i++) {
		let _tmp = _onDidDismissCallBacks[i];
		if (parseInt(_tmp.i) === parseInt(index)) {
			_tmp.cb();
			_onDidDismissCallBacks.splice(i, 1);
			break;
		}
	}
}

/**
 * onDidDismiss(撤销) the callback.
 * 注册自动关闭后的回调
 */
ToastConstructor.prototype.onDidDismiss = function (callback) {
	const _this = this;
	if (!!callback && typeof callback === 'function') {
		// 推入缓存数组
		_onDidDismissCallBacks.push({
			i: _this.toastIndex,
			cb: callback,
		});
	}
};


/**
 * 使用create创建ActionSheet的实例，与IONIC保持一致
 * */
let Toast = {
	create: function (options = {}) {
		_toastIndex++;
		let instance = getAnInstance();

		// 标记当前创建的toastID
		instance.toastIndex = _toastIndex;
		instance.message = typeof options === 'string' ? options.trim() : options.message.trim();
		instance.duration = !!parseInt(options.duration) ? parseInt(options.duration) : null;

		if (!!options.position && POSITIONS.indexOf(options.position) > -1) {
			instance.position = options.position.trim();
		} else {
			instance.position = 'bottom';
		}

		instance.cssClass = !!options.cssClass ? options.cssClass.trim() : null;

		if (!!options.showCloseButton) {
			instance.duration = null;
		}
		instance.showCloseButton = !!options.showCloseButton;
		instance.closeButtonText = !!options.closeButtonText ? options.closeButtonText.trim() : '关闭';

		// TODO:这部分没做。
		instance.dismissOnPageChange = !!options.dismissOnPageChange;

		// 插入dom
    _insertPosition = document.getElementById('toastPortal');
    if (!!_insertPosition) {
      _insertPosition.appendChild(instance.$el);
    } else {
      document.body.appendChild(instance.$el);
    }



		return instance;
	}
};

export default Toast;

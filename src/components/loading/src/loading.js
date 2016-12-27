/**
 * Created by Hsiang on 2016/12/26.
 */
import Vue from 'vue';
const loading = require('./loading.vue');
const loadingConstructor = Vue.extend(loading);
// 自动关闭后的callback注册,loading的话只会有一个是当期打开的
let _onDidDismissCallBacks = [];
// 当前开启的toast序号
let _loadingIndex = -1;


/**
 * Present(呈现) the instance.
 * @returns {Promise} Returns a promise which is resolved when the transition has completed.
 */
loadingConstructor.prototype.present = function () {
	const _this = this;
	// 一个应用当前只能打开一个
	// console.log(_loadingIndex)
	// if(!!document.getElementById('ion-loading')){
	// 	alert('一次只能开启一个')
	// 	return false
	// }

	if (!!_this.duration && typeof _this.duration === 'number' && _this.duration > 0) {
		// 如果有持续时间->时间到期后如果注册了onDidDismiss回调的话
		// 保存当前的序号
		let _index = _this.loadingIndex;
		setTimeout(function () {
			_this.dismiss(parseInt(_index))
		}, _this.duration);
	}

	// this为组件实例，调用组件自己的方法。
	return _this._present();

};


/**
 * Dismiss(撤销) instance.
 * @returns {Promise} Returns a promise which is resolved when the transition has completed.
 */
loadingConstructor.prototype.dismiss = function (index) {
	const _this = this;
	return _this._dismiss().then(function () {
		if (index != null) {
			// 执行指定的index
			_doThisToastIndex(parseInt(index))
		} else {
			// 否则执行当前环境的index
			_doThisToastIndex(parseInt(_this.loadingIndex))
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
loadingConstructor.prototype.onDidDismiss = function (callback) {
	const _this = this;
	if (!!callback && typeof callback === 'function') {
		// 推入缓存数组
		_onDidDismissCallBacks.push({
			i: _this.loadingIndex,
			cb: callback,
		});
	}
};


/**
 * 获取示例，保持单利状态
 */
let getAnInstance = () => {
	return new loadingConstructor({
		el: document.createElement('div')
	})
};

/**
 * 使用create创建实例，与IONIC保持一致
 * */
let Loading = {
	create: function (options = {}) {
		_loadingIndex++;
		let instance = getAnInstance();
		// 标记当前创建的toastID
		instance.loadingIndex = _loadingIndex;
		// 参数传入
		instance.spinner = !!options.spinner ? options.spinner.trim() : '';
		instance.content = !!options.content ? options.content.trim() : '';
		instance.cssClass = !!options.cssClass ? options.cssClass.trim() : '';
		instance.showBackdrop = !!options.showBackdrop;
		instance.dismissOnPageChange = !!options.dismissOnPageChange;
		instance.duration = !!options.duration ? parseInt(options.duration) : null;

		// 插入DOM中
		document.body.appendChild(instance.$el);

		return instance;
	}
};

export default Loading;



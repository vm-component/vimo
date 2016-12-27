/**
 * Created by Hsiang on 2016/12/26.
 */
import Vue from 'vue';
const loading = require('./loading.vue');
const loadingConstructor = Vue.extend(loading);


// 实例方法挂载

/**
 * Present(呈现) the instance.
 * @returns {Promise} Returns a promise which is resolved when the transition has completed.
 */
loadingConstructor.prototype.present = function () {
	// this为组件实例，调用组件自己的方法。
	return this.present();
};

/**
 * Dismiss(撤销) instance.
 * @returns {Promise} Returns a promise which is resolved when the transition has completed.
 */
loadingConstructor.prototype.dismiss = function () {
	return this.dismiss();
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
 * 使用create创建ActionSheet的实例，与IONIC保持一致
 * */
let ActionSheet = {
	create: function (options = {}) {
		let instance = getAnInstance();
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

export default ActionSheet;



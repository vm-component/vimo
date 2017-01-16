/**
 * Created by Hsiang on 16/12/12.
 * 路由
 */
'use strict';
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter)
const routes = [
	{
		path: '/',
		name: 'index',
		component: require('./views/index.vue'),
	},
	{
		path: '/action-sheet',
		name: 'actionSheet',
		component: require('./views/action-sheet.vue'),
	},
	{
		path: '/backdrop',
		name: 'backdrop',
		component: require('./views/backdrop.vue'),
	},
	{
		path: '/button',
		name: 'button',
		component: require('./views/button.vue'),
	},
	{
		path: '/icon',
		name: 'icon',
		component: require('./views/icon.vue'),
	},
	{
		path: '/alert',
		name: 'alert',
		component: require('./views/alert.vue'),
	},
	{
		path: '/toast',
		name: 'toast',
		component: require('./views/toast.vue'),
	},
	{
		path: '/spinner',
		name: 'spinner',
		component: require('./views/spinner.vue'),
	},
	{
		path: '/loading',
		name: 'loading',
		component: require('./views/loading.vue'),
	},
	{
		path: '/toolbar',
		name: 'toolbar',
		component: require('./views/toolbar.vue'),
	},
	{
		path: '/segment',
		name: 'segment',
		component: require('./views/segment.vue'),
	},
	{
		path: '/searchbar',
		name: 'searchbar',
		component: require('./views/searchbar.vue'),
	},
	{
		path: '/list',
		name: 'list',
		component: require('./views/list.vue'),
	},
];


const router = new VueRouter({
	mode: 'hash', //  hash 模式  history 模式
	base: '/', // 默认值: "/",应用的基路径。例如，如果整个单页应用服务在 /app/ 下，然后 base 就应该设为 "/app/"。
	routes: routes // （缩写）相当于 routes: routes
});

module.exports = router

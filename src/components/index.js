/**
 * Created by Hsiang on 2017/1/13.
 * 组件注册，组件方法提取操作
 * 组件的函数及属性应该由组件自己维护，如果需要全局共享，则之后在这里提取到Vue.prototype中，挂载到全局
 */
import { App, Header, Footer } from './app'
import { Toolbar, ToolbarTitle, ToolbarButtons } from './toolbar';
import Content from './content'
import Page from './page'
import Button from './button'
import Icon from './icon'
import Nav from './nav'
import Navbar from './navbar'
import Label from './label'
import List from './list'
import { Item, ListhHeader, ItemDivider, ItemGroup } from './item'
import Note from './note'
import Thumbnail from './thumbnail'
import Avatar from './avatar'
import Badge from './badge'
import { Segment, SegmentButton } from './segment';
import Searchbar from './searchbar'
import Toggle from './toggle'
import { Card, CardContent, CardHeader, CardTitle } from './card'

import { Grid, Row, Col } from './grid'

import Spinner from './spinner'

import Menu from './menu'
import Backdrop from './backdrop'

// 实例化调用组件，传入配置参数后返回实例
import ActionSheet from './action-sheet'



const HAS_STATUS_BAR = false; // 是否显示顶部的状态bar

import defaultConfig from './defaultConfig';

module.exports = {
  version: '1.0.0',
  /**
   * 组件/插件 安装
   * @param {Object} Vue
   * @param {Object} config - 组件安装时的配置信息
   * */
  install (Vue, config) {
    /**
     * params合并
     * */
    let _config = Object.assign({}, defaultConfig, config);
    console.debug('_config')
    console.debug(_config)

    /**
     * 全局事件总线（各个组件共用）
     * */
    let _eventBus = new Vue();
    // requestAnimationFrame
    let _raf = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

    // 全局注册组件
    Vue.component(App.name, App);
    Vue.component(Header.name, Header);
    Vue.component(Footer.name, Footer);
    Vue.component(Content.name, Content);
    Vue.component(Page.name, Page);
    Vue.component(Toolbar.name, Toolbar);
    Vue.component(ToolbarTitle.name, ToolbarTitle);
    Vue.component(ToolbarButtons.name, ToolbarButtons);
    Vue.component(Button.name, Button);
    Vue.component(Icon.name, Icon);
    Vue.component(Nav.name, Nav);
    Vue.component(Navbar.name, Navbar);
    Vue.component(List.name, List);
    Vue.component(Label.name, Label);
    Vue.component(Item.name, Item);
    Vue.component(ListhHeader.name, ListhHeader);
    Vue.component(ItemDivider.name, ItemDivider);
    Vue.component(ItemGroup.name, ItemGroup);
    Vue.component(Note.name, Note);
    Vue.component(Thumbnail.name, Thumbnail);
    Vue.component(Avatar.name, Avatar);
    Vue.component(Badge.name, Badge);
    Vue.component(Segment.name, Segment);
    Vue.component(SegmentButton.name, SegmentButton);
    Vue.component(Searchbar.name, Searchbar);
    Vue.component(Toggle.name, Toggle);
    Vue.component(Card.name, Card);
    Vue.component(CardContent.name, CardContent);
    Vue.component(CardHeader.name, CardHeader);
    Vue.component(CardTitle.name, CardTitle);
    Vue.component(Grid.name, Grid);
    Vue.component(Row.name, Row);
    Vue.component(Col.name, Col);

    Vue.component(Menu.name, Menu);
    Vue.component(Backdrop.name, Backdrop);
    Vue.component(Spinner.name, Spinner);


    // 实例化调用，传入options参数返回实例
    Vue.prototype.$ActionSheet = ActionSheet;


    // Vue.prototype.$componentIns = {
    //   $app: null, //
    //   $page: null,
    //   $header: null,
    //   $title: null,
    //   $footer: null,
    //   $nav: null,
    //   $content: null,
    //   $menus: {},
    // };

    // ----------- 全局 方法/属性 定义 -----------

    // 组件配置参数
    Vue.prototype.$config = _config;
    // 全局事件总线（各个组件共用）中央事件总线
    Vue.prototype.$eventBus = _eventBus;
    // requestAnimationFrame
    Vue.prototype.$raf = _raf;
    // 是否有stateBar的开关
    Vue.prototype.$hasStatusBar = HAS_STATUS_BAR;

    // -------- 提取组件公共方法到$root中 -----------
    // -------- 只有如下基础组件：
    // -------- app/title/header/footer/content/nav -----------
    // /**
    //  * ion-app组件
    //  * */
    // _eventBus.$on('$appReady', function (instance) {
    //   console.info('$appReady')
    //
    //   // Vue.prototype.$componentIns.$app = instance;
    //   // 提取
    //   // 获取弹出层挂载点
    //   // Vue.prototype.$getPortal = instance.getPortal;
    //   // 设置页面是否能点触的状态
    //   // Vue.prototype.$setEnabled = instance.setEnabled;
    //   // 设置页面滚动状态
    //   // Vue.prototype.$disableScroll = instance.disableScroll;
    //
    //
    // });
    // /**
    //  * ion-title组件, 在ion-page下的ion-title，排除ion-menu
    //  * */
    // _eventBus.$on('$titleReady', function (instance) {
    //   console.info('$titleReady')
    //   // Vue.prototype.$componentIns.$title = instance;
    //   // 提取
    //   // 设置title
    //   // Vue.prototype.$setTitle = instance.setTitle;
    //   // 获取title
    //   // Vue.prototype.$getTitle = instance.getTitle;
    // });
    // /**
    //  * ion-header组件
    //  * */
    // // Vue.prototype.$hasHeaderBar = false;
    // _eventBus.$on('$headerReady', function (instance) {
    //   console.info('$headerReady');
    //   Vue.prototype.$componentIns.$header = instance;
    //   // Vue.prototype.$hasHeaderBar = true;
    // });
    // /**
    //  * ion-footer组件
    //  * */
    // // Vue.prototype.$hasFooterBar = false;
    // _eventBus.$on('$footerReady', function (instance) {
    //   console.info('$footerReady');
    //   Vue.prototype.$componentIns.$footer = instance;
    //   // Vue.prototype.$hasFooterBar = true;
    // });
    // /**
    //  * ion-content组件
    //  * */
    // _eventBus.$on('$contentReady', function (instance) {
    //   console.info('$contentReady');
    //   // Vue.prototype.$componentIns.$content = instance;
    //
    //   // scroll-content的句柄，用于获取scroll-content的操作
    //   // Vue.prototype.$fixedContent = null;
    //   // Vue.prototype.$scrollContent = null;
    //   // // 获取content的尺寸
    //   // Vue.prototype.$contentDimensions = null;
    //   // // 获取scroll的尺寸
    //   // Vue.prototype.$scrollDimensions = null;
    //
    //   // 重新计算content的尺寸，比如动态添加了header或者footer
    //   // Vue.prototype.$resize = instance.resize;
    //   // Vue.prototype.$scrollTo = instance.scrollTo;
    //   // Vue.prototype.$scrollToTop = instance.scrollToTop;
    //   // Vue.prototype.$scrollToBottom = instance.scrollToBottom;
    //   // Vue.prototype.$keyBoardOpen = instance.keyBoardOpen;
    //   // Vue.prototype.$keyBoardClose = instance.keyBoardClose;
    //
    //   // Vue.prototype.$addScrollPadding = instance.addScrollPadding;
    //   // Vue.prototype.$clearScrollPaddingFocusOut = instance.clearScrollPaddingFocusOut;
    // });

    // /**
    //  * ion-menu组件
    //  * */
    // Vue.prototype.$hasFooterBar = false;
    // _eventBus.$on('$menuReady', function (instance) {
    //   console.info('$menuReady');
    //   // 记录当前的menu开启的id，如果有值，代表当前Menu正在开启；
    //   Vue.prototype.$menu = {
    //     id: '',
    //     close: null,
    //     open: null,
    //     toggle: null,
    //   };
    //   // Vue.prototype.$menu.id = null;
    //   // Vue.prototype.$currentMenuId = null;
    //   if (!Vue.prototype.$componentIns.$menus[instance.id]) {
    //     Vue.prototype.$componentIns.$menus[instance.id] = instance;
    //     // console.debug(Vue.prototype.$componentIns.$menus)
    //     // 组件中注册的函数，但是其执行与组件当前状态无关。
    //     Vue.prototype.$menu.open = instance.openMenu;
    //     Vue.prototype.$menu.close = instance.closeMenu;
    //     Vue.prototype.$menu.toggle = instance.toggleMenu;
    //   }
    //
    // });

    // 后退操作
    // Vue.prototype.$goBack = _goBack;
    // 返回主视图(返回主页)
    // Vue.prototype.$goRoot = _goRoot;
    // 滚动到
    // Vue.prototype.$scrollTo = _scrollTo;
    // 滚动到底部
    // Vue.prototype.$scrollToBottom = _scrollToBottom;

    // -------- functions --------

    /**
     * 后退操作
     * 以为在webview中的后退含义和app的后退含义不一致
     * @param {Number} n - 后退的次数，如果过大，则回到首页
     * */
    // function _goBack (n) {
    //   window.$router.go(-n);
    // }

    /**
     * 返回首页
     * 找到root视图，内有root则插入root然后后退到root
     * */
    // function _goRoot () {
    //
    // }

  }
}













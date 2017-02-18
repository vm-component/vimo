/**
 * Created by Hsiang on 2017/1/13.
 * 组件注册，组件方法提取操作
 * 组件的函数及属性应该由组件自己维护，如果需要全局共享，则之后在这里提取到Vue.prototype中，挂载到全局
 */

// ------- Base
import { App, Header, Footer } from './app'
import Content from './content'
import Page from './page'

import Button from './button'
import Icon from './icon'
import Nav from './nav'
import Navbar from './navbar'

// ------- List Item
import List from './list'
import { Item, ListhHeader, ItemDivider, ItemGroup, ItemSliding, ItemOptions } from './item'
import Note from './note'
import Thumbnail from './thumbnail'
import Avatar from './avatar'
import Label from './label'
// -----------------

// ------- Input Form
import Toggle from './toggle'

// ------- Bar
import Searchbar from './searchbar'
import { Toolbar, ToolbarTitle, ToolbarButtons } from './toolbar';


// ------- Grid
import { Grid, Row, Col } from './grid'

//Card
import { Card, CardContent, CardHeader, CardTitle } from './card'


import Badge from './badge'
import { Segment, SegmentButton } from './segment';




import Spinner from './spinner'

import Menu from './menu'
import {BackdropComponent,BackdropInstance} from './backdrop'

// 实例化调用组件，传入配置参数后返回实例
import getActionSheetInstance from './action-sheet'
import getAlertInstance from './alert'
import getLoadingInstance from './loading'
import prepareToast from './toast'

const HAS_STATUS_BAR = false; // 是否显示顶部的状态bar

import defaultConfig from './defaultConfig';

import {eventBus} from '../util/events'
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
    let _eventBus = eventBus;
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

    //List Item
    Vue.component(List.name, List);
    Vue.component(Label.name, Label);
    Vue.component(Item.name, Item);
    Vue.component(ListhHeader.name, ListhHeader);
    Vue.component(ItemDivider.name, ItemDivider);
    Vue.component(ItemGroup.name, ItemGroup);
    Vue.component(ItemSliding.name, ItemSliding);
    Vue.component(ItemOptions.name, ItemOptions);
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
    Vue.component(BackdropComponent.name, BackdropComponent);
    Vue.component(Spinner.name, Spinner);



    // ----------- 全局 方法/属性 定义 -----------

    // 组件配置参数

    Vue.prototype.$config = window.VM.config || null;
    // 全局事件总线（各个组件共用）中央事件总线
    Vue.prototype.$eventBus = _eventBus;
    // requestAnimationFrame
    Vue.prototype.$raf = _raf;
    // 是否有stateBar的开关
    Vue.prototype.$hasStatusBar = HAS_STATUS_BAR;

    // 实例化调用，传入options参数返回实例,
    // 挂在点的获取需要等待app组件mounted
    _eventBus.$on('app:ready',function () {
      Vue.prototype.$actionSheet = getActionSheetInstance();
      Vue.prototype.$alert = getAlertInstance();
      Vue.prototype.$loading = getLoadingInstance();
      Vue.prototype.$backdrop = BackdropInstance();

      Vue.prototype.$toast = prepareToast();

    });


    // // --- 监听对body的点击
    // document.body.addEventListener('click',function () {
    //   // 如果点击则全局发送item-sliding组件关机事件
    //   _eventBus.$emit('ionSlidingClose')
    // })



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













/**
 * Created by Hsiang on 2017/1/13.
 *
 * 1. 平台及配置初始化, 并挂在到VM上面(platform/config) - VimoInstall.js
 * 2. 组件初始化及注册
 * 3. 页面父组件挂载到Vue.prototype上, 子组件挂载到页面上下文中(context)
 *
 * @typedef {Object} Position
 * {
 *    fn?: Function;
 *    priority?: number;
 *    longitude:	POI的经度，高德坐标
 *    latitude:	POI的纬度，高德坐标
 *    title:	POI的名称
 *    province:	POI所在省会，可能为空
 *    provinceCode:	POI所在省会编码，，可能为空
 *    city:	POI所在城市，可能为空
 *    cityCode:	POI所在城市的编码，可能为空
 *    adName:	POI所在区，可能为空
 *    adCode:	POI所在区的编码，可能为空
 *    postCode:	POI的邮编，可能为空
 *    snippet:	POI的街道地址，可能为空
 * }
 *
 */

// ------- Base
import { App, Header, Footer } from './app'
import Content from './content'
import Page from './page'
import Nav from './nav'
import { NavContorller } from "./nav-controller"
import Navbar from './navbar'
import { Toolbar, ToolbarTitle, ToolbarButtons } from './toolbar';
import { Grid, Row, Col } from './grid'
import Button from './button'
import Icon from './icon'

// ------- List Item
import List from './list'
import { Item, ListhHeader, ItemDivider, ItemGroup, ItemSliding, ItemOptions } from './item'
import Note from './note'
import Thumbnail from './thumbnail'
import Avatar from './avatar'
import Label from './label'

// ------- Input Form
import { Input, Textarea } from './input'
import Toggle from './toggle'
import Range from './range'
import Searchbar from './searchbar'

// ------- Card
import { Card, CardContent, CardHeader, CardTitle } from './card'

//  ------- Other
import Badge from './badge'
import Spinner from './spinner'
import { Fab, Fabs } from './fab'
import Img from './img'

// ------- Menu
import Menu from './menu'

// ------- tab/Segment
import { Tabs, Tab } from './tabs'
import { Segment, SegmentButton } from './segment'


// ------- 实例化调用组件，传入配置参数后返回实例
import getActionSheetInstance from './action-sheet'
import getAlertInstance from './alert'
import getLoadingInstance from './loading'
import prepareToast from './toast'
import prepareModal from './modal'
import getPopoverInstance from './popover'
import { BackdropComponent, BackdropInstance } from './backdrop'

// ------- 滚动刷新组件
import { InfiniteScroll, InfiniteScrollContent } from './infinite-scroll'
import { Refresher, RefresherContent } from './refresher'

// ------- slides组件
import { Slides, Slide } from './slides'

// ------- 自定义组件
import SnakeBox from './snake-box'
import Ghost from './ghostbtn'
import FloatTop from './floattop'

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
    const _noop = function () {};

    /**
     * 全局事件总线（各个组件共用）
     * */
    let _eventBus = new Vue();
    // requestAnimationFrame
    let _raf = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

    // ----------- 全局 方法/属性 定义 -----------

    // 组件配置参数
    Vue.prototype.$config = window.VM.config || null;
    Vue.prototype.$platform = window.VM.platform || null;

    // 全局事件总线（各个组件共用）中央事件总线
    Vue.prototype.$eventBus = _eventBus;
    // 内建历史记录, 监听route变化并发出Nav切换事件
    Vue.prototype.$nav = new NavContorller(Vue);

    // requestAnimationFrame
    Vue.prototype.$raf = _raf;

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
    Vue.component(Ghost.name, Ghost);
    Vue.component(FloatTop.name, FloatTop);

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

    // Form
    Vue.component(Input.name, Input);
    Vue.component(Textarea.name, Textarea);
    Vue.component(Toggle.name, Toggle);
    Vue.component(Range.name, Range);

    Vue.component(Card.name, Card);
    Vue.component(CardContent.name, CardContent);
    Vue.component(CardHeader.name, CardHeader);
    Vue.component(CardTitle.name, CardTitle);
    Vue.component(Grid.name, Grid);
    Vue.component(Row.name, Row);
    Vue.component(Col.name, Col);

    Vue.component(Tabs.name, Tabs);
    Vue.component(Tab.name, Tab);
    Vue.component(Fabs.name, Fabs);
    Vue.component(Fab.name, Fab);

    Vue.component(Img.name, Img);

    // 上拉下拉刷新
    Vue.component(InfiniteScroll.name, InfiniteScroll);
    Vue.component(InfiniteScrollContent.name, InfiniteScrollContent);
    Vue.component(Refresher.name, Refresher);
    Vue.component(RefresherContent.name, RefresherContent);

    Vue.component(Menu.name, Menu);
    Vue.component(BackdropComponent.name, BackdropComponent);
    Vue.component(Spinner.name, Spinner);

    Vue.component(SnakeBox.name, SnakeBox);

    Vue.component(Slides.name, Slides);
    Vue.component(Slide.name, Slide);

    // 判断当前Platform是否为HyBrid, 判断初始化的组件形式
    if (!!window['VM'] && !!window['VM']['hybrid']) {
      console.debug('Vue.install: 使用HyBrid组件')
      // 下方权利, 由HyBrid自己完成初始化
      !!window['VM']['hybrid'] && window['VM']['hybrid'].install(Vue, config)
    } else {
      // 弹出层组件需要知道App组的挂载点, 故需要等待App的ready
      _eventBus.$on('app:ready', function () {
        console.debug('Vue.install: 使用H5组件')
        // Notification
        Vue.prototype.$actionSheet = getActionSheetInstance();
        Vue.prototype.$alert = getAlertInstance();
        Vue.prototype.$loading = getLoadingInstance();
        Vue.prototype.$backdrop = BackdropInstance();
        Vue.prototype.$toast = prepareToast();
        Vue.prototype.$popover = getPopoverInstance();
        Vue.prototype.$modal = prepareModal();
       
        
        /**
         * @name 地图定位
         * @param {Number} latitude -
         * @param {Number} longitude -
         * @param {function} onSuccess - {Position} 地理信息结构体
         * @param {function} onFail
         * */
        Vue.prototype.$getLocation = _noop; // 这两个方法的区分意义??
        /**
         * @name  POI 搜索
         * @param {Number} latitude -
         * @param {Number} longitude -
         * @param {Number} scope -
         * @param {function} onSuccess - {Position} 地理信息结构体
         * @param {function} onFail
         * */
        Vue.prototype.$getPOI = _noop; // ?这个名字怪怪的

        /**
         * @name 判断是否安装app
         * @param {array} apps - iOS:应用scheme;Android:应用包名
         * @param {function} onSuccess - installed - ['taobao', 'tmall'] //iOS:应用scheme;Android:应用包名
         * @param {function} onFail -
         * */
        Vue.prototype.$checkInstalledApps = _noop;

        /**
         * @name 启动app
         * @param {string} app - iOS:应用scheme;Android:应用包名
         * @param {string} activity - 仅限Android，打开指定Activity，可不传。如果为空，就打开App的Main入口Activity
         * @param {function} onSuccess
         * @param {function} onFail
         * */
        Vue.prototype.$launchApp = _noop; //启动app

        /**
         * @name 获取当前网络类型
         * @param {function} onSuccess - result: 'wifi' // result值: wifi 2g 3g 4g unknown none   none表示离线
         * @param {function} onFail
         * */
        Vue.prototype.$getNetworkType = _noop; // 获取网络类型

        /**
         * @name 获取当前网络类型
         * @param {string} phoneNumber
         * @param {function} onSuccess - result: 'wifi' // result值: wifi 2g 3g 4g unknown none   none表示离线
         * @param {function} onFail
         * */
        Vue.prototype.$call = _noop; //  打电话

        /**
         * @name 获取当前网络类型
         * @param {string} type - type为qrCode或者barCode
         * @param {function} onSuccess -  { 'text': String }
         * @param {function} onFail
         * */
        Vue.prototype.$scan = _noop; //  打电话

        /**
         * @name 设置导航栏颜色
         * @param {string} color - #FFFFFF
         * */
        Vue.prototype.$setNavBgColor = _noop; //  打电话

        // TODO: 继续补充空函数

      });
    }

  }
}













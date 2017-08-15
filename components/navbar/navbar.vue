<template>
    <div class="ion-navbar toolbar"
         :class="[modeClass,colorClass,{'statusbar-padding':statusbarPadding}]"
         v-show="!hideNavBar">
        <div class="toolbar-background" ref="toolbarBackground"
             :class="[toolbarBackgroundClass]"></div>

        <!--first-->
        <div class="toolbar-content" :class="[toolbarContentClass]">
            <slot></slot>
        </div>

        <!--show-back-button-->
        <Button @click="backButtonClickHandler" role="bar-button" class="back-button"
                :class="[backButtonClass,{'show-back-button':!hideBackButton}]" v-if="!hideBb">
            <Icon class="back-button-icon" :class="[backButtonIconClass]" :name="bbIcon"></Icon>
            <span class="back-button-text" :class="[backButtonTextClass]">{{backText}}</span>
        </Button>

        <!--buttons/menuToggle-->
        <slot name="buttons"></slot>
    </div>
</template>
<style lang="less">
    @import "../toolbar/toolbar";
    @import "../toolbar/toolbar.ios.less";
    @import "../toolbar/toolbar.md.less";
    @import "../toolbar/toolbar-button";
</style>
<script type="text/javascript">
  /**
   * @component Navbar
   * @description
   *
   * ## 导航条 / Navbar
   *
   * ### 特别之处
   *
   * 导航条和工具条的属性类似, 只是导航条多了后退按钮, 且在当前业务页面中, **Navbar有且必须只有一个**, 也只有这个组件中的Title组件才有控制`document.title`的能力.
   *
   * Navbar一般是放在Header组件中使用, 并且在Navbar组件中经常和Title组件组合使用.
   *
   * 因为Navbar和Toolbar很相似, 其位置属性完全一样. 包括: **start/end/left/end**
   *
   * ### 后退按钮显示时机
   * 因为Vimo内建导航历史记录, 当历史记录中有上一条历史时显示后退按钮,反之, 不显示后退按钮. 当然也可以通过`hideBackButton`属性控制
   *
   * ### 点击后退
   *
   * 点击后退执行的是 `window.history.back()` 方法, 这个和点击后退按钮的效果是一样的.
   *
   * ### 如何引入
   *
   * ```
   * // 引入
   * import { Navbar } from 'vimo/components/navbar'
   * // 安装
   * Vue.component(Navbar.name, Navbar)
   * ```
   *
   * ### 如果在支付宝中
   *
   * 如果在支付宝中, 对Navbar右侧设置按钮就能同步设置到支付宝的顶部导航栏而不需要其他操作. 路由切换后支付宝导航条也切换状态. 前提是必须在每页设置Navbar组件.
   *
   * 因为支付宝中的iconType在H5中并没有一一对应的iconName(目前使用的是ionicon图标库), 因此, 对于支付宝默认支持的icon, 这里有一一对应的关系, 即在H5中的ICON组件中设置了左侧的这些名称, 在支付宝中就像是右侧的typeName
   *
   * H5命名               | 支付宝命名
   * ---------------------|-------------
   * 'person'             | 'user',
   * 'glasses'            | 'filter',
   * 'search'             | 'search',
   * 'add'                | 'add',
   * 'settings'           | 'settings',
   * 'qr-scanner'         | 'scan',
   * 'information-circle' | 'info',
   * 'help'               | 'help',
   * 'pin'                | 'locate',
   * 'more'               | 'more'
   *
   * 正确设置导航条参考请参考下面代码, 强烈建议按钮设置不超过两个
   *
   * ```
   * <Buttons right slot="buttons">
   *     <Button @click="$menus.open('menu')" role="bar-button">
   *          WITH OUT SPAN
   *     </Button>
   *     <Button @click="$menus.open('menu')" role="bar-button">
   *          <span>WITH SPAN</span>
   *     </Button>
   *     <Button @click="$menus.open('menu')" color="dark" role="bar-button">
   *          <Icon name="icon-vue"></Icon>
   *          <Badge>0</Badge>
   *     </Button>
   *     <Button @click="$menus.open('menu')" color="dark" role="bar-button">
   *          <Icon name="qr-scanner"></Icon>
   *          <Badge>12</Badge>
   *     </Button>
   * </Buttons>
   * ```
   *
   * 并不是所有的Alipya的JSSDK都有H5对应的方法, 因为有些JSSDK不常用或者H5无法实现或者即使实现在业务中使用还不是单独设置简便, 因此Vimo目前实现的功能如下:
   *
   * - 在Navbar组件中Title组件能同步更新WebView中的Title
   * - 在Navbar组件中的背景色(backgroundColor, 前提是使用: primary, secondary, danger, light, dark 设置的颜色)能同步更新到WebView中, 如果页面切换则重置设置.
   * - 对Navbar组件调用showPopMenu方法, 可在右侧显示popover组件, 如果实在WebView中, 则使用原生方法(Alipay), PS: 因为是弹出层组件, 所以是方法调用开启.
   * - 监听Title组件的'onTitleClick'事件, 可以监听点击Title文本的事件, 如果是在WebView中, 则触发原生事件, 页面将不干扰
   *
   *
   * ### 关于导航条在Hybrid下的表现
   *
   * 程序运行初期会从当前DOM中读取导航条参数, 比如右侧按钮个数/类型/badge/颜色/导航条背景色等信息, 之后将信息同步给我们的Hybrid层, 进而设置Hybrid的导航条, 这里需要对函数功能进行介绍:
   *
   * - showOptionButton: 控制Hybrid层导航条右侧按钮组显示
   * - hideOptionButton: 控制Hybrid层导航条右侧按钮组隐藏
   * - reset: 重置整个Hybrid层的导航条
   * - showPopMenu: 显示右上角的PopMenu菜单, 一般通过导航条右上角按钮触发
   *
   * ### 内部方法
   * - 导航条右侧按钮组
   * - 导航条title/image/背景色
   * - 导航条右侧popMenu显示
   *
   *
   * ### 注意点
   *
   * ** 不建议在keepAlive模式使用  **
   *
   * 因为Navbar组件在此模式下只执行最后一个页面的Navbar更新, 如果页面已经打开过, 则会导致样式状态问题. 解决办法是在`activated`钩子中执行Navbar组件的`initWhenInWebview`方法, 这个是内部方法, 表示重新初始化Navbar组件.
   *
   * @see component:Toolbar
   * @see History
   *
   * @props {String} [mode=ios] - 模式
   * @props {String} [color] - 颜色
   * @props {Boolean} [hideBackButton=false] - 是否显示后退按钮
   *
   * @slot [空] 作为内容, 比如Title/Searchbar/Segment放置的位置
   * @slot [buttons] 按钮组, 别忘记加[left]/[right]/[start]/[end]属性标记位置
   *
   * @usage
   * <template>
   *  <Page>
   *    <Header>
   *      <Navbar :hideBackButton="false" color="danger">
   *        <Title>Demo</Title>
   *        <Button left icon-only role="bar-button" menutoggle slot="buttons">
   *            <Icon class="icon" name="menu"></Icon>
   *        </Button>
   *      <Navbar>
   *    </Header>
   *    <Content>
   *      <h1>这里是内容</h1>
   *    </Content>
   *  </Page>
   * </template>
   * */
  import { Popover } from '../popover/index'
  import { Button } from '../button'
  import { Icon } from '../icon'
  import { isArray, isString, isFunction } from '../util/util'
  import menuOptionsComponent from './menu-options.vue'

  export default {
    name: 'Navbar',
    data () {
      return {
        hideRightButtons: false,

        hideBb: false,
        bbIcon: this.$config && this.$config.get('backButtonIcon', 'arrow-back') || 'arrow-back',
        backText: this.$config && this.$config.get('backButtonText', '返回') || '返回',
        hideNavBar: this.$config && this.$config.getBoolean('hideNavBar', false),
        statusbarPadding: this.$config && this.$config.getBoolean('statusbarPadding', false) // 是否有statusbar的padding
      }
    },
    props: {
      mode: {
        type: String,
        default () { return this.$config && this.$config.get('mode', 'ios') || 'ios' }
      },
      /**
       * 按钮color：primary、secondary、danger、light、dark
       * */
      color: String,
      /**
       * 是否显示后退按钮
       * */
      hideBackButton: [Boolean]
    },
    computed: {
      modeClass () {
        return `toolbar-${this.mode}`
      },
      // 颜色
      colorClass () {
        return this.color ? (`toolbar-${this.mode}-${this.color}`) : ''
      },
      backButtonClass () {
        return `back-button-${this.mode}`
      },
      backButtonTextClass () {
        return `back-button-text-${this.mode}`
      },
      backButtonIconClass () {
        return `back-button-icon-${this.mode}`
      },
      toolbarBackgroundClass () {
        return `toolbar-background-${this.mode}`
      },
      toolbarContentClass () {
        return `toolbar-content-${this.mode}`
      },
      toolbarBackgroundElement () {
        return this.$refs.toolbarBackground
      }
    },
    methods: {
      /**
       * @function showOptionButton
       * @description
       * 设置导航条右侧按钮显示(只是对alipay平台的), dingtalk通过url改变
       * */
      showOptionButton () {
        this.$platform.showNavbarOptionButton()
      },
      /**
       * @function hideOptionButton
       * @description
       * 设置导航条右侧按钮隐藏(只是对alipay平台的), dingtalk通过url改变
       * */
      hideOptionButton () {
        this.$platform.hideNavbarOptionButton()
      },
      /**
       * @function showPopMenu
       * @description
       * 设置右侧弹出的按钮菜单, 右侧可以没有按钮, 但是pop固定在右上角
       * @param {Array} dataList - menu的数据数组
       * @return {Promise}
       * */
      showPopMenu (dataList) {
        let tmps = []
        if (dataList && isArray(dataList)) {
          dataList.forEach((item) => {
            if (isString(item)) {
              // ['菜单一', '菜单二', '菜单三']
              tmps.push({
                title: item
              })
            } else {
              // [{title:'1'}, {title:'2'}, {title:'3'},]
              tmps.push(item)
            }
          })
        }

        return new Promise((resolve) => {
          let isHandled = this.$platform.showNavbarPopMenu(tmps)
          // 显示navbar最右侧的按钮
          if (isHandled) {
            resolve()
          } else {
            Popover.present({
              ev: {
                target: window.document.getElementById('rightButtonPlaceholder') || null
              }, // 事件
              cssClass: 'popMenu',
              component: menuOptionsComponent,   // 传入组件
              data: {
                menusData: tmps  // 传入数据, 内部通过`this.$options.$data`获取这个data
              }
            }).then(() => { resolve() })
          }
        })
      },

      /**
       * @function reset
       * @description
       * 重置之前的样式设置
       * */
      reset () {
        this.$platform.resetNavbarTitleAndColor()
        this.$platform.resetNavbarOptionButton()
      },

      // -------- private --------

      /**
       * @private
       * */
      backButtonClickHandler ($event) {
        $event.preventDefault()
        $event.stopPropagation()
        window.history.back()
      },

      /**
       * 手动设置是否显示后退按钮
       * @private
       * */
      refreshBackButtonStatus () {
        this.hideBb = !this.$history.canGoBack()
      },

      // -------- for webview --------

      /**
       * 如果运行在webview中(alipay/dingtalk), 则执行修改navbar的初始化工作
       * @private
       * */
      initWhenInWebview () {
        // 如果在平台中则进行下面的分支
        this.$platform.ready().then(() => {
          /**
           * 初始化Navbar右侧的按钮组
           * 如果在webview中则提取template中的按钮信息, 写给webview.
           * */
          this.$platform.setNavbarOptionButton(this.$slots.buttons)
          /**
           * 初始化webview中Navbar的背景和底部边框, 只处理具有颜色class的情况
           * 只支持alipay, 不支持dingtalk, 因为dingtalk是通过url修改标题颜色的.
           * */
          this.$platform.setNavbarBackgroundColor()
        })
      }
    },
    created () {
      console.assert(this.$platform, `<Navbar>组件需要 platform 实例`)
      console.assert(this.$config, `<Navbar>组件需要 config 实例`)
      this.refreshBackButtonStatus()
    },
    mounted () {
      this.initWhenInWebview()
    },
    components: {
      Button, Icon
    }
  }
</script>

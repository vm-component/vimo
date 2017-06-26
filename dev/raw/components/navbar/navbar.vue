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
<style lang="scss">
    @import '../toolbar/toolbar.scss';
    @import '../toolbar/toolbar-button.scss';
    @import '../toolbar/toolbar.ios.scss';
    @import '../toolbar/toolbar.md.scss';
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
   * ### 注意点
   *
   * ** 不建议在keepAlive模式使用  **
   *
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
  import { Popover } from '../popover'
  import { Button } from '../button'
  import { Icon } from '../icon'
  import MenuOptions from './menu-options.vue'
  import { isArray, isString } from '../../util/util'
  export default{
    name: 'Navbar',
    data () {
      return {
        isAlipayReady: window.VM.platform.is('alipay') && window.AlipayJSBridge,
        isDingTalkReady: window.VM.platform.is('dingtalk') && window.dd,

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
        default () { return this.$config && this.$config.get('mode') || 'ios' }
      },
      /**
       * 按钮color：primary、secondary、danger、light、dark
       * */
      color: [String],
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
        if (this.isAlipayReady) {
          window.ap && window.ap.showOptionButton()
        }
      },
      /**
       * @function hideOptionButton
       * @description
       * 设置导航条右侧按钮隐藏(只是对alipay平台的), dingtalk通过url改变
       * */
      hideOptionButton () {
        if (this.isAlipayReady) {
          window.ap && window.ap.hideOptionButton()
        }
      },
      /**
       * @function showPopMenu
       * @description
       * 设置右侧弹出的按钮菜单, 右侧可以没有按钮, 但是pop固定在右上角
       * @param {Array} dataList - menu的数据数组
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

        // 显示navbar最右侧的按钮
        if (this.isAlipayReady) {
          window.ap && window.ap.showPopMenu({
            items: tmps
          }, function (res) {
            let selectedItem = tmps[res.index]
            selectedItem.handler && selectedItem.handler()
          })
          return
        }

        Popover.present({
          ev: {
            target: window.document.getElementById('rightButtonPlaceholder') || null
          }, // 事件
          cssClass: 'popMenu',
          component: MenuOptions,                  // 传入组件
          data: {
            menusData: tmps  // 传入数据, 内部通过`this.$options.$data`获取这个data
          }
        })
      },

      /**
       * @function reset
       * @description
       * 重置之前的样式设置
       * */
      reset () {
        if (this.isAlipayReady) {
          window.ap && window.ap.setNavigationBar({reset: true})
          window.ap && window.ap.setOptionButton({reset: true})
        }
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
       * 初始化webview中Navbar的背景和底部边框, 只处理具有颜色class的情况
       * 只支持alipay, 不支持dingtalk, 因为dingtalk是通过url修改标题颜色的.
       * @private
       * */
      initBackgroundColor () {
        // 如果在navbar中有颜色指示的字段, 比如: primary, secondary, danger, light, dark, 则设置webview的导航条颜色, 其余情况不作处理
        let classList = this.$el.classList.toString()
        let isColorLegal = false
        let colors = ['primary', 'secondary', 'danger', 'light', 'dark']
        for (let i = 0, len = colors.length; len > i; i++) {
          if (classList.indexOf(colors[i]) > -1) {
            isColorLegal = true
            break
          }
        }
        this.$platform.ready().then(() => {
          if (!isColorLegal) {
            if (this.isAlipayReady) {
              window.ap && window.ap.setNavigationBar({reset: true})
            }
          } else {
            // 1. 获取背景色
            var rgb = window.getComputedStyle(this.toolbarBackgroundElement).backgroundColor
            // "rgb(56, 126, 245)"
            // "rgba(56, 126, 245,0.8)"
            if (!rgb) return
            rgb = rgb.replace('rgb(', '')
            rgb = rgb.replace('rgba(', '')
            rgb = rgb.replace(')', '')
            rgb = rgb.split(',').map(val => val.trim())
            let r = parseInt(rgb[0]).toString(16).toUpperCase()
            let g = parseInt(rgb[1]).toString(16).toUpperCase()
            let b = parseInt(rgb[2]).toString(16).toUpperCase()
            let a = rgb[3] ? parseInt(rgb[3]).toString(16) : 'FF'
            let backgroundColor = `#${r}${g}${b}`

            // 2. 设置背景色
            if (this.isAlipayReady) {
              window.ap && window.ap.setNavigationBar({
                backgroundColor: backgroundColor
              })
            }
          }
        })
      },

      /**
       * 初始化Navbar右侧的按钮组
       * 如果在webview中则提取template中的按钮信息, 写给webview.
       * @private
       * */
      initOptionButton () {
        // 获取导航条右侧的按钮组件集合
        let rightButtonComponents = []
        if (this.$slots.buttons && isArray(this.$slots.buttons)) {
          this.$slots.buttons.forEach((buttons) => {
            if (buttons.componentInstance.getPosition() === 'right') {
              rightButtonComponents = [].concat(rightButtonComponents, buttons.componentInstance.$children)
            }
          })
        }
        if (rightButtonComponents.length > 0) {
          // 1. 获取数据 -> title/icon(图片/base64)/color/badge/type
          let items = []
          rightButtonComponents.forEach((component) => {
            let tmp = {
              // title: '', // 必填
              // icon: '', // 按钮图标，支持 base64
              // type: '', // 按钮图标类型，与 title、icon 三选一。支持 user / filter / search / add / settings / scan / info / help / locate / more
              color: '#000000', // '#ED4A4D'
              badge: '-1' // 按钮红色气泡，默认 -1。其中 0 表示小红点，-1 表示不显示，其他值展示出来
            }
            let getColor = function (element) {
              // 找到color
              var rgb = window.getComputedStyle(element).color
              // "rgb(56, 126, 245)"
              // "rgba(56, 126, 245,0.8)"
              if (rgb) {
                rgb = rgb.replace('rgb(', '')
                rgb = rgb.replace('rgba(', '')
                rgb = rgb.replace(')', '')
                rgb = rgb.split(',').map(val => val.trim())
                let r = parseInt(rgb[0]).toString(16)
                let g = parseInt(rgb[1]).toString(16)
                let b = parseInt(rgb[2]).toString(16)
                return `#${r}${g}${b}`
              }
              return '#000000'
            }

            // 提取title
            let buttonInnerElement = component.$el.querySelector('.button-inner')
            if (buttonInnerElement && buttonInnerElement.innerHTML.trim() === buttonInnerElement.innerText.trim()) {
              tmp.title = buttonInnerElement.innerText.trim()
              tmp.color = getColor(buttonInnerElement)
            } else {
              let spanElement = buttonInnerElement.querySelector('span')
              if (spanElement) {
                tmp.title = spanElement.innerText.trim()
                tmp.color = getColor(spanElement)
              }
            }

            component.$children.forEach((child) => {
              if (child.$options._componentTag.toLowerCase() === 'icon') {
                let icon = null
                if (child.name && child.name.indexOf('icon') === 0) {
                  icon = window.getComputedStyle(child.$el).backgroundImage
                  if (icon) {
                    icon = icon.substring(4, icon.length - 1)
                    tmp.icon = icon
                  }
                } else {
                  tmp.type = child.name
                }
              }

              if (child.$options._componentTag.toLowerCase() === 'badge') {
                let badge = child.$el.innerText
                if (!badge) {
                  badge = -1
                }
                tmp.badge = badge
              }
            })
            items.push(tmp)
          })

          // 2. 当前页面存在右侧的按钮, 如果是在平台中, 则通知平台更新状态
          if (this.isAlipayReady) {
            if (items.length > 2) {
              console.warn('在Webview中不建议右侧的Navbar按钮超过两个, 即使超过两个在Alipay中也不显示.')
            }
            // 支持 user / filter / search / add / settings / scan / info / help / locate / more
            // 这部分可能需要放到config中
            const map = {
              'person': 'user',
              'glasses': 'filter',
              'search': 'search',
              'add': 'add',
              'settings': 'settings',
              'qr-scanner': 'scan',
              'information-circle': 'info',
              'help': 'help',
              'pin': 'locate',
              'more': 'more'
            }
            // 需要对原始的icon数据进行转义
            items.forEach((item) => {
              if (item.type) {
                if (map[item.type]) {
                  item.type = map[item.type]
                } else {
                  console.warn(`在Navbar右侧设置的按钮name在支付宝中没有找到对应type: ${item.type}, iconName<->type 的对应关系请参考手册!`)
                }
              }
            })

            // bugfix: 如果之前设置过两个btn, 如果下一次设置一个的话, 则会有上次设置的残留, 因此给一个空值, 且title属性必须有值
            if (items.length === 1) {
              rightButtonComponents.unshift({})
              items.unshift({
                title: ' '
              })
            }

            // 首次进入页面如果可能没有ap变量, 设置需要等待ready
            this.$platform.ready().then(() => {
              window.ap && window.ap.setOptionButton({
                items: items,
                preventDefault: false,
                onClick (data) {
                  // index 被点击的菜单项的索引，从0开始，从左到右
                  rightButtonComponents[data.index].clickHandler && rightButtonComponents[data.index].clickHandler()
                },
                success () {
                  console.log('Alipay:setOptionButton 设置成功')
                },
                fail () {
                  console.log('Alipay:setOptionButton 设置失败')
                }
              })
            })
          }
        } else {
          // 导航条右侧没有按钮, 此时对平台进行重置, 因为平台的设置是惰性的.
          if (this.isAlipayReady) {
            window.ap && window.ap.setOptionButton({reset: true})
          }
        }
      },

      /**
       * 如果运行在webview中(alipay/dingtalk), 则执行修改navbar的初始化工作
       * @private
       * */
      initWhenInWebview () {
        // 如果在平台中则进行下面的分支
        if (this.isAlipayReady || this.isDingTalkReady) {
          this.initOptionButton()
          this.initBackgroundColor()
        }
      }
    },
    created () {
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

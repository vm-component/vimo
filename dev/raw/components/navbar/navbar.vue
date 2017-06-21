<template>
    <div class="ion-navbar toolbar"
         :class="[modeClass,colorClass,{'statusbar-padding':statusbarPadding}]"
         v-show="!hideNavBar">
        <div class="toolbar-background"
             :style="{backgroundColor:backgroundColor,borderBottomColor:borderBottomColor}"
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

        <!--right button placeholder-->
        <div ref="rightButtonPlaceholder" style="width: 30px;bottom:0;height:1px; position: absolute;right:9px;"></div>
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
   * ### 导航条的三种模式
   *
   * - 顶级单例模式: 这个对应Alipay/Dingtalk/Wechat等平台, 因为H5是单页应用, 故Navbar不随业务页面切换而改变, 故在H5模式时, 需要设置顶级模式, 保证业务共用一个Navbar. 此时的Navbar组件在App组件中设置
   * - 正常模式: 表示业务页面管理自己的Navbar, 不同业务页面定义的Navbar不冲突不相干, 此外只有在Navbar中的 Title组件才能改变页面Title属性
   *
   * ### 如果在支付宝中
   *
   * 如果在支付宝中, 设置H5的样式也同样适用于对支付宝壳子的导航栏的操作. 当路由切换, 则重置之前的设置. 可用的方法:
   *
   * - setBackgroundColor
   * - setBorderBottomColor
   * - reset
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
  import { isArray, isString, isObject } from '../../util/util'
  export default{
    name: 'Navbar',
    data () {
      return {
        backgroundColor: null,
        borderBottomColor: null,

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
      rightButtonPlaceholderElement () {
        return this.$refs.rightButtonPlaceholder
      }
    },
    methods: {

      showOptionButton () {
        ap.showOptionButton();
      },
      hideOptionButton () {
        ap.hideOptionButton();
      },
      setOptionButton () {},


      /**
       * @function showPopMenu
       * @description
       * 设置右侧弹出的按钮菜单, 右侧可以没有按钮, 但是pop固定在右上角
       * @param {Array} dataList - menu的数据数组
       * @param {Boolean} isH5 - 是否强制使用H5模式
       * */
      showPopMenu (dataList, isH5 = false) {
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
        let isAlipayReady = window.VM.platform.is('alipay') && window.AlipayJSBridge && !isH5
        let isDingTalkReady = window.VM.platform.is('dingtalk') && window.dd && !isH5

        if (isAlipayReady) {
          window.ap.showPopMenu({
            items: tmps
          }, function (res) {
            let selectedItem = tmps[res.index]
            selectedItem.handler && selectedItem.handler()
          })
          return
        }

        Popover.present({
          ev: {
            target: this.rightButtonPlaceholderElement
          }, // 事件
          cssClass: 'popMenu',
          component: MenuOptions,                  // 传入组件
          data: {
            menusData: tmps  // 传入数据, 内部通过`this.$options.$data`获取这个data
          }
        })
      },




      /**
       * @private
       * */
      backButtonClickHandler ($event) {
        $event.preventDefault()
        $event.stopPropagation()
        window.history.back()
      },

      /**
       * @function setBackgroundColor
       * @description
       * 设置Navbar背景颜色, 目前支持h5/Alipay/
       * @param {String} color - 颜色, 比如: #DDDDDD
       * */
      setBackgroundColor (color) {
        this.backgroundColor = color
        let titleComponent = this.$children[0]
        if (titleComponent && titleComponent.$options._componentTag.toLowerCase() === 'title') {
          // 根据背景计算文字颜色
          let colorLite = color.substring(1)
          if (colorLite.length === 3) {
            colorLite = colorLite[0] + colorLite[0] + colorLite[1] + colorLite[1] + colorLite[2] + colorLite[2]
          }
          let r = parseInt(colorLite[0] + colorLite[1], 16)
          let g = parseInt(colorLite[2] + colorLite[3], 16)
          let b = parseInt(colorLite[4] + colorLite[5], 16)

          if (r < 170 || g < 170 || b < 170) {
            titleComponent.setTitleColor && titleComponent.setTitleColor('#fff')
          } else {
            titleComponent.setTitleColor && titleComponent.setTitleColor('#000')
          }
        }

        if (this.$platform.is('alipay') && window.AlipayJSBridge) {
          window.ap.setNavigationBar({
            backgroundColor: color
          })
        }

        // 告知App组件下的Title组件更新状态
        if (this.$navbar && this !== this.$navbar && this.$platform.platforms().length === 3) {
          this.$navbar && this.$navbar.setBackgroundColor(color)
        }
      },

      /**
       * @function setBorderBottomColor
       * @description
       * 设置borderBottom的颜色
       * @param {String} color - 颜色, 比如: #DDDDDD
       * */
      setBorderBottomColor (color) {
        this.borderBottomColor = color
        if (this.$platform.is('alipay') && window.AlipayJSBridge) {
          window.ap.setNavigationBar({
            borderBottomColor: color
          })
        }
        // 告知App组件下的Title组件更新状态
        if (this.$navbar && this !== this.$navbar && this.$platform.platforms().length === 3) {
          this.$navbar.setBorderBottomColor(color)
        }
      },

      /**
       * @function reset
       * @description
       * 重置之前的样式设置
       * */
      reset () {
        this.backgroundColor = null
        this.borderBottomColor = null
        if (this.$platform.is('alipay') && window.AlipayJSBridge) {
          window.ap && window.ap.setNavigationBar({
            reset: true
          })
        }

        // 告知App组件下的Title组件更新状态
        if (this.$navbar && this !== this.$navbar && this.$platform.platforms().length === 3) {
          this.$navbar.backgroundColor = null
          this.$navbar.borderBottomColor = null
        }
      },

      /**
       * 手动设置是否显示后退按钮
       * @private
       * */
      refreshBackButtonStatus () {
        this.hideBb = !this.$history.canGoBack()
      }
    },
    created () {
      this.refreshBackButtonStatus()
    },
    components: {
      Button, Icon
    }
  }
</script>

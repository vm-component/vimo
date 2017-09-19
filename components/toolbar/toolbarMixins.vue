<template>
    <div class="toolbar"
         :class="[colorClass,typeClass]"
         v-show="!hideNavBar">
        <!--background-->
        <div ref="toolbarBackground" class="toolbar-background"></div>
        <!--content-->
        <div class="toolbar-content">
            <slot></slot>
        </div>
        <!--show-back-button-->
        <Button v-if="isNavBar && !hideBb" @click="backButtonClickHandler" role="bar-button" class="back-button"
                :class="[{'show-back-button':!hideBackButton}]">
            <Icon class="back-button-icon" :class="[backButtonIconClass]" :name="bbIcon"></Icon>
            <span class="back-button-text" :class="[backButtonTextClass]">{{backText}}</span>
        </Button>

        <!--buttons/menuToggle-->
        <slot name="buttons"></slot>
    </div>
</template>
<style lang="less">
    @import "toolbar-base.less";
    @import "toolbar.less";
    @import "toolbar-button";
</style>
<script type="text/javascript">
  import { Button } from '../button/index'
  import { Icon } from '../icon/index'
  import { isArray, isString } from '../util/util'

  export default {
    components: {
      Button, Icon
    },
    data () {
      return {
        hideRightButtons: false,

        hideBb: false,
        bbIcon: this.$config && this.$config.get('backButtonIcon', 'icon-arrow-back') || 'icon-arrow-back',
        backText: this.$config && this.$config.get('backButtonText', '返回') || '返回',

        isNavBar: this.$options._componentTag.toLowerCase() === 'navbar'
      }
    },
    props: {
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
      colorClass () {
        return this.color ? (`toolbar-${this.color}`) : ''
      },
      backButtonTextClass () {
        return `back-button-text`
      },
      backButtonIconClass () {
        return `back-button-icon`
      },
      typeClass () {
        return this.isNavBar ? 'ion-navbar' : 'ion-toolbar'
      },
      hideNavBar () {
        return this.isNavBar && this.$config && this.$config.getBoolean('hideNavBar', false)
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
        this.$platform.showNavbarOptionButton && this.$platform.showNavbarOptionButton()
      },
      /**
       * @function hideOptionButton
       * @description
       * 设置导航条右侧按钮隐藏(只是对alipay平台的), dingtalk通过url改变
       * */
      hideOptionButton () {
        this.$platform.hideNavbarOptionButton && this.$platform.hideNavbarOptionButton()
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
          let isHandled = this.$platform.showNavbarPopMenu && this.$platform.showNavbarPopMenu(tmps)
          // 显示navbar最右侧的按钮
          if (isHandled) {
            resolve()
          } else {
            import('../popover/index').then((component) => {
              let Popover = component.Popover
              Popover.present({
                ev: {
                  target: window.document.getElementById('rightButtonPlaceholder') || null
                }, // 事件
                cssClass: 'popMenu',
                component: import('./menu-options.vue'),   // 传入组件 TODO: 此方法需要写入文档
                data: {
                  menusData: tmps  // 传入数据, 内部通过`this.$options.$data`获取这个data
                }
              }).then(() => { resolve() })
            })
          }
        })
      },

      /**
       * @function reset
       * @description
       * 重置之前的样式设置
       * */
      reset () {
        this.$platform.resetNavbarTitleAndColor && this.$platform.resetNavbarTitleAndColor()
        this.$platform.resetNavbarOptionButton && this.$platform.resetNavbarOptionButton()
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
        if (!this.isNavBar || this.$platform.platforms().length < 3) {
          return
        }
        // 如果在平台中则进行下面的分支
        this.$platform.ready().then(() => {

          /**
           * 初始化Navbar右侧的按钮组
           * 如果在webview中则提取template中的按钮信息, 写给webview.
           * */
          this.$platform.setNavbarOptionButton && this.$platform.setNavbarOptionButton(this.$slots.buttons)
          /**
           * 初始化webview中Navbar的背景和底部边框, 只处理具有颜色class的情况
           * 只支持alipay, 不支持dingtalk, 因为dingtalk是通过url修改标题颜色的.
           * */
          if (this.$platform.is('alipay')) {
            if (this.color) {
              // 1. 获取背景色
              let toolbarBackgroundElement = this.toolbarBackgroundElement
              if (!toolbarBackgroundElement) { return false }
              var rgb = window.getComputedStyle(toolbarBackgroundElement).backgroundColor
              // "rgb(56, 126, 245)"
              // "rgba(56, 126, 245,0.8)"
              if (!rgb) { return false }
              rgb = rgb.replace('rgb(', '')
              rgb = rgb.replace('rgba(', '')
              rgb = rgb.replace(')', '')
              rgb = rgb.split(',').map(val => val.trim())
              let r = parseInt(rgb[0]).toString(16).toUpperCase()
              let g = parseInt(rgb[1]).toString(16).toUpperCase()
              let b = parseInt(rgb[2]).toString(16).toUpperCase()
              let a = rgb[3] ? parseInt(rgb[3]).toString(16) : 'FF'
              let backgroundColor = `#${r}${g}${b}`
              this.$platform.setNavbarBackgroundColor && this.$platform.setNavbarBackgroundColor(backgroundColor)
            } else {
              this.$platform.resetNavbarTitleAndColor && this.$platform.resetNavbarTitleAndColor()
            }
          }
        })
      }
    },
    created () {
      console.assert(this.$platform, `The Component of <Navbar> need 'platform' instance`)
      console.assert(this.$config, `The Component of <Navbar> need 'config' instance`)
      console.assert(window.VM, `The Component of <Navbar> need 'window.VM' instance`)

      this.refreshBackButtonStatus()
    },
    mounted () {
      if (this.isNavBar) {
        this.initWhenInWebview()
        if (this.$root === window.VM.$root) {
          // 只记录这个流的navbar: App->Nav->Page->Header->Navbar
          // 其余形式的navbar不记录
          window.VM.$navbar = this
        }
      }

    }
  }
</script>

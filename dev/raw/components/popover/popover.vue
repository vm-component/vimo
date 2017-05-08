<template>
    <div class="ion-popover" :class="[modeClass,colorClass,cssClass]">
        <Backdrop :bdClick="bdClick" :enableBackdropDismiss="enableBackdropDismiss" :hidden="!showBackdrop"
                  :isActive="isActive"></Backdrop>
        <transition
                :name="popoverTransitionName"
                @before-enter="beforeEnter"
                @after-enter="afterEnter"
                @before-leave="beforeLeave"
                @after-leave="afterLeave">
            <div class="popover-wrapper" v-show="isActive">
                <div class="popover-arrow" ref="popoverArrow"></div>
                <div class="popover-content" ref="popoverContent">
                    <div class="popover-viewport" ref="popoverViewport" v-html="htmlComponent"></div>
                </div>
            </div>
        </transition>
    </div>
</template>
<style lang="scss">
    @import "./popover.scss";
    @import "./popover.ios.scss";
    @import "./popover.md.scss";

    // transitioName = 'popover-ios'
    .popover-ios-enter-active, .popove-ios-leave-active {
        transition: opacity ease .1s;
        opacity: 1;
    }

    .popover-ios-enter, .popover-ios-leave-active {
        opacity: 0;
        transition: opacity ease .1s;
    }

    // transitioName = 'popover-md'
    .popover-md {
        .popover-wrapper {
            transition: opacity ease 100ms;
            .popover-content {
                transition: all cubic-bezier(0.36, 0.66, 0.04, 1) 300ms;
                .popover-viewport {
                    transition: opacity ease 300ms;
                }
            }
        }
    }

    .popover-md-enter {
        opacity: 1;
        .popover-content {
            transform: scale(1);
        }
        .popover-viewport {
            opacity: 1;
        }
    }

    .popover-md-enter-active {
        opacity: 0;
        .popover-content {
            transform: scale(0);
        }
        .popover-viewport {
            opacity: 0;
        }
    }

    .popover-md-leave-active {
        opacity: 0;
    }

</style>
<script type="text/javascript">

  /**
   * @compoennt Popover
   * @description
   *
   * ## 弹出层组件 Popover/弹出提示组件
   *
   *
   * ## 子组件如何获取数据
   *
   * 在组件中使用: `this.$options.$data` 获取传入data
   *
   *
   *
   * @props {String} cssClass - 额外的样式
   * @props {mode} [mode='ios'] - 模式
   * @props {Boolean} [showBackdrop=true] - 是否显示backdrop
   * @props {Boolean} [enableBackdropDismiss=true] - 点击backdrop是否能关闭组件
   * @props {Boolean} [dismissOnPageChange=true] - 页面切换是否关闭组件, 默认关闭
   *
   * @props {Object|String} component - popover内部显示的vue组件, 是一个*.vue文件; 如果是String的话则为html字符串
   * @props {Object} data - 传给popover内部显示的vue组件的数据, 内部组件通过`this.$options.$data`获取
   * @props {Object|MouseEvent} ev - 点击元素的事件, $event, 这个值的传入可以计算popover放置的位置
   *
   * */
  import Vue from 'vue'
  import { Backdrop } from '../backdrop'
  import { registerListener, parsePxUnit, isObject } from '../../util/util'
  import { List } from '../list'
  import { ListHeader, ItemGroup, Item, ItemSliding, ItemOptions, ItemDivider } from '../item'
  const POPOVER_IOS_BODY_PADDING = 2
  const POPOVER_MD_BODY_PADDING = 12

  export default{
    name: 'Popover',
    data () {
      return {
        htmlComponent: '',
        presentCallback: null,  // 开启的promise
        dismissCallback: null,  // 关闭的promise
        unreg: null,            // 页面切换的pagechange监听函数

        isActive: false,        // 内部控制是否开启
        enabled: false          // 内部判断当前组件是否在动画中
      }
    },
    props: {
      component: [Object,String],
      data: [Object],
      ev: [Object, MouseEvent], // 点击元素的事件
      mode: {
        type: String,
        default () { return this.$config.get('mode') }
      },
      cssClass: String,
      showBackdrop: {
        type: Boolean,
        default: true
      },
      enableBackdropDismiss: {
        type: Boolean,
        default: true
      },
      dismissOnPageChange: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      modeClass () {
        return `popover popover-${this.mode}`
      },
      colorClass () {
        return this.color && `popover-${this.mode}-${this.color}`
      },
      popoverTransitionName () {
        return `popover-${this.mode}`
      },
      popoverEle () {
        return this.$refs.popoverContent
      },
      arrowEle () {
        return this.$refs.popoverArrow
      },
      popoverViewportEle () {
        return this.$refs.popoverViewport
      }
    },
    methods: {
      /**
       * ActionSheet Animate Hooks
       * @private
       * */
      beforeEnter () {
        this.enabled = false // 不允许过渡中途操作
        this.$app && this.$app.setEnabled(false, 300)
      },
      afterEnter () {
        this.presentCallback()
        this.enabled = true
      },
      beforeLeave () {
        this.enabled = false
        this.$app && this.$app.setEnabled(false, 300)
      },
      afterLeave () {
        this.dismissCallback()
        // 删除DOM
        this.$el.remove()
        this.enabled = true
      },

      /**
       * 点击backdrop
       * @private
       * */
      bdClick () {
        if (this.enabled && this.enableBackdropDismiss) {
          this.dismiss()
        }
      },

      /**
       * @private
       * */
      dismiss () {
        if (this.isActive) {
          this.isActive = false // 动起来
          this.unreg && this.unreg()
          if (!this.enabled) {
            this.$nextTick(() => {
              this.dismissCallback()
              this.$el.remove()
              this.enabled = true
            })
          }
          return new Promise((resolve) => { this.dismissCallback = resolve })
        } else {
          return new Promise((resolve) => { resolve() })
        }
      },

      /**
       * @private
       * */
      present () {
        this.isActive = true
        return new Promise((resolve) => { this.presentCallback = resolve })
      },

      /**
       * @private
       * */
      dismissOnPageChangeHandler () {
        this.isActive && this.dismiss()
      },

      /**
       * 计算popover的位置/定位
       * @private
       * */
      mdPositionView (nativeEle, ev) {
        let originY = 'top'
        let originX = 'left'

        // Popover content width and height
        let popoverEle = this.popoverEle

        console.assert(popoverEle, 'The component Popover need popoverEle in mdPositionView()')

        let popoverWidth = parsePxUnit(window.getComputedStyle(popoverEle).width)
        let popoverHeight = parsePxUnit(window.getComputedStyle(popoverEle).height)

        // Window body width and height
        let bodyWidth = this.$platform.width()
        let bodyHeight = this.$platform.height()

        // If ev was passed, use that for target element
        let targetDim = ev && ev.target && ev.target.getBoundingClientRect()

        let targetTop = (targetDim && 'top' in targetDim) ? targetDim.top : (bodyHeight / 2) - (popoverHeight / 2)
        let targetLeft = (targetDim && 'left' in targetDim) ? targetDim.left : (bodyWidth / 2) - (popoverWidth / 2)

        let targetHeight = targetDim && targetDim.height || 0

        let popoverCSS = {
          top: targetTop,
          left: targetLeft
        }

        // If the popover left is less than the padding it is off screen
        // to the left so adjust it, else if the width of the popover
        // exceeds the body width it is off screen to the right so adjust
        if (popoverCSS.left < POPOVER_MD_BODY_PADDING) {
          popoverCSS.left = POPOVER_MD_BODY_PADDING
        } else if (popoverWidth + POPOVER_MD_BODY_PADDING + popoverCSS.left > bodyWidth) {
          popoverCSS.left = bodyWidth - popoverWidth - POPOVER_MD_BODY_PADDING
          originX = 'right'
        }

        // If the popover when popped down stretches past bottom of screen,
        // make it pop up if there's room above
        if (targetTop + targetHeight + popoverHeight > bodyHeight && targetTop - popoverHeight > 0) {
          popoverCSS.top = targetTop - popoverHeight
          nativeEle.className = nativeEle.className + ' popover-bottom'
          originY = 'bottom'
          // If there isn't room for it to pop up above the target cut it off
        } else if (targetTop + targetHeight + popoverHeight > bodyHeight) {
          popoverEle.style.bottom = POPOVER_MD_BODY_PADDING + 'px'
        }

        popoverEle.style.top = popoverCSS.top + 'px'
        popoverEle.style.left = popoverCSS.left + 'px';

        (popoverEle.style)[this.$platform.css.transformOrigin] = originY + ' ' + originX
      },
      iosPositionView (nativeEle, ev) {
        let originY = 'top'
        let originX = 'left'
        // Popover content width and height
        let popoverEle = this.popoverEle
        let popoverWidth = parsePxUnit(window.getComputedStyle(popoverEle).width)
        let popoverHeight = parsePxUnit(window.getComputedStyle(popoverEle).height)

        // Window body width and height
        let bodyWidth = this.$platform.width()
        let bodyHeight = this.$platform.height()

        // If ev was passed, use that for target element
        let targetDim = ev && ev.target && ev.target.getBoundingClientRect()

        let targetTop = (targetDim && 'top' in targetDim) ? targetDim.top : (bodyHeight / 2) - (popoverHeight / 2)
        let targetLeft = (targetDim && 'left' in targetDim) ? targetDim.left : (bodyWidth / 2)
        let targetWidth = targetDim && targetDim.width || 0
        let targetHeight = targetDim && targetDim.height || 0

        // The arrow that shows above the popover on iOS
        var arrowEle = this.arrowEle
        let arrowWidth = parsePxUnit(window.getComputedStyle(arrowEle).width)
        let arrowHeight = parsePxUnit(window.getComputedStyle(arrowEle).height)

        // If no ev was passed, hide the arrow
        if (!targetDim) {
          arrowEle.style.display = 'none'
        }

        let arrowCSS = {
          top: targetTop + targetHeight,
          left: targetLeft + (targetWidth / 2) - (arrowWidth / 2)
        }

        let popoverCSS = {
          top: targetTop + targetHeight + (arrowHeight - 1),
          left: targetLeft + (targetWidth / 2) - (popoverWidth / 2)
        }

        // If the popover left is less than the padding it is off screen
        // to the left so adjust it, else if the width of the popover
        // exceeds the body width it is off screen to the right so adjust
        if (popoverCSS.left < POPOVER_IOS_BODY_PADDING) {
          popoverCSS.left = POPOVER_IOS_BODY_PADDING
        } else if (popoverWidth + POPOVER_IOS_BODY_PADDING + popoverCSS.left > bodyWidth) {
          popoverCSS.left = bodyWidth - popoverWidth - POPOVER_IOS_BODY_PADDING
          originX = 'right'
        }

        // If the popover when popped down stretches past bottom of screen,
        // make it pop up if there's room above
        if (targetTop + targetHeight + popoverHeight > bodyHeight && targetTop - popoverHeight > 0) {
          arrowCSS.top = targetTop - (arrowHeight + 1)
          popoverCSS.top = targetTop - popoverHeight - (arrowHeight - 1)
          nativeEle.className = nativeEle.className + ' popover-bottom'
          originY = 'bottom'
          // If there isn't room for it to pop up above the target cut it off
        } else if (targetTop + targetHeight + popoverHeight > bodyHeight) {
          popoverEle.style.bottom = POPOVER_IOS_BODY_PADDING + '%'
        }

        arrowEle.style.top = arrowCSS.top + 'px'
        arrowEle.style.left = arrowCSS.left + 'px'

        popoverEle.style.top = popoverCSS.top + 'px'
        popoverEle.style.left = popoverCSS.left + 'px';

        (popoverEle.style)[this.$platform.css.transformOrigin] = originY + ' ' + originX
      }
    },
    created () {
      // mounted before data ready, so no need to judge the `dismissOnPageChange` value
      if (this.dismissOnPageChange) {
        this.unreg && this.unreg()
        this.unreg = registerListener(window, 'popstate', this.dismissOnPageChangeHandler, {capture: false})
      }

      // 计算位置
      // bugFix: 需要的等待两帧才能获取高度值
      // 渲染传入的组件
      setTimeout(() => {
        if (this.mode === 'ios') {
          this.iosPositionView(this.$el, this.ev)
        } else {
          this.mdPositionView(this.$el, this.ev)
        }
      }, 0)
    },
    mounted () {
      if (isObject(this.component)) {
        const Component = Vue.extend(this.component)
        new Component({
          el: this.popoverViewportEle,
          $data: this.data
        })
      } else {
        // 如果 this.component 是html模板string的话
        this.htmlComponent = this.component
      }
    },
    components: {Backdrop, List, ListHeader, ItemGroup, Item, ItemSliding, ItemOptions, ItemDivider}
  }
</script>

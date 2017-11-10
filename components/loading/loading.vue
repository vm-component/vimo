<template>
    <div class="ion-loading" :class="[modeClass,cssClass]">
        <Backdrop :isActive="isActive && showBackdrop" :enableBackdropDismiss="false"></Backdrop>
        <transition :name="transitionClass"
                    @before-enter="beforeEnter"
                    @after-enter="afterEnter"
                    @before-leave="beforeLeave"
                    @after-leave="afterLeave">
            <div class="loading-wrapper" v-show="isActive">
                <div v-if="showSpinner" class="loading-spinner">
                    <Spinner :name="spinner"></Spinner>
                </div>
                <div v-if="content" v-html="content" class="loading-content"></div>
            </div>
        </transition>
    </div>
</template>
<style lang="less">
    @import "loading";
    @import "loading.ios.less";
    @import "loading.md.less";

    .ion-loading.indicator {
        .loading-wrapper {
            background: rgba(0, 0, 0, 0.9);
            color: #fff;
            padding: 13px 13px;
            circle, line {
                stroke: #fff !important;
            }
            .loading-spinner {
                height: 30px;
                width: 30px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }

    .indicator.reverse {
        .loading-wrapper {
            background: rgba(256, 256, 256, 0.9);
            circle, line {
                stroke: #000 !important;
            }
        }
    }
</style>
<script type="text/javascript">
  /**
   * @component Loading
   * @description
   *
   * ## 弹出层 / Loading组件(大Loading)
   *
   * Loading也有大小之分
   *
   * ### 关于大小Loading的问题
   *
   * Loading的使用场景是这样的: 当用户访问数据/资源加载/需要等待操作的需求下使用, 完整的情况下需要向用户说明我这次Loading是做什么, 比如Loading是提示"**正在请求资源, 请稍后!**", 有时我们并不需提示, 只需要显示菊花图即可, 因为频繁的显示大Loading还是很烦的, 这里需要介绍下Indicator组件, 他是继承Loading组件, 但是只显示菊花图, 而且调用也简单, 不必每次传入参数.
   *
   * ### 弹出层
   *
   * - Loading通过present开启, 如果没设置duration, 则需要手动dismiss,
   * - Vimo的弹出层都是独立于页面的, 但也不是`body`的直接子元素, 而是挂载在App组件中的. 这样做是有考量的.
   * - 组件相应路由切换, 路由切换则自动关闭
   *
   * ### 用法
   *
   * - 不传参数则显示菊花
   * - 传入string则显示string
   * - 参考下面的示例
   *
   *
   * @props {string} [spinner='ios'] - 菊花样式
   * @props {string} [content] - 内容
   * @props {string} [cssClass] - 自定义样式
   * @props {boolean} [showBackdrop=false] - 是否显示黑色背景
   * @props {number} [duration] - loading持续时间, 如果为0则无效
   * @props {boolean} [dismissOnPageChange=true] - 页面切换是否关闭loading
   * @props {string} [mode='ios'] - 模式
   *
   * @demo #/loading
   * @see component:Indicator
   * @usage
   *
   * // 只显示菊花
   * spinnerOnly () {
   *      this.$loading.present();
   *      setTimeout(() => {
   *        this.$loading.dismiss().then(() => {
   *          console.debug('dismiss in promise success!')
   *        })
   *      }, 1000)
   * },
   *
   * // 是显示name
   * stringOnly () {
   *      this.$loading.present('只传入了String');
   *      setTimeout(() => {
   *        this.$loading.dismiss().then(() => {
   *          console.debug('dismiss in promise success!')
   *        })
   *      }, 1000)
   * },
   *
   * // 普通的
   * showDefault () {
   *      this.$loading.present({
   *        content: '正在加载, 6000ms后自动关闭...',
   *        dismissOnPageChange: false, // url变化后关闭loading(默认)
   *        showBackdrop: true,
   *      });
   *      setTimeout(() => {
   *        this.$loading.dismiss().then(() => {
   *          console.debug('dismiss in promise success!')
   *        })
   *      }, 6000);
   * },
   *
   * */
  import { urlChange } from '../util/util'
  import Backdrop from '../backdrop'
  import Spinner from '../spinner/index'
  import * as appComponentManager from '../util/appComponentManager'

  const NOOP = () => {}

  export default {
    name: 'Loading',
    props: {
      spinner: {
        type: String,
        default () { return this.$config && this.$config.get('spinner', 'ios') || 'ios' }
      },
      content: String,
      cssClass: String,
      showBackdrop: {
        type: Boolean,
        default: true
      },
      duration: Number,
      dismissOnPageChange: {
        type: Boolean,
        default () { return true }
      },
      mode: {
        type: String,
        default () { return this.$config && this.$config.get('mode') || 'ios' }
      }
    },
    data () {
      return {
        isActive: false, // 开启状态
        enabled: false, // 组件当前是否进入正常状态的标示(正常显示状态 和 正常退出状态)

        // promise
        presentCallback: NOOP,
        dismissCallback: NOOP,

        startTime: null,
        timer: null,
        unreg: null
      }
    },
    computed: {
      // 设置ActionSheet的风格
      modeClass () {
        return `loading-${this.mode}`
      },
      showSpinner () {
        return this.spinner !== 'hide'
      },
      transitionClass () {
        return `loading-${this.mode}`
      }
    },
    methods: {
      // -------- private --------
      /**
       * ActionSheet Animate Hooks
       * */
      beforeEnter () {
        this.$app && this.$app.setEnabled(false, 200)
        this.enabled = false
      },
      afterEnter () {
        this.presentCallback()
        this.enabled = true
      },
      beforeLeave () {
        this.$app && this.$app.setEnabled(false, 200)
        this.enabled = false
      },
      afterLeave () {
        // 删除DOM
        this.dismissCallback()
        this.$el.remove()
        this.enabled = true
      },

      // -------- public --------
      /**
       * @function present
       * @description
       * 打开Loading
       * @param {Object} options - 给组件props传参的对象, 这部分在loading.js中定义
       * @returns {Promise}  结果返回Promise, 当动画完毕后执行resolved
       */
      present () {
        this.startTime = new Date().getTime()
        this.isActive = true
        if (parseInt(this.duration) > 16) {
          this.timer && window.clearTimeout(this.timer)
          this.timer = window.setTimeout(() => {
            this.dismiss()
          }, this.duration)
        }
        // add to App Component
        appComponentManager.addChild(this)
        return new Promise((resolve) => { this.presentCallback = resolve })
      },

      /**
       * @function dismiss
       * @description
       * 关闭Loading
       * @return {Promise} 结果返回Promise, 当动画完毕后执行resolved
       * */
      dismiss () {
        if (this.isActive) {
          this.isActive = false // 动起来
          this.timer && window.clearTimeout(this.timer)
          this.unreg && this.unreg()
          if (!this.enabled) {
            this.$nextTick(() => {
              this.$el.remove()
              this.dismissCallback()
              this.enabled = true
            })
          }
          // remove from App Component
          appComponentManager.removeChild(this)
          return new Promise((resolve) => { this.dismissCallback = resolve })
        } else {
          return new Promise((resolve) => { resolve() })
        }
      }
    },
    created () {
      if (this.dismissOnPageChange) {
        this.unreg = urlChange(() => {
          this.isActive && this.dismiss()
        })
      }
    },
    components: {
      Backdrop, Spinner
    }
  }
</script>

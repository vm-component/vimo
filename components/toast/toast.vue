<template>
    <div class="ion-toast" :class="[modeClass,customerClass]">
        <transition :name="transitionClass"
                    @before-enter="beforeEnter"
                    @after-enter="afterEnter"
                    @before-leave="beforeLeave"
                    @after-leave="afterLeave">
            <div v-show="isActive" class="toast-wrapper" :class="[positionClass]">
                <div class="toast-container">
                    <div class="toast-message" id="toast-hdr" v-if="message">{{message}}</div>
                    <vm-button class="toast-button" clear v-if="showCloseButton" @click="cbClick()">
                        <span>{{closeButtonText}}</span>
                    </vm-button>
                </div>
            </div>
        </transition>
    </div>
</template>
<style lang="less">
    @import "toast";
    @import "toast.ios.less";
    @import "toast.md.less";
</style>
<script type="text/javascript">
  import { urlChange } from '../util/util'
  import Button from '../button/index'
  import * as appComponentManager from '../util/appComponentManager'

  const NOOP = () => {}

  export default {
    props: {
      message: {
        type: String,
        require: true
      },
      duration: {
        type: Number,
        default: 3000
      },
      position: {
        type: String,
        default: 'bottom',
        validator (value) {
          return ['top', 'middle', 'bottom'].indexOf(value) > -1
        }
      },
      cssClass: String,
      showCloseButton: Boolean,
      closeButtonText: {
        type: String,
        default: 'Close'
      },
      // whether to close component when page change
      dismissOnPageChange: Boolean,
      // execute when component closed and animate done
      onDismiss: {
        type: Function,
        default: NOOP
      },
      mode: {
        type: String,
        default () { return this.$config && this.$config.get('mode', 'ios') || 'ios' }
      }
    },
    data () {
      return {
        // component state
        isActive: false, // open state
        enabled: false, // 组件当前是否进入正常状态的标示(正常显示状态 和 正常退出状态)

        // prmiseCallback
        presentCallback: NOOP,
        dismissCallback: NOOP,
        timer: null, // timer
        unreg: null
      }
    },
    computed: {
      // set mode class of ActionSheet
      modeClass () {
        return `toast-${this.mode}`
      },
      // position class
      positionClass () {
        return `toast-${this.position}`
      },
      transitionClass () {
        return `toast-${this.position}-${this.mode}`
      },
      customerClass () {
        return this.cssClass && this.cssClass.trim()
      }
    },
    methods: {
      // -------- private --------
      /**
       * Animate Hooks
       * @private
       * */
      beforeEnter () {
        this.$app && this.$app.setEnabled(false, 400)
        this.enabled = false
      },
      afterEnter () {
        this.presentCallback()
        this.enabled = true
      },
      beforeLeave () {
        this.$app && this.$app.setEnabled(false, 400)
        this.enabled = false
      },
      afterLeave () {
        this.dismissCallback()
        // 删除DOM
        this.$el.remove()
        this.enabled = true
      },

      /**
       * click close button to close
       * @private
       * */
      cbClick () {
        return this.dismiss().then(() => {
          this.onDismiss && this.onDismiss()
        })
      },

      /**
       * the handler of dismiss the page when route change
       * @private
       */
      dismissOnPageChangeHandler () {
        if (this.isActive) {
          if (this.showCloseButton) {
            this.cbClick()
          }

          if (this.timer) {
            window.clearTimeout(this.timer)
            this.timer = null
            this.dismiss().then(() => {
              this.onDismiss && this.onDismiss()
            })
          }
        }
      },

      // -------- public --------
      /**
       * open current component instance
       * @returns {Promise} Returns a promise which is resolved when the transition has completed.
       */
      present () {
        this.isActive = true
        if (!this.showCloseButton) {
          this.timer = window.setTimeout(() => {
            this.timer = null
            this.dismiss().then(() => {
              this.onDismiss && this.onDismiss()
            })
          }, this.duration)
        }
        // add to App Component
        appComponentManager.addChild(this)
        return new Promise((resolve) => { this.presentCallback = resolve })
      },

      /**
       * close current component instance
       * @returns {Promise} Returns a promise which is resolved when the transition has completed.
       */
      dismiss () {
        if (this.isActive) {
          this.isActive = false // move
          if (!this.enabled) {
            this.$nextTick(() => {
              this.dismissCallback()
              this.$el.remove()
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
    mounted () {
      if (this.dismissOnPageChange) {
        // mounted before data ready, so no need to judge the `dismissOnPageChange` value
        this.unreg = urlChange(this.dismissOnPageChangeHandler)
      }
    },
    components: {
      'vm-button': Button
    }
  }
</script>

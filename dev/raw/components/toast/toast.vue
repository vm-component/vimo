<template>
    <div class="toast" :class="[modeClass,cssClass]">
        <transition :name="transitionClass"
                    v-on:before-enter="_beforeEnter"
                    v-on:after-enter="_afterEnter"
                    v-on:before-leave="_beforeLeave"
                    v-on:after-leave="_afterLeave">
            <div v-show="isActive" class="toast-wrapper" :class="[positionClass]">
                <div class="toast-container">
                    <div class="toast-message" id="toast-hdr" v-if="message">{{message}}</div>
                    <Button class="toast-button" clear v-if="showCloseButton" @click="cbClick()">
                        <span>{{closeButtonText}}</span>
                    </Button>
                </div>
            </div>
        </transition>
    </div>
</template>
<style scoped lang="scss">
    @import "./toast";
    @import "./toast.ios";
    @import "./toast.md";
</style>
<script type="text/javascript">
  import { registerListener } from '../../util/util'
  import { Button } from '../button'
  export default {
    data () {
      return {
        message: '', // String
        duration: null, // Number
        position: 'bottom',
        cssClass: null,
        showCloseButton: false,
        closeButtonText: 'Close', // the text of close button
        dismissOnPageChange: false, // whether to close component when page change
        onDismiss: null, // execute when component closed and animate done
        mode: 'ios', // ios?android

        // component state
        isActive: false, // open state

        // prmiseCallback
        presentCallback: null,
        dismissCallback: null,
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
      }
    },
    methods: {
      // -------- private --------
      /**
       * Animate Hooks
       * @private
       * */
      _beforeEnter () {
        this.$app && this.$app.setEnabled(false, 400)
      },
      _afterEnter (el) {
        this.presentCallback(el)
      },
      _beforeLeave () {
        this.$app && this.$app.setEnabled(false, 400)
      },
      _afterLeave (el) {
        this.dismissCallback(el)
        // 删除DOM
        this.$el.remove()
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
          if (!this.dismissOnPageChange) {
            return
          }
          if (this.showCloseButton) {
            this.cbClick()
          } else if (this.timer) {
            window.clearTimeout(this.timer)
            this.timer = null
            this.dismiss().then(() => {
              this.onDismiss && this.onDismiss()
            })
          }
        }
        this.unreg && this.unreg()
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
        return new Promise((resolve) => { this.presentCallback = resolve })
      },

      /**
       * close current component instance
       * @returns {Promise} Returns a promise which is resolved when the transition has completed.
       */
      dismiss () {
        this.isActive = false // move
        return new Promise((resolve) => { this.dismissCallback = resolve })
      }
    },
    mounted () {
      // mounted before data ready, so no need to judge the `dismissOnPageChange` value
      this.unreg = registerListener(window, 'popstate', this.dismissOnPageChangeHandler, {capture: false})
    },
    components: {
      Button
    }
  }
</script>

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
<style lang="scss" src="./style.scss"></style>
<script type="text/javascript">
  import Button from '../button'
  import popupExtend from '../../util/popup-extend'

  export default {
    name: 'Toast',
    extends: popupExtend,
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
      // execute when component closed and animate done
      onDismiss: {
        type: Function,
        default: function () {}
      },
      mode: {
        type: String,
        default () { return this.$config && this.$config.get('mode', 'ios') || 'ios' }
      }
    },
    data () {
      return {
        timer: null // timer
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
      /**
       * click close button to close
       * @private
       * */
      cbClick () {
        return this.dismiss().then(() => {
          this.onDismiss && this.onDismiss()
        })
      },

      beforePresent () {
        if (!this.showCloseButton) {
          this.timer = window.setTimeout(() => {
            this.timer = null
            this.dismiss().then(() => {
              this.onDismiss && this.onDismiss()
            })
          }, this.duration)
        }
      },

      beforeDismiss () {
        this.timer && window.clearTimeout(this.timer)
      }
    },
    mounted () {},
    components: {
      'vm-button': Button
    }
  }
</script>

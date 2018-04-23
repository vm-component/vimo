<template>
    <div class="ion-toast-state" :class="[customerClass,modeClass]">
        <transition name="fade"
                    @before-enter="beforeEnter"
                    @after-enter="afterEnter"
                    @before-leave="beforeLeave"
                    @after-leave="afterLeave">
            <div v-show="isActive" class="toast-state-wrapper">
                <div class="toast-state-container">
                    <Spinner
                            class="toast-state-icon"
                            v-if="this.type && this.isLoading"
                            :color="this.spinner && this.spinner.color || 'light'"
                            :name="this.spinner && this.spinner.name || 'ios'"
                            :duration="this.spinner && this.spinner.duration || 0"
                            :paused="this.spinner && this.spinner.paused || false"
                    ></Spinner>
                    <i v-if="this.type && !this.isLoading" class="toast-state-icon" :class="[typeClass]"></i>
                    <div class="toast-state-message" id="toast-hdr" v-if="message">{{message}}</div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script type="text/javascript">
  import popupExtend from '../../util/popup-extend'
  import Spinner from '../spinner/index'

  export default {
    name: 'IconToast',
    components: {Spinner},
    extends: popupExtend,
    props: {
      mode: {
        type: String,
        default () { return this.$config && this.$config.get('mode', 'ios') || 'ios' }
      },
      'type': {
        type: String,
        validator (val) {
          if (val) {
            return ~[
              'success',
              'fail',
              'offline',
              'loading'
            ].indexOf(val)
          } else {
            return true
          }
        }
      },
      spinner: {
        type: Object,
        validator (val) {
          let attr = ['color', 'name', 'duration', 'paused']
          let keys = Object.keys(val)
          return keys.every((item) => attr.indexOf(item))
        }
      },
      message: {
        type: String,
        require: true
      },
      duration: {
        type: Number,
        default: 3000
      },
      cssClass: String,
      // execute when component closed and animate done
      onDismiss: {
        type: Function,
        default: function () {}
      }
    },
    data () {
      return {
        timer: null // timer
      }
    },
    computed: {
      isLoading () {
        return this.type === 'loading'
      },
      modeClass () {
        return `toast-state-${this.mode}`
      },
      typeClass () {
        return this.type ? `toast-state-${this.type}` : null
      },
      transitionClass () {
        return `fade`
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
        this.timer = window.setTimeout(() => {
          this.timer = null
          this.dismiss().then(() => {
            this.onDismiss && this.onDismiss()
          })
        }, this.duration)
      },

      beforeDismiss () {
        this.timer && window.clearTimeout(this.timer)
      }
    }
  }
</script>

<template>
    <div class="ion-modal">
        <Backdrop :enableBackdropDismiss="enableBackdropDismiss" :hidden="!showBackdrop" :bdClick="bdClick"
                  :isActive="isActive"></Backdrop>
        <transition
                :name="transitionClass"
                @before-enter="beforeEnter"
                @after-enter="afterEnter"
                @before-leave="beforeLeave"
                @after-leave="afterLeave">
            <div class="modal-wrapper" v-show="isActive">
                <!--用户自定义的port位置-->
                <div class="modalPageLoadPort" ref="modalViewport"></div>
            </div>
        </transition>
    </div>
</template>
<style lang="scss">
    @import "./modal";

    // transitioName = 'modal-zoom'
    .modal-zoom-enter-active, .modal-zoom-leave-active {
        transform: scale(1);
        opacity: 1;
    }

    .modal-zoom-enter, .modal-zoom-leave-active {
        transform: scale(0.9);
        opacity: 0.01;
    }

    // transitioName = 'modal-fade'
    .modal-fade-enter-active, .modal-fade-leave-active {
        opacity: 1;
    }

    .modal-fade-enter, .modal-fade-leave-active {
        opacity: 0.01;
    }


</style>
<script type="text/javascript">
  import Vue from 'vue'
  import { Backdrop } from '../backdrop'
  export default{
    name: 'Modal',
    props: {
      mode: {
        type: String,
        default () { return this.$config && this.$config.get('mode') || 'ios' }
      },

      // 放入的页面组件
      component: Object,
      // 传递给页面的数据
      data: Object,
      onDismiss: Function,
      showBackdrop: {
        type: Boolean,
        default: true
      },
      enableBackdropDismiss: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        enabled: false,
        bdDismiss: false,
        isActive: false,

        // promise
        presentCallback: null,
        dismissCallback: null
      }
    },
    computed: {
      transitionClass () {
        return `modal-${this.mode}`
      },
      modalViewportElement () {
        return this.$refs.modalViewport
      }
    },
    methods: {

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
       * Animate Hooks
       * */
      beforeEnter () {
        this.enabled = false // 不允许过渡中途操作
        this.$app && this.$app.setEnabled(false, 400)
      },
      afterEnter () {
        this.presentCallback()
        this.enabled = true
      },
      beforeLeave () {
        this.enabled = false
        this.$app && this.$app.setEnabled(false, 400)
      },
      afterLeave () {
        this.dismissCallback()
        // 删除DOM
        this.$el.remove()
        this.enabled = true
      },

      /**
       * 开启关闭值操作当前的组件
       * */
      present () {
        this.isActive = true
        return new Promise((resolve) => { this.presentCallback = resolve })
      },
      dismiss (dataBack) {
        if (this.isActive) {
          this.isActive = false
          this.onDismiss && this.onDismiss(dataBack)
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
      }
    },
    mounted () {
      // 页面挂载
      const Component = Vue.extend(this.component)
      setTimeout(() => {
        // eslint-disable-next-line no-new
        new Component({
          el: this.modalViewportElement,
          $data: this.data
        })
      }, 0)
    },
    components: {
      'Backdrop': Backdrop
    }
  }
</script>

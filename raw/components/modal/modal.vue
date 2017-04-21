<template>
    <div class="ion-modal">
        <Backdrop :enableBackdropDismiss="false"
                  :isActive="isActive"></Backdrop>
        <transition
                :name="transitionClass"
                v-on:before-enter="_beforeEnter"
                v-on:after-enter="_afterEnter"
                v-on:before-leave="_beforeLeave"
                v-on:after-leave="_afterLeave">
            <div class="modal-wrapper" v-show="isActive">
                <!--用户自定义的port位置-->
                <div class="modalPageLoadPort"></div>
            </div>
        </transition>
    </div>
</template>
<style lang="scss">
    @import "./modal";
    @import "./modal.ios";
    @import "./modal.md";
</style>
<script>
  /**
   * @module Component/Modal
   * @description
   *
   * Model组件用于当前页面的补充
   * */
  import { Backdrop } from '../backdrop'
  export default{
    name: 'Modal',
    props: {
      name: [String],
      position: [String],
      mode: {
        type: String,
        default(){return window.VM && window.VM.config.get('mode', 'ios') || 'ios'}
      },
    },
    data(){
      return {
        enabled: false,
        bdDismiss: false,
        isActive: false,
//        mode: window.VM && window.VM.config.get('mode', 'ios') || 'ios',

        // promise
        presentCallback: null,
        dismissCallback: null,
      }
    },
    computed: {
      transitionClass(){
        return `modal-${this.mode}`
      }
    },
    methods: {
      /**
       * Animate Hooks
       * */
      _beforeEnter () {
        this.enabled = false // 不允许过渡中途操作
        this.$app && this.$app.setEnabled(false, 400)
      },
      _afterEnter (el) {
        this.enabled = true
        this.presentCallback(el)
      },
      _beforeLeave () {
        this.enabled = false
        this.$app && this.$app.setEnabled(false, 400)
      },
      _afterLeave (el) {
        this.enabled = true
        this.dismissCallback(el)
        // 删除DOM
        this.$el.remove()
      },

      /**
       * 开启关闭值操作当前的组件
       * */
      _present(){
        const _this = this
        _this.isActive = true
        console.debug(_this.isActive)
        return new Promise((resolve) => {this.presentCallback = resolve})
      },
      _dismiss(){
        this.isActive = false
        return new Promise((resolve) => {this.dismissCallback = resolve})
      },
    },
    components: {
      'Backdrop': Backdrop
    }
  }
</script>


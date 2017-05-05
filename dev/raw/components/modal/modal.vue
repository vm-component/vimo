<template>
    <div class="ion-modal">
        <Backdrop :enableBackdropDismiss="false"
                  :isActive="isActive"></Backdrop>
        <transition
                :name="transitionClass"
                @before-enter="beforeEnter"
                @after-enter="afterEnter"
                @before-leave="beforeLeave"
                @after-leave="afterLeave">
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
<script type="text/javascript">

  import { Backdrop } from '../backdrop'
  export default{
    name: 'Modal',
    props: {
      name: [String],       // 名称, 还未使用
      position: [String],   // 开启位置, 还未使用
      mode: {
        type: String,
        default () { return this.$config.get('mode') || 'ios' }
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
      }
    },
    methods: {
      /**
       * Animate Hooks
       * */
      beforeEnter () {
        this.enabled = false // 不允许过渡中途操作
        this.$app && this.$app.setEnabled(false, 400)
      },
      afterEnter (el) {
        this.enabled = true
        this.presentCallback(el)
      },
      beforeLeave () {
        this.enabled = false
        this.$app && this.$app.setEnabled(false, 400)
      },
      afterLeave (el) {
        this.enabled = true
        this.dismissCallback(el)
        // 删除DOM
        this.$el.remove()
      },

      /**
       * 开启关闭值操作当前的组件
       * */
      _present () {
        this.isActive = true
        return new Promise((resolve) => { this.presentCallback = resolve })
      },
      _dismiss () {
        this.isActive = false
        return new Promise((resolve) => { this.dismissCallback = resolve })
      }
    },
    components: {
      'Backdrop': Backdrop
    }
  }
</script>

<template>
    <div class="ion-modal">
        <Backdrop
                :enableBackdropDismiss="enableBackdropDismiss"
                :hidden="!showBackdrop"
                :bdClick="bdClick"
                :isActive="isActive"></Backdrop>
        <transition
                :name="transitionClass"
                @before-enter="beforeEnter"
                @after-enter="afterEnter"
                @before-leave="beforeLeave"
                @after-leave="afterLeave">
            <div class="modal-wrapper" v-show="isActive">
                <!--page in here-->
                <div class="modalPageLoadPort" ref="modalViewport"></div>
            </div>
        </transition>
    </div>
</template>
<script type="text/javascript">
  import Vue from 'vue'
  import Backdrop from '../backdrop'
  import * as appComponentManager from '../util/appComponentManager'

  const NOOP = () => {}

  export default {
    name: 'Modal',
    props: {
      animateName: String,
      // 放入的页面组件
      component: [Object, String, Function, Promise],
      // 传递给页面的数据
      pageData: Object,
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
        presentCallback: NOOP,
        dismissCallback: NOOP
      }
    },
    computed: {
      transitionClass () {
        return this.animateName ? `modal-${this.animateName}` : `modal`
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
        // 在App组件中记录, 便于devtool中debug
        // add comp in app comp
        appComponentManager.addChild(this)
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

          // 在App组件中记录, 便于devtool中debug
          appComponentManager.removeChild(this)
          return new Promise((resolve) => { this.dismissCallback = resolve })
        } else {
          return new Promise((resolve) => { resolve() })
        }
      },
      init (component) {
        // 页面挂载
        const Component = Vue.extend(component)
        // TODO: 这部分和Content组件相关, Content组件需要调整
        window.setTimeout(() => {
          this.$nextTick(() => {
            // eslint-disable-next-line no-new
            var PageComponent = new Component({
              el: this.modalViewportElement,
              data: this.pageData,
              $data: this.pageData // 为了兼容
            })
            this.$children.push(PageComponent)
          })
        }, 0)
      }
    },
    created () {
      let getType = (val) => Object.prototype.toString.call(val).match(/^(\[object )(\w+)\]$/i)[2].toLowerCase()
      if (getType(this.component) === 'object') {
        this.init(this.component)
      } else if (getType(this.component) === 'function') {
        this.component((component) => {
          this.init(component)
        })
      } else if (getType(this.component) === 'promise') {
        this.component.then((component) => {
          this.init(component)
        })
      } else if (getType(this.component) === 'string') {
        // 如果 this.component 是html模板string的话
        this.htmlComponent = this.component
      } else {
          /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production') {
          console.error('props of "component" must pass in right value!')
        }
      }
    },
    components: {
      'Backdrop': Backdrop
    }
  }
</script>
<style lang="less">
    @import "modal.less";
    @import "modal.ios.less";
    @import "modal.md.less";
</style>
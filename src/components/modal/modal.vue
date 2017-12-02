<template>
    <div class="ion-modal">
        <Backdrop
                :enableBackdropDismiss="enableBackdropDismiss"
                :hidden="!showBackdrop"
                :bdClick="bdClick"
                :isActive="isActive"></Backdrop>
        <transition
                :name="animateName"
                @before-enter="beforeEnter"
                @after-enter="afterEnter"
                @before-leave="beforeLeave"
                @after-leave="afterLeave">
            <div class="modal-wrapper" v-show="isActive">
                <!--page in here-->
                <component :is="thisComponent" :data="data"></component>
            </div>
        </transition>
    </div>
</template>
<style lang="scss" src="./modal.scss"></style>
<script type="text/javascript">
  import Backdrop from '../backdrop'
  import popupExtend from '../../util/popup-extend'
  import prepareComponent from '../../util/prepare-component'

  export default {
    name: 'Modal',
    extends: popupExtend,
    provide () {
      const _this = this
      return {
        modalComponent: _this
      }
    },
    props: {
      animateName: String,
      // 放入的页面组件
      component: [Object, String, Function, Promise],
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
        bdDismiss: false,
        thisComponent: null
      }
    },
    computed: {
      modalViewportElement () {
        return this.$refs.modalViewport
      }
    },
    methods: {
      bdClick () {
        if (this.enabled && this.enableBackdropDismiss) {
          this.dismiss()
        }
      },

      beforeDismiss (data) {
        this.onDismiss && this.onDismiss(data)
      }
    },
    created () {
      prepareComponent(this.component).then((component) => {
        this.thisComponent = component
      }, () => {
        // 如果不是 Component 则当做 html字符串处理
        this.thisComponent = this.component
      })
    },
    components: {
      'Backdrop': Backdrop
    }
  }
</script>

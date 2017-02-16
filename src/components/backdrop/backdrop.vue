<template>
  <transition
    name="backdrop"
    v-on:before-enter="_beforeEnter"
    v-on:after-leave="_afterLeave">
    <div class="ion-backdrop" @click="onBdClick" :class="{'backdrop-no-tappable':!enableBackdropDismissLocal}"
         v-show="isActiveLocal"></div>
  </transition>
</template>
<script type="text/ecmascript-6">
  export default{
    name: 'ion-backdrop',
    data(){
      return {
        // 定义本地参数
        isActiveLocal: false, // 控制权由present/dismiss控制
        enableBackdropDismissLocal: true,
        bdClickLocal: this.bdClick,
        isOpen:false, // 标示当前backdrop的开启状态, isActiveLocal为组件自身维护
      }
    },
    props: {
      enableBackdropDismiss: {
        type: Boolean,
        default: true
      },
      //  isActive
      isActive: {
        type: Boolean,
        default: false
      },
      bdClick: {
        type: Function,
        default(){
          return function () {}
        }
      },
    },
    watch: {
      isActive () {
        this.isOpen = this.isActive;
        this.isActiveLocal = this.isActive;
      },
      enableBackdropDismiss () {
        this.enableBackdropDismissLocal = this.enableBackdropDismiss
      },

    },
    methods: {
      // private
      // 过渡钩子
      _beforeEnter (el) {
        this.$emit('$backdropShown');
        this.$eventBus.$emit('$backdropShown');
      },
      _afterLeave (el) {
        this.$emit('$backdropHidden');
        this.$eventBus.$emit('$backdropHidden');
      },

      /**
       * 当点击backdrop执行的动作, 前提是enableBackdropDismiss必须开启
       * */
      onBdClick(){
        if (this.enableBackdropDismissLocal && !!this.bdClickLocal) {
          this.bdClickLocal();
        }
      },

      // 开启
      present (options = null) {
        if (!!options) {
          this.enableBackdropDismissLocal = !!options.enableBackdropDismiss;
          if(!!options.bdClick && typeof options.bdClick === 'function'){
            this.bdClickLocal = options.bdClick;
          }else{
            this.bdClickLocal = function () {};
          }
        }
        this.isOpen = this.isActiveLocal = true;
      },
      // 关闭
      dismiss () {
        this.isOpen = this.isActiveLocal = false;
      },
    },
  }
</script>
<style lang="scss">
  @import './backdrop';
  // transition
  @import '../../transitions/backdrop';
</style>

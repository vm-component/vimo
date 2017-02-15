<template>
  <transition
    name="fade"
    v-on:before-enter="_beforeEnter"
    v-on:after-leave="_afterLeave">
    <div class="ion-backdrop" :class="{'backdrop-no-tappable':!enableBackdropDismiss}" v-show="isActive"></div>
  </transition>
</template>
<script type="text/ecmascript-6">
  export default{
    name: 'ion-backdrop',
    data(){
      return {
        isEnable: this.isActive
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

      // //public
      // // 开启
      // retain () {
      //   this.isEnable = true;
      // },
      // // 关闭
      // release () {
      //   if (this.enableBackdropDismiss) {
      //     this.isEnable = false;
      //   }
      // },
    },
  }
</script>
<style scoped lang="scss">
  // Backdrop
  // --------------------------------------------------
  $backdrop-color: #000 !default;
  $z-index-backdrop: 10;

  .ion-backdrop {
    position: absolute;
    top: 0;
    left: 0;
    z-index: $z-index-backdrop;
    display: block;

    width: 100%;
    height: 100%;

    background-color: $backdrop-color;
    opacity: .4;
    transform: translateZ(0);
  }

  .ion-backdrop.backdrop-no-tappable {
    cursor: auto;
  }

  /*fade animate class*/
  .fade-enter-active, .fade-leave-active {
    transition: opacity 400ms;
  }

  .fade-enter, .fade-leave-active {
    opacity: 0
  }

</style>

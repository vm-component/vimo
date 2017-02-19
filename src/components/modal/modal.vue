<template>
  <div class="ion-modal">
    <!--<ion-backdrop @click="bdClick()" :class="{'backdrop-no-tappable':!bdDismiss}"></ion-backdrop>-->

    <transition
      name="modal"
      v-on:before-enter="_beforeEnter"
      v-on:after-enter="_afterEnter"
      v-on:before-leave="_beforeLeave"
      v-on:after-leave="_afterLeave">

      <div class="modal-wrapper" v-show="isActive">
        <!--<slot></slot>-->
        <div id="modalPageLoadPort"></div>
        <!--<ion-page>-->
          <!--<ion-header>-->
            <!--<ion-navbar>-->
              <!--<ion-title title="ModalInPage">ModalInPage</ion-title>-->
            <!--</ion-navbar>-->
          <!--</ion-header>-->
          <!--<ion-content padding>-->
            <!--<h4>1 Hello Modal!</h4>-->
            <!--<h4>2 Hello Modal!</h4>-->
            <!--<h4>3 Hello Modal!</h4>-->
            <!--<h4>4 Hello Modal!</h4>-->
          <!--</ion-content>-->
        <!--</ion-page>-->


        <!--<div #viewport nav-viewport></div>-->
      </div>

    </transition>

  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    name: 'ion-modal',
    data(){
      return {
        enabled: false,
        bdDismiss: false,
        isActive: false,



        // promise
        presentCallback: null,
        dismissCallback: null,
      }
    },
    watch: {},
    computed: {},
    methods: {
      /**
       * Animate Hooks
       * */
      _beforeEnter () {
        this.enabled = false; // 不允许过渡中途操作
        this.$setEnabled(false, 400)
      },
      _afterEnter (el) {
        this.enabled = true;
        this.presentCallback(el);
      },
      _beforeLeave () {
        this.enabled = false;
        this.$setEnabled(false, 400)
      },
      _afterLeave (el) {
        this.enabled = true;
        this.dismissCallback(el);
        // 删除DOM
        this.$el.remove();
      },

      /**
       * backdrop click
       * */
      bdClick(){

      },

      _present(){
        this.isActive = true;
        return new Promise((resolve) => {this.presentCallback = resolve})
      },
      _dismiss(){
        this.isActive = false;
        return new Promise((resolve) => {this.dismissCallback = resolve})
      },
    },
    created () {
      console.debug('modal.vue-created')
    },
    mounted () {
      console.debug('modal.vue-mounted')
    },
    activated(){
      console.debug('modal.vue-activated')
    },
    components:{
    }
  }
</script>
<style lang="scss">
  @import "./modal";
  @import "./modal.ios";
  @import "./modal.md";
  @import "./modal.wp";
  // transition
  @import "../../transitions/modal";
</style>

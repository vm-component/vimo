<template>
  <div class="ion-menu"
       :type="type"
       :side="side"
       :class="{'show-menu':showMenu}">
    <transition
      :name="animationName"
      v-on:before-enter="_beforeEnter"
      v-on:before-leave="_beforeLeave"
      v-on:after-leave="_afterLeave">
      <div class="menu-inner" v-if="isOpen">
        <slot></slot>
      </div>
    </transition>
    <ion-backdrop
      @click.native="$closeMenu()"
      :isActive="showBackdrop"
      :class="{'show-backdrop':showBackdrop}"></ion-backdrop>
  </div>
</template>
<style lang="scss">
  @import './menu';
  @import './menu.ios';

  /*slideInLeft*/
  /*fade animate class*/
  .slideInLeft-enter-active,
  .slideInLeft-leave-active {
    transform: translateX(0);
    transition: all ease 300ms;
  }

  .slideInLeft-enter,
  .slideInLeft-leave-active {
    transform: translateX(-100%);
    transition: all ease 300ms;
  }

  /*fade animate class*/
  .slideInLeft1-enter-active,
  .slideInLeft1-leave-active {
    transform: translateX(0);
    transition: all ease 300ms;
  }

  .slideInLeft1-enter,
  .slideInLeft1-leave-active {
    transform: translateX(-100%);
    transition: all ease 600ms;
  }

</style>
<script type="text/ecmascript-6">
  /**
   * 注意：menu是全局的组件，应该在App.vue中定义，而不是在业务文件中
   * */
  export default{
    name: 'ion-menu',
    data(){
      return {
        isOpen: false, // menu-inner 动画控制
        showMenu: false, //
        showBackdrop: false, // 是否显示半灰色蒙层
        animationName: '', // 过度动画名称
      }
    },
    props: {
      /**
       * A reference to the content element the menu should use.
       * 在content上的索引，用于menu调用，即，一个App可以有多个menu。
       * */
      content: {},
      /**
       * An id for the menu.
       * */
      id: {
        type: String,
      },
      /**
       * Which side of the view the menu should be placed. Default "left".
       * menu从哪个位置出来
       * */
      side: {
        type: String,
        default: 'left'
      },
      /**
       * The display type of the menu. Default varies based on the mode,
       * see the menuType in the config. Available options: "overlay", "reveal", "push".
       * */
      type: {
        type: String,
        default: function () {
          return this.$config.menuType
        }
      },
      /**
       * Whether or not the menu should be enabled. Default true.
       * */
      enabled: {
        type: Boolean,
        default: true
      },
      // /**
      //  * Whether or not swiping the menu should be enabled. Default true.
      //  * */
      // swipeEnabled: {
      //   type: Boolean,
      //   default: true
      // },
      /**
       * Whether or not the menu should persist on child pages. Default false.
       * */
      persistent: {
        type: Boolean,
        default: false
      },
    },
    watch: {},
    computed: {
    },
    methods: {
      // 过渡钩子
      _beforeEnter (el) {
        this.$eventBus.$emit('ionOpen');
      },
      _beforeLeave(){
        this.$eventBus.$emit('ionClosing');
      },
      _afterLeave (el) {
        this.$eventBus.$emit('ionClose');
        this.showMenu = false;
      },

      /**
       * @param {boolean} shouldOpen
       * @param {boolean} animated
       * @return {promise}
       * */
      setOpen(shouldOpen, animated = true) {
        if (shouldOpen) {
          this.showMenu = shouldOpen;
          if (this.type === 'overlay') {
            this.showBackdrop = true;
            this.animationName = 'slideInLeft';
          }
          if(this.type === 'push'){
            this.animationName = 'slideInLeft1';
          }
        }else{
          this.showBackdrop = false;
        }




        this.isOpen = shouldOpen;

        console.log('setOpen')
        console.log(this.showMenu)
        console.log(this.isOpen)

      },

      openMenu(){
        return this.enabled && this.setOpen(true);
      },
      closeMenu(){
        return this.enabled && this.setOpen(false);
      },
      toggleMenu(){
        return this.enabled && this.setOpen(!this.isOpen);
      },
      enable(){},
    },
    created(){
      const _this = this
      _this.$eventBus.$emit('$menuReady', _this);
    },
    mounted(){

    },
    activated(){},
    components: {}
  }
</script>

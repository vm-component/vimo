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
      <div class="menu-inner" v-show="isOpen">
        <slot></slot>
      </div>
    </transition>
    <ion-backdrop
      @click.native="closeMenu()"
      :isActive="showBackdrop"
      :class="{'show-backdrop':showBackdrop}"></ion-backdrop>
  </div>
</template>
<style lang="scss">
  @import './menu';
  @import './menu.ios';

  /*slideInLeft*/
  /*animate class*/
  .slideInLeft-enter-active,
  .slideInLeft-leave-active {
    transform: translateX(0);
  }

  .slideInLeft-enter,
  .slideInLeft-leave-active {
    transform: translateX(-100%);
    transition: all cubic-bezier(0.4, 0.0, 0.6, 1) 280ms;
  }

  /*slideInRight*/
  /*animate class*/
  .slideInRight-enter-active,
  .slideInRight-leave-active {
    transform: translateX(0);
  }

  .slideInRight-enter,
  .slideInRight-leave-active {
    transform: translateX(100%);
    transition: all cubic-bezier(0.4, 0.0, 0.6, 1) 280ms;
  }


</style>
<script type="text/ecmascript-6">
  /**
   * 注意：menu是全局的组件，应该在App.vue中定义，而不是在业务文件中
   * */
  import { firstUpperCase } from '../../../utils/assist';

  export default{
    name: 'ion-menu',
    data(){
      return {
        isOpen: false, // menu-inner 动画控制
        showMenu: false, //
        showBackdrop: false, // 是否显示半灰色蒙层
        animationName: '', // 过度动画名称
        // currentMenuId:'', // 当前激活的menuId
        currentMenuIns: '', // 当前激活的menuId的实例
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
    computed: {},
    methods: {
      // 过渡钩子
      _beforeEnter (el) {
        this.$setEnabled(false,300);
      },
      _beforeLeave(){
        this.$setEnabled(false, 300);
      },
      _afterLeave (el) {
        this.$eventBus.$emit('ionClose');
        // 置空！！
        this.$menu.id = null;
        // this.$setEnabled(true);
        this.showMenu = false;
      },

      /**
       * @param {boolean} shouldOpen
       * @param {object} menuIns
       * @return {promise}
       * */
      setOpen(shouldOpen, menuIns) {
        const _this = this;
        if (shouldOpen) {
          menuIns.showMenu = shouldOpen;
          if (menuIns.type === 'overlay') {
            menuIns.showBackdrop = true;
            // 确定左右动画
            menuIns.animationName = 'slideIn' + firstUpperCase(menuIns.side);
          }
        } else {
          menuIns.showBackdrop = false;
        }

        menuIns.isOpen = shouldOpen;

        return new Promise(function (resolve) {
          let _presentHandler = function () {
            _this.$el.removeEventListener('transitionend', _presentHandler);
            resolve('ActionSheet Present Success!');
          };
          _this.$el.addEventListener('transitionend', _presentHandler);
        });
      },

      openMenu(menuId){
        this.$menu.id = menuId;
        this.$eventBus.$emit('ionOpen', menuId);
        let _menuIns = this.$componentIns.$menus[menuId];
        return _menuIns.enabled && _menuIns.setOpen(true, _menuIns);
      },

      closeMenu(){
        let _menuId = this.$menu.id;
        this.$eventBus.$emit('ionClosing', _menuId);
        let _menuIns = this.$componentIns.$menus[_menuId];
        return _menuIns.enabled && _menuIns.setOpen(false, _menuIns);
      },

      /**
       * toggle Menu
       * @params {String} menuId - 标识menu的id
       * */
      toggleMenu(menuId){
        this.$menu.id = menuId;
        let _menuIns = this.$componentIns.$menus[menuId];
        return _menuIns.enabled && _menuIns.setOpen(!_menuIns.isOpen, _menuIns);
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

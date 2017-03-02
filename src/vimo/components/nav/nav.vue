<template>
  <nav class="ion-nav" @touchstart="tapToCloseMenu"
       :class="[menuClass,{'menu-content-open':isMenuOpen}]"
       :style="menuStyleObj">
    <slot></slot>
  </nav>
</template>
<style lang="scss">
</style>
<script type="text/ecmascript-6">
  export default{
    name: 'Nav',
    props: {},
    data(){
      return {
        // -------- Nav --------

        // ----------- Menu -----------
        menuStyleObj: {
          transform: '',
        },

        isMenuOpen: false, // ion-menu开启
        menuId: '', // menuId
        menuType: '', // "overlay", "reveal",  这里只处理 reveal
        menuSide: 'left', // 方向
        menuClass: 'menu-content',
      }
    },
    methods: {
      // -------- Nav --------

      // ----------- Menu -----------
      /**
       * 点击nav关闭Menu
       * */
      tapToCloseMenu(){
        this.isMenuOpen && this.$menu.close();
      },

      /**
       * 设置Menu的信息
       * */
      setMenuInfo(menuId){
        this.menuId = menuId;
        this.menuSide = this.$menu.menuIns[menuId].side;
        this.menuType = this.$menu.menuIns[menuId].type;
        this.menuClass += (' menu-content-' + this.menuType)
      },

      /**
       * 初始化menu组件对应的监听处理
       * */
      initMenu(){
        const _this = this;
        // 监听menu的组件事件
        _this.$eventBus.$on('onMenuOpen', function (menuId) {
          console.debug('$on onMenuOpen-' + menuId)
          _this.setMenuInfo(menuId);
          _this.isMenuOpen = true;
          if (_this.menuType === 'reveal' || _this.menuType === 'push') {
            if (_this.menuSide === 'left') {
              _this.menuStyleObj['transform'] = 'translateX(264px)';
            } else {
              _this.menuStyleObj['transform'] = 'translateX(-264px)';
            }
          }
        });
        _this.$eventBus.$on('onMenuClosing', function (menuId) {
          console.debug('$on onMenuClosing-' + menuId);
          _this.isMenuOpen = false;
          if (_this.menuType === 'reveal' || _this.menuType === 'push') {
            _this.menuStyleObj['transform'] = 'translateX(0)';
          }

        });
        _this.$eventBus.$on('onMenuClosed', function (menuId) {
          console.debug('$on onMenuClosed-' + menuId)
        });
      }
    },
    created(){
      // 初始化menu组件对应的监听处理
      this.initMenu();
    },
    mounted () {

    }
  }
</script>

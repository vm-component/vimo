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

        menuStyleObj: {
          transform: '',
        },
        // hasMenuComponent: false, //是否存在ion-menu组件
        isMenuOpen: false, // ion-menu开启
        menuId: '',
        menuType: '',
        menuSide: 'left',
        menuClass: 'menu-content',

      }
    },
    methods: {

      // ----------- Menu -----------
      /**
       * 点击nav关闭Menu
       * */
      tapToCloseMenu(){
        if (this.isMenuOpen) {
          this.$menu.close();
        }
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

      // -------- Nav --------



    },
    mounted () {
      const _this = this;
      _this.$parent.$children.forEach(function (item) {
        if (item.$options._componentTag === 'ion-menu') {

        }
      });

      // 监听menu的组件事件
      _this.$eventBus.$on('ionOpen', function (menuId) {
        // console.debug('$on ionOpen')
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
      _this.$eventBus.$on('ionClosing', function () {
        // console.debug('$on ionClosing');
        _this.isMenuOpen = false;
        if (_this.menuType === 'reveal' || _this.menuType === 'push') {
          _this.menuStyleObj['transform'] = 'translateX(0)';
        }

      });
      _this.$eventBus.$on('ionClose', function () {
        // console.debug('$on ionClose')
      });

    }
  }
</script>

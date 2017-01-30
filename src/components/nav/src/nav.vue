<template>
  <div class="ion-nav" @touchstart="tapToCloseMenu"
       :class="[menuClass,{'menu-content-open':isMenuOpen}]"
       :style="menuStyleObj">
    <slot></slot>
  </div>
</template>
<style lang="scss">
  .menu-content {
    transition: all ease 400ms;
  }
</style>
<script type="text/ecmascript-6">
  /**
   * @module
   * @desc
   * @param
   * @return
   * @example
   * */
  export default{
    name: 'ion-nav',
    props: {},
    data(){
      return {
        menuStyleObj: {
          transform: '',
        },
        hasMenuComponent: false, //是否存在ion-menu组件
        isMenuOpen: false, // ion-menu开启
        menuType: '',
        menuClass: 'menu-content',
      }
    },
    methods: {
      tapToCloseMenu(){
        if (this.hasMenuComponent && this.isMenuOpen) {
          this.$closeMenu();
        }
      },
    },
    computed: {},
    mounted () {
      const _this = this;
      _this.$parent.$children.forEach(function (item) {
        if (item.$options._componentTag === 'ion-menu') {
          _this.hasMenuComponent = true;
          // 只获取注册的menu组件，其实可以很多。
          _this.menuType = _this.$componentIns.$menu.type;
          _this.menuClass += (' menu-content-' + _this.menuType)

        }
      });

      // 监听menu的组件事件
      _this.$eventBus.$on('ionOpen', function () {
        console.debug('$on ionOpen')
        _this.isMenuOpen = true;
        if(_this.menuType === 'reveal' || _this.menuType === 'push'){
          _this.menuStyleObj['transform'] = 'translateX(264px)';
        }
        console.debug(_this.menuStyleObj)
      });

      _this.$eventBus.$on('ionClosing', function () {
        console.debug('$on ionClosing')
        _this.isMenuOpen = false;
        if(_this.menuType === 'reveal' || _this.menuType === 'push'){
          _this.menuStyleObj['transform'] = 'translateX(0)';
        }

      });
      _this.$eventBus.$on('ionClose', function () {
        console.debug('$on ionClose')
      });
    }
  }
</script>

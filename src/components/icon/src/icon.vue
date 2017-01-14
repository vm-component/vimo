<template>
  <i class="icon ion-icon"
     :class="[modeClass,colorClass,nameClass,iosClass,mdClass]"></i>
</template>
<style lang="scss">
  @import "icon";
  @import "icon.ios";
  @import "icon.md";
  @import "icon.wp";

  @import "scss/ionicons";


</style>
<script type="text/ecmascript-6">
  export default{
    props: {
      /**
       * 按钮color：primary、ghost、dashed、text、info、success、warning、error
       * */
      color: {
        type: String,
        default: '',
      },

      /**
       * The mode to apply to this component.
       * mode 按钮风格 ios/window/android/we/alipay
       * */
      mode: {
        type: String,
        default: 'ios',
      },

      /**
       * Icon to use. Will load the appropriate icon for each mode
       * */
      name: {
        type: String,
        default: '',
      },

      /**
       * Explicitly set the icon to use on ios
       * */
      ios: {
        type: String,
        default: '',
      },

      /**
       * Explicitly set the icon to use on MD
       * */
      md: {
        type: String,
        default: '',
      },

      /**
       * Whether or not the icon has an "active" appearance.
       * On iOS an active icon is filled in or full appearance,
       * and an inactive icon on iOS will use an outlined version
       * of the icon same icon. Material Design icons do not
       * change appearance depending if they're active or not.
       * The isActive property is largely used by the tabbar.
       * */
      isActive: {
        type: Boolean,
        default: false,
      }
    },
    data(){
      return {}
    },
    computed: {
      // 环境样式
      modeClass: function () {
        return !!this.mode ? `icon-${this.mode}` : '';
      },
      // 颜色
      colorClass: function () {
        return !!this.color ? (`icon-${this.mode}-${this.color}`) : ''
      },
      nameClass: function () {
        let val = this.name;
        if (!!this.name && !(/^md-|^ios-|^logo-/.test(val))) {
          // this does not have one of the defaults
          // so lets auto add in the mode prefix for them
          return 'ion-' + this.mode + '-' + val;
        } else {
          return val;
        }
      },
      iosClass: function () {
        return !!this.ios ? ('ion-ios' + '-' + this.ios) : '';
      },
      mdClass: function () {
        return !!this.md ? ('ion-md' + '-' + this.md) : '';
      },
    },
  }
</script>

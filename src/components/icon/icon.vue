<template>
    <i class="ion-icon" role="img" :class="[modeClass, colorClass]"></i>
</template>
<script>
  /**
   * @component Icon
   * @description
   *
   * ## 基础 / Icon图标
   *
   * 图标可以单独使用，也可以在一些组件中使用。
   * 设置icon的name时，实际呈现的图标会根据mode的设置而变化，当然可也可以分别指定在ios|md模式下呈现不同的图标。
   *
   * ### 如何引入
   * ```
   * // 引入
   * import VmIcon from 'vimo/lib/icon'
   * // 安装
   * Vue.component(VmIcon.name, VmIcon)
   * // 或者
   * export default{
   *   src: {
   *    VmIcon
   *  }
   * }
   * ```
   *
   * @props {String} [name]         - 图标名称，对用icon-ios-name|icon-md-name
   * @props {String} [ios]          - ios模式下呈现的图标名称
   * @props {String} [md]           - md模式下呈现的图标名称
   * @props {String} [color]        - 图标颜色
   *
   * @props {Boolean} [active]      - 是否激活(按下时的效果)
   *
   * @demo #/icon
   *
   * @usage
   * <!-- automatically uses the correct "star" icon depending on the mode -->
   * <vm-icon name="star"></vm-icon>
   *
   * <!-- explicity set the icon for each mode -->
   * <vm-icon ios="ios-home" md="md-home"></vm-icon>
   *
   * <!-- always use the same icon, no matter what the mode -->
   * <vm-icon name="ios-clock"></vm-icon>
   * <vm-icon name="logo-twitter"></vm-icon>
   **/
  import {isTrueProperty} from '../../util/util'
  import ThemeMixins from '../../themes/theme.mixins';

  export default {
    name: 'vm-icon',
    mixins: [ThemeMixins],
    data() {
      return {
        css: '',
        isActive: isTrueProperty(this.active)
      }
    },
    props: {
      name: {
        type: String,
        default: ''
      },
      ios: String,
      md: String,
      active: [String, Boolean]
    },
    computed: {
      iconName() {
        let name = this.name;
        if (!(/^md-|^ios-|^logo-/.test(name))) {
          // this does not have one of the defaults
          // so lets auto add in the mode prefix for them
          return this.mode + '-' + name;
        }
        return name;
      }
    },
    watch: {
      active(val) {
        this.isActive = isTrueProperty(val);

        this.update();
      }
    },
    mounted () {
      if (this.$parent.$options.name === 'vm-item') {
        this.setElementClass('item-icon', true)
      }

      this.update();
    },
    destroyed() {
      if (this.css) {
        this.setElementClass(this.css, false);
      }
    },
    methods: {
      update() {
        let iconName;

        if (this.ios && this.mode === 'ios') {
          iconName = this.ios;
        } else if (this.md && this.mode === 'md') {
          iconName = this.md;
        } else {
          iconName = this.iconName;
        }

        let iconMode = iconName.split('-', 2)[0];
        if (iconMode === 'ios' && this.isActive && iconName.indexOf('logo-') < 0 && iconName.indexOf('-outline') < 0) {
          iconName += '-outline';
        }

        let css = 'ion-' + iconName;
        if (this.css === css) {
          return;
        }
        if (this.css) {
          this.setElementClass(this.css, false);
        }
        this.css = css;
        this.setElementClass(css, true);

        let label = iconName.replace('ios-', '').replace('md-', '').replace('-', ' ');
        this.setElementAttribute('aria-label', label);
      }
    }
  };
</script>

<style lang="scss">
    @import 'icon';
    @import 'icon.ios';
    @import 'icon.md';
</style>
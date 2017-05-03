<template>
    <i class="ion-icon"
       :class="[colorClass,nameClass,itemClass,{'hide':hidden}]"></i>
</template>
<style lang="scss">
    @import "icon.scss";
</style>
<script>
  /**
   * @component Icon
   * @description
   *
   * ## 其他 / Icon组件
   *
   *
   * ### 感谢IONIC
   *
   * 因为Vimo是对Ionic的移植, 故Icon组件也是使用ionicons图标, ionicons地址[点这里](http://ionicons.com/), ionicon根据ios和Android提供了两种同类型不同风格的图标.
   *
   * 另外,ionicon的图标不多, 但是包含了大多数移动端使用场景的icon, 故这部分没有用font-awesome替换.
   *
   * ### 支持自定义
   *
   * 如果有需要其他类型的图片可以使用自定义图标. 这里, icon可以支持ionicons/自定义imgClass:
   *
   * ##### 1 .默认情况下使用ionicons图标
   *
   *   在name中传入ionicons的name即可(去除ion/mode信息)
   *
   * ```
   *  <Icon name="star"></Icon>                     -->  根据平台选择, ios:ion-ios-star, md:ion-md-star
   *  <Icon name="ios-star"></Icon>                 -->  在全平台都使用ion-ios-star图标
   *  <Icon name="star"></Icon>                     -->  根据平台mode  ->  ion-ios-star/ion-android-star
   *  <Icon ios="ios-home" md="md-home"></Icon>     -->  单独设定: ios平台使用ios-home, md平台使用md-home
   * ```
   *
   * ##### 2. 如果是自定义的图标icon
   *
   *    命名需要规范下, 用于区分ionicons.
   *
   * ```
   *  <Icon name="icon-star"></Icon>                -->  icon-star
   * ```
   *
   * ##### 3. 自定义激活的类 activeName
   * ```
   *  <Icon name="home" activeName="star"></Icon>  -->  设定激活的class图标
   * ```
   *
   * ### 如何引入
   * ```
   * // 引入
   * import { Icon } from 'vimo/components/icon'
   * // 安装
   * Vue.component(Icon.name, Icon)
   * // 或者
   * export default{
   *   components: {
   *    Icon
   *  }
   * }
   * ```
   *
   *
   *
   * @props {String} [mode='ios'] - 模式
   * @props {String} [color] - 颜色
   * @props {String|Boolean} [name] - icon的名称, 如果传入false, 则影藏图标
   * @props {String} [activeName] - Icon激活状态的Icon名称(默认只有ios有, 会在name后面加后缀: `${this.name}-outline`, 其他平台的需要自己传入值)
   * @props {Boolean} [isActive=true] - 表示是否未激活状态, 默认是激活状态
   * @props {String} [ios] - 强制使用ios的Icon
   * @props {String} [md] - 强制使用md的Icon
   *
   *
   * @demo http://xiangsongtao.com/vimo/#/icon
   *
   * */
  export default{
    name: 'Icon',
    props: {
      /**
       * 指定图标使用模式
       * */
      mode: {
        type: String,
        default(){ return window.VM && window.VM.config.get('iconMode') || 'ios' }
      },
      /**
       * 按钮color：
       * primary:    #007aff,
       * secondary:  #32db64,
       * danger:     #d91e18,
       * light:      #f4f4f4,
       * dark:       #222,
       * */
      color: [String],
      /**
       * icon的名字, 默认的名字
       * */
      name: [String,Boolean],

      /**
       * 激活状态的图标样式,
       * 如果未定义,则为:
       * ion -> `${this.name}-outline`
       * */
      activeName: [String],

      /**
       * 表示当前的图标的状态
       *
       * 特殊情况:
       * 当定义了activeIcon时, 则使用这个字段的值作为激活状态的图标
       *
       * 在name中设置normal状态的图标
       * 在activeName中设置激活状态的图标样式
       *
       * */
      isActive: {
        type: Boolean,
        default: true,
      },

      ios: [String],
      md: [String],
    },
    data(){
      return {
        nameClass: '', // 最终显示的nameClass
        itemClass: '',
        nameValue: null,
        hidden: false, // 是否隐藏图标
      }
    },
    watch: {
      isActive () {
        this.update();
      },
      name(){
        this.update();
      },
      activeName(){
        this.update();
      },
      ios(){
        this.update();
      },
      md(){
        this.update();
      },
    },
    computed: {
      // 颜色
      colorClass () {
        return !!this.color ? (`icon-${this.color}`) : ''
      },
    },
    methods: {
      getNameValue(val){
        if (!(/^md-|^ios-|^logo-|^icon-/.test(val))) {
          // this does not have one of the defaults
          // so lets auto add in the mode prefix for them
          return this.mode + '-' + val;
        } else {
          return val;
        }
      },
      update() {
        let iconName;

        this.hidden = !this.name
        if (this.hidden) return

        if (this.isActive && this.activeName) {
          this.nameValue = this.getNameValue(this.activeName)
        } else {
          this.nameValue = this.getNameValue(this.name)
        }

        if (this.ios && this.mode === 'ios') {
          // ios-star ios
          iconName = this.ios;
        } else if (this.md && this.mode === 'md') {
          // md-star md
          iconName = this.md;
        } else {
          // ios-star md-star icon-star
          iconName = this.nameValue;
        }

        let iconMode = iconName.split('-', 2)[0];
        if (iconMode === 'ios' && !this.isActive &&
          iconName.indexOf('logo-') < 0 &&
          iconName.indexOf('-outline') < 0) {
          //ios-star -> ios-star-outline
          iconName += '-outline';
        }
        //ios-star-outline -> ion-ios-star-outline
        //ios-star -> ion-ios-star-outline
        //icon-star -> icon-star
        if (iconMode === 'icon') {
          this.nameClass = iconName;
        } else {
          this.nameClass = 'ion-' + iconName;
        }
      },
    },
    created(){
      this.update();
    },
    mounted(){
      if (!!this.$parent.$el && this.$parent.$el.className && this.$parent.$el.className.indexOf('item') > -1) {
        //	button in items should add class of 'item-button'
        this.itemClass = 'item-icon';
      }

    }
  }
</script>

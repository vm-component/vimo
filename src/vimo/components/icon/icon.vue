<template>
  <i class="icon ion-icon"
     :class="[colorClass,nameClass,itemClass]"></i>
</template>
<style lang="scss">
  @import "icon.scss";
  @import "./ionicons/css/ionicons.css";
</style>
<script type="text/ecmascript-6">
  /**
   * Icon组件
   *
   * icon可以支持ionicons/自定义imgClass
   *
   * 1. 默认情况下使用ionicons图标, 在name中传入ionicons的name即可(去除ion/mode信息)
   *  <Icon name="star"></Icon>                     -->  根据平台选择, ios:ion-ios-star, md:ion-md-star
   *  <Icon name="ios-star"></Icon>                 -->  在全平台都使用ion-ios-star图标
   *  <Icon name="star"></Icon>                     -->  根据平台mode  ->  ion-ios-star/ion-android-star
   *  <Icon ios="ios-home" md="md-home"></Icon>     -->  单独设定: ios平台使用ios-home, md平台使用md-home
   *
   * 2. 如果是自定义的图标icon, 命名需要规范下, 用于区分ionicons.
   *  <Icon name="icon-star"></Icon>                -->  icon-star
   *
   * 3. 自定义激活的类 activeName
   *  <Icon name="home" activeName="star"></Icon>  -->  设定激活的class图标
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
        default: VM.config.get('iconMode', 'ios'),
      },
      /**
       * 按钮color：
       * primary:    #007aff,
       * secondary:  #32db64,
       * danger:     #d91e18,
       * light:      #f4f4f4,
       * dark:       #222,
       * */
      color: {
        type: String,
        default: '',
      },

      /**
       * icon的名字, 默认的名字
       * */
      name: {
        type: String,
        default: '',
      },

      /**
       * 激活状态的图标样式,
       * 如果未定义,则为:
       * ion -> `${this.name}-outline`
       * */
      activeName: {
        type: String,
        default: '',
      },

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

      ios: {
        type: String,
        default: '',
      },

      md: {
        type: String,
        default: '',
      },
    },
    data(){
      return {
        nameClass: '', // 最终显示的nameClass
        itemClass: '',

        nameValue: null,
        // activeNameValue: '', // 过滤后的值

        hidden: false, // 是否隐藏图标
      }
    },
    watch: {
      isActive () {
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

        this.hidden = (iconName === null);
        if (this.hidden) {
          return;
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

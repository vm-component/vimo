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
   *  <Icon mode="ios" name="star"></Icon>  -->  ion-ios-star
   *  <Icon name="star"></Icon>             -->  根据平台mode  ->  ion-ios-star/ion-android-star
   *
   * 2. 如果是自定义的图标icon, 命名需要规范下, 用于区分ionicons.
   *  <Icon name="icon-star"></Icon>        -->  icon-star
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
        default: VM.config.get('mode', 'ios') || 'ios',
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
        default: false,
      },

    },
    data(){
      return {
        nameClass: '', // 最终显示的nameClass
        itemClass: '',

        nameValue: '', // 过滤后的值
        activeNameValue: '', // 过滤后的值

      }
    },
    watch: {
      isActive () {
        this.init();
      },
    },
    computed: {
      // 颜色
      colorClass () {
        return !!this.color ? (`icon-${this.color}`) : ''
      },
    },
    methods: {

      // -------- private ---------

      /**
       * name的过滤规则
       * icon-star  ->    icon-star
       * star       ->    ion-star
       * (ios)star  ->    ion-ios-star
       * */
      getFilteredName(){
        let _name = this.name;
        if (_name.indexOf('icon-') === 0) {
          return _name
        } else {
          return `ion-${this.mode}-${_name}`
        }
      },

      /**
       * activeName的过滤规则
       * */
      getFilteredActiveName(){
        let _activeName = this.activeName;
        if (!!_activeName) {
          return _activeName
        } else {
          let _name = this.name;
          if (_name.indexOf('icon-') === 0) {
            return _name
          } else {
            return `ion-${this.mode}-${_name}-outline`
          }
        }
      },

      /**
       * 初始化
       * */
      init(){

        /**
         * 过滤后的name
         * */
        this.nameValue = this.getFilteredName();
        this.activeNameValue = this.getFilteredActiveName();

        /**
         * 是否为激活状态
         */
        if (this.isActive) {
          this.nameClass = this.activeNameValue;
        } else {
          this.nameClass = this.nameValue;
        }
      },
    },
    created(){
      this.init();
    },
    mounted(){

      if (!!this.$parent.$el && this.$parent.$el.className && this.$parent.$el.className.indexOf('item') > -1) {
        //	button in items should add class of 'item-button'
        this.itemClass += 'item-icon';
      }

    }
  }
</script>

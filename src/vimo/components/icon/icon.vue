<template>
  <i class="icon ion-icon"
     :class="[colorClass,nameClass,itemClass]"></i>
</template>
<style lang="scss">
  @import "icon";
  @import "./font-awesome/css/font-awesome.css";
</style>
<script type="text/ecmascript-6">
  export default{
    name: 'Icon',
    props: {

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
       * 如果未定义,则为:`${this.name}-o`
       * */
      activeName: {
        type: String,
        default: '',
      },

      /**
       * 表示当前的图标的状态
       * 这里使用fontawesome图标, 意味着, 当isActive为true时,
       * 需要给name的名字后面增加'-o'的字段, 表示为激活状态.
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
      /**
       * name的过滤规则
       * */
      getFilteredName(name){
        name = name.trim();

        if (name.indexOf('fa-') === 0) {
          return `fa ${name}`;
        }

        // 如果不是fa, 则直接将name当做class
        return name
      },

      /**
       * activeName的过滤规则
       * */
      getFilteredActiveName(){
        let name = this.activeName;
        if (!!name) {
          return this.getFilteredName(name)
        } else {
          if (this.name.indexOf('fa-') === 0) {
            // font-awesome 的激活状态是后面带'-o'
            return `fa ${this.name}` + '-o';
          } else {
            return ''
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
        this.nameValue = this.getFilteredName(this.name);
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

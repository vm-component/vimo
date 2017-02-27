<template>
  <section>
    <slot></slot>
  </section>
</template>
<script type="text/ecmascript-6">
  /**
   * !!Tab组件必须和Tabs组件配合使用!!
   *
   * Tab组件内部与路由结合, 因此应该包含:to属性, 用于跳转
   *
   * 此组件用于传输传递, 不具有DOM结构及生命周期
   *
   * 选中时的对外事件: onSelect
   *
   * */
  export default{
    name: 'Tab',
    props: {
      /**
       * 是否能选择
       * */
      enabled: {
        type: Boolean,
        default: true,
      },
      /**
       * 路由跳转
       * */
      to: {
        type: String,
        default: '',
      },
      /**
       * 是否显示
       * */
      show: {
        type: Boolean,
        default: true,
      },
      /**
       * 徽章显示值
       * */
      tabBadge: {
        type: String,
        default: '',
      },
      /**
       * 徽章颜色
       * */
      tabBadgeStyle: {
        type: String,
        default: '',
      },
      /**
       * tab的IconName
       * */
      tabIcon: {
        type: String,
        default: '',
      },
      /**
       * tab的tabTitle
       * */
      tabTitle: {
        type: String,
        default: '',
      },

      // TODO: tabUrlPath
      // string The URL path name to represent this tab within the URL.

      //TODO: tabsHideOnSubPages
      // boolean If true, hide the tabs on child pages.
    },
    methods: {
      /**
       * 获取当前Tab填入的信息
       * Tab只是一个参数搬运工, 在页面总不起作用!
       *
       * */
      getTabInfo(){

        let _tabId = this._uid;
        let hasTitle = !!this.tabTitle;
        let hasIcon = !!this.tabIcon;
        let hasTitleOnly = !!this.tabTitle && !this.tabIcon;
        let hasIconOnly = !!this.tabIcon && !this.tabTitle;
        let hasBadge = !!this.tabBadge;
        let disHover = VM.config.getBoolean('hoverCSS', false);

        return {
          _tabId,
          hasTitle,
          hasIcon,
          hasTitleOnly,
          hasIconOnly,
          hasBadge,
          disHover,

          enabled: this.enabled,
          to: eval("(" + this.to + ")"), // 这个必须是对象
          show: this.show,
          tabBadge: this.tabBadge,
          tabBadgeStyle: this.tabBadgeStyle,
          tabIcon: this.tabIcon,
          tabTitle: this.tabTitle,
        }
      }
    }
  }
</script>

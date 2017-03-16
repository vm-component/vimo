<template>
  <a class="tab-button" ref="routerLink" @click="tabClickHandler($event)"
     :id="tabId"
     :class="{'has-title':hasTitle, 'has-icon':hasIcon, 'has-title-only':hasTitleOnly, 'icon-only':hasIconOnly, 'has-badge':hasBadge, 'disable-hover':disHover, 'tab-disabled':!enabled, 'tab-hidden':!show,'tab-active':isActive}">
    <Icon v-if="tabIcon" :name="tabIcon" :isActive="isActive" class="tab-button-icon"></Icon>
    <span v-if="tabTitle" class="tab-button-text">{{tabTitle}}</span>
    <Badge v-if="tabBadge" class="tab-badge" :color="tabBadgeStyle">{{tabBadge}}</Badge>
    <div class="button-effect"></div>
  </a>
</template>
<script type="text/ecmascript-6">
  /**
   * !!Tab组件必须和Tabs组件配合使用!!
   *
   * Tab组件内部与路由结合, 因此应该包含:to属性, 用于跳转
   *
   * 此组件用于传输传递, 不具有DOM结构及生命周期
   *
   * 选中时的对外事件: onTabSelect, 传递this
   *
   * */
  let _tabId = -1;
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
        type: Object,
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
    },
    data(){
      return {
        disHover: VM && VM.config.getBoolean('hoverCSS', false),
        index: ++_tabId,
        isActive: false, // 这个值具有滞后性, 只代表当前的页面的状态, 不能用于其他
      }
    },
    computed: {
      hasTitle(){
        return !!this.tabTitle
      },
      tabId(){
        return `tabId-${this.index}`
      },
      hasIcon(){
        return !!this.tabIcon
      },
      hasTitleOnly(){
        return !!this.tabTitle && !this.tabIcon
      },
      hasIconOnly(){
        return !!this.tabIcon && !this.tabTitle
      },
      hasBadge(){
        return !!this.tabBadge
      },
    },
    watch: {
      $route(){
        this.refreshMatchState()
      }
    },
    methods: {
      isMatch(){
        return this.to.name === this.$route.name || this.to.path === this.$route.path
      },
      tabClickHandler(){
        if (this.enabled) {
          this.$router.replace(this.to);
          this.$emit('onTabSelect', this)
        }
      },
      refreshMatchState(){
        this.isActive = this.isMatch();
      }
    },
    created(){
      this.refreshMatchState();
      console.assert(this.$parent.$options._componentTag.toLowerCase() === 'tabs', 'Tab component must combine with Tabs')
    },
  }
</script>

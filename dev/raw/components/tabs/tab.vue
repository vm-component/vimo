<template>
    <a class="tab-button" ref="routerLink" @click="tabClickHandler($event)"
       :id="tabId"
       :class="{'has-title':hasTitle, 'has-icon':hasIcon, 'has-title-only':hasTitleOnly, 'icon-only':hasIconOnly, 'has-badge':hasBadge, 'disable-hover':disHover, 'tab-disabled':!enabled, 'tab-hidden':!show,'tab-active':isActive}">
        <Icon v-if="tabIcon" :name="tabIcon" :isActive="isActive" class="tab-button-icon"></Icon>
        <span v-if="tabTitle" class="tab-button-text">{{tabTitle}}</span>
        <Badge v-if="tabBadge" class="tab-badge" :color="tabBadgeStyle">{{tabBadge}}</Badge>
        <!--<div class="button-effect"></div>-->
    </a>
</template>
<script>
  /**
   * @module Component/Tab
   * @description
   *
   * 还是需要再声明下，Tab组件必须和Tabs组件配合使用， Tab组件内部与路由`$router`结合,
   * Tab点击切换使用的是`$router.replace(this.to)`处理的， 因此应该包含:to属性用于跳转。
   *
   *
   * @property {Boolean} [enabled] - 是否能选择
   * @property {Object} to - 路由跳转，必填
   * @property {Boolean} [show=true] - 是否显示
   * @property {String} [tabBadge] - 徽章显示值
   * @property {String} [tabBadgeStyle] - 徽章颜色
   * @property {String} [tabIcon] - tab的IconName
   * @property {String} [tabTitle] - tab的tabTitle
   *
   * @fires onTabSelect - Tab被点击时触发，传递当前Tab的this
   *
   * @example
   *
   <Tab slot="tab" :to="{name:'tabsBottom.demoTab3'}" tabBadge="7" tabTitle="Star" tabIcon="star" :enabled="true"></Tab>
   *
   *
   *
   *
   * */
  let _tabId = -1;
  import { Badge } from '../badge'
  export default{
    name: 'Tab',
    props: {
      // 是否能选择
      enabled: {
        type: Boolean,
        default: true,
      },
      // 路由跳转
      to: {
        type: Object,
        required: true
      },
      // 是否显示
      show: {
        type: Boolean,
        default: true,
      },
      // 徽章显示值
      tabBadge: {
        type: String,
        default: '',
      },
      // 徽章颜色
      tabBadgeStyle: {
        type: String,
        default: '',
      },
      // tab的IconName
      tabIcon: {
        type: String,
        default: '',
      },
      // tab的tabTitle
      tabTitle: {
        type: String,
        default: '',
      },
    },
    data(){
      return {
        disHover: window.VM && window.VM.config.getBoolean('hoverCSS', false),
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
    components: {Badge}
  }
</script>

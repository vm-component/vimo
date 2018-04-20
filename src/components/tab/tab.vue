<template>
    <a class="tab-button" ref="routerLink" @click="$_tabClickHandler($event)" :id="tabId" :class="componentClass">
        <Icon :mode="mode" v-if="tabIcon" :name="tabIcon" :isActive="isActive" class="tab-button-icon"></Icon>
        <span v-if="tabTitle" class="tab-button-text">{{tabTitle}}</span>
        <Badge :mode="mode" v-if="tabBadge" class="tab-badge" :color="tabBadgeStyle">{{tabBadge}}</Badge>
        <ButtonRipple/>
    </a>
</template>
<script type="text/javascript">
  import Badge from '../badge'
  import Icon from '../icon'
  import ButtonRipple from '../../components/button-ripple'

  export default {
    name: 'Tab',
    components: {Badge, Icon, ButtonRipple},
    props: {
      mode: {
        type: String,
        default () { return this.$config && this.$config.get('mode') || 'ios' }
      },
      // 是否能选择
      disabled: {
        type: Boolean,
        default: false
      },
      // 路由跳转
      to: {
        type: Object,
        required: true,
        validator (obj) {
          return !!obj && (!!obj.name || !!obj.path)
        }
      },
      routerType: {
        type: String,
        default: 'replace',
        validator (val) {
          return ~[
            'replace',
            'push'
          ].indexOf(val)
        }
      },
      // 是否显示
      show: {
        type: Boolean,
        default: true
      },
      tabBadge: [String, Number],         // 徽章显示值
      tabBadgeStyle: String,    // 徽章颜色
      tabIcon: String,          // tab的IconName
      tabTitle: String          // tab的tabTitle
    },
    data () {
      return {
        isActive: false // 这个值具有滞后性, 只代表当前的页面的状态, 不能用于其他
      }
    },
    computed: {
      componentClass () {
        return {
          'has-title': this.hasTitle,
          'has-icon': this.hasIcon,
          'has-title-only': this.hasTitleOnly,
          'icon-only': this.hasIconOnly,
          'has-badge': this.hasBadge,
          'tab-disabled': this.disabled,
          'tab-hidden': !this.show,
          'tab-active': this.isActive
        }
      },
      hasTitle () {
        return this.tabTitle
      },
      tabId () {
        return `tabId-${this._uid}`
      },
      hasIcon () {
        return this.tabIcon
      },
      hasTitleOnly () {
        return this.tabTitle && !this.tabIcon
      },
      hasIconOnly () {
        return this.tabIcon && !this.tabTitle
      },
      hasBadge () {
        return this.tabBadge
      }
    },
    watch: {
      $route () {
        this.$_refreshMatchState()
      }
    },
    inject: ['tabsComponent'],
    methods: {
      /**
       * 当前路由是否匹配当前Tab组件状态
       * @private
       * */
      $_isMatch () {
        if (!this.to) return false
        return this.to.name === this.$route.name || this.to.path === this.$route.path
      },
      /**
       * Tab点击时动作
       * @private
       * */
      $_tabClickHandler () {
        if (!this.disabled && this.to) {
          // this.isActive = true

          if (this.to) {
            console.log(this.routerType)
            this.$router && this.$router[this.routerType](this.to)
          }

          /**
           * @event component:Tabs#onTabSelect
           * @description Tab选中时触发
           * @property {string}
           */
          this.$emit('onTabSelect', this)
        }
      },
      $_refreshMatchState () {
        this.isActive = this.$_isMatch()
      }
    },
    created () {
      this.$_refreshMatchState()
    }
  }
</script>

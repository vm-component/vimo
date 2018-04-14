<template>
    <div class="toolbar ion-navbar" :class="[colorClass,modeClass]"
         v-show="!hideNavBar">
        <div class="toolbar-background" :class="backgroundClass"></div>
        <div class="toolbar-content" :class="contentClass">
            <slot></slot>
        </div>
        <vm-button v-if="!hideBb"
                   @click.prevent.stop="$_backButtonClickHandler"
                   role="bar-button"
                   :class="[backButtonClass]"
                   class="back-button">
            <vm-icon class="back-button-icon" :class="[backButtonIconClass]" :name="bbIcon"></vm-icon>
            <span class="back-button-text" :class="[backButtonTextClass]">{{backText}}</span>
        </vm-button>
        <slot name="buttons"></slot>
    </div>
</template>
<script type="text/javascript">
  import ToolbarMixin from '../../mixins/toolbar-mixin/index.js'
  import Button from '../button'
  import Icon from '../icon'

  export default {
    name: 'Navbar',
    provide () {
      const _this = this
      return {
        navbarComponent: _this
      }
    },
    inject: {
      navComponent: {
        from: 'navComponent',
        default: null
      }
    },
    mixins: [ToolbarMixin],
    components: {
      'vm-button': Button,
      'vm-icon': Icon
    },
    props: {
      hideBackButton: {
        type: [Object, Boolean],
        default: null
      }
    },
    data () {
      return {
        hideBb: true,
        bbIcon: this.$config && this.$config.get('backButtonIcon', 'icon-arrow-back') || 'icon-arrow-back',
        backText: this.$i18n ? this.$i18n.t('vimo.backBtn') : '返回'
      }
    },
    computed: {
      hideNavBar () {
        return this.$config && this.$config.getBoolean('hideNavBar', false)
      },
      backButtonClass () {
        return `back-button-${this.mode}`
      },
      backButtonIconClass () {
        return `back-button-icon-${this.mode}`
      },
      backButtonTextClass () {
        return `back-button-icon-${this.mode}`
      }
    },
    methods: {
      $_backButtonClickHandler () {
        window.history.back()
      }
    },
    created () {
      // 如果外部未指定, 则通过历史记录计算是否显示(前提是有Nav实例: this.navComponent)
      if (typeof this.hideBackButton === 'object' && !this.hideBackButton) {
        if (this.navComponent) {
          this.hideBb = this.navComponent.historyList.length <= 1
        }
      }
    }
  }
</script>

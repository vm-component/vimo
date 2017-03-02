<template>
  <div class="ion-navbar toolbar"
       :class="[modeClass,colorClass,{'statusbar-padding':statusbarPadding}]" v-if="!hideNavBar">
    <div class="toolbar-background" :class="[toolbarBackgroundClass]"></div>
    <!--show-back-button-->
    <Button @click="backButtonClick($event)" role="bar-button" class="back-button"
            :class="[backButtonClass,{'show-back-button':!hideBackButton}]" v-if="!hideBb">
      <Icon class="back-button-icon" :class="[backButtonIconClass]" :name="bbIcon"></Icon>
      <span class="back-button-text" :class="[backButtonTextClass]">{{backText}}</span>
    </Button>

    <!--button/menuToggle-->
    <slot name="button"></slot>

    <!--<ng-content select="[menuToggle],ion-buttons[left]"></ng-content>-->
    <!--<ng-content select="ion-buttons[start]"></ng-content>-->
    <!--<ng-content select="ion-buttons[end],ion-buttons[right]"></ng-content>-->
    <div class="toolbar-content" :class="[toolbarContentClass]">
      <!--默认-->
      <slot></slot>
      <slot name="content"></slot>
    </div>
  </div>
</template>
<style lang="scss">
  @import '../toolbar/toolbar';
  @import '../toolbar/toolbar-button.scss';
  @import '../toolbar/toolbar.ios.scss';

</style>
<script type="text/ecmascript-6">
  export default{
    name: 'Navbar',
    data(){
      return {
        hideBb: false,
        bbIcon: 'arrow-back',
        backText: 'Back',
        hideNavBar: VM.config.getBoolean('hideNavBar', false),

        statusbarPadding: VM.config.getBoolean('statusbarPadding', false), // 是否有statusbar的padding
      }
    },
    props: {
      /**
       * The mode to apply to this component. Mode can be ios, wp, or md.
       * */
      mode: {
        type: String,
        default: VM.config.get('mode') || 'ios',
      },
      /**
       * 按钮color：primary、secondary、danger、light、dark
       * */
      color: {
        type: String,
        default: '',
      },
      /**
       * whether the back button should be shown or not
       * */
      hideBackButton: {
        type: Boolean,
        default: false,
      }
    },
    watch: {},
    computed: {
      modeClass () {
        return `toolbar-${this.mode}`
      },
      // 颜色
      colorClass () {
        return !!this.color ? (`toolbar-${this.mode}-${this.color}`) : ''
      },
      backButtonClass () {
        return `back-button-${this.mode}`
      },
      backButtonTextClass () {
        return `back-button-text-${this.mode}`
      },
      backButtonIconClass () {
        return `back-button-icon-${this.mode}`
      },
      toolbarBackgroundClass () {
        return `toolbar-background-${this.mode}`
      },
      toolbarContentClass () {
        return `toolbar-content-${this.mode}`
      },

    },
    methods: {
      backButtonClick ($event) {
        //TODO: 这部分需要特殊处理
        this.$router.back();
      },
    },
    created () {
      this.hideBb = !this.$nav.canGoBack();
    },
    mounted () {

    }
  }
</script>

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
        <!--buttons/menuToggle-->
        <slot name="buttons"></slot>
        <div class="toolbar-content" :class="[toolbarContentClass]">
            <slot></slot>
        </div>
    </div>
</template>
<style lang="scss">
    // style from toolbar
</style>
<script>
  export default{
    name: 'Navbar',
    data(){
      return {
        hideBb: false,
        bbIcon: window.VM && window.VM.config.get('backButtonIcon', 'arrow-back') || 'arrow-back',
        backText: window.VM && window.VM.config.get('backButtonText', 'Back') || 'Back',
        hideNavBar: window.VM && window.VM.config.getBoolean('hideNavBar', false),
        statusbarPadding: window.VM && window.VM.config.getBoolean('statusbarPadding', false), // 是否有statusbar的padding
      }
    },
    props: {
      /**
       * The mode to apply to this component. Mode can be ios, wp, or md.
       * */
      mode: {
        type: String,
        default(){ return window.VM && window.VM.config.get('mode') || 'ios' }
      },
      /**
       * 按钮color：primary、secondary、danger、light、dark
       * */
      color: [String],
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
        $event.preventDefault()
        $event.stopPropagation()
        this.$router.back();
      },
    },
    created () {
      this.hideBb = !this.$history.canGoBack()
    }
  }
</script>

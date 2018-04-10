<template>
    <div class="toolbar ion-toolbar" :class="[colorClass,modeClass]">
        <div class="toolbar-background" :class="backgroundClass"></div>
        <div class="toolbar-content" :class="contentClass">
            <slot></slot>
        </div>
        <slot name="buttons"></slot>
    </div>
</template>
<script type="text/javascript">
  import ToolbarExtends from '../../mixins/toolbar-extends/index.js'

  export default {
    name: 'Toolbar',
    provide () {
      const _this = this
      return {
        toolbarComponent: _this
      }
    },
    extends: ToolbarExtends,
    computed: {}
  }
</script>

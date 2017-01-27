<template>
  <div class="ion-list list" :class="[modeClass]">
    <slot></slot>
  </div>
</template>
<style lang="scss">
  @import "list";
  @import "list.ios";
  @import "../../item/src/item";
  @import "../../item/src/item.ios";
  @import "../../item/src/item-media";
  @import "../../item/src/item-sliding";
  @import "../../item/src/item-reorder";

</style>
<script type="text/ecmascript-6">
  export default{
    name: 'ion-list',
    data(){
      return {}
    },
    props: {
      /**
       * mode 按钮风格 ios/window/android/we/alipay
       * */
      mode: {
        type: String,
        default: 'ios',
      },
      /**
       * shouldEnable whether the item-sliding should be enabled or not
       * */
      sliding: {
        type: Boolean,
        default: false,
      }

    },
    watch: {},
    computed: {
      // 环境样式
      modeClass: function () {
        return `list-${this.mode}`
      },
    },
    methods: {
      /**
       * Close any sliding items that are open.关闭所有滑开的items
       * */
      closeSlidingItems: function () {

      },

    },
    created: function () {
    },
    mounted: function () {
    },
    activated: function () {
    },
    components: {}
  }
</script>

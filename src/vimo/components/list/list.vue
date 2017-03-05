<template>
  <div class="ion-list list" :class="[modeClass]">
    <slot></slot>
  </div>
</template>
<style lang="scss">

  @import "../item/item.scss";
  @import "../item/item.ios.scss";
  @import "../item/item.md.scss";
  @import "../item/item.wp.scss";
  @import "../item/item-media.scss";
  @import "../item/item-sliding.scss";
  @import "../item/item-reorder.scss";

  @import "list.scss";
  @import "list.ios.scss";
  @import "list.md.scss";
  @import "list.wp.scss";

</style>
<script type="text/ecmascript-6">
  export default{
    name: 'List',
    data(){
      return {}
    },
    props: {
      /**
       * mode 按钮风格 ios/window/android/we/alipay
       * */
      mode: {
        type: String,
        default:  VM.config.get('mode') || 'ios',
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
      modeClass () {
        return `list-${this.mode}`
      },
    },
    methods: {
      /**
       * Close any sliding items that are open.关闭所有滑开的items
       * */
      // TODO: 关闭所有滑开的items
      closeSlidingItems () {

      },

    },
    created () {
    },
    mounted () {
    },
    activated () {
    },
    destroyed(){},
    components: {}
  }
</script>

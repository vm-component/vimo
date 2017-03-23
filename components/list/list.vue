<template>
    <div class="ion-list list" :class="[modeClass]">
        <slot></slot>
    </div>
</template>
<style lang="scss">

    @import "../item/item.scss";
    @import "../item/item.ios.scss";
    @import "../item/item.md.scss";
    @import "../item/item-media.scss";
    @import "../item/item-sliding.scss";
    @import "../item/item-reorder.scss";
    @import "list.scss";
    @import "list.ios.scss";
    @import "list.md.scss";

</style>
<script type="text/ecmascript-6">

  /**
   *
   * @name list
   * @module Component/List
   * @description
   *  list有多重种风格的样式，有ios/window/android等等,对应ios/md/wp模式
   *
   *  支持item-sliding（**此功能正在开发，暂时不可用**）
   *
   *  @property {string} [mode=ios]        - 样式模式
   *  @property {Boolean} [sliding=false]  - 是否需要item-silding
   *
   *  @example
   *  html:
   *    <List :mode="mode"></List>
   *  js:
   *    export default {
          return {
            data () {
              mode:  'md' 
            }
          }   
        }
   */

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
        default(){ return window.VM && window.VM.config.get('mode') || 'ios' }
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
        return `list-${this.mode}`;
      },
    },
    methods: {
      /**@method closeSlidingItems (暂时不可用)
       *
       * @description
       * Close any sliding items that are open.关闭所有滑开的items
       *
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

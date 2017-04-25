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
<script>

  /**
   *
   * @name list
   * @component Component/List
   * @description
   * list有多重种风格的样式，有ios/window/android等等,对应ios/md/wp模式
   *
   * 支持item-sliding（**此功能正在开发，暂时不可用**）
   *
   *
   * radio-group的受体, 当点击radio时, radio向外寻找到这里, 传递v-model信息
   *
   * radio对外事件: onChange
   *
   *
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
  import { setElementClass, isTrueProperty, isBlank } from '../../util/util'
  export default{
    name: 'List',
    data(){
      return {

        // -------- Radio --------
        radioComponentList: [],
      }
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
      },

      // -------- Radio --------
      radioGroup: [Boolean],
      value: [String],
      disabled: {
        type: Boolean,
        default(){return false}
      },
    },
    watch: {
      value(val){
        this.onRadioChange(val)
      },
      disabled(isDisabled){
        if (isTrueProperty(this.radioGroup)) {
          this.disableAllRadio(isDisabled)
          this.onRadioChange(null)
        }
      },
    },
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

      // -------- Radio --------
      /**
       * @private
       * radio组件点击时执行这个命令
       * */
      onRadioChange(value){
        this.radioComponentList.forEach((radioComponent) => {
          if (!radioComponent.isDisabled) {
            radioComponent.setChecked(value)
          }
        })
        this.$emit('input', value)
        this.$emit('onChange', value)
      },

      /**
       * @private
       * 禁用全部radio
       * */
      disableAllRadio(isDisable){
        this.radioComponentList.forEach((radioComponent) => {
          radioComponent.setDisabled(isDisable)
        })
      },

      /**
       * @private
       * 让radio组件记录自己
       * */
      recordRadio(radioComponent){
        this.radioComponentList.push(radioComponent)
      },

    },
    created () {
    },
    mounted () {
      // -------- Radio --------
      // 内部定义了Radio组件
      if (isTrueProperty(this.radioGroup)) {
        this.onRadioChange(this.value)
        this.disableAllRadio(this.disabled)
      }
    },
    activated () {
    },
    destroyed(){},
    components: {}
  }
</script>

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
    @import "./list.scss";
    @import "./list.ios.scss";
    @import "./list.md.scss";
</style>
<script>
  /**
   * @component List
   * @description
   *
   * ## 列表组件 / List
   *
   * ### 概述
   * list有多重种风格的样式，有ios/android等等,对应ios/md模式.
   *
   *
   * ### 拓展
   * 此外, List组件也是`radioGroup`的管理域. 因为单选的确定需要一个父集. radio的使用需要开启`radioGroup`. 同时, v-model/事件等才能正常运行. 因为, List组件是radio-group的受体, 当点击radio时, radio向外寻找到这里, 传递v-model信息.
   *
   * radio对外事件: onChange
   *
   * ### item-sliding功能
   * 支持item-sliding（**此功能已开发完毕，但还需修改, 暂时不建议使用**）
   *
   * @props {string} [mode=ios]        - 样式模式
   * @props {Boolean} [sliding=false]  - 是否需要item-silding(开在开发)
   * @props {Boolean} [radioGroup]  - 是否为radioGroup
   * @props {String} [value]  - 支持v-model
   * @props {Boolean} [disabled=false]  - 当前radio的禁用状态
   *
   * @demo http://xiangsongtao.com/vimo/#/list
   * @see component:Item
   */
  import { isTrueProperty } from '../../util/util'
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
      sliding: [Boolean],

      // -------- Radio --------
      radioGroup: [Boolean],
      value: [String],
      disabled: [Boolean],
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
//      /**
//       * @method closeSlidingItems (暂时不可用)
//       * @description
//       * Close any sliding items that are open.关闭所有滑开的items
//       * */
//      // TODO: 关闭所有滑开的items
//      closeSlidingItems () {
//
//      },

      // -------- Radio --------
      /**
       * radio组件点击时执行这个命令
       * @private
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
       * 禁用全部radio
       * @private
       * */
      disableAllRadio(isDisable){
        this.radioComponentList.forEach((radioComponent) => {
          radioComponent.setDisabled(isDisable)
        })
      },

      /**
       * 让radio组件记录自己
       * @private
       * */
      recordRadio(radioComponent){
        this.radioComponentList.push(radioComponent)
      }
    },
    mounted () {
      // -------- Radio --------
      // 内部定义了Radio组件
      if (isTrueProperty(this.radioGroup)) {
        this.onRadioChange(this.value)
        this.disableAllRadio(this.disabled)
      }
    }
  }
</script>

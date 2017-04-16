<template>
    <div class="ion-select">
        <div v-if="!text" class="select-placeholder select-text">{{placeholder}}</div>
        <div v-if="text" class="select-text">{{selectedText || text}}</div>
        <div class="select-icon">
            <div class="select-icon-inner"></div>
        </div>
        <button aria-haspopup="true" @click="onPointerDownHandler($event)"
                :id="id"
                ion-button="item-cover"
                class="item-cover">
        </button>
    </div>
</template>
<style lang="scss">
    @import "select";
    @import "select.ios";
    @import "select.md";
</style>
<script type="text/ecmascript-6">
  /**
   * @name Select
   * @module Component/Select
   * @description
   *
   * 选择组件,
   *
   * 对外事件:
   * onChange: 选中的值发生变化
   * onCancel: 点击取消
   *
   * */
  import { setElementClass, isTrueProperty, isBlank } from '../../util/util'
  let id = 0
  export default{
    name: 'Select',
    data(){
      return {
        isDisabled: this.disabled,      // 内部 禁用
        id: `rb-${id++}`,               // id
        itemComponent: null,            // item组件实例
        text: null,
      }
    },
    props: {
      // cancel按钮显示文本
      cancelText: {
        type: String,
        default(){return 'Cancel'}
      },
      // OK按钮显示文本
      okText: {
        type: String,
        default(){return 'OK'}
      },
      disabled: [Boolean],
      // 显示界面类型, 可以是'action-sheet','alert'两个
      interface: {
        type: String,
        default(){return 'Alert'}
      },
      multiple: [Boolean],
      // 当未选择时显示的值
      placeholder: [String],
      // select组件掉用alert和action-sheet组件的, 这个是针对传入的参数
      selectOptions: [String, Object, Array],
      // 选择组件的文本提示
      selectedText: [String],
      // 模式
      mode: {
        type: String,
        default(){ return window.VM && window.VM.config.get('mode') || 'ios' }
      },

    },
    watch: {
      disabled(val){
        this.setDisabled(isTrueProperty(val))
      }
    },
    computed: {},
    methods: {
      /**
       * 设置当前radio的禁用状态
       * */
      setDisabled(isDisabled){
        this.isDisabled = isDisabled
        this.itemComponent && setElementClass(this.itemComponent.$el, 'item-select-disabled', isDisabled)
      },

      /**
       * 点击组件时触发
       * */
      onPointerDownHandler($event){
        ev.preventDefault();
        ev.stopPropagation();
        this.open();
      },

      /**
       * 组件开启
       * */
      open(){

      },

      /**
       * 更新子组件option的状态
       * */
      updOpts(){},

    },
    created () {},
    mounted () {
      // 找到外部item实例
      if (this.$parent.$options._componentTag.toLowerCase() === 'item') {
        this.itemComponent = this.$parent;
        setElementClass(this.itemComponent.$el, 'item-select', true)
      }
    },
    activated () {},
    components: {}
  }
</script>

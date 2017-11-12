<template>
    <div class="ion-item" :class="[itemClass,itemTypeClass,colorClass]" @click="clickHandler($event)">
        <!--以下组件显示在此处：[item-left],ion-checkbox:not([item-right])-->
        <slot name="item-left"></slot>
        <div class="item-inner">
            <div class="input-wrapper">
                <slot></slot>
            </div>
            <!--以下组件显示在此处：[item-right],ion-radio,ion-toggle-->
            <slot name="item-right"></slot>
        </div>
    </div>
</template>
<style lang="less">
    @import "item";
    @import "item.ios.less";
    @import "item.md.less";
    @import "item-media";
</style>
<script type="text/javascript">
  import addItemAttr from '../util/addSlotNameToAttr.js'

  export default {
    props: {
      /**
       * mode 按钮风格 ios/window/android/we/alipay
       * */
      mode: {
        type: String,
        default () { return this.$config && this.$config.get('mode') || 'ios' }
      },
      /**
       * 按钮color：primary、secondary、danger、light、dark
       * */
      color: String
    },
    computed: {
      itemClass () {
        return `item-${this.mode}`
      },
      colorClass () {
        return this.color ? (`item-${this.mode}-${this.color}`) : ''
      },
      itemTypeClass () {
        return `item-block`
      }
    },
    methods: {
      /**
       * 点击代理
       * */
      clickHandler ($event) {
        this.$emit('click', $event)
      }
    },
    mounted () {
      // 为slot="item-left"/slot="item-right"的沟槽设定属性
      addItemAttr(this.$slots)
    }
  }
</script>

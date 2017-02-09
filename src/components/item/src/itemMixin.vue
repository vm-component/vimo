<template>
  <div :class="[itemClass,listHeaderClass,colorClass]" @click="directTo()">
    <!--以下组件显示在此处：[item-left],ion-checkbox:not([item-right])-->
    <slot name="item-left"></slot>
    <!--<ng-content select="[item-left],ion-checkbox:not([item-right])"></ng-content>-->
    <div class="item-inner">
      <div class="input-wrapper">
        <!--如果是ion-label则单独显示，如果不是则显示在ion-label中-->
        <ion-label>
          <slot></slot>
          <slot name="item-label"></slot>
        </ion-label>
        <!--以下组件显示在此处：ion-select,ion-input,ion-textarea,ion-datetime,ion-range,[item-content]-->
        <slot name="item-content"></slot>
      </div>

      <!--以下组件显示在此处：[item-right],ion-radio,ion-toggle-->
      <slot name="item-right"></slot>
      <!--<ion-reorder *ngIf="_shouldHaveReorder"></ion-reorder>-->
    </div>
    <div class="button-effect"></div>
  </div>
</template>
<style lang="scss">
  /*@import "item";*/
  /*@import "item.ios";*/
  /*@import "item.md";*/
  /*@import "item.wp";*/
  /*@import "item-media";*/
  /*@import "item-reorder";*/
  /*@import "item-sliding";*/
</style>
<script type="text/ecmascript-6">
  module.exports = {
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
       * 按钮color：primary、secondary、danger、light、dark
       * */
      color: {
        type: String,
        default: '',
      },
      /**
       * 指向跳转，类似于router-link或者a标签
       * */
      to: {
        type: Object,
        default () {
          return {}
        },
      }
    },
    watch: {},
    computed: {
      // 环境样式
      itemClass () {
        return `item item-${this.mode}`
      },

      // 颜色
      colorClass () {
        return !!this.color ? (`label-${this.mode}-${this.color}`) : ''
      },
    },
    methods: {
      /**
       * 类似于a标签跳转
       * */
      directTo(){
        if (!!this.to) {
          this.$router.push(this.to)
        }
      }
    },
    created () {
    },
    mounted () {
    },
    activated () {
    },
    components: {}
  }
</script>

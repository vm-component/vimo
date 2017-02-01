<template>
  <div :class="[itemClass,listHeaderClass,colorClass]" @click="directTo()">

    <slot name="item-left"></slot>
    <!--<ng-content select="[item-left],ion-checkbox:not([item-right])"></ng-content>-->
    <div class="item-inner">
      <div class="input-wrapper">
        <!--<ng-content select="ion-label"></ng-content>-->
        <!--<ion-label *ngIf="_viewLabel">-->
        <slot name="label"></slot>
        <slot name="content"></slot>

        <!--ion-radio,ion-toggle-->
        <!--<slot name="ion-select"></slot>-->

        <!--<ng-content select="ion-select,ion-input,ion-textarea,ion-datetime,ion-range,[item-content]"></ng-content>-->
      </div>

      <slot name="item-right"></slot>

      <!--ion-radio,ion-toggle-->
      <slot name="ion-select"></slot>


      <!--<ng-content select="[item-right],ion-radio,ion-toggle"></ng-content>-->

      <!--<ion-reorder *ngIf="_shouldHaveReorder"></ion-reorder>-->
    </div>
    <div class="button-effect"></div>


  </div>
</template>
<style lang="scss">

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
        default: function(){
          return {}
        },
      }
    },
    watch: {},
    computed: {
      // 环境样式
      itemClass: function () {
        return `item item-${this.mode}`
      },

      // 颜色
      colorClass: function () {
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
    created: function () {
    },
    mounted: function () {
    },
    activated: function () {
    },
    components: {}
  }
</script>

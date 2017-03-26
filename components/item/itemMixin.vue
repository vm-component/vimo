<template>
    <div :class="[itemClass,listHeaderClass,colorClass]" @click="directTo()">
        <!--以下组件显示在此处：[item-left],ion-checkbox:not([item-right])-->
        <slot name="item-left"></slot>

        <!--<ng-content select="[item-left],ion-checkbox:not([item-right])"></ng-content>-->
        <div class="item-inner">
            <div class="input-wrapper">
                <!--如果是ion-label则单独显示，如果不是则显示在ion-label中-->
                <slot></slot>
                <!--<Label>-->
                <slot name="label"></slot>
                <!--</Label>-->
                <!--以下组件显示在此处：ion-select,ion-input,ion-textarea,ion-datetime,ion-range,[item-content]-->
                <slot name="content"></slot>
            </div>

            <!--以下组件显示在此处：[item-right],ion-radio,ion-toggle-->
            <slot name="item-right"></slot>
            <!--<ion-reorder *ngIf="_shouldHaveReorder"></ion-reorder>-->
        </div>
        <div class="button-effect"></div>
    </div>
</template>
<style lang="scss"></style>
<script type="text/ecmascript-6">
  import { isTrueProperty } from '../../util/util'
  export default{
    data(){
      return {
        isInMenu: false, // 判断是否在menu组件中, 如果在menu中, 则
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
        const _this = this;
        if (!!_this.to) {

          if (_this.isInMenu) {
            _this.$menus.close();
            _this.$eventBus && _this.$eventBus.$on('onMenuClosed', directToHandler)
          } else {
            _this.$router.push(_this.to);
          }

          function directToHandler () {
            _this.$router.push(_this.to);
            _this.$eventBus && _this.$eventBus.$off('onMenuClosed', directToHandler)
          }
        }
      }
    },
    created () {},
    mounted () {

      if (isTrueProperty(this.$el.getAttribute('delay'))) {
        this.isInMenu = true;
      }

      // 为slot="item-left"/slot="item-right"的沟槽设定属性
      if (!!this.$slots && !!this.$slots['item-left']) {
        this.$slots['item-left'].forEach(function (item) {
          item.elm.setAttribute('item-left', '')
        })
      }
      if (!!this.$slots && !!this.$slots['item-right']) {
        this.$slots['item-right'].forEach(function (item) {
          item.elm.setAttribute('item-right', '')
        })
      }

    }
  }
</script>

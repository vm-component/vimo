<template>
    <div class="ion-item"
         :detail-push="detailPush"
         :button="button"
         :class="[itemClass,inputClass,labelClass,itemTypeClass,colorClass]"
         @click="$_clickHandler($event)">
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
<style lang="scss" src="./item.scss"></style>
<script type="text/javascript">
  import addItemAttr from '../../util/add-slot-name-to-attr.js'

  export default {
    provide () {
      const _this = this
      return {
        itemComponent: _this
      }
    },
    data () {
      return {
        // 用于 Input 元素添加class类名
        inputClass: {
          'input-has-focus': false,
          'input-has-value': false,
          'item-input': false,
          'ng-touched': false,
          'ng-valid': false,
          'ng-invalid': false,
          'show-focus-highlight': false,
          'show-invalid-highlight': false,
          'show-valid-highlight': false
        },
        // 用于 Label 元素添加class类名
        labelClass: {
          'item-label-fixed': false,
          'item-label-floating': false,
          'item-label-stacked': false
        }
      }
    },
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
      color: String,
      detailPush: Boolean,
      button: Boolean
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
      $_clickHandler ($event) {
        this.$emit('click', $event)
      }
    },
    mounted () {
      // 为slot="item-left"/slot="item-right"的沟槽设定属性
      addItemAttr(this.$slots)
    }
  }
</script>

<template>
  <div @click="_click" class="ion-segment-button segment-button" :class="{'segment-activated':isSelect}">
    <slot></slot>
    <div class="button-effect"></div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    name: 'SegmentButton',
    data(){
      return {
        isSelect: false, // 标志当前是否选中
      }
    },
    props: {
      /**
       * 当前button的激活值
       * */
      value: {
        type: String,
        default: '',
      },

      /**
       * mode 按钮风格 ios/window/android/we/alipay
       * */
      mode: {
        type: String,
        default:  VM.config.get('mode') || 'ios',
      },
    },
    methods: {
      _click: function () {
        // 修改父元素的缓存值，触发watch监听
        this.$parent.parentVal = this.value;
        this.$emit('ionSelect', this.value);
      }
    }
  }
</script>

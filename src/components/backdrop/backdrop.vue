<template>
    <transition
            name="fade"
            @before-enter="beforeEnter"
            @after-leave="afterLeave">
        <div class="ion-backdrop"
             @click="bdClick"
             @touchmove="onTouchMoveHandler($event)"
             :class="{'backdrop-no-tappable':!enableBackdropDismiss,'fixed':fixed}"
             :style="{'left':left+'px','top':top+'px'}"
             v-show="isActiveLocal"></div>
    </transition>
</template>
<script type="text/javascript">
  export default {
    name: 'Backdrop',
    data () {
      return {
        isActiveLocal: this.isActive,   // 控制权由present/dismiss控制
        count: 0                        // 记录开启数目
      }
    },
    props: {
      enableBackdropDismiss: {
        type: Boolean,
        default: true
      },
      // 控制backdrop的显示隐藏
      isActive: Boolean,
      // 点击背景的处理方式
      bdClick: {
        type: Function,
        default: function () {}
      },
      /**
       * backdrop偏移量, 用于定制化显示
       * */
      top: {
        type: Number,
        default: 0
      },
      left: {
        type: Number,
        default: 0
      },
      // 设置position：fixed, 防止滚动的时候幕布移动
      fixed: Boolean
    },
    watch: {
      isActive () {
        this.isActiveLocal = this.isActive
      }
    },
    methods: {
      /**
       * 过渡钩子
       * @private
       */
      beforeEnter () {
        /**
         * @event component:Backdrop#onShown
         * @description 当Backdrop打开时触发
         */
        this.$emit('onShown')
      },
      afterLeave () {
        /**
         * @event component:Backdrop#onHidden
         * @description 当Backdrop关闭时触发
         */
        this.$emit('onHidden')
      },
      onTouchMoveHandler ($event) {
        $event.preventDefault()
        $event.stopPropagation()
      }
    }
  }
</script>

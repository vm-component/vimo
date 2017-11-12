<template>
    <transition
            name="backdrop"
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
<style lang="less">
    @import "./backdrop.less";
</style>
<script type="text/javascript">
  /**
   * @component Backdrop
   * @description
   *
   * ## 其他 / Backdrop背景暗化组件
   *
   * 一般是用来进行背景遮罩的. 比如Alert/Actionsheet组件等用到.
   *
   * @props {Boolean} [enableBackdropDismiss=true] - 是否能点击背景关闭操作, 设置`backdrop-no-tappable` 样式(不重要)
   * @props {Boolean} [isActive=false] - 组件是否激活
   * @props {Function} [bdClick=noop] - 点击背景的处理方式
   * @props {Number} [top=0] - 偏移量
   * @props {Number} [left=0] - 偏移量
   * @props {Boolean} [fixed=false] - 是否设置position：fixed, 防止滚动的时候幕布移动
   *
   * @fires component:Backdrop#onShown
   * @fires component:Backdrop#onHidden
   *
   * @demo #/backdrop
   *
   * @usage
   * <Backdrop :bdClick="bdClick" :enableBackdropDismiss="enableBackdropDismiss" :isActive="isActive"></Backdrop>
   * */
  let NOOP = function () {}
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
        default: NOOP
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

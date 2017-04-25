<template>
    <transition
            name="backdrop"
            v-on:before-enter="_beforeEnter"
            v-on:after-leave="_afterLeave">
        <div class="ion-backdrop"
             @click="bdClick"
             :class="{'backdrop-no-tappable':!enableBackdropDismiss,'fixed':fixed}"
             :style="{'left':left+'px','top':top+'px'}"
             v-show="isActiveLocal"></div>
    </transition>
</template>
<style lang="scss">
    @import './backdrop';

    // transitioName = 'backdrop'
    .backdrop-enter-active, .backdrop-leave-active {
        transition: opacity 200ms;
    }

    .backdrop-enter, .backdrop-leave-active {
        opacity: 0
    }
</style>

<script>
  /**
   * @component Component/Backdrop
   * @description
   * 背景变黑的组件, 可以实例化也可以模板式调用!
   *
   * #### 实例化调用
   *
   *
   * ```
   <Content padding>
   <h3>BackDrop组件</h3>
   <h5>可以实例化调用也可以模板式调用</h5>
   <p>打开Backdrop, 4000ms之后关闭, 或者点击关闭</p>
   <Button block @click="present">打开Backdrop</Button>
   </Content>
   * ```
   * ```
   present(){
        const _this = this;
        let _timer;
        _this.$backdrop.present({
          bdClick () {
            clearTimeout(_timer)
            _this.$backdrop.dismiss()
          }
        });
        _timer = setTimeout(function () {
          _this.$backdrop.dismiss()
        }, 4000);
      },
   *```
   *
   * #### 模板调用
   * ```
   <Backdrop :bdClick="bdClick" :enableBackdropDismiss="enableBackdropDismiss" :isActive="isActive"></Backdrop>
   * ```
   *
   * */
  export default{
    name: 'Backdrop',
    data(){
      return {
        // 定义本地参数
        isActiveLocal: false, // 控制权由present/dismiss控制
        count: 0, // 记录开启数目
      }
    },
    props: {
      /**
       * 这个是给组件式调用, 实例化调用则不操作此变量
       * 即, 使用实例化方法: present/dismiss不受enableBackdropDismiss的限制
       * */
      enableBackdropDismiss: {
        type: Boolean,
        default: true
      },
      /**
       * 控制backdrop的显示隐藏
       * */
      isActive: {
        type: Boolean,
        default: false
      },
      /**
       * 点击背景的处理方式
       * */
      bdClick: {
        type: Function,
        default(){
          return function () {}
        }
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
      // 设置position：fixed
      fixed: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      isActive () {
        this.isActiveLocal = this.isActive;
      },
    },
    methods: {
      /**
       * 过渡钩子
       * @private
       */
      _beforeEnter (el) {
        this.$emit('onBackdropShown');
      },
      _afterLeave (el) {
        this.$emit('onBackdropHidden');
      }
    }
  }
</script>

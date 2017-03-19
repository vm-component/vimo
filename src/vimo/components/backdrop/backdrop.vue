<template>
  <transition
    name="backdrop"
    v-on:before-enter="_beforeEnter"
    v-on:after-leave="_afterLeave">
    <div class="ion-backdrop"
         @click="onBdClick"
         :class="{'backdrop-no-tappable':!enableBackdropDismiss}"
         :style="positionLocal"
         v-show="isActiveLocal"></div>
  </transition>
</template>
<script type="text/ecmascript-6">
  /**
   * @module Component/Backdrop
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
     <Button type="block" @click="present">打开Backdrop</Button>
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
   * @property {function} bdClick - 背景点击执行的方法
   * @property {object} position - backdrop偏移位置
   * @property {string} position.top -
   * @property {string} position.right -
   * @property {string} position.bottom -
   * @property {string} position.left -
   * */
  import { urlChange } from '../../util/dom';
  export default{
    name: 'Backdrop',
    data(){
      return {
        // 定义本地参数
        isActiveLocal: false, // 控制权由present/dismiss控制
        bdClickLocal: this.bdClick,
        positionLocal: this.position,
        isOpen: false, // 标示当前backdrop的开启状态, isActiveLocal为组件自身维护

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
      position: {
        type: Object,
        default: null,
      },
    },
    watch: {
      isActive () {
        this.isOpen = this.isActiveLocal = this.isActive;
      },
      position () {
        this.positionLocal = this.position;
      },
    },
    methods: {
      /**
       * 过渡钩子
       * @private
       */
      _beforeEnter (el) {
        this.$emit('$backdropShown');
        this.$eventBus.$emit('$backdropShown');
      },
      _afterLeave (el) {
        this.$emit('$backdropHidden');
        this.$eventBus.$emit('$backdropHidden');
      },
      _getPosition(){
        this.position = {}
      },

      /**
       * 当点击backdrop执行的动作
       * */
      onBdClick(){
        if (!!this.bdClickLocal) {
          this.bdClickLocal();
        }
      },

      /**
       * 开启backdrop实例化
       *
       * 第一次触发会显示暗色背景, 之后的触发都不显示,
       * 另外, 几次触发对应着几次的dismiss(让我显示是有代价的)
       *
       * @param {object} options - 开启参数
       * @example
       * {
       *    bdClick:Function
       *    position:{
       *      top:String/'10px',
       *      right:String/'10px',
       *      bottom:String/'10px',
       *      left:String/'10px',
       *    }
       * }
       * */
      present (options = null) {
        const _this = this;
        _this.count++;
        if (_this.count > 1) {
          return
        }

        if (!!options) {
          if (!!options.bdClick && typeof options.bdClick === 'function') {
            _this.bdClickLocal = options.bdClick;
          }
          if (!!options.position) {
            if (!!options.position['right']) {
              options.position['left'] = 'auto'
            }
            if (!!options.position['bottom']) {
              options.position['top'] = 'auto'
            }
            _this.positionLocal = options.position;
          } else {
            _this.positionLocal = null;
          }
        } else {
          _this.bdClickLocal = null;
          _this.positionLocal = null;
        }

        _this.isOpen = _this.isActiveLocal = true;

        // url变化触发关闭动作
        urlChange(function () {
          _this.dismiss()
        })
      },

      /**
       * 关闭backdrop实例化
       * */
      dismiss () {
        if (this.count > 1) {
          this.count--;
          return
        }
        this.count--;
        this.isOpen = this.isActiveLocal = false;
      },
    },
  }
</script>
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

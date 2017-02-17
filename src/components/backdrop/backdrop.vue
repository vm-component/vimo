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
  import {urlChange} from '../../util/dom';
  export default{
    name: 'ion-backdrop',
    data(){
      return {
        // 定义本地参数
        isActiveLocal: false, // 控制权由present/dismiss控制
        bdClickLocal: this.bdClick,
        positionLocal: this.position,
        isOpen: false, // 标示当前backdrop的开启状态, isActiveLocal为组件自身维护
        el:null, // backdrop填充的元素
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
       * 当点击backdrop执行的动作, 前提是enableBackdropDismiss必须开启
       * */
      onBdClick(){
        if (!!this.bdClickLocal) {
          this.bdClickLocal();
        }
      },

      /**
       * 开启backdrop实例化
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
        if (!!options) {
          if (!!options.bdClick && typeof options.bdClick === 'function') {
            _this.bdClickLocal = options.bdClick;
          }
          if(!!options.position){
            if(!!options.position['right']){
              options.position['left'] = 'auto'
            }
            if(!!options.position['bottom']){
              options.position['top'] = 'auto'
            }
            _this.positionLocal = options.position;
          }else{
            _this.positionLocal = null;
          }
        }else{
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
        this.isOpen = this.isActiveLocal = false;
      },
    },
  }
</script>
<style lang="scss">
  @import './backdrop';
  // transition
  @import '../../transitions/backdrop';
</style>

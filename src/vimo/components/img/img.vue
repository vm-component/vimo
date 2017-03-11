<template>
  <div class="ion-img img" :class="{'img-loaded':isLoaded,'img-unloaded':!isLoaded}"
       :style="{'width':getUnitValue(width),'height':getUnitValue(height)}">
    <img ref="img" :alt="alt" :src="srcValue" :width="getUnitValue(width)" :height="getUnitValue(height)">
  </div>
</template>
<style lang="scss">
  @import "./img.scss";
</style>
<script type="text/ecmascript-6">
  /**
   * @name Img
   * @module Component/Img
   * @description
   * Img组件, 用于实现Img按需加载的功能. 当滚动到将要显示的位置的时候再加载图片
   *
   * > Img组件只能在Content组件中使用!
   *
   * 这里能使用markdown语法
   *
   * */
  import { isPresent } from'../../util/util'

  export default{
    name: 'Img',
    props: {
      src: {
        type: String,
        default: '',
      },
      alt: {
        type: String,
        default: '',
      },
      width: {
        type: [Number, String],
        default: 0,
      },
      height: {
        type: [Number, String],
        default: 0,
      },
    },
    data(){
      return {
        _content: null, // 当前页面的Content组件
        _hasLoaded: false, // 判断图片是否加载完毕
        _requestingSrc: null, // 当前准备或正在请求的src
        _rect: null, // 当前组件与页面的位置关系

        isLoaded: false, // 当前图片是否加载
        _imgElement: null,
        // srcValue: this.src, // 内部使用的src值
      }
    },
    watch: {},
    computed: {
      srcValue: {
        get () {
          console.debug('srcValue get')
          return this.src
        },
        set (newSrc) {
          console.debug('srcValue set')
          // if the source hasn't changed, then um, let's not change it
          if (newSrc !== this.src) {
            // we're changing the source
            // so abort any active http requests
            // and render the image empty
            this.reset();

            if (newSrc.indexOf('data:') === 0) {
              // they're using an actual datauri already
              this._hasLoaded = true;

            } else {
              // reset any existing datauri we might be holding onto
              this._hasLoaded = false;
            }

            // run update to kick off requests or render if everything is good
            this.update();

            // update to the new src
            return newSrc;
          }
        }
      }
    },
    methods: {

      /**
       * 重置src请求
       * */
      reset(){
        if (this._requestingSrc) {
          // abort any active requests
          console.debug(`abortRequest ${this._requestingSrc} ${Date.now()}`);
          this.srcValue = null;
          this._requestingSrc = null;
        }
        if (this._renderedSrc) {
          // clear out the currently rendered img
          console.debug(`clearRender ${this._renderedSrc} ${Date.now()}`);
          this._renderedSrc = null;
          this._isLoaded(false);
        }
      },


      update(){

      },

      /**
       * 获取从图片顶部到页面顶部的距离
       * @private
       * @return {number}
       */
      top() {
        const bounds = this._getBounds();
        return bounds && bounds.top || 0;
      },

      /**
       * 获取从图片底部到页面顶部的距离
       * @private
       * @return {number}
       */
      bottom(){
        const bounds = this._getBounds();
        return bounds && bounds.bottom || 0;
      },

      /**
       * 将传入的height和width转为正确格式
       * @param {any} val
       * @return {string}
       */
      getUnitValue(val) {
        if (isPresent(val)) {
          if (typeof val === 'string') {
            if (val.indexOf('%') > -1 || val.indexOf('px') > -1) {
              return val;
            }
            if (val.length) {
              return val + 'px';
            }

          } else if (typeof val === 'number') {
            return val + 'px';
          }
        }
        return '';
      },

      /**
       * 获取当前组件的尺寸及距离页面的位置
       * */
      _getBounds() {
        if (!this._rect) {
          // let's do the raw DOM lookup w/ getBoundingClientRect
          this._rect = this.$el.getBoundingClientRect();
          console.debug(`img getBounds, ${this.src}, read, ${this._rect.top} - ${this._rect.bottom}`);
        }
        return this._rect;
      },

    },
    created () {

    },
    mounted () {
      const _this = this;

      _this._imgElement = _this.$refs.img;

      // 获取Page组件中的Content组件this
      let _pageComponentChildrenList = this.$vnode.context.$children[0].$children;
      _pageComponentChildrenList.forEach(function (component) {
        if (component.$options._componentTag.toLowerCase() === 'content') {
          _this._content = component;
        }
      });

      if (!_this._content) {
        console.warn('Img组件必须在Content组件中才能正常工作!')
      } else {
        _this._content.addImg(_this);
      }

      function imgLoadHandler () {
        _this._hasLoaded = true;
        _this.isLoaded = true;
        _this.update();
        console.debug('img loaded success!')
        _this._imgElement.removeEventListener('load', imgLoadHandler)
      }

      _this._imgElement.addEventListener('load', imgLoadHandler, {passive: true})



    },
    destroy(){
      // this._unreg && this._unreg();
      // this._content && this._content.removeImg(this);
    },
    components: {}
  }


</script>

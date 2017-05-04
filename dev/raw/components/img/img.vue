<template>
    <div class="ion-img img" :class="{'img-loaded':isLoaded,'img-unloaded':!isLoaded}" :src="src"
         :style="{'width':w,'height':h}">
        <transition name="fade">
            <img v-show="isLoaded" ref="img" :alt="alt" :src="srcValue" :width="w" :height="h">
        </transition>
    </div>
</template>
<style lang="scss">
    @import "./img.scss";

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }

    .fade-enter, .fade-leave-active {
        opacity: 0
    }
</style>
<script type="text/javascript">
  /**
   * @component Img
   * @description
   *
   * ## 其他 / Img图片加载组件
   *
   * ### 介绍
   *
   * Img组件, 用于实现Img按需加载的功能. 当滚动到将要显示的位置的时候再加载图片
   *
   * ### 注意
   *
   * - Img组件只能在Content组件中使用!
   * - 当滚动到确定位置后, img未下载完则有滚动到别处, 这样的请求也会被中断
   * - 当图片加载完毕, 滚动超过阈值则隐藏不显示, 这样做是为了降低内存使用
   *
   *
   * ### 如何引入
   * ```
   * // 引入
   * import { Img } from 'vimo/components/img'
   * // 安装
   * Vue.component(Img.name, Img)
   * // 或者
   * export default{
   *   components: {
   *    Img
   *  }
   * }
   * ```
   *
   *
   * @props {String} [alt='image']         - 图片的alt属性
   * @props {(Number|String)} [height=0]   - 图片的高度
   * @props {String} src                   - 图片的src地址
   * @props {(Number|String)} [width=0]    - 图片的宽度
   *
   * @demo http://xiangsongtao.com/vimo/#/img
   * @usage
   * <Img width="100%" height="200" src="static/1.jpg">
   *
   * */
  import { isPresent, registerListener } from '../../util/util'
  export default{
    name: 'Img',
    props: {
      src: [String],
      alt: {
        type: String,
        default: 'image'
      },
      width: {
        type: [Number, String],
        default: 0
      },
      height: {
        type: [Number, String],
        default: 0
      }
    },
    data () {
      return {
        isLoaded: false,      // 判断DOM是否显示img
        srcValue: null,       // 内部使用的src值
        w: this._wQ,          // 当前渲染的尺寸值
        h: this._hQ,          // 当前渲染的尺寸值

        canRequest: false,    // 这个值是由content组件控制的!
        canRender: false,     // 这个值是由content组件控制的!

        _content: null,       // 当前页面的Content组件
        _hasLoaded: false,    // 判断图片是否真正下载完毕
        _requestingSrc: null, // 当前正在请求的src
        _renderedSrc: null,   // 已经下载完毕渲染完毕的src
        _rect: null,          // 当前组件与页面的位置关系
        _imgElement: null,    // img标签元素
        _unreg: null,         // {function} 解除当前的注册事件
        _wQ: this.getUnitValue(this.width) || 0,  // 记录最新的尺寸值
        _hQ: this.getUnitValue(this.height) || 0 // 记录最新的尺寸值
      }
    },
    watch: {
      width () {
        this.setDims()
      },
      height () {
        this.setDims()
      },
      src () {
        this.initSrcValue()
      }
    },
    methods: {
      /**
       * 组件初始化操作
       * @private
       * */
      init () {
        // 获取img元素
        this._imgElement = this.$refs.img

        // 设置组件的尺寸
        this.setDims()

        // 根据src初始化部分参数
        this.initSrcValue()

        // 获取Page组件中的Content组件this
        // mounted的触发顺序是从最内层向外进行的, 故如果获取$vnode中的context, 则得不到有效值
        // 目前只能沿着继承顺序查找
        let _pageComponentChildrenList = this.$vnode.context.$children[0].$children || []
        _pageComponentChildrenList.forEach((component) => {
          if (component.$options._componentTag.toLowerCase() === 'content') {
            this._content = component
            this._content.addImg(this)
          }
        })

        console.assert(this._content, 'Img组件必须在Content组件中才能正常工作!')

        // 对img元素监听load事件, 事件结束解绑
        this._unreg = registerListener(this._imgElement, 'load', () => {
          this._hasLoaded = true // img loaded success!
          this.update()
        }, {passive: true})
      },

      /**
       * 重置src请求,将img的src置空, 撤去渲染结果
       * 当前组件的src记录在this.src中, 如果未加载, 则将this.src=>this._requestingSrc, 表示图片需要下载.
       * @private
       * */
      reset () {
        if (this._requestingSrc && !this._renderedSrc && !this._hasLoaded) {
          // 图片在请求下载阶段, 但是还未下载完毕, 这时就直接断掉下载过程
          // console.warn(`abortRequest ${this._requestingSrc} ${Date.now()}`);
          this.srcAttr(null)
          this._requestingSrc = null
        }
        if (this._renderedSrc) {
          // 当图片已经渲染出来显示过了, 则将其隐藏就行了, 这样做是为了降低内存使用
          // console.warn(`hideImg ${this._renderedSrc} ${Date.now()}`);
          this.setLoaded(false)
        }
      },

      /**
       * 更新
       * @private
       * */
      update () {
        // 图片的更新需要受到Content组件的控制 => Img组件的canRequest和canRender两个值
        if (this.src && this._content && this._content.isImgsUpdatable()) {
          if (this.canRequest && (this.src !== this._renderedSrc && this.src !== this._requestingSrc) && !this._hasLoaded) {
            // 图片没请求过也没下载过页面渲染过的情况
            // 第一次加载图片,先下载吧
            this._requestingSrc = this.src
            this.setLoaded(false)
            this.srcAttr(this.src)
            // 更新图片的尺寸
            this.setDims()
            // console.debug(`Img request ${this.src} ${Date.now()}`);
          }

          if (this.canRender && this._hasLoaded) {
            if (this.src !== this._renderedSrc) {
              // 已经下载但是从未显示的情况, 第一次显示
              this._renderedSrc = this.src
              // 更新图片的尺寸
              this.setDims()
              this.srcAttr(this.src)
              this.setLoaded(true)
            } else {
              // 已经下载过, 也显示过
              this.setLoaded(true)
            }
            // console.debug(`Img show ${this.src} ${Date.now()}`);
          }
        }
      },

      /**
       * 设置DOM控制
       * @private
       * */
      setLoaded (isLoaded) {
        this.isLoaded = isLoaded
      },

      /**
       * 设置imgbox的尺寸值
       * @private
       * */
      setDims () {
        // 发生变化才更新
        this._wQ = this.getUnitValue(this.width) || 0
        this._hQ = this.getUnitValue(this.height) || 0

        if (this.w !== this._wQ || this.h !== this._hQ) {
          if (this.w !== this._wQ) {
            this.w = this._wQ
          }
          if (this.h !== this._hQ) {
            this.h = this._hQ
          }
        }
      },

      /**
       * 初始化/改变prop中src值时的处理函数
       * @private
       * */
      initSrcValue () {
        // 重置src请求,将img的src置空, 撤去渲染结果
        this.reset()
        if (this.src.indexOf('data:') === 0) {
          // 如果使用的是datauri, 则意味着图片已经下载完毕
          this._hasLoaded = true
        } else {
          // 普通的src连接, 意味着图片还未下载
          this._hasLoaded = false
        }
        this.update()
      },

      /**
       * 真正设置img元素src的函数, 设置意味着即将进行img下载
       * @param {string} srcAttr - 将要加载的img的src属性值
       * @private
       * */
      srcAttr (srcAttr) {
        this.srcValue = srcAttr
      },

      /**
       * 将传入的height和width转为正确格式
       * @param {any} val
       * @return {string}
       * @private
       */
      getUnitValue (val) {
        if (isPresent(val)) {
          if (typeof val === 'string') {
            if (val.indexOf('%') > -1 || val.indexOf('px') > -1) {
              return val
            }
            if (val.length) {
              return val + 'px'
            }
          } else if (typeof val === 'number') {
            return val + 'px'
          }
        }
        return ''
      },

      /**
       * 获取当前组件的尺寸及距离页面的位置
       * @private
       * */
      getBounds () {
        if (!this._rect) {
          // 需要等待DOM更新完毕
          this._rect = this.$el.getBoundingClientRect()
          // console.debug(`img getBounds, ${this.src}, read, ${this._rect.top} - ${this._rect.bottom}`);
        }
        return this._rect
      },

      /**
       * 获取从图片底部到页面顶部的距离
       * @private
       * */
      getBottom () {
        const bounds = this.getBounds()
        return bounds && bounds.bottom || 0
      },

      /**
       * 获取从图片顶部到页面顶部的距离
       * @private
       * */
      getTop () {
        const bounds = this.getBounds()
        return bounds && bounds.top || 0
      }
    },
    mounted () {
      this.init()
    },
    destroy () {
      this._unreg && this._unreg()
      this._content && this._content.removeImg(this)
    }
  }
</script>

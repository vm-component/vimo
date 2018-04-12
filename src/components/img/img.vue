<template>
    <div class="ion-img img" :class="{'img-loaded':isLoaded,'img-unloaded':!isLoaded}" :src="src"
         :style="{'width':w,'height':h}">
        <transition name="fade">
            <img v-show="isLoaded" ref="img" :alt="alt" :src="srcValue" :width="w" :height="h">
        </transition>
    </div>
</template>
<script type="text/javascript">
  import { isPresent } from '../../util/type'
  import registerListener from '../../util/register-listener'

  export default {
    name: 'Img',
    inject: {
      contentComponent: {
        from: 'contentComponent',
        default: null
      }
    },
    props: {
      src: String,
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
        isLoaded: false,        // 判断DOM是否显示img
        srcValue: null,         // 内部使用的src值
        w: this.wQ,             // 当前渲染的尺寸值
        h: this.hQ,             // 当前渲染的尺寸值

        canRequest: false,      // 这个值是由content组件控制的!
        canRender: false,       // 这个值是由content组件控制的!

        hasLoaded: false,       // 判断图片是否真正下载完毕
        requestingSrc: null,    // 当前正在请求的src
        renderedSrc: null,      // 已经下载完毕渲染完毕的src
        rect: null,             // 当前组件与页面的位置关系
        imgElement: null,       // img标签元素
        wQ: this.getUnitValue(this.width) || 0,  // 记录最新的尺寸值
        hQ: this.getUnitValue(this.height) || 0, // 记录最新的尺寸值

        unRegLoadImg: null      // {function} 解除当前的注册事件
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
        // console.assert(this.contentComponent, 'Img组件必须在Content组件中才能正常工作!')

        // 获取img元素
        this.imgElement = this.$refs.img

        // 设置组件的尺寸
        this.setDims()

        // 根据src初始化部分参数
        this.initSrcValue()

        this.contentComponent && this.contentComponent.$_addImg(this)
      },

      /**
       * 重置src请求,将img的src置空, 撤去渲染结果
       * 当前组件的src记录在this.src中, 如果未加载, 则将this.src=>this.requestingSrc, 表示图片需要下载.
       * @private
       * */
      reset () {
        if (this.requestingSrc && !this.renderedSrc && !this.hasLoaded) {
          // 图片在请求下载阶段, 但是还未下载完毕, 这时就直接断掉下载过程
          // console.warn(`abortRequest ${this.requestingSrc} ${Date.now()}`);
          this.srcAttr('')
          this.requestingSrc = null
        }
        if (this.renderedSrc) {
          // 当图片已经渲染出来显示过了, 则将其隐藏就行了, 这样做是为了降低内存使用
          // console.warn(`hideImg ${this.renderedSrc} ${Date.now()}`);
          this.setLoaded(false)
        }
      },

      /**
       * 更新
       * @private
       * */
      update () {
        // 图片的更新需要受到Content组件的控制 => Img组件的canRequest和canRender两个值
        if (this.src && this.contentComponent && this.contentComponent.$_isImgUpdatable()) {
          if (this.canRequest && (this.src !== this.renderedSrc && this.src !== this.requestingSrc) && !this.hasLoaded) {
            // 图片没请求过也没下载过页面渲染过的情况
            // 对img元素监听load事件, 事件结束解绑
            if (!this.unRegLoadImg) {
              this.unRegLoadImg = registerListener(this.imgElement, 'load', () => {
                this.unRegLoadImg && this.unRegLoadImg()
                this.unRegLoadImg = null
                this.hasLoaded = true // img loaded success!
                this.update()
              }, {passive: true})
            }

            // 第一次加载图片,先下载吧
            this.requestingSrc = this.src
            this.setLoaded(false)
            this.srcAttr(this.src)
            // 更新图片的尺寸
            this.setDims()
          }

          if (this.canRender && this.hasLoaded) {
            if (this.src !== this.renderedSrc) {
              // 已经下载但是从未显示的情况, 第一次显示
              this.renderedSrc = this.src
              // 更新图片的尺寸
              this.setDims()
              this.srcAttr(this.src)
              this.setLoaded(true)
            } else {
              // 已经下载过, 也显示过
              this.setLoaded(true)
            }
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
        this.wQ = this.getUnitValue(this.width) || 0
        this.hQ = this.getUnitValue(this.height) || 0

        if (this.w !== this.wQ || this.h !== this.hQ) {
          if (this.w !== this.wQ) {
            this.w = this.wQ
          }
          if (this.h !== this.hQ) {
            this.h = this.hQ
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
          this.hasLoaded = true
        } else {
          // 普通的src连接, 意味着图片还未下载
          this.hasLoaded = false
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
        if (!this.rect) {
          // 需要等待DOM更新完毕
          this.rect = this.$el.getBoundingClientRect()
        }
        return this.rect
      },

      /**
       * 获取从图片底部到页面顶部的距离
       * @private
       * */
      getBottom () {
        const bounds = this.getBounds()
        return (bounds && bounds.bottom) || 0
      },

      /**
       * 获取从图片顶部到页面顶部的距离
       * @private
       * */
      getTop () {
        const bounds = this.getBounds()
        return (bounds && bounds.top) || 0
      }
    },
    mounted () {
      this.init()
    },
    destroyed () {
      this.unRegLoadImg && this.unRegLoadImg()
      this.unRegLoadImg = null
      this.reset()
    }
  }
</script>

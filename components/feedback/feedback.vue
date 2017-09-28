<template>
    <section class="vm-feedback feedback__inputBox">
        <!--textarea-->
        <div class="feedback__inputBox--textareaBox">
            <vm-textarea :placeholder="placeholder"
                         ref="textarea"
                         v-model="value.text"
                         :name="name"
                         :rows="rows"
                         :readonly="readonly"
                         :disabled="disabled"
                         :autofocus="autofocus"
                         :maxlength="maxlength"
                         @onInput="inputHandler"></vm-textarea>
        </div>
        <p class="feedback__text">{{textCount}}/{{maxlength}}</p>
        <!--image 1~3| && word count-->
        <div class="feedback__inputBox--images">
            <div class="image"
                 v-for="(item,index) in value.images" :key="index"
                 :style="{backgroundImage:'url('+item.code+')'}">
                <div class="preview" @click="previewImage(index)"></div>
                <div class="delete" @click="removeImage(index)"></div>
            </div>
            <!--input-->
            <div class="image empty" v-show="value.images.length < maximage" @click="addFile($event)">
                <input @change="onChangeHandler" class="file" type="file">
            </div>
        </div>
    </section>
</template>
<script type="text/javascript">
  /**
   * @component Feedback
   * @description
   *
   * ## 反馈图文框组件 / Feedback
   *
   * 用于反馈/意见信息/评价等场景. 如果在Alipay环境，则使用alipay的组件上传。
   *
   * ### 如何引入
   * ```
   * import Feedback from 'vimo/lib/feedback'
   * Vue.component(Feedback.name, Feedback)
   * // 或者
   * export default{
   *   components: {
   *     Feedback
   *  }
   * }
   * ```
   *
   * @props {Number} [rows=3] - rows
   * @props {String} [name] - name
   * @props {Boolean} [readonly=false] - readonly
   * @props {Boolean} [disabled=false] - disabled
   * @props {Boolean} [autofocus=false] - autofocus
   * @props {String} [placeholder='请输入您的反馈...'] - placeholder
   * @props {Number} [maxlength=300] - 文本输入的最大长度
   * @props {Number} [maximage=300] - 图片上传的最大个数
   * @props {Boolean} [isH5=false] - 是否强制使用H5模式
   *
   * @props {Object} value - 传入传出数据
   * @props {String} value.text - 传入传出文本
   * @props {Array} value.images - 传入传出图片信息
   * @props {Array} value.images.code - base64格式的图片
   * @props {Array} value.images.blob - 修正方向及大小的二进制blob
   * @props {Array} value.images.file - 图片file句柄
   *
   * @demo #/feedback
   * @usage
   * <Feedback v-model="feedbackInfo" :maxlength="100" :maximage="4"></Feedback>
   * */
  import canvasResize from './fixImage'
  import { isString, isArray } from '../util/util'
  import Textarea from '../input'
  import PreviewImage from '../preview-image'

  export default {
    name: 'Feedback',
    components: {'vm-textarea': Textarea},
    data () {
      return {}
    },
    props: {
      rows: {
        type: Number,
        default: 3
      },
      name: String,
      readonly: Boolean,
      disabled: Boolean,
      autofocus: Boolean,
      placeholder: {
        type: String,
        default: '请输入您的反馈...'
      },
      maxlength: {
        type: Number,
        default: 300
      },
      maximage: {
        type: Number,
        default: 3
      },
      value: {
        type: Object,
        required: true,
        validator (value) {
          return isString(value.text) && isArray(value.images)
        }
      },
      isH5: Boolean
    },
    computed: {
      textareaComponent () {
        return this.$refs.textarea
      },
      // 计算输入数
      textCount () {
        return this.value.text.length
      }
    },
    methods: {
      /**
       * @function update
       * @description
       * 更新textarea组件
       * */
      update () {
        this.textareaComponent.update()
      },

      /**
       * @function destroy
       * @description
       * 销毁textarea组件
       * */
      destroy () {
        this.textareaComponent.destroy()
      },

      // -------- private -------

      /**
       * 图片预览
       * ps: alipay 的图片预览组件 无法预览 自己的图片选择器选择的文件， 因此这里使用的是H5组件
       * @private
       * */
      previewImage (index) {
        let images = []
        this.value.images.forEach((image) => {
          images.push(image.code)
        })

        PreviewImage.present({
          isH5: true,
          current: index || 0,
          urls: images || []
        })
      },

      /**
       * @private
       * */
      addFile ($event) {
        let isAlipayReady = window.AlipayJSBridge && !this.isH5
        if (isAlipayReady) {
          // 阻止h5的input的触发
          $event.preventDefault()
          $event.stopPropagation()
          console.info('Feedback 组件使用Alipay模式, 单次上传一张.')
          window.ap && window.ap.chooseImage(1, (res) => {
            window.ap && window.ap.compressImage({
              apFilePaths: res.apFilePaths,
              level: 0
            }, (result) => {
              // Cannot read property '0' of undefined
              if (result && result.apFilePaths && result.apFilePaths.length > 0 && result.apFilePaths[0]) {
                let imgData = {
                  code: result.apFilePaths[0],
                  blob: result.apFilePaths[0], // 转化的二进制图片文件
                  file: result.apFilePaths[0] // 源文件 file
                }
                this.pushImageData(imgData)
              }
            })
          })
        } else {
          console.info('Feedback 组件使用H5模式!')
        }
      },

      /**
       * @private
       * */
      inputHandler () {
        if (this.value.text.length > this.maxlength) {
          this.value.text = this.value.text.substr(0, this.maxlength)
        } else {
          this.$emit('input', this.value)
        }
      },

      /**
       * 图片数据推入
       * @private
       * */
      pushImageData (imgData) {
        this.value.images.push(imgData)
        this.$emit('input', this.value)
      },

      /**
       * 插入图片时
       * @private
       * */
      onChangeHandler (event) {
        let input = event.target
        let fixImage = (file, callback) => {
          // 加载资源
          canvasResize(file, {
            width: 640, // 最大的尺寸,如果比这小是不会出现放大的情况的,文章宽度为710px
            height: 0,
            crop: false,
            quality: 80,
            // rotate: 90,
            callback (data, width, height) {
              // 将图片改为二进制文件,准备上传
              let _blob = canvasResize('dataURLtoBlob', data)
              !!callback && callback(_blob)
            }
          })
        }
        if (input.files && input.files[0]) {
          let file = input.files[0]
          if (!input.files[0].type.match('image.*')) {
            return null
          }
          fixImage(file, (_blob) => {
            let reader = new FileReader()
            reader.onload = (e) => {
              let imgData = {
                code: e.target.result,
                blob: _blob, // 转化的二进制图片文件
                file: file // 源文件 file
              }
              this.pushImageData(imgData)
            }
            reader.readAsDataURL(_blob)
          })
        }
      },

      /**
       * 点击移除图片
       * @private
       * */
      removeImage (index) {
        this.value.images.splice(index, 1)
      }
    }
  }
</script>
<style lang="less">
    .vm-feedback.feedback__inputBox {
        border-bottom: 1px solid #f2f2f2;
        width: 100%;
        background: #fff;
        box-sizing: border-box;
        margin-bottom: 10px;
        .feedback__inputBox--textareaBox {
            height: auto;
            width: 100%;
            padding: 10px;
            background: #fff;
        }
        .feedback__text {
            color: #8b8b8b;
            font-size: 14px;
            margin: 0;
            text-align: right;
            padding: 0 10px;
        }
        .feedback__inputBox--images {
            display: flex;
            justify-content: flex-start;
            align-content: flex-start;
            flex-wrap: wrap;
            padding: 10px;
            .image {
                width: 60px;
                height: 60px;
                margin-right: 10px;
                margin-bottom: 10px;
                box-sizing: border-box;
                /*overflow: hidden;*/
                position: relative;

                display: flex;
                flex: 0 0 auto;
                justify-content: center;
                align-items: center;

                border: 1px solid #eee;

                background-repeat: no-repeat;
                background-color: #eee;
                background-position: center center;
                background-size: cover;

                .file {
                    display: none;
                }
                img {
                    width: 100%;
                    min-height: 100%;
                }
            }
            .preview {
                height: 100%;
                width: 100%;
                position: absolute;
                z-index: 1;
                left: 0;
                top: 0;
            }
            .delete {
                position: absolute;
                height: 25px;
                width: 25px;
                top: -5px;
                right: -5px;
                z-index: 2;
                &:before {
                    content: '';
                    position: absolute;
                    height: 16px;
                    width: 16px;
                    background: red;
                    border-radius: 100%;
                    top: 0;
                    right: 0;
                    z-index: 3;
                }
                &:after {
                    content: '';
                    height: 1px;
                    width: 10px;
                    position: absolute;
                    background: #fff;
                    top: 7px;
                    right: 3px;
                    z-index: 4;
                }
            }
            .empty {
                border: 1px dashed #8c8c8c;
                background: #f3f3f3;
                position: relative;
                .file {
                    display: block !important;
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                }

                &::before,
                &::after {
                    background: #dadada;
                    left: 50%;
                    top: 50%;
                    position: absolute;
                    content: '';
                }
                &::after {
                    margin-left: -1px;
                    margin-top: -15px;
                    height: 30px;
                    width: 2px;
                }
                &::before {
                    margin-left: -15px;
                    margin-top: -1px;
                    width: 30px;
                    height: 2px;
                }
            }
        }
    }
</style>

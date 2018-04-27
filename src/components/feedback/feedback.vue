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
  import canvasResize from './fixImage'
  import { isArray, isString } from '../../util/type'
  import Textarea from '../textarea/index'
  import PreviewImage from '../preview-image/index'

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

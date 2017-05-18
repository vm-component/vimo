<template>
    <section class="feedback__inputBox">
        <!--textarea-->
        <div class="feedback__inputBox--textareaBox">
            <textarea :placeholder="placeholder"
                      ref="textarea"
                      v-model="value.text"
                      :name="name"
                      :rows="rows"
                      :readonly="readonly"
                      :disabled="disabled"
                      :autofocus="autofocus"
                      :maxlength="maxlength"
                      @input="inputHandler"></textarea>
        </div>
        <p class="feedback__text">{{textCount}}/{{maxlength}}</p>
        <!--image 1~3| && word count-->
        <div class="feedback__inputBox--images">
            <div class="image"
                 v-for="(item,index) in value.images" :key="index"
                 :style="{backgroundImage:'url('+item.code+')'}">
                <div class="delete" @click="removeImage(index)"></div>
            </div>
            <!--input-->
            <div class="image empty"
                 v-show="value.images.length < maximage">
                <input @change="onChangeHandler" class="file" type="file">
            </div>
        </div>
    </section>
</template>
<script type="text/javascript">
  /**
   * @componsnt Feedback
   * @description
   *
   * ## 反馈图文框组件 / Feedback
   *
   * 用于反馈/意见信息/评价等场景.
   *
   * @props {Number} [rows=3] - rows
   * @props {String} [name] - name
   * @props {Boolean} [readonly=false] - readonly
   * @props {Boolean} [disabled=false] - disabled
   * @props {Boolean} [autofocus=false] - autofocus
   * @props {String} [placeholder='请输入您的反馈...'] - placeholder
   * @props {Number} [maxlength=300] - 文本输入的最大长度
   * @props {Number} [maximage=300] - 图片上传的最大个数
   * @props {Object} value - 传入传出数据
   * @props {String} value.text - 传入传出文本
   * @props {Array} value.images - 传入传出图片信息
   *
   * */
  import './fixImage'
  import { isString, isArray } from '../../util/util'
  import Autosize from 'autosize'
  export default{
    name: 'Feedback',
    data(){
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
        validator: function (value) {
          return isString(value.text) && isArray(value.images)
        }
      }
    },
    computed: {
      textareaElement () {
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
        Autosize.update(this.textareaElement)
      },
      /**
       * @function destroy
       * @description
       * 销毁textarea组件
       * */
      destroy () {
        Autosize.destroy(this.textareaElement)
      },

      // -------- private -------

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
        const fixImage = (file, callback) => {
          //加载资源
          canvasResize(file, {
            width: 640,//最大的尺寸,如果比这小是不会出现放大的情况的,文章宽度为710px
            height: 0,
            crop: false,
            quality: 80,
            //rotate: 90,
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
              this.$indicator.dismiss()
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
    },
    mounted(){
      Autosize(this.textareaElement)
    }
  }
</script>
<style scoped lang="scss">
    .feedback__inputBox {
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
            textarea {
                width: 100%;
                padding: 0;
                border: none;
                font-size: 14px;
                color: #000;
                height: 91px;
                line-height: 130%;
                background: transparent;
                border-radius: 3px;
                resize: none;
                border: 0;
                -webkit-appearance: none;
                outline: none
            }
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

                /*background-image: url();*/
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
            .delete {
                position: absolute;
                height: 25px;
                width: 25px;
                top: -5px;
                right: -5px;
                &:before {
                    content: '';
                    position: absolute;
                    height: 16px;
                    width: 16px;
                    background: red;
                    border-radius: 100%;
                    top: 0;
                    right: 0;
                }
                &:after {
                    content: '';
                    height: 1px;
                    width: 10px;
                    position: absolute;
                    background: #fff;
                    top: 7px;
                    right: 3px;
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
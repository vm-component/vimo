export { default } from './feedback.vue'
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
 * import { Feedback } from 'vimo'
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

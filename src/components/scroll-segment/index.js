export { default } from './scroll-segment.vue'
/**
 * @component ScrollSegment
 * @description
 *
 * ## 滑动片段组件 / ScrollSegment
 *
 * ### 介绍
 *
 * 该组件提供了一个可横向滚动的盒子, 子组件`ScrollSegmentButton`作为每一项在其中可滚动. 比如用在横向的Segment选择, 比如网易新闻的不同新闻类别;或者电影的横向滚动清单等. 当点击某一个`ScrollSegmentButton`子组件时, 该组件滚动到中间. 需要注意的是, 该组件提供水平方向的滚动, 且子组件的长度并不是固定的, 任意长度都能点击后移动到中间.
 *
 *
 * ### v-model控制初始值
 *
 * 通过v-model控制初始值, 当值发生变化时, 组件也能同步更新位置. 如果设置的值超过子组件的数量边界(0 -> length-1), 则设置的值不生效.
 *
 *
 * ### 如何引入
 * ```
 * // 引入
 * import { ScrollSegment, ScrollSegmentButton } from 'vimo'
 * // 安装
 * Vue.component(ScrollSegment.name, ScrollSegment)
 * Vue.component(ScrollSegmentButton.name, ScrollSegmentButton)
 * // 或者
 * export default{
   *   components: {
   *     ScrollSegment, ScrollSegmentButton
   *  }
   * }
 * ```
 *
 * @props {String} [activeClass='segment-button-active'] - 子组件激活时添加的class
 * @props {Number} [value=0] - 子组件初始值
 *
 * @demo #/scroll-segment
 * @usage
 *
 * <ScrollSegment :value="2">
 *    <ScrollSegmentButton>
 *        <div class="srollSegmentButton">鱼香肉丝</div>
 *    </ScrollSegmentButton>
 *    <ScrollSegmentButton>
 *        <div class="srollSegmentButton">红烧狮子头</div>
 *    </ScrollSegmentButton>
 *    <ScrollSegmentButton>
 *        <div class="srollSegmentButton">卷了三个鸡蛋的煎饼果子</div>
 *    </ScrollSegmentButton>
 *    <ScrollSegmentButton>
 *        <div class="srollSegmentButton">新疆烤肉和香酥烤全羊</div>
 *    </ScrollSegmentButton>
 *    <ScrollSegmentButton>
 *        <div class="srollSegmentButton">土家酱饼</div>
 *    </ScrollSegmentButton>
 *    <ScrollSegmentButton>
 *        <div class="srollSegmentButton">杭椒牛柳</div>
 *    </ScrollSegmentButton>
 *    <ScrollSegmentButton>
 *        <div class="srollSegmentButton">鸡蛋灌饼</div>
 *    </ScrollSegmentButton>
 *    <ScrollSegmentButton>
 *        <div class="srollSegmentButton">超级辣的BT变态烤翅</div>
 *    </ScrollSegmentButton>
 *     <ScrollSegmentButton>
 *        <div class="srollSegmentButton">啤酒</div>
 *    </ScrollSegmentButton>
 * </ScrollSegment>
 *
 * */

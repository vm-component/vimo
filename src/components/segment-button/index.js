export { default } from './segment-button.vue'
/**
 * @component Segment/SegmentButton
 * @description
 *
 * ## 小标签 / SegmentButton
 *
 * Segment组件的子组件SegmentButton, 两者配合使用, 属于嵌套关系.
 *
 * @props {String|Number} value - 当前SegmentButton的值, 如果父元素的value和这个相同, 这个当前被选中
 * @props {Boolean} [disabled=false] - 当前SegmentButton的禁用状态
 *
 * @slot 空 - 当前button的显示值, 如果没有提供value值, 建议不要嵌套过多的结构.
 *
 * @fires component:Segment#onSelect
 * @see component:Segment
 *
 * */

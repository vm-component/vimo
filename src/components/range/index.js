export { default } from './range.vue'
/**
 *
 * @component Range
 * @description
 *
 * ## 表单组件 / Range滑块组件
 *
 *
 * ### 注意
 *
 * @props {String} [color] - 颜色
 * @props {Boolean} [disabled=false] - 是否禁用
 * @props {Boolean} [dualKnobs=false] - 选择的拖动按钮, 默认是一个, true为两个
 * @props {Number} [max=100] - range的最大值
 * @props {Number} [min=0] - range的最小值
 * @props {String} [mode='ios'] - 模式
 * @props {Boolean} [pin=false] - 当拖动knob时显示大头针提示
 * @props {Boolean} [snaps=false] - 类似于卡槽, 如果为true, 则在range上画标尺, 并且拖动中knob只能停留在标尺标记处
 * @props {Number} [step=1] - 移动的步伐/粒度
 * @props {String| Number| Object} [value] - v-model对应的值, 需要出发input事件
 *
 * @slot range-right - 在range组件右边, 一般放Icon
 * @slot range-left - 在range组件左边, 一般放Icon
 *
 * @demo #/range
 *
 * @usage
 * <List>
 *    <ListHeader>
 *        <span>Brightness</span>
 *        <Badge slot="item-right">{{brightness}}</Badge>
 *    </ListHeader>
 *    <Item>
 *         <Range v-model="brightness">
 *            <Icon slot="range-left" small name="sunny"></Icon>
 *            <Icon slot="range-right" name="sunny"></Icon>
 *        </Range>
 *    </Item>
 * </List>
 *
 * */

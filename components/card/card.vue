<template>
    <div class="ion-card" :class="[modeClass,colorClass]">
        <slot></slot>
    </div>
</template>
<style lang="less">
    @import "card";
    @import "card.ios.less";
    @import "card.md.less";
</style>
<script type="text/javascript">
  /**
   * @component Card
   * @description
   *
   * ## 卡片组件 / Card组件
   *
   *
   * ### 配合一起的子组件
   *
   * 组合关系如下, img的宽度为 width: 100%
   * ```
   * <Card>
   *    <img src="">
   *    <CardHeader>
   *         <CardTitle>CardTitle</CardTitle>
   *    </CardHeader>
   *    <CardContent>
   *        <CardTitle>CardTitle</CardTitle>
   *        <p>CardContent</p>
   *    </CardContent>
   * </Card>
   * ```
   *
   * #### CardHeader
   *
   * 包裹Card的头部, 增加padding. 这里定义在内部的所有的结构都是的的单行, 且尾部自动加省略号.
   *
   * #### CardTitle
   *
   * 表示title, 字体会大点
   *
   * #### CardContent
   *
   * 增加内部内容的padding, 放置内容. 当然, 不是全部都放在这里, 放在外面也好.
   *
   *
   *
   *
   * ### 如何引入
   * ```
   * // 引入
   * import { Card, CardContent, CardHeader, CardTitle } from 'vimo/lib/card'
   * // 安装
   * Vue.component(Card.name, Card)
   * Vue.component(CardContent.name, CardContent)
   * Vue.component(CardHeader.name, CardHeader)
   * Vue.component(CardTitle.name, CardTitle)
   * // 或者
   * export default{
   *   components: {
   *     Card, CardContent, CardHeader, CardTitle
   *  }
   * }
   * ```
   *
   * @slot 空 - 默认嵌入全部内容
   *
   * @demo #/cards
   *
   * */
  import mixin from './mixin'
  export default{
    name: 'Card',
    data () {
      return {
        componentName: 'card'
      }
    },
    extends: mixin
  }
</script>

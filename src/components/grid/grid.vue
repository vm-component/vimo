<template>
    <div class="grid">
        <slot></slot>
    </div>
</template>
<style lang="less">
    @import "grid.css";
</style>
<script type="text/javascript">
  /**
   * @component Grid
   * @description
   *
   * ## 栅格系统 / Grid组件
   *
   * ### 简要
   *
   * 栅格系统类似于 **Bootstrap's grid system**, 其本质是基于flex布局.
   *
   * Vimo的栅格由**Grid/Row/Column**三个组件组成, Grid定义外部flex容器, Row定义行, Column定义列. 栅格系统的默认列为12行. 当然, 以上都是可以通过修改Scss文件定制的, 但是这么做的人应该很少.
   *
   * > 注意: 如果不了解Bootstrap和Flexbox请再恶补相关的知识.
   *
   * ### Grid/Row/Colume组件属性
   *
   * 下列属性写在组件标签中即可生效, 名称及含义与flex相似, 具体请看右边示例:
   *
   * - Grid属性:
   *    - [no-padding]: 子元素除去全部padding
   *    - [sudoku]: 九宫格
   *
   * - Row属性:
   *    - [nowrap]
   *    - [wrap-reverse]
   *    - [align-items-start]
   *    - [align-items-center]
   *    - [align-items-end]
   *    - [align-items-stretch]
   *    - [align-items-baseline]
   *    - [justify-content-start]
   *    - [justify-content-center]
   *    - [justify-content-end]
   *    - [justify-content-around]
   *    - [justify-content-between]
   *
   * - Column属性:
   *    - [align-self-start]
   *    - [align-self-end]
   *    - [align-self-center]
   *    - [align-self-stretch]
   *    - [align-self-baseline]
   *
   *
   * ### 响应式Column属性
   *
   * - 断点位置(breakpoint):
   *    - xs: 0
   *    - sm: 576px
   *    - md: 768px
   *    - lg: 992px
   *    - xl: 1200px
   *
   * - 使用方法:
   *    - [col-${breakpoint}-${i}]
   *    - [offset-${breakpoint}-${i}]: 定义属性margin-left
   *    - [pull-${breakpoint}-${i}]: 定义属性right
   *    - [push-${breakpoint}-${i}]: 定义属性left
   *
   * ### 如何引入
   *
   * ```
   * // 引入
   * import { Column, Grid, Row } from 'vimo/lib/grid'
   * // 安装
   * Vue.component(Grid.name, Grid)
   * Vue.component(Row.name, Row)
   * Vue.component(Column.name, Column)
   * ```
   *
   * @demo #/grid
   * @usage
   * <Grid no-padding>
   *    <Row justify-content-center align-items-center>
   *        <Column pull-sm-4>
   *            1 of 3
   *        </Column>
   *        <Column>
   *            2 of 3
   *        </Column>
   *        <Column>
   *            3 of 3
   *        </Column>
   *    </Row>
   * </Grid>
   * */
  export default {
    name: 'Grid'
  }
</script>

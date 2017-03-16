<template>
    <div class="grid">
        <slot></slot>
    </div>
</template>
<style lang="scss">
    @import "grid.scss";
</style>
<script type="text/ecmascript-6">
  /**
   * @module Component/Grid
   * @description
   *
   * 栅格系统这部分是对 Bootstrap's grid system 的移植, 基于flexBox布局.
   *
   * 栅格由Grid/Row/Column三个组件组成, Grid定义外部flex容器, Row定义行, Column定义列. 栅格系统的列为12行.
   *
   * 当然, 以上都是可以通过修改Scss文件定制的, 但是这么做的人应该很少.
   *
   * **注意: **如果不了解Bootstrap和Flexbox请再恶补相关的知识.
   *
   * 栅格Grid的使用格式大致如下:
   *
   * ```
   <Grid no-padding>
      <Row>
          <Column>
            1 of 3
          </Column>
          <Column>
            2 of 3
          </Column>
          <Column>
            3 of 3
          </Column>
      </Row>
   </Grid>
   * ```
   * 这里对Grid/Row/Colume上能放的属性大致列一下, 希望你心中有数(例如上面的no-padding属性的使用):
   *
   * @example
   *
   * Grid属性:
   * [no-padding]: 子元素除去全部padding
   *
   * Row属性:
   * [nowrap]
   * [wrap-reverse]
   * [align-items-start]
   * [align-items-center]
   * [align-items-end]
   * [align-items-stretch]
   * [align-items-baseline]
   * [justify-content-start]
   * [justify-content-center]
   * [justify-content-end]
   * [justify-content-around]
   * [justify-content-between]
   *
   * Column属性:
   * [align-self-start]
   * [align-self-end]
   * [align-self-center]
   * [align-self-stretch]
   * [align-self-baseline]
   *
   *
   * 响应式Column属性:
   * breakpoint-infix(xs, (xs: 0, sm: 576px, md: 768px, lg: 992px, xl: 1200px))
   *
   * [col-${breakpoint}-${i}]
   * [offset-${breakpoint}-${i}]: 定义属性margin-left
   * [pull-${breakpoint}-${i}]: 定义属性right
   * [push-${breakpoint}-${i}]: 定义属性left
   * */
  export default{
    name: 'Grid',
  }
</script>

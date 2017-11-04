<template>
    <div class="vm-separation">
        <div class="vm-separation-line"></div>
        <div class="vm-separation-wrap">
            <slot></slot>
        </div>
        <div class="vm-separation-line"></div>
    </div>
</template>
<style lang="less">
    .vm-separation {
        width: 100%;
        margin: 15px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        .vm-separation-line {
            position: relative;
            flex: 1;
            &:after {
                content: '';
                position: absolute;
                top: 50%;
                height: 0;
                width: 100%;
                border-top: 1px solid #dddddd;
            }
        }
        .vm-separation-wrap {
            padding: 0 10px;
            color: #9f9f9f;
        }
    }
</style>
<script type="text/javascript">
  /**
   * @component Separation
   * @description
   *
   * ## 段落分割组件 / Separation
   *
   * ### 介绍
   *
   * 组件较为简单, 主要是为了内容区域的分割, 包含: 左右两个垂直居中的指向和中间的说明文字, 比如: 分享/提示/猜你喜欢等. 具体参考右边的示例.
   *
   *
   * ### 如何引入
   * ```
   * // 引入
   * import Separation from 'vimo/lib/separation'
   * // 安装
   * Vue.component(Separation.name, Separation)
   * // 或者
   * export default{
   *   components: {
   *     Separation
   *  }
   * }
   * ```
   *
   * @demo #/separation
   * @usage
   *
   * <Separation>
   *    <Icon name="logo-chrome" small></Icon>
   *    <span>I Love Chrome</span>
   * </Separation>
   *
   * <Separation>分享</Separation>
   *
   * */
  export default{
    name: 'Separation'
  }
</script>

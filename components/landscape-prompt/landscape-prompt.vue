<template>
    <div class="vm-landscape-prompt" v-if="isMobile">
        <div id="orientLayer" class="mod-orient-layer">
            <div class="mod-orient-layer__content">
                <i class="icon mod-orient-layer__icon-orient"></i>
                <div class="mod-orient-layer__desc">请在解锁模式下使用竖屏浏览</div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
  /**
   * @component LandscapePrompt
   * @description
   *
   * ## 横屏提示组件 / LandscapePrompt组件
   *
   * ### 说明
   *
   * 组件在手机横屏的时候给出提示，提示用户H5需要在竖屏模式浏览。使用CSS的media参数如下：
   *
   * ```
   * min-aspect-ratio: 13 / 9
   * ```
   *
   * */
  export default {
    name: 'LandscapePrompt',
    data () {
      return {
        // 不是mobile时, 不启用这个组件
        isMobile: !!window.navigator.userAgent.match(/AppleWebKit.*Mobile.*/) // 是否为移动终端
      }
    }
  }
</script>
<style lang="less">
    @import "./landscape-prompt.less";
</style>

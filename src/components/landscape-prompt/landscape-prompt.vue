<template>
    <div class="vm-landscape-prompt" v-if="isMobile">
        <div class="orient-layer mod-orient-layer">
            <div class="mod-orient-layer-content">
                <i class="icon mod-orient-layer-icon-orient"></i>
                <div class="mod-orient-layer-desc">请在解锁模式下使用竖屏浏览</div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
  import isMobile from '../../util/mobile'

  export default {
    name: 'LandscapePrompt',
    data () {
      return {
        // 不是mobile时, 不启用这个组件
        isMobile: isMobile // 是否为移动终端
      }
    }
  }
</script>

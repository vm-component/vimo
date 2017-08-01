<template>
    <section class="popMenu" :class="[modeClass]">
        <div class="popMenu__btn" v-for="(btn,index) in menusData" @click="dismissPopover(index)" :key="index">
            <i v-if="btn.icon" class="popMenu__btn--icon" :style="`background-image:url(${btn.icon})`"></i>
            <span class="popMenu__btn--title">{{btn.title}}</span>
            <i v-if="parseInt(btn.badge) !== -1" class="popMenu__btn--badge">
                <span v-if="parseInt(btn.badge) === 0"></span>
                <span v-if="parseInt(btn.badge) > 99">...</span>
                <span v-if="parseInt(btn.badge) > 0 && parseInt(btn.badge) <= 99">{{parseInt(btn.badge)}}</span>
            </i>
        </div>
    </section>
</template>
<script type="text/javascript">
  import { Popover } from '../popover/index'

  export default{
    name: 'PopMenu',
    data () {
      return {
        menusData: []
      }
    },
    props: {
      /**
       * 当前平台
       * */
      mode: {
        type: String,
        default () { return this.$config && this.$config.get('mode') || 'ios' }
      }
    },
    computed: {
      modeClass () {
        return `popMenu popMenu-${this.mode}`
      }
    },
    methods: {
      dismissPopover (index) {
        this.menusData[index].handler && this.menusData[index].handler()
        Popover.dismiss()
      }
    },
    created () {
      this.menusData = this.$options.$data.menusData
    }
  }
</script>
<style lang="less">
    @import "menu-options";
    @import "menu-options.md.less";
    @import "menu-options.ios.less";
</style>

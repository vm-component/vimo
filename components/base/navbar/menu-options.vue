<template>
    <section class="vm-popMenu popMenu">
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
  import Popover from '../../popover/index'

  export default {
    name: 'PopMenu',
    data () {
      return {
        menusData: []
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
    @import "../../themes/default.less";

    .popMenu.popover-ios .popover-content {
        width: 146px;
        border-radius: 2px;
    }

    .vm-popMenu.popMenu {
        padding: 0 10px;
        .popMenu__btn {
            height: 42px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin: 0 auto;
            padding: 0 4px;
            border-bottom: 1px solid #e7e7e7;
            font-size: 14px;
            &:last-child {
                border-bottom: none;
            }
            &:active {
                .popMenu__btn--badge,
                .popMenu__btn--title,
                .popMenu__btn--icon {
                    opacity: 0.5;
                }
            }
            .popMenu__btn--icon {
                height: 24px;
                width: 24px;
                display: inline-block;
                background-position: center center;
                background-repeat: no-repeat;
                background-size: 22px 22px;
                flex: 0 0 26px;
                margin-right: 6px;
            }
            .popMenu__btn--title {
                font-size: 14px;
                display: block; //如果是块儿级元素可以不用加
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .popMenu__btn--badge {
                display: flex;
                justify-content: center;
                align-items: center;
                white-space: nowrap;
                flex-wrap: nowrap;
                flex: 0 0 28px;
                span {
                    font-size: 10px;
                    display: inline-block;
                    min-width: 10px;
                    padding: 0 4px;
                    text-align: center;
                    line-height: 14px;
                    max-height: 14px;
                    min-height: 10px;
                    color: #fff;
                    border-radius: 14px;
                    background-color: @danger;
                }
            }
        }
    }
</style>

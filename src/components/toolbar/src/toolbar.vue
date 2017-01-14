<template>
 <div class="toolbar ion-toolbar" :class="[modeClass,colorClass]">
     <div class="toolbar-background" :class="[toolbarBackgroundClass]"></div>
     <slot name="ion-button"></slot>
     <!--<ng-content select="[menuToggle]ion-buttons[left]"></ng-content> -->
     <!--<ng-content select="ion-buttons[start]"></ng-content> -->
     <!--<ng-content select="ion-buttons[end]ion-buttons[right]"></ng-content> -->
     <div class="toolbar-content" :class="[toolbarContentClass]">
         <slot name="content"></slot>
     </div>
 </div>
</template>
<style lang="scss">

    @import './toolbar.scss';
    @import './toolbar-button.scss';
    @import './toolbar.ios.scss';
    /*@import './toolbar.md.scss';*/
    /*@import './toolbar.wp.scss';*/

</style>
<script type="text/ecmascript-6">
    export default{
        data(){
            return {}
        },
        props: {
            /**
             * mode 按钮风格 ios/window/android/we/alipay
             * */
            mode: {
                type: String,
                default: 'ios',
            },
            /**
             * 按钮color：primary、secondary、danger、light、dark
             * */
            color:{
                type: String,
                default: '',
            }
        },
        watch: {},
        computed: {
            // 颜色
            colorClass: function () {
                return !!this.color ? (`toolbar-${this.mode}-${this.color}`) : ''
            },
            // 环境样式
            modeClass:function () {
                return `toolbar-${this.mode}`
            },
            toolbarBackgroundClass: function () {
                return `toolbar-background-${this.mode}`
            },
            toolbarContentClass:function () {
                return `toolbar-content-${this.mode}`
            }
        },
        methods: {},
        created: function () {
        },
        mounted: function () {
        },
        activated: function () {
        },
        components: {}
    }
</script>

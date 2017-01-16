<template>
    <div class="ion-navbar toolbar" :class="[modeClass,colorClass]">
        <div class="toolbar-background" :class="[toolbarBackgroundClass]"></div>
        <!--show-back-button-->
        <ion-button @click="backButtonClick($event)" role="bar-button" class="back-button"
                    :class="[backButtonClass,{'show-back-button':showBackButton}]" v-if="!hideBb">
            <ion-icon class="back-button-icon" :class="[backButtonIconClass]" :name="bbIcon"></ion-icon>
            <span class="back-button-text" :class="[backButtonTextClass]">{{backText}}</span>
        </ion-button>

        <slot name="ion-button"></slot>

        <!--<ng-content select="[menuToggle],ion-buttons[left]"></ng-content>-->
        <!--<ng-content select="ion-buttons[start]"></ng-content>-->
        <!--<ng-content select="ion-buttons[end],ion-buttons[right]"></ng-content>-->
        <div class="toolbar-content" :class="[toolbarContentClass]">
            <slot name="content"></slot>
        </div>
    </div>
</template>
<style lang="scss">
    @import '../../toolbar/src/toolbar';
    @import '../../toolbar/src/toolbar-button.scss';
    @import '../../toolbar/src/toolbar.ios.scss';


</style>
<script type="text/ecmascript-6">
    export default{
        data(){
            return {
                hideBb: false,
                bbIcon: 'arrow-back',
                backText: '后退',
            }
        },
        props: {
            /**
             * The mode to apply to this component. Mode can be ios, wp, or md.
             * */
            mode: {
                type: String,
                default: 'ios',
            },
            /**
             * 按钮color：primary、secondary、danger、light、dark
             * */
            color: {
                type: String,
                default: '',
            },
            /**
             * whether the back button should be shown or not
             * */
            hideBackButton: {
                type: Boolean,
                default: false,
            }
        },
        watch: {},
        computed: {
            modeClass: function () {
                return `toolbar-${this.mode}`
            },
            // 颜色
            colorClass: function () {
                return !!this.color ? (`toolbar-${this.mode}-${this.color}`) : ''
            },
            backButtonClass: function () {
                return `back-button-${this.mode}`
            },
            backButtonTextClass: function () {
                return `back-button-text-${this.mode}`
            },
            backButtonIconClass: function () {
                return `back-button-icon-${this.mode}`
            },
            toolbarBackgroundClass: function () {
                return `toolbar-background-${this.mode}`
            },
            toolbarContentClass: function () {
                return `toolbar-content-${this.mode}`
            },
            showBackButton: function () {
            	console.log('showBackButton')
            	console.log(window.history)
            	console.log(window.history.length)
            	console.log(window.history.length > 0)
                return window.history.length > 0
            },
        },
        methods: {
            backButtonClick: function ($event) {

            },
        },
        created: function () {
        },
        mounted: function () {
        },
        activated: function () {
        },
        components: {}
    }
</script>

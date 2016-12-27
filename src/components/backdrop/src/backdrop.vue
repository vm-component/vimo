<template>
    <transition
            name="fade"
            v-on:before-enter="_beforeEnter"
            v-on:after-leave="_afterLeave">
        <div class="ion-backdrop" :class="{'backdrop-no-tappable':!enableBackdropDismiss}" v-if="trueActive"></div>
    </transition>
</template>
<script type="text/ecmascript-6">

    export default{
        props: {
            enableBackdropDismiss: {
                type: Boolean,
                default: true
            },
            //  isActive
            isActive: {
                type: Boolean,
                default: false
            },
        },
        data(){
            return {
                trueActive: false,
            }
        },
        watch: {
            isActive: function (val) {
                if (val) {
                    if (this._getGlobalActiveState()) {
                        this.trueActive = false;
                    } else {
                        this._setGlobalActiveState(this.isActive);
                        this.trueActive = this.isActive;
                    }
                }else{
                    this.trueActive =  this.isActive;
                    this._setGlobalActiveState(false);
                }
            }
        },
        methods: {
            // private
            // 过渡钩子
            _beforeEnter: function (el) {
                this.$emit('$backdropShown');
            },
            _afterLeave: function (el) {
                this.$emit('$backdropHidden');
            },

            /**
             * 目前，backdrop都由组件自己维护开关，通过传入isActive激活是否显示
             * 存在这样一个问题，如果不同组件都需要backdrop，那么backdrop就会激活多次，
             * 这里需要判断下，如果页面中的ion-backdrop多余一个，且是显示的状态，则不再显示ion-backdrop了。
             * */
            _getGlobalActiveState: function () {
                return !!window.isBackdropOpen;

            },
            _setGlobalActiveState: function (state) {
                window.isBackdropOpen = !!state;
            },


            //public
            // 开启
            retain: function () {
                this.isActive = true;
            },
            // 关闭
            release: function () {
                if (this.enableBackdropDismiss) {
                    this.isActive = false;
                }
            },
        },
        mounted: function () {
            // this.$on('$backdropShown', function () {
            //     console.log('--beforeEnter')
            // });
            // this.$on('$backdropHidden', function () {
            //     console.log('--afterLeave')
            // })
        }

    }
</script>
<style scoped lang="scss">
    // Backdrop
    // --------------------------------------------------
    $backdrop-color: #000 !default;
    $z-index-backdrop: 10;

    .ion-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        z-index: $z-index-backdrop;
        display: block;

        width: 100%;
        height: 100%;

        background-color: $backdrop-color;
        opacity: .4;
        transform: translateZ(0);
    }

    .ion-backdrop.backdrop-no-tappable {
        cursor: auto;
    }

    /*fade animate class*/
    .fade-enter-active, .fade-leave-active {
        transition: opacity 400ms;
    }

    .fade-enter, .fade-leave-active {
        opacity: 0
    }

</style>

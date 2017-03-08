<template>
    <div class="ion-segment segment" :class="[modeClass,colorClass]">
        <slot></slot>
    </div>
</template>
<style lang="scss">
    @import './segment.scss';
    @import './segment.ios.scss';
    @import './segment.md.scss';
    @import './segment.wp.scss';
</style>
<script type="text/ecmascript-6">
    export default{
  name:'Segment',
        props: {
            /**
             * 接收value信息
             * */
            value: {
                type: String,
                default: '',
            },
            /**
             * 按钮color：primary、secondary、danger、light、dark
             * */
            color: {
                type: String,
                default: '',
            },
            /**
             * mode 按钮风格 ios/window/android/we/alipay
             * */
            mode: {
                type: String,
                default:  VM.config.get('mode') || 'ios',
            },
        },
        data: function () {
            return {
                // value的缓存值，因为props的value不能直接修改
                parentVal: this.value
            }
        },
        watch: {
            // 监听传入值的变化，修改父元素的缓存值
            value:function (val) {
                this.parentVal = val;
            },
            // 缓存之变动后，进行子元素样式更新
            parentVal: function () {
                this.setChildrenSelectState();
            }
        },
        computed: {
            // 环境样式
            modeClass: function () {
                return `segment-${this.mode}`
            },
            // 颜色
            colorClass: function () {
                return !!this.color ? (`segment-${this.mode}-${this.color}`) : ''
            },
        },
        methods: {
        	/**
             * 子元素样式更新，
             * 更新后发送onSegmentChange事件，并传入parentVal变化值
             * */
            setChildrenSelectState: function () {
                let _this = this;
                _this.$children.forEach(function (item) {
                    item.isSelect = (item.value === _this.parentVal)
                });
                _this.$emit('ionChange',_this.parentVal)
            }
        },
        mounted: function () {
            this.setChildrenSelectState();
        },
    }
</script>

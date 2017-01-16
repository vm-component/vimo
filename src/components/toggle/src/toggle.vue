<template>
    <div class="ion-toggle"
         :class="[modeClass,colorClass]"
         @mousedown="_clickStart($event)"
         @touchstart="_clickStart($event)"
         @mouseup="_clickEnd($event)"
         @touchend="_clickEnd($event)"
         @click="_click($event)">
        <div class="toggle-icon" :class="{'toggle-checked':isChecked,'toggle-activated':activated}">
            <div class="toggle-inner"></div>
        </div>
        <ion-button role="checkbox"
                    type="button"
                    ion-button="item-cover"
                    :id="id"
                    class="item-cover">
        </ion-button>
    </div>
</template>
<style lang="scss">
    @import 'toggle.ios';

</style>
<script type="text/ecmascript-6">
    export default{
        data(){
            return {
                isChecked: this.checked,
                activated: false,
                id: '',
            }
        },
        props:{
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
            color: {
                type: String,
                default: '',
            },
            /**
             * 是否选中
             * */
            checked:{
                type: Boolean,
                default: false,
            },
            /**
             * 是否被禁
             * */
            disabled:{
                type: Boolean,
                default: false,
            }
        },
        watch: {},
        computed: {
            // 环境样式
            modeClass: function () {
                return `toggle toggle-${this.mode}`
            },
            // 颜色
            colorClass: function () {
                return !!this.color ? (`toggle-${this.mode}-${this.color}`) : ''
            },
        },
        methods: {
            _clickStart:function ($event) {
        		this.activated = true;
            },
            _clickEnd:function ($event) {
                this.activated = false;
            },
            _click:function ($event) {
            	const _this = this;
                _this.isChecked  = !_this.isChecked;


                console.log('inner toggle this')
                console.log(this)


                _this.$emit('ionChange',_this.isChecked);



            }
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

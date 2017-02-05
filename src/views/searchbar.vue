<template>
    <div class="main">
        <ion-searchbar :animated="false"
                       :debounce="1000"
                       mode="ios"
                       color="danger"
                       v-model="myInput"
                       :showCancelButton="true"
                       cancelButtonText="取消"
                       @ionInput="onInput"
                       @ionFocus="onFocus"
                       @ionBlur="onBlur"
                       @ionCancel="onCancel"
                       @ionClear="onClear"></ion-searchbar>
    </div>
</template>
<style scoped lang="scss">
    .main {

    }
</style>
<script type="text/ecmascript-6">
    import Searchbar from '../components/searchbar'
    import mixin from '../mixins/baseMethodMixin'

    export default{
      mixins: [mixin],
        data(){
            return {
                myInput: ''
            }
        },
        watch: {
            myInput: function () {
                console.debug('myInput changed outer:' + this.myInput)
            }
        },
        computed: {},
        methods: {
            onInput: function ($event) {
                console.debug('outer-onInput:');
            },
            onCancel: function ($event) {
                console.debug('outer-onCancel:');
            },
            onClear:function ($event) {
                console.debug('outer-onClear:');
            },
            onBlur:function ($event) {
                console.debug('outer-onBlur:');
            },
            onFocus:function ($event) {
                console.debug('outer-onFocus:');
            }
        },
        created: function () {
        },
        mounted: function () {
        },
        activated: function () {
        },
        components: {
            'ion-searchbar': Searchbar
        }
    }
</script>

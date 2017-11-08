<template>
    <div class="ion-app" :class="theme">
        <transition name="page" v-on:before-enter="beforePageEnter">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
    import ThemeMixins from '../../themes/theme.mixins';

    export default {
        name: 'ion-index',
        mixins: [ThemeMixins],

        created() {
            this.$events.$on('VonicNotification', (data) => {
                $toast.present(data.message);
            })
        },

        mounted() {
//            console.debug('app mounted')
        },

        methods: {
            beforePageEnter(el) {
//                 console.log('beforePageEnter time:', +new Date())
            }
        }
    }
</script>


<style lang="scss">
    @import 'app';
    @import 'app.ios';
    @import 'app.md';
</style>

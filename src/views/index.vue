<template>



    <div class="index">
        <ion-header>
            <!--<ion-navbar>-->
            <!--<ion-title>Action Sheet</ion-title>-->
            <!--</ion-navbar>-->
        </ion-header>

        <ion-content>
            <ul>
                <li class="title">组件</li>
                <router-link class="item" :to="{ name: 'actionSheet'}" title="actionSheet" tag="li">
                    <span>actionSheet</span>
                </router-link>
                <router-link class="item" :to="{ name: 'backdrop'}" title="backdrop" tag="li">
                    <span>backdrop</span>
                </router-link>
                <router-link class="item" :to="{ name: 'button'}" title="button" tag="li">
                    <span>button</span>
                </router-link>
                <router-link class="item" :to="{ name: 'icon'}" title="icon" tag="li">
                    <span>icon</span>
                </router-link>
                <router-link class="item" :to="{ name: 'alert'}" title="alert" tag="li">
                    <span>alert</span>
                </router-link>
                <router-link class="item" :to="{ name: 'toast'}" title="toast" tag="li">
                    <span>toast</span>
                </router-link>
                <router-link class="item" :to="{ name: 'spinner'}" title="spinner" tag="li">
                    <span>spinner</span>
                </router-link>
                <router-link class="item" :to="{ name: 'loading'}" title="loading" tag="li">
                    <span>loading</span>
                </router-link>
                <router-link class="item" :to="{ name: 'toolbar'}" title="toolbar" tag="li">
                    <span>toolbar</span>
                </router-link>
                <router-link class="item" :to="{ name: 'segment'}" title="segment" tag="li">
                    <span>segment</span>
                </router-link>
                <router-link class="item" :to="{ name: 'searchbar'}" title="searchbar" tag="li">
                    <span>searchbar</span>
                </router-link>
            </ul>
        </ion-content>
        <!--<ion-content padding>-->
        <!--<button ion-button block (click)="present()">Basic Action Sheet</button>-->
        <!--</ion-content>-->


    </div>
</template>
<style lang="scss">


    .index {
        height: 100%;
        width: 100%;
        ul {
            li {
                padding-left: 10px;
                margin: 5px 0;
                &.title {
                    background: #eee;
                    font-size: 18px;
                }
                &.item {
                    background: #fff;
                    font-size: 20px;
                }

            }
        }
    }
</style>
<script type="text/ecmascript-6">
    import Header from '../components/app/src/header.vue'
    import Footer from '../components/app/src/footer.vue'
    import Content from '../components/content'

    export default{
        name: 'index',
        data(){
            return {}
        },
        components: {
            'ion-header': Header,
            'ion-footer': Footer,
            'ion-content': Content,
        }

    }
</script>

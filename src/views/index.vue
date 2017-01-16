<template>

    <ion-page>
        <ion-header>
            <ion-navbar color="primary">
                <!--start-->
                <!--<ion-buttons start slot="ion-button">-->
                    <!--<ion-button icon-only role="bar-button">-->
                        <!--<ion-icon class="icon" name="contact"></ion-icon>-->
                    <!--</ion-button>-->
                <!--</ion-buttons>-->
                <!--<ion-buttons start slot="ion-button">-->
                    <!--<ion-button icon-only role="bar-button">-->
                        <!--<ion-icon class="icon" name="search"></ion-icon>-->
                    <!--</ion-button>-->
                <!--</ion-buttons>-->
                <!--start-->
                <!--<ion-buttons end slot="ion-button">-->
                    <!--<ion-button icon-only role="bar-button">-->
                        <!--<ion-icon class="icon" name="more"></ion-icon>-->
                    <!--</ion-button>-->
                <!--</ion-buttons>-->
                <!--title-->
                <ion-title slot="content">VueMobile</ion-title>
            </ion-navbar>
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
                <router-link class="item" :to="{ name: 'list'}" title="list" tag="li">
                    <span>list</span>
                </router-link>
            </ul>
        </ion-content>
        <!--<ion-content padding>-->
        <!--<button ion-button block (click)="present()">Basic Action Sheet</button>-->
        <!--</ion-content>-->

    </ion-page>
</template>
<style lang="scss">


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
</style>
<script type="text/ecmascript-6">

    export default{
        name: 'index',
        data(){
            return {}
        },
        components: {}

    }
</script>

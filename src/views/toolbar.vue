<template>
    <div class="main">
        <!--1-->
        <ion-toolbar>
            <!--title-->
            <ion-title slot="content">This is a long title long title</ion-title>
        </ion-toolbar>

        <!--2-->
        <ion-toolbar>
            <!--start-->
            <ion-buttons start slot="ion-button">
                <ion-button icon-only role="bar-button">
                    <ion-icon class="icon" name="contact"></ion-icon>
                </ion-button>
            </ion-buttons>
            <ion-buttons start slot="ion-button">
                <ion-button icon-only role="bar-button">
                    <ion-icon class="icon" name="search"></ion-icon>
                </ion-button>
            </ion-buttons>
            <!--start-->
            <ion-buttons end slot="ion-button">
                <ion-button icon-only role="bar-button">
                    <ion-icon class="icon" name="more"></ion-icon>
                </ion-button>
            </ion-buttons>
            <!--title-->
            <ion-title slot="content">My Toolbar Title</ion-title>
        </ion-toolbar>

        <!--3-->
        <ion-toolbar>
            <!--start-->
            <ion-buttons start slot="ion-button">
                <ion-button icon-only role="bar-button" color="danger">
                    <ion-icon class="icon" name="contact"></ion-icon>
                </ion-button>
            </ion-buttons>
            <ion-buttons start slot="ion-button">
                <ion-button icon-only role="bar-button" color="secondary">
                    <ion-icon class="icon" name="search"></ion-icon>
                </ion-button>
            </ion-buttons>
            <!--end-->
            <ion-buttons end slot="ion-button">
                <ion-button icon-only role="bar-button" color="danger">
                    <ion-icon class="icon" name="more"></ion-icon>
                </ion-button>
            </ion-buttons>
            <!--title-->
            <ion-title slot="content">My Toolbar Title</ion-title>
        </ion-toolbar>

        <!--4-->
        <ion-toolbar>
            <!--start-->
            <ion-buttons start slot="ion-button">
                <ion-button icon-only role="bar-button" type="solid">
                    <ion-icon class="icon" name="contact"></ion-icon>
                </ion-button>
            </ion-buttons>

            <!--end-->
            <ion-buttons end slot="ion-button">
                <ion-button icon-right role="bar-button" color="secondary" type="solid">
                    Help
                    <ion-icon class="icon" name="help-circle"></ion-icon>
                </ion-button>
            </ion-buttons>
            <!--title-->
            <ion-title slot="content">Solid</ion-title>
        </ion-toolbar>

        <!--5-->
        <ion-toolbar>
            <!--start-->
            <ion-buttons start slot="ion-button">
                <ion-button icon-only role="bar-button" type="outline">
                    <ion-icon class="icon" name="contact"></ion-icon>
                </ion-button>
            </ion-buttons>

            <!--end-->
            <ion-buttons end slot="ion-button">
                <ion-button icon-right role="bar-button" color="secondary" type="outline">
                    Help
                    <ion-icon class="icon" name="help-circle"></ion-icon>
                </ion-button>
            </ion-buttons>
            <!--title-->
            <ion-title slot="content">Outline</ion-title>
        </ion-toolbar>

        <!--6-->
        <ion-toolbar>
            <!--menutoggle-->
            <ion-button icon-only role="bar-button" shape="menutoggle" slot="ion-button">
                <ion-icon class="icon" name="menu"></ion-icon>
            </ion-button>
            <!--title-->
            <ion-title slot="content">Left Menu</ion-title>
        </ion-toolbar>

        <!--7-->
        <ion-toolbar>
            <!--menutoggle-->
            <ion-button right icon-only role="bar-button" shape="menutoggle" slot="ion-button">
                <ion-icon class="icon" name="menu"></ion-icon>
            </ion-button>
            <!--title-->
            <ion-title slot="content">Right Menu</ion-title>
        </ion-toolbar>

        <!--7-->
        <ion-toolbar>
            <!--menutoggle-->
            <ion-buttons end slot="ion-button">
                <ion-button icon-only role="bar-button">
                    <ion-icon class="icon" name="search"></ion-icon>
                </ion-button>
            </ion-buttons>
            <!--title-->
            <ion-title slot="content">Right Menu</ion-title>
        </ion-toolbar>


    </div>
</template>
<style lang="scss">


</style>
<script type="text/ecmascript-6">
    import Toolbar from '../components/toolbar/src/toolbar.vue';
    import Title from '../components/toolbar/src/toolbar-title.vue';
    import Buttons from '../components/toolbar/src/toolbar-buttons.vue';
    import Button from '../components/button'
    import Icon from '../components/icon';





    export default{
        data(){
            return {}
        },

        methods: {},
        created: function () {
        },
        mounted: function () {
        },
        activated: function () {
        },
        components: {
            'ion-toolbar': Toolbar,
            'ion-title': Title,
            'ion-buttons': Buttons,
            'ion-button': Button,
            'ion-icon': Icon,
        }
    }
</script>

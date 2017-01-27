<template>
    <ion-page>
        <ion-header>
            <ion-navbar>
                <ion-title slot="content" title="List"></ion-title>
            </ion-navbar>
        </ion-header>
        <ion-content>
            <ion-list>
                <!--header-->
                <ion-list-header>
                    <ion-label slot="label">setting</ion-label>
                    <ion-button icon-only slot="item-right" item-right type="clear">
                        <ion-icon name="cog"></ion-icon>
                    </ion-button>
                </ion-list-header>
                <!--group-->
                <ion-item-group>
                    <ion-item>
                        <ion-icon slot="item-left" item-left color="danger" name="plane"></ion-icon>
                        <ion-label slot="label">Airplane Mode</ion-label>
                        <ion-toggle slot="item-right" item-right @ionChange="toggleChange"
                                    :checked="toggleValue"></ion-toggle>
                    </ion-item>
                    <!--button属性会在右边增加向右箭头-->
                    <ion-item button>
                        <ion-icon slot="item-left" item-left color="primary" name="wifi"></ion-icon>
                        <ion-label slot="label">Wi-Fi</ion-label>
                        <ion-note slot="item-right" item-right>The Interwebz</ion-note>
                    </ion-item>
                    <!--button属性会在右边增加向右箭头-->
                    <ion-item button>
                        <ion-icon slot="item-left" item-left color="primary" name="bluetooth"></ion-icon>
                        <ion-label slot="label">Bluetooth</ion-label>
                        <ion-note slot="item-right" item-right>Off</ion-note>
                    </ion-item>
                </ion-item-group>
                <!--divider-->
                <ion-item-divider color="primary">
                    <ion-label slot="label">Other Setting</ion-label>
                    <ion-button slot="item-right" item-right type="outline" color="light">Clear</ion-button>
                </ion-item-divider>

                <!--button属性会在右边增加向右箭头-->
                <ion-item button>
                    <ion-icon slot="item-left" item-left color="secondary" name="call"></ion-icon>
                    <ion-label slot="label">Cellular</ion-label>
                </ion-item>
                <!--button属性会在右边增加向右箭头-->
                <ion-item button>
                    <ion-icon slot="item-left" item-left color="secondary" name="link"></ion-icon>
                    <ion-label slot="label">Personal Hotspot</ion-label>
                    <ion-note slot="item-right" item-right>Off</ion-note>
                </ion-item>


            </ion-list>

            <ion-list radio-group :value="silencePhone">
                <!--header-->
                <ion-list-header>
                    <ion-icon slot="item-left" item-left name="phone-portrait"></ion-icon>
                    <ion-label slot="label">
                        Silence Phone
                    </ion-label>
                </ion-list-header>

                <!--button属性会在右边增加向右箭头-->
                <ion-item>
                    <ion-label slot="label">Always</ion-label>
                    <!--<ion-radio value="always" checked></ion-radio>-->
                </ion-item>
                <!--button属性会在右边增加向右箭头-->
                <ion-item>
                    <ion-label slot="label" value="locked">Only while phone is locked</ion-label>
                </ion-item>

            </ion-list>

            <ion-list>
                <!--header-->
                <ion-list-header>
                    <ion-label slot="label">
                        Apps Installed
                    </ion-label>
                </ion-list-header>

                <!--button属性会在右边增加向右箭头-->
                <ion-item>
                    <ion-icon slot="item-left" item-left color="primary" name="ionic"></ion-icon>
                    <ion-label slot="label">Ionic View</ion-label>
                    <ion-button slot="item-right" item-right type="outline" color="primary">Uninstall</ion-button>
                </ion-item>
                <!--button属性会在右边增加向右箭头-->
                <ion-item>
                    <ion-icon slot="item-left" item-left color="primary" name="brush"></ion-icon>
                    <ion-label slot="label">Ionic Creator</ion-label>
                    <ion-button slot="item-right" item-right type="outline" color="primary">Uninstall</ion-button>
                </ion-item>
                <!--button属性会在右边增加向右箭头-->
                <ion-item>
                    <ion-icon slot="item-left" item-left color="dark" name="logo-octocat"></ion-icon>
                    <ion-label slot="label">Hubstruck</ion-label>
                    <ion-button slot="item-right" item-right type="outline" color="primary">Uninstall</ion-button>
                </ion-item>
                <!--button属性会在右边增加向右箭头-->
                <ion-item>
                    <ion-icon slot="item-left" item-left color="danger" name="paw"></ion-icon>
                    <ion-label slot="label">Barkpark</ion-label>
                    <ion-button slot="item-right" item-right type="outline" color="primary">Uninstall</ion-button>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-page>
</template>
<style scoped lang="scss">
    .main {

    }
</style>
<script type="text/ecmascript-6">
    export default{
        data(){
            return {
                toggleValue: true,
                silencePhone:'always',
            }
        },
        watch: {
            toggleValue: function () {
                console.debug('outer toggleValue change:' + this.toggleValue)
            }
        },
        computed: {},
        methods: {
            toggleChange: function (val) {
                console.debug('Outer Toggle Change Value - airPlane:' + val)
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

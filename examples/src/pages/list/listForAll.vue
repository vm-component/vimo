<template>
    <vm-page>
        <vm-header>
            <vm-navbar>
                <vm-title>ListForAll</vm-title>
            </vm-navbar>
        </vm-header>
        <vm-content class="outer-content">
            <vm-list>
                <vm-list-header>
                    setting
                    <vm-button slot="item-end" clear>
                        <vm-icon name="cog"></vm-icon>
                    </vm-button>
                </vm-list-header>
                <vm-item-group>
                    <vm-item>
                        <vm-icon slot="item-start" color="danger" name="plane"></vm-icon>
                        <span>Airplane Mode</span>
                        <vm-toggle slot="item-end" @ionChange="toggleChange"
                                :checked="toggleValue"></vm-toggle>
                    </vm-item>
                    <vm-item button>
                        <vm-icon slot="item-start" color="primary" name="wifi"></vm-icon>
                        Wi-Fi
                        <vm-note slot="item-end">The Interwebz</vm-note>
                    </vm-item>
                    <vm-item button>
                        <vm-icon slot="item-start" color="primary" name="bluetooth"></vm-icon>
                        Bluetooth
                        <vm-note slot="item-end">Off</vm-note>
                    </vm-item>
                </vm-item-group>
                <vm-item-divider color="primary">
                    Other Setting
                    <vm-button slot="item-end" outline color="light">Clear</vm-button>
                </vm-item-divider>

                <vm-item button>
                    <vm-icon slot="item-start" color="secondary" name="call"></vm-icon>
                    Cellular
                </vm-item>
                <vm-item button>
                    <vm-icon slot="item-start" color="secondary" name="link"></vm-icon>
                    Personal Hotspot
                    <vm-note slot="item-end">Off</vm-note>
                </vm-item>
            </vm-list>

            <vm-list radio-group :value="silencePhone">
                <!--header-->
                <vm-list-header>
                    <vm-icon slot="item-start" name="phone-portrait"></vm-icon>
                    Silence Phone
                </vm-list-header>
                <!--button属性会在右边增加向右箭头-->
                <vm-item>
                    Always
                    <vm-radio slot="item-end" value="always" checked></vm-radio>
                </vm-item>
                <!--button属性会在右边增加向右箭头-->
                <vm-item>
                    Only while phone is locked
                    <vm-radio slot="item-end" value="no"></vm-radio>
                </vm-item>
            </vm-list>

            <vm-list>
                <!--header-->
                <vm-list-header>
                    <span>Apps Installed</span>
                </vm-list-header>

                <!--button属性会在右边增加向右箭头-->
                <vm-item>
                    <vm-icon slot="item-start" color="primary" name="ionic"></vm-icon>
                    <span>Ionic View</span>
                    <vm-button slot="item-end" color="primary" outline>Uninstall</vm-button>
                </vm-item>
                <!--button属性会在右边增加向右箭头-->
                <vm-item>
                    <vm-icon slot="item-start" color="primary" name="brush"></vm-icon>
                    <span>Ionic Creator</span>
                    <vm-button slot="item-end" outline color="primary">Uninstall</vm-button>
                </vm-item>
                <!--button属性会在右边增加向右箭头-->
                <vm-item>
                    <vm-icon slot="item-start" color="dark" name="logo-octocat"></vm-icon>
                    <span>Hubstruck</span>
                    <vm-button slot="item-end" outline color="primary">Uninstall</vm-button>
                </vm-item>
                <!--button属性会在右边增加向右箭头-->
                <vm-item>
                    <vm-icon slot="item-start" color="danger" name="paw"></vm-icon>
                    <span>Barkpark</span>
                    <vm-button slot="item-end" outline color="primary">Uninstall</vm-button>
                </vm-item>
            </vm-list>
        </vm-content>
    </vm-page>
</template>
<style scoped lang="less">
    .main {

    }
</style>
<script type="text/javascript">
  export default {
    data () {
      return {
        toggleValue: true,
        silencePhone: 'always'
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
    }
  }
</script>

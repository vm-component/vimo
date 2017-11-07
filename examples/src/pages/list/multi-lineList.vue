<template>
    <vm-page>
        <vm-header>
            <vm-navbar>
                <vm-title>Multi-lineList</vm-title>
            </vm-navbar>
        </vm-header>
        <vm-content class="outer-content">
            <vm-list>
                <vm-list-header>
                    <span>today</span>
                </vm-list-header>
                <vm-item>
                    <vm-avatar slot="item-left">
                        <img src="./img/avatar-ts-woody.png">
                    </vm-avatar>
                    <vm-label>
                        <h2>Woody</h2>
                        <h3>Hello world</h3>
                        <h4>This is third line</h4>
                        <p>This town ain't big enough for the two of us!</p>
                    </vm-label>
                </vm-item>
                <vm-item>
                    <vm-avatar slot="item-left">
                        <img src="./img/avatar-ts-buzz.png">
                    </vm-avatar>
                    <vm-label>
                        <h2>Buzz Lightyear</h2>
                        <h3>Hello world</h3>
                        <p>My eyeballs could have been sucked from their sockets!</p>
                    </vm-label>
                </vm-item>
            </vm-list>

            <vm-list>
                <vm-list-header>
                    yesterday

                </vm-list-header>
                <vm-item>
                    <vm-avatar slot="item-left">
                        <img src="./img/avatar-ts-hamm.png">
                    </vm-avatar>
                    <vm-label>
                        <h2>Hamm</h2>
                        <h3>Hello world</h3>
                        <p>You heard of Kung Fu? Well get ready for pork chop.</p>
                    </vm-label>
                </vm-item>
                <vm-item>
                    <vm-avatar slot="item-left">
                        <img src="./img/avatar-ts-slinky.png">
                    </vm-avatar>
                    <vm-label>
                        <h2>Slinky Dog</h2>
                        <h3>Hello world</h3>
                        <p>I may not be a smart dog, but I know what roadkill is.</p>
                    </vm-label>
                </vm-item>
            </vm-list>
        </vm-content>
    </vm-page>
</template>
<style scoped lang="less">

</style>
<script type="text/javascript">
  export default {
    data () {
      return {}
    },
    watch: {},
    computed: {},
    methods: {},
    created () {},
    mounted () {},
    activated () {}
  }
</script>

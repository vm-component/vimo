<template>
    <vm-page>
        <vm-header>
            <vm-navbar>
                <vm-title>Spinner</vm-title>
            </vm-navbar>
        </vm-header>
        <vm-content padding>
            <h1>Spinner组件</h1>
            <p>嗯, 菊花图...</p>

            <h4>默认</h4>
            <vm-spinner></vm-spinner>
            <vm-spinner name="ios"></vm-spinner>
            <vm-spinner name="ios-small"></vm-spinner>
            <vm-spinner name="bubbles"></vm-spinner>
            <vm-spinner name="circles"></vm-spinner>
            <vm-spinner name="crescent"></vm-spinner>
            <vm-spinner name="dots"></vm-spinner>

            <h4>Mode</h4>
            <span>未指定</span>
            <vm-spinner></vm-spinner>
            <span>ios</span>
            <vm-spinner mode="ios"></vm-spinner>
            <span>md</span>
            <vm-spinner mode="md"></vm-spinner>
            <span>wp</span>
            <vm-spinner mode="wp"></vm-spinner>

            <h4>Color</h4>
            <vm-spinner></vm-spinner>
            <vm-spinner color="primary" name="ios"></vm-spinner>
            <vm-spinner color="secondary" name="ios-small"></vm-spinner>
            <vm-spinner color="light" name="bubbles"></vm-spinner>
            <vm-spinner color="dark" name="circles"></vm-spinner>
            <vm-spinner color="primary" name="crescent"></vm-spinner>
            <vm-spinner color="secondary" name="dots"></vm-spinner>

            <!--duration-->
            <h4>Duration 3000ms</h4>
            <vm-spinner duration="3000"></vm-spinner>
            <vm-spinner duration="3000" name="ios"></vm-spinner>
            <vm-spinner duration="3000" name="ios-small"></vm-spinner>
            <vm-spinner duration="3000" name="bubbles"></vm-spinner>
            <vm-spinner duration="3000" name="circles"></vm-spinner>
            <vm-spinner duration="3000" name="crescent"></vm-spinner>
            <vm-spinner duration="3000" name="dots"></vm-spinner>

            <!--paused-->
            <h4>Paused</h4>
            <vm-spinner :paused="true"></vm-spinner>
            <vm-spinner :paused="true" name="ios"></vm-spinner>
            <vm-spinner :paused="true" name="ios-small"></vm-spinner>
            <vm-spinner :paused="true" name="bubbles"></vm-spinner>
            <vm-spinner :paused="true" name="circles"></vm-spinner>
            <vm-spinner :paused="true" name="crescent"></vm-spinner>
            <vm-spinner :paused="true" name="dots"></vm-spinner>
        </vm-content>
    </vm-page>
</template>
<style lang="scss">
</style>
<script type="text/javascript">
  export default{
    data () {
      return {}
    },
    watch: {},
    computed: {},
    methods: {},
    created: function () {},
    mounted: function () {},
    activated: function () {}
  }
</script>

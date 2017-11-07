<template>
    <vm-page>
        <vm-header>
            <vm-navbar>
                <vm-title>Modal中跳转</vm-title>
            </vm-navbar>
        </vm-header>
        <vm-content padding class="outer-content">
            <p>Content</p>

            <vm-button @click="toPage({name:'alert'})">Go to Alert Page</vm-button>
            <vm-button @click="toPage({name:'actionSheet'})">Go to ActionSheet Page</vm-button>
        </vm-content>
    </vm-page>
</template>
<script type="text/javascript">
  export default {
    name: 'ModalRedirect',
    data () {
      return {}
    },
    props: {},
    watch: {},
    computed: {
      $router () {
        return this.$options.$data && this.$options.$data.$router
      }
    },
    methods: {
      toPage (route) {
        this.$modal.dismiss().then(() => {
          this.$router.push(route)
        })
      }
    },
    created () {},
    mounted () {},
    activated () {},
    deactivate () {},
    components: {},
    destroyed () {}
  }
</script>
<style scoped lang="less">

</style>

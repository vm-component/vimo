<template>
  <Page>
    <Header>
      <Navbar>
        <Title>popOver</Title>
      </Navbar>
    </Header>
    <Content padding>
      <Button color="primary" type="block" @click="popover">popover</Button>
    </Content>
  </Page>
</template>
<script type="text/ecmascript-6">
  import list from "./list.vue"
  export default{
    data(){
      return {
        a:1
      }
    },
    watch: {},
    computed: {

    },
    methods: {
      popover(e){
        const _this = this;
        _this.$popover.presentInAuto({
          template:list,
          source:e.target
        },{
          direct:"left"
        })
      }
    },
    created () {
    },
    mounted () {
    },
    activated () {
    },
    deactivated(){}
  }
</script>
<style lang="scss"></style>

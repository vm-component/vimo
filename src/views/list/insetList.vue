<template>
  <Page>
    <Header>
      <Navbar>
        <Title>InsetList</Title>
      </Navbar>
    </Header>
    <Content>
      <List inset>
        <Item button v-for="item in list">
          {{item}}
        </Item>
      </List>
    </Content>
  </Page>
</template>
<style scoped lang="scss">

</style>
<script type="text/ecmascript-6">
  export default{
    data(){
      return {
        list: [
          'InsetList 1',
          'InsetList 2',
          'InsetList 3',
          'InsetList 4',
          'InsetList 5',
          'InsetList 6',
          'InsetList 7',
          'InsetList 8',
          'InsetList 9',
          'InsetList 10',
          'InsetList 11',
          'InsetList 12',
          'InsetList 13',
          'InsetList 14',
        ]
      }
    },
    watch: {},
    computed: {},
    methods: {},
    created() {},
    mounted () {},
    activated () {},
    components: {}
  }
</script>

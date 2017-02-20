<template>
  <Page>
    <Header>
      <Navbar>
        <Title>IconList</Title>
      </Navbar>
    </Header>
    <Content>
      <List>
        <ListHeader>
          classes
        </ListHeader>

        <Item>
          <Icon name="planet" slot="left"></Icon>
          Astronomy
          <Note slot="right">To the moon</Note>
        </Item>

        <Item>
          <Icon name="body" slot="left"></Icon>
          Muggle Studies
          <Toggle slot="right" :checked="false"></Toggle>
        </Item>

        <Item>
          <Icon name="leaf" slot="left"></Icon>
          Herbology
          <Icon name="rose" slot="right"></Icon>
        </Item>

        <Item>
          <Icon name="flask" slot="left"></Icon>
          Potions
          <Button slot="right" type="outline" color="primary">Btn</Button>
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
          'NoLine 1',
          'NoLine 2',
          'NoLine 3',
          'NoLine 4',
          'NoLine 5',
          'NoLine 6',
          'NoLine 7',
          'NoLine 8',
          'NoLine 9',
          'NoLine 10',
          'NoLine 11',
          'NoLine 12',
          'NoLine 13',
          'NoLine 14',
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

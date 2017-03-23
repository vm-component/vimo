<template>
  <Page>
    <Header>
      <Navbar>
        <Title>ListDividers</Title>
      </Navbar>
    </Header>
    <Content>
      <ItemGroup>
        <ItemDivider color="light">A</ItemDivider>
        <Item>Angola</Item>
        <Item>Angular</Item>
        <Item>America</Item>
        <Item>Arg</Item>
      </ItemGroup>
      <ItemGroup>
        <ItemDivider color="light">B</ItemDivider>
        <Item>Bee</Item>
        <Item>Book</Item>
        <Item>Back</Item>
        <Item>Bear</Item>
      </ItemGroup>

    </Content>
  </Page>
</template>
<style lang="scss">

</style>
<script type="text/ecmascript-6">
  import { List } from 'vimo/components/list'
  import { ListHeader, ItemGroup, Item, ItemSliding, ItemOptions, ItemDivider } from 'vimo/components/item'
  import { Note } from 'vimo/components/note'
  import { Avatar } from 'vimo/components/avatar'
  import { Label } from 'vimo/components/label'
  export default{
    data(){
      return {
        list: [
          'ListDividers 1',
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
    components: {List, ListHeader, ItemGroup, Item, ItemSliding, ItemOptions, ItemDivider, Note, Avatar, Label}
  }
</script>

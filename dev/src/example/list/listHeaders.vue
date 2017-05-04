<template>
    <Page>
        <Header>
            <Navbar>
                <Title>ListHeaders</Title>
            </Navbar>
        </Header>
        <Content class="outer-content">
            <List>
                <ListHeader>
                    Action-1
                </ListHeader>
                <Item>Terminator II</Item>
                <Item>The Empire Strikes Back</Item>
                <Item>Blade Runner</Item>

                <ListHeader>
                    Action-2
                </ListHeader>
                <Item>Terminator II</Item>
                <Item>The Empire Strikes Back</Item>
                <Item>Blade Runner</Item>

            </List>
        </Content>
    </Page>
</template>
<style scoped lang="scss">

</style>
<script type="text/javascript">
  import { List } from 'vimo/components/list'
  import { ListHeader, ItemGroup, Item, ItemSliding, ItemOptions, ItemDivider } from 'vimo/components/item'
  import { Note } from 'vimo/components/note'
  import { Avatar } from 'vimo/components/avatar'
  import { Label } from 'vimo/components/label'
  export default{
    data () {
      return {}
    },
    watch: {},
    computed: {},
    methods: {},
    created () {},
    mounted () {},
    activated () {},
    components: {List, ListHeader, ItemGroup, Item, ItemSliding, ItemOptions, ItemDivider, Note, Avatar, Label}
  }
</script>

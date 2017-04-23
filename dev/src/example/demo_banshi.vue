<template>
    <Page>
        <Header>
            <Navbar>
                <Title>个人办事</Title>
            </Navbar>
            <Toolbar>
                <Segment v-model="relationship" @onChange="onChange">
                    <SegmentButton value="item1" @onSelected="onSelected">基本信息</SegmentButton>
                    <SegmentButton value="item2" @onSelected="onSelected">申报材料</SegmentButton>
                    <SegmentButton value="item3" @onSelected="onSelected">受理条件</SegmentButton>
                </Segment>
            </Toolbar>
        </Header>
        <Content>
            <List>
                <ListHeader @touchstart.native="onShow=!onShow">
                    <Icon name="planet" slot="item-left"></Icon>
                    <span>必要材料
{{relationship}}</span>
                </ListHeader>
                <Item v-if="onShow" button>item1
                </Item>
                <Item v-show="onShow">item1</Item>
                <Item v-show="onShow">item1</Item>
                <Item v-show="onShow">item1</Item>
            </List>
        </Content>
    </Page>
</template>
<style scoped lang="scss">
    .body {

    }
</style>
<script type="text/ecmascript-6">
  import { Segment, SegmentButton } from 'vimo/components/segment'
  import { List } from 'vimo/components/list'
  import { Item, ListHeader } from 'vimo/components/item'
  const AS = 'as'
  export default{
    name: 'Banshi',
    data(){
      return {
        relationship: 'item2',
        onShow: true,
      }
    },
    watch: {
      relationship(value){}
    },
    computed: {},
    methods: {
      nihao(){
        alert('nihao')
      },
      onChange(value){
        console.debug(value)
      },
      onSelected(value){
        console.debug(value)
      },
    },
    created: function () {
      console.debug('created')

      console.debug(this)
      console.debug(this.relationship)

    },
    mounted: function () {
      console.debug('mounted')

    },
    components: {Segment, SegmentButton, List, Item, ListHeader}
  }
</script>

<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Picker和Label组合</Title>
            </Navbar>
        </Header>
        <Content class="outer-content">
            <List>
                <Item>
                    <Label stacked>Stacked</Label>
                    <Datetime slot="item-right" v-model="stacked1"></Datetime>
                </Item>
                <Item>
                    <Label stacked>Stacked</Label>
                    <Datetime slot="item-right" v-model="stacked2"></Datetime>
                </Item>

                <Item>
                    <Label floating>Floating</Label>
                    <Datetime slot="item-right" displayFormat="MMMM YY" v-model="floating1"></Datetime>
                </Item>

                <Item>
                    <Label floating>Floating</Label>
                    <Datetime slot="item-right" displayFormat="D MMM YYYY" v-model="floating2"></Datetime>
                </Item>
                <Item>
                    <Label fixed>Fixed</Label>
                    <Datetime slot="item-right" displayFormat="MM/DD/YYYY" v-model="fixed1"></Datetime>
                </Item>

                <Item>
                    <Label fixed>Fixed</Label>
                    <Datetime slot="item-right" displayFormat="DDDD MMM D, YYYY" v-model="fixed2"></Datetime>
                </Item>

                <Item>
                    <Label>Inline</Label>
                    <Datetime slot="item-right" displayFormat="MM/DD/YYYY" v-model="inline1"></Datetime>
                </Item>

                <Item>
                    <Label>Inline</Label>
                    <Datetime slot="item-right" displayFormat="DDDD MMM D, YYYY" v-model="inline2"></Datetime>
                </Item>
            </List>
        </Content>
    </Page>
</template>
<style scoped lang="scss">

</style>
<script type="text/javascript">
  import { Datetime } from 'vimo/components/datetime'
  import { List } from 'vimo/components/list'
  import { Label } from 'vimo/components/label'
  import { ListHeader, ItemGroup, Item, ItemSliding, ItemOptions, ItemDivider } from 'vimo/components/item'
  export default{
    name: 'name',
    data () {
      return {
        stacked1: null,
        stacked2: null,
        floating1: null,
        floating2: null,
        fixed1: null,
        fixed2: null,
        inline1: null,
        inline2: null
      }
    },
    props: {},
    watch: {},
    computed: {},
    methods: {},
    created () {},
    mounted () {},
    activated () {},
    deactivate () {},
    components: {Label, Datetime, List, ListHeader, ItemGroup, Item, ItemSliding, ItemOptions, ItemDivider},
    destroyed () {}
  }
</script>

<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Select</Title>
            </Navbar>
        </Header>
        <Content>
            <List>
                <ListHeader>单选</ListHeader>
                <Item>
                    <Label>Gender</Label>
                    <Select item-right placeholder="Select" interface="action-sheet"
                            @onChange="onChange"
                            @onSelect="onSelect"
                            @onCancel="onCancel">
                        <Option value="f">Female</Option>
                        <Option value="m">Male</Option>
                    </Select>
                </Item>

                <Item>
                    <Label>Gender</Label>
                    <Select item-right placeholder="Select" interface="alert"
                            @onChange="onChange"
                            @onSelect="onSelect"
                            @onCancel="onCancel">
                        <Option value="f" checked>Female</Option>
                        <Option value="m">Male</Option>
                    </Select>
                </Item>

                <Item>
                    <Label>Gender</Label>
                    <Select item-right placeholder="Multi Select" interface="alert" :multiple="true"
                            @onChange="onChange"
                            @onSelect="onSelect"
                            @onCancel="onCancel">
                        <Option value="f">Female</Option>
                        <Option value="m">Male</Option>
                    </Select>
                </Item>

                <Item>
                    <Label>Gender</Label>
                    <Select item-right placeholder="Disabled Select" :disabled="true" interface="alert" :multiple="true"
                            @onChange="onChange"
                            @onSelect="onSelect"
                            @onCancel="onCancel">
                        <Option value="f">Female</Option>
                        <Option value="m">Male</Option>
                    </Select>
                </Item>

                <Item>
                    <Label>能修改选中值文本</Label>
                    <Select item-right placeholder="请选择" selectedText="已选择" interface="alert" :multiple="true">
                        <Option value="f">Female</Option>
                        <Option value="m">Male</Option>
                    </Select>
                </Item>
            </List>

            <List>
                <ListHeader>
                    <span>Option组件没有value的情况</span>
                </ListHeader>
                <Item>
                    <Label>Gaming</Label>
                    <Select v-model="gamingNoValue" :multiple="true">
                        <Option>NES</Option>
                        <Option>Nintendo64</Option>
                        <Option>PlayStation</Option>
                        <Option>Sega Genesis</Option>
                        <Option>Sega Saturn</Option>
                        <Option>SNES</Option>
                    </Select>
                </Item>
                <div text-cente padding>
                    <p text-center>Gaming选中值: {{gamingNoValue}}</p>
                </div>
            </List>

            <List>
                <ListHeader>
                    <span>单选 (v-model)</span>
                </ListHeader>
                <Item>
                    <Label>Gaming</Label>
                    <Select v-model="gaming" :multiple="true">
                        <Option value="nes" checked>NES</Option>
                        <Option value="n64" checked>Nintendo64</Option>
                        <Option value="ps" checked>PlayStation</Option>
                        <Option value="genesis">Sega Genesis</Option>
                        <Option value="saturn">Sega Saturn</Option>
                        <Option value="snes">SNES</Option>
                    </Select>
                </Item>

                <div text-cente padding>
                    <p text-center>Gaming选中值: {{gaming}}</p>
                    <small>
                        <span>  * Option中checked是NES/Nintendo64/PlayStation, 而v-model中的值是Option中checked是选中的是NES, 优先使用v-modal中的值</span>
                    </small>
                </div>
            </List>

            <List>
                <ListHeader>
                    <span>单选 (v-model && v-for)</span>
                </ListHeader>
                <Item>
                    <Label>Currency</Label>
                    <Select v-model="currency">
                        <Option :value="cur" v-for="(cur,index) in currencies" :key="index">
                            <span>{{cur.symbol}} ({{cur.code}}) {{cur.name}}</span>
                        </Option>
                    </Select>
                </Item>
                <div text-cente padding>
                    <p text-center>Currency选中值: {{currency}}</p>
                </div>
            </List>
        </Content>
    </Page>
</template>
<style scoped lang="scss">

</style>
<script type="text/ecmascript-6">
  import { List } from 'vimo/components/list'
  import { Item, ListHeader } from 'vimo/components/item'
  import { Label } from 'vimo/components/label'
  import { Select, Option } from 'vimo/components/select'
  export default{
    name: 'name',
    data(){
      return {
        gaming: 'nes',
        gamingNoValue: '',
        currency: '',
        currencies: [
          {
            symbol: '$',
            code: 'USD',
            name: 'US Dollar'
          },
          {
            symbol: '€',
            code: 'EUR',
            name: 'Euro'
          },
          {
            symbol: '£',
            code: 'FKP',
            name: 'Falkland Islands Pound'
          },
          {
            symbol: '¢',
            code: 'GHS',
            name: 'Ghana Cedi'
          }
        ],
      }
    },
    props: {},
    watch: {},
    computed: {},
    methods: {
      onChange(value){
        console.debug('外部监听 onChange 事件, 返回值: ' + value)

      },
      onSelect(value){
        console.debug('外部监听 onSelect 事件, 返回值: ' + value)
      },
      onCancel(value){
        console.debug('外部监听 onCancel 事件, 返回值: ' + value)
      }
    },
    created: function () {},
    mounted: function () {},
    activated: function () {},
    components: {List, Item, ListHeader, Label, Select, Option}
  }
</script>

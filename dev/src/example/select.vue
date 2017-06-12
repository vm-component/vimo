<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Select</Title>
            </Navbar>
        </Header>
        <Content class="outer-content">

            <div padding>
                <h5>简介</h5>
                <p>Select组件用于单类型数据但多选, 如果是多类型数据选择, 请选Picker组件.</p>
            </div>

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
            </List>
            <div text-cente padding>
                <p text-center>Gaming选中值: {{gamingNoValue}}</p>
            </div>


            <List>
                <ListHeader>
                    <span>单选 (v-model)</span>
                </ListHeader>
                <Item>
                    <Label>Gaming</Label>
                    <Select v-model="gaming" :multiple="true">
                        <Option value="nes" checked disabled>NES</Option>
                        <Option value="n64" checked>Nintendo64</Option>
                        <Option value="ps" checked>PlayStation</Option>
                        <Option value="genesis">Sega Genesis</Option>
                        <Option value="saturn">Sega Saturn</Option>
                        <Option value="snes" disabled>SNES</Option>
                    </Select>
                </Item>
            </List>

            <div text-cente padding>
                <p text-center>Gaming选中值: {{gaming}}</p>
                <small>
                    <span>  * Option中checked是NES/Nintendo64/PlayStation, 而v-model中的值是Option中checked是选中的是NES, 优先使用v-modal中的值</span>
                </small>
            </div>
            <List>
                <ListHeader>
                    <span>单选 (v-model && v-for)</span>
                </ListHeader>
                <Item>
                    <Label>Currency</Label>
                    <Select v-model="currency" v-if="hideCurrency">
                        <Option :value="cur" v-for="(cur,index) in currencies" :key="index">
                            <span>{{cur.symbol}} ({{cur.code}}) {{cur.name}}</span>
                        </Option>
                    </Select>
                </Item>
                <div padding>
                    <Button block @click="toggleData">Toggle Data</Button>
                </div>
            </List>
            <div text-cente padding>
                <p text-center>Currency选中值: {{currency}}</p>
            </div>
        </Content>
    </Page>
</template>
<style scoped lang="scss">

</style>
<script type="text/javascript">
  import { List } from 'vimo/components/list'
  import { Item, ListHeader, ItemGroup } from 'vimo/components/item'
  import { Label } from 'vimo/components/label'
  import { Select, Option } from 'vimo/components/select'
  export default{
    name: 'name',
    data () {
      return {
        gaming: 'nes',
        gamingNoValue: '',
        currency: '',
        hideCurrency: true,
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
        currencies1: [
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
        currencies2: [
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
          },
          {
            symbol: '￥',
            code: 'CN',
            name: '元'
          },
          {
            symbol: '€',
            code: 'EUR',
            name: 'Euro'
          }
        ]
      }
    },
    props: {},
    watch: {},
    computed: {},
    methods: {
      onChange (value) {
        console.debug('外部监听 onChange 事件, 返回值: ' + value)
      },
      onSelect (value) {
        console.debug('外部监听 onSelect 事件, 返回值: ' + value)
      },
      onCancel (value) {
        console.debug('外部监听 onCancel 事件, 返回值: ' + value)
      },

      toggleData () {
        this.hideCurrency = false
        setTimeout(() => {
          if (this.currencies.length === 4) {
            this.currencies = this.currencies2
            console.log(this.currencies)
            this.hideCurrency = true
          } else {
            this.currencies = this.currencies1
            console.log(this.currencies)
            this.hideCurrency = true
          }
        }, 0)
      }
    },
    created: function () {},
    mounted: function () {},
    activated: function () {},
    components: {List, Item, ListHeader, Label, Select, Option, ItemGroup}
  }
</script>

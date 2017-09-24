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
                    <Label fixed>Gender(fixed)</Label>
                    <Select item-right placeholder="Select" interface="action-sheet"
                            :selectOptions="{title:'Fixed Label'}"
                            @onChange="onChange"
                            @onSelect="onSelect"
                            @onCancel="onCancel">
                        <SelectOption value="f">Female</SelectOption>
                        <SelectOption value="m">Male</SelectOption>
                    </Select>
                </Item>
                <Item>
                    <Label stacked>Gender(stacked)</Label>
                    <Select item-right placeholder="Select" interface="action-sheet"
                            :selectOptions="{title:'Stacked Label'}"
                            @onChange="onChange"
                            @onSelect="onSelect"
                            @onCancel="onCancel">
                        <SelectOption value="f">Female</SelectOption>
                        <SelectOption value="m">Male</SelectOption>
                    </Select>
                </Item>
                <Item>
                    <Label floating>Gender(floating)</Label>
                    <Select item-right placeholder="Select" interface="action-sheet"
                            :selectOptions="{title:'Foating Label'}"
                            @onChange="onChange"
                            @onSelect="onSelect"
                            @onCancel="onCancel">
                        <SelectOption value="f">Female</SelectOption>
                        <SelectOption value="m">Male</SelectOption>
                    </Select>
                </Item>
                <Item>
                    <Label>Gender</Label>
                    <Select item-right placeholder="Select" interface="action-sheet"
                            :selectOptions="{title:'Normal Label'}"
                            @onChange="onChange"
                            @onSelect="onSelect"
                            @onCancel="onCancel">
                        <SelectOption value="f">Female</SelectOption>
                        <SelectOption value="m">Male</SelectOption>
                    </Select>
                </Item>

                <Item>
                    <Label>Gender</Label>
                    <Select item-right placeholder="Select" interface="alert"
                            @onChange="onChange"
                            @onSelect="onSelect"
                            @onCancel="onCancel">
                        <SelectOption value="f" checked>Female</SelectOption>
                        <SelectOption value="m">Male</SelectOption>
                    </Select>
                </Item>

                <Item>
                    <Label>Gender</Label>
                    <Select item-right placeholder="Multi Select" interface="alert" :multiple="true"
                            @onChange="onChange"
                            @onSelect="onSelect"
                            @onCancel="onCancel">
                        <SelectOption value="f">Female</SelectOption>
                        <SelectOption value="m">Male</SelectOption>
                    </Select>
                </Item>

                <Item>
                    <Label>Gender</Label>
                    <Select item-right placeholder="Disabled Select" :disabled="true" interface="alert" :multiple="true"
                            @onChange="onChange"
                            @onSelect="onSelect"
                            @onCancel="onCancel">
                        <SelectOption value="f">Female</SelectOption>
                        <SelectOption value="m">Male</SelectOption>
                    </Select>
                </Item>

                <Item>
                    <Label>能修改选中值文本</Label>
                    <Select item-right placeholder="请选择" selectedText="已选择" interface="alert" :multiple="true">
                        <SelectOption value="f">Female</SelectOption>
                        <SelectOption value="m">Male</SelectOption>
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
                        <SelectOption>NES</SelectOption>
                        <SelectOption>Nintendo64</SelectOption>
                        <SelectOption>PlayStation</SelectOption>
                        <SelectOption>Sega Genesis</SelectOption>
                        <SelectOption>Sega Saturn</SelectOption>
                        <SelectOption>SNES</SelectOption>
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
                        <SelectOption value="nes">NES</SelectOption>
                        <SelectOption value="n64">Nintendo64</SelectOption>
                        <SelectOption value="ps">PlayStation</SelectOption>
                        <SelectOption value="genesis">Sega Genesis</SelectOption>
                        <SelectOption value="saturn">Sega Saturn</SelectOption>
                        <SelectOption value="snes" disabled>SNES</SelectOption>
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
                        <SelectOption :value="cur.code" v-for="(cur,index) in currencies" :key="index">
                            <span>{{cur.symbol}} ({{cur.code}}) {{cur.name}}</span>
                        </SelectOption>
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
<style scoped lang="less">

</style>
<script type="text/javascript">
  export default {
    name: 'name',
    data () {
      return {
        gaming: 'saturn',
        gamingNoValue: '',
        currency: 'EUR',
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
    }
  }
</script>

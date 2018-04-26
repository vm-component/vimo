<template>
    <Page>
        <Header>
            <Navbar>
                <Title :title="$t('title')"></Title>
            </Navbar>
        </Header>
        <Content class="outer-content">
            <div padding>
                <strong>{{$t('notice')}}</strong>
            </div>
            <List>
                <ListHeader>Demo</ListHeader>
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
                    <Label>Customize Label</Label>
                    <Select item-right :placeholder="$t('choosePlease')" :selectedText="$t('chosen')" interface="alert" :multiple="true">
                        <SelectOption value="f">Female</SelectOption>
                        <SelectOption value="m">Male</SelectOption>
                    </Select>
                </Item>
            </List>

            <List>
                <ListHeader>
                    <span>No Value(Special)</span>
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
                <p text-center>{{$t('currentState')}}: {{gamingNoValue}}</p>
            </div>

            <List>
                <ListHeader>v-model</ListHeader>
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
                <p text-center>{{$t('currentState')}}: {{gaming}}</p>
                <small>
                    <span>  * {{$t('priority')}}</span>
                </small>
            </div>
            <List>
                <ListHeader>
                    <span>v-model && v-for</span>
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
                <p text-center>{{$t('currentState')}}: {{currency}}</p>
            </div>
        </Content>
    </Page>
</template>
<script type="text/javascript">
  export default {
    name: 'DemoSelect',
    i18n: {
      messages: {
        'zh-CN': {
          title: '选择弹层',
          notice: 'Select组件用于单类型数据但多选, 如果是多类型数据选择, 请选Picker组件.',
          choosePlease: '请选择',
          chosen: '已选择',
          currentState: '当前状态',
          priority: 'Option中checked是NES/Nintendo64/PlayStation, 而v-model中的值是Option中checked是选中的是NES, 优先使用v-modal中的值'
        },
        'en-US': {
          title: 'Select',
          notice: 'The Select component is used for single-type data but multiple choices. If it is a multi-type data selection, select the Picker component.',
          choosePlease: 'please choose',
          chosen: 'Chosen',
          currentState: 'Current state',
          priority: 'Checked in Option is NES/Nintendo64/PlayStation, and the value in v-model is checked in Option is NES selected, and the value in v-modal is preferred'
        }
      }
    },
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

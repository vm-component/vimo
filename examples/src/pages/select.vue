<template>
    <vm-page>
        <vm-header>
            <vm-navbar>
                <vm-title>Select</vm-title>
            </vm-navbar>
        </vm-header>
        <vm-content class="outer-content">

            <div padding>
                <h5>简介</h5>
                <p>Select组件用于单类型数据但多选, 如果是多类型数据选择, 请选Picker组件.</p>
            </div>

            <vm-list>
                <vm-list-header>单选</vm-list-header>
                <vm-item>
                    <vm-label fixed>Gender(fixed)</vm-label>
                    <Select item-right placeholder="Select" interface="action-sheet"
                            :selectOptions="{title:'Fixed Label'}"
                            @onChange="onChange"
                            @onSelect="onSelect"
                            @onCancel="onCancel">
                        <SelectOption value="f">Female</SelectOption>
                        <SelectOption value="m">Male</SelectOption>
                    </Select>
                </vm-item>
                <vm-item>
                    <vm-label stacked>Gender(stacked)</vm-label>
                    <Select item-right placeholder="Select" interface="action-sheet"
                            :selectOptions="{title:'Stacked Label'}"
                            @onChange="onChange"
                            @onSelect="onSelect"
                            @onCancel="onCancel">
                        <SelectOption value="f">Female</SelectOption>
                        <SelectOption value="m">Male</SelectOption>
                    </Select>
                </vm-item>
                <vm-item>
                    <vm-label floating>Gender(floating)</vm-label>
                    <Select item-right placeholder="Select" interface="action-sheet"
                            :selectOptions="{title:'Foating Label'}"
                            @onChange="onChange"
                            @onSelect="onSelect"
                            @onCancel="onCancel">
                        <SelectOption value="f">Female</SelectOption>
                        <SelectOption value="m">Male</SelectOption>
                    </Select>
                </vm-item>
                <vm-item>
                    <vm-label>Gender</vm-label>
                    <Select item-right placeholder="Select" interface="action-sheet"
                            :selectOptions="{title:'Normal Label'}"
                            @onChange="onChange"
                            @onSelect="onSelect"
                            @onCancel="onCancel">
                        <SelectOption value="f">Female</SelectOption>
                        <SelectOption value="m">Male</SelectOption>
                    </Select>
                </vm-item>

                <vm-item>
                    <vm-label>Gender</vm-label>
                    <Select item-right placeholder="Select" interface="alert"
                            @onChange="onChange"
                            @onSelect="onSelect"
                            @onCancel="onCancel">
                        <SelectOption value="f" checked>Female</SelectOption>
                        <SelectOption value="m">Male</SelectOption>
                    </Select>
                </vm-item>

                <vm-item>
                    <vm-label>Gender</vm-label>
                    <Select item-right placeholder="Multi Select" interface="alert" :multiple="true"
                            @onChange="onChange"
                            @onSelect="onSelect"
                            @onCancel="onCancel">
                        <SelectOption value="f">Female</SelectOption>
                        <SelectOption value="m">Male</SelectOption>
                    </Select>
                </vm-item>

                <vm-item>
                    <vm-label>Gender</vm-label>
                    <Select item-right placeholder="Disabled Select" :disabled="true" interface="alert" :multiple="true"
                            @onChange="onChange"
                            @onSelect="onSelect"
                            @onCancel="onCancel">
                        <SelectOption value="f">Female</SelectOption>
                        <SelectOption value="m">Male</SelectOption>
                    </Select>
                </vm-item>

                <vm-item>
                    <vm-label>能修改选中值文本</vm-label>
                    <Select item-right placeholder="请选择" selectedText="已选择" interface="alert" :multiple="true">
                        <SelectOption value="f">Female</SelectOption>
                        <SelectOption value="m">Male</SelectOption>
                    </Select>
                </vm-item>
            </vm-list>

            <vm-list>
                <vm-list-header>
                    <span>Option组件没有value的情况</span>
                </vm-list-header>
                <vm-item>
                    <vm-label>Gaming</vm-label>
                    <Select v-model="gamingNoValue" :multiple="true">
                        <SelectOption>NES</SelectOption>
                        <SelectOption>Nintendo64</SelectOption>
                        <SelectOption>PlayStation</SelectOption>
                        <SelectOption>Sega Genesis</SelectOption>
                        <SelectOption>Sega Saturn</SelectOption>
                        <SelectOption>SNES</SelectOption>
                    </Select>
                </vm-item>
            </vm-list>
            <div text-cente padding>
                <p text-center>Gaming选中值: {{gamingNoValue}}</p>
            </div>

            <vm-list>
                <vm-list-header>
                    <span>单选 (v-model)</span>
                </vm-list-header>
                <vm-item>
                    <vm-label>Gaming</vm-label>
                    <Select v-model="gaming" :multiple="true">
                        <SelectOption value="nes">NES</SelectOption>
                        <SelectOption value="n64">Nintendo64</SelectOption>
                        <SelectOption value="ps">PlayStation</SelectOption>
                        <SelectOption value="genesis">Sega Genesis</SelectOption>
                        <SelectOption value="saturn">Sega Saturn</SelectOption>
                        <SelectOption value="snes" disabled>SNES</SelectOption>
                    </Select>
                </vm-item>
            </vm-list>

            <div text-cente padding>
                <p text-center>Gaming选中值: {{gaming}}</p>
                <small>
                    <span>  * Option中checked是NES/Nintendo64/PlayStation, 而v-model中的值是Option中checked是选中的是NES, 优先使用v-modal中的值</span>
                </small>
            </div>
            <vm-list>
                <vm-list-header>
                    <span>单选 (v-model && v-for)</span>
                </vm-list-header>
                <vm-item>
                    <vm-label>Currency</vm-label>
                    <Select v-model="currency" v-if="hideCurrency">
                        <SelectOption :value="cur.code" v-for="(cur,index) in currencies" :key="index">
                            <span>{{cur.symbol}} ({{cur.code}}) {{cur.name}}</span>
                        </SelectOption>
                    </Select>
                </vm-item>
                <div padding>
                    <vm-button block @click="toggleData">Toggle Data</vm-button>
                </div>
            </vm-list>
            <div text-cente padding>
                <p text-center>Currency选中值: {{currency}}</p>
            </div>
        </vm-content>
    </vm-page>
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

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
                    <vm-select item-right placeholder="Select" interface="action-sheet"
                            :selectOptions="{title:'Fixed Label'}"
                            @onChange="onChange"
                            @onSelect="onSelect"
                            @onCancel="onCancel">
                        <vm-option value="f">Female</vm-option>
                        <vm-option value="m">Male</vm-option>
                    </vm-select>
                </vm-item>
                <vm-item>
                    <vm-label stacked>Gender(stacked)</vm-label>
                    <vm-select item-right placeholder="Select" interface="action-sheet"
                            :selectOptions="{title:'Stacked Label'}"
                            @onChange="onChange"
                            @onSelect="onSelect"
                            @onCancel="onCancel">
                        <vm-option value="f">Female</vm-option>
                        <vm-option value="m">Male</vm-option>
                    </vm-select>
                </vm-item>
                <vm-item>
                    <vm-label floating>Gender(floating)</vm-label>
                    <vm-select item-right placeholder="Select" interface="action-sheet"
                            :selectOptions="{title:'Foating Label'}"
                            @onChange="onChange"
                            @onSelect="onSelect"
                            @onCancel="onCancel">
                        <vm-option value="f">Female</vm-option>
                        <vm-option value="m">Male</vm-option>
                    </vm-select>
                </vm-item>
                <vm-item>
                    <vm-label>Gender</vm-label>
                    <vm-select item-right placeholder="Select" interface="action-sheet"
                            :selectOptions="{title:'Normal Label'}"
                            @onChange="onChange"
                            @onSelect="onSelect"
                            @onCancel="onCancel">
                        <vm-option value="f">Female</vm-option>
                        <vm-option value="m">Male</vm-option>
                    </vm-select>
                </vm-item>

                <vm-item>
                    <vm-label>Gender</vm-label>
                    <vm-select item-right placeholder="Select" interface="alert"
                            @onChange="onChange"
                            @onSelect="onSelect"
                            @onCancel="onCancel">
                        <vm-option value="f" checked>Female</vm-option>
                        <vm-option value="m">Male</vm-option>
                    </vm-select>
                </vm-item>

                <vm-item>
                    <vm-label>Gender</vm-label>
                    <vm-select item-right placeholder="Multi Select" interface="alert" :multiple="true"
                            @onChange="onChange"
                            @onSelect="onSelect"
                            @onCancel="onCancel">
                        <vm-option value="f">Female</vm-option>
                        <vm-option value="m">Male</vm-option>
                    </vm-select>
                </vm-item>

                <vm-item>
                    <vm-label>Gender</vm-label>
                    <vm-select item-right placeholder="Disabled Select" :disabled="true" interface="alert" :multiple="true"
                            @onChange="onChange"
                            @onSelect="onSelect"
                            @onCancel="onCancel">
                        <vm-option value="f">Female</vm-option>
                        <vm-option value="m">Male</vm-option>
                    </vm-select>
                </vm-item>

                <vm-item>
                    <vm-label>能修改选中值文本</vm-label>
                    <vm-select item-right placeholder="请选择" selectedText="已选择" interface="alert" :multiple="true">
                        <vm-option value="f">Female</vm-option>
                        <vm-option value="m">Male</vm-option>
                    </vm-select>
                </vm-item>
            </vm-list>

            <vm-list>
                <vm-list-header>
                    <span>Option组件没有value的情况</span>
                </vm-list-header>
                <vm-item>
                    <vm-label>Gaming</vm-label>
                    <vm-select v-model="gamingNoValue" :multiple="true">
                        <vm-option>NES</vm-option>
                        <vm-option>Nintendo64</vm-option>
                        <vm-option>PlayStation</vm-option>
                        <vm-option>Sega Genesis</vm-option>
                        <vm-option>Sega Saturn</vm-option>
                        <vm-option>SNES</vm-option>
                    </vm-select>
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
                    <vm-select v-model="gaming" :multiple="true">
                        <vm-option value="nes">NES</vm-option>
                        <vm-option value="n64">Nintendo64</vm-option>
                        <vm-option value="ps">PlayStation</vm-option>
                        <vm-option value="genesis">Sega Genesis</vm-option>
                        <vm-option value="saturn">Sega Saturn</vm-option>
                        <vm-option value="snes" disabled>SNES</vm-option>
                    </vm-select>
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
                    <vm-select v-model="currency" v-if="hideCurrency">
                        <vm-option :value="cur.code" v-for="(cur,index) in currencies" :key="index">
                            <span>{{cur.symbol}} ({{cur.code}}) {{cur.name}}</span>
                        </vm-option>
                    </vm-select>
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

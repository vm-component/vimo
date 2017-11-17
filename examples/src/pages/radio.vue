<template>
    <vm-page>
        <vm-header>
            <vm-navbar>
                <vm-title>Radio</vm-title>
            </vm-navbar>
        </vm-header>
        <vm-content class="outer-content">
            <vm-list radio-group v-model="fruits" :disabled="isListDisabled" @onChange="onChangeHandler">
                <vm-list-header>Fruits</vm-list-header>
                <vm-item>
                    <vm-label>Apple</vm-label>
                    <vm-radio value="apple" :disabled="isAppleDisabled" @onSelect="onSelectHandler"></vm-radio>
                </vm-item>
                <vm-item>
                    <vm-label>Banana</vm-label>
                    <vm-radio value="banana" color="danger" @onSelect="onSelectHandler"></vm-radio>
                </vm-item>
                <vm-item>
                    <vm-label>Cherry (secondary color)</vm-label>
                    <vm-radio value="cherry" color="secondary" @onSelect="onSelectHandler"></vm-radio>
                </vm-item>
                <vm-item>
                    <vm-label>Disabled</vm-label>
                    <vm-radio value="disabled" :disabled="true" @onSelect="onSelectHandler"></vm-radio>
                </vm-item>
                <vm-item>
                    <vm-label>Default</vm-label>
                    <vm-radio value="default" @onSelect="onSelectHandler"></vm-radio>
                </vm-item>
            </vm-list>

            <div text-center>
                <p text-center>当前选择: {{fruits}}</p>
                <vm-button @click="fruits='apple'" outline small>Select Apple</vm-button>
                <vm-button @click="fruits='banana'" outline small>Select Banana</vm-button>
                <vm-button @click="fruits='cherry'" outline small>Select Cherry</vm-button>
                <vm-button @click="isAppleDisabled=!isAppleDisabled" outline small>Set Apple Disabled</vm-button>
                <vm-button @click="isListDisabled=!isListDisabled" outline small>Set List Disabled</vm-button>
            </div>

            <div padding>
                <h5>注意</h5>
                <p>如果是点击则触发onSelect和onChange, 如果是改变v-model的值, 则只触发onSelect的值.</p>
            </div>

            <vm-list radio-group v-model="currencies">
                <vm-list-header>Dynamic Data(currencies)</vm-list-header>
                <vm-item v-for="(item,index) in dynamicCurrencies" :key="index">
                    <vm-label>{{item}}</vm-label>
                    <vm-radio :value="item" @onSelect="onSelectHandler"></vm-radio>
                </vm-item>
            </vm-list>
            <div padding>
                <code><b>dynamicCurrencies:</b> {{dynamicCurrencies}}</code><br>
            </div>
            <div text-center>
                <p text-center>当前选择: {{currencies}}</p>
                <vm-button @click="addDynamicCurrencies" outline small>加载数据</vm-button>
                <vm-button @click="currencies='USD'" outline small>Select USD</vm-button>
                <vm-button @click="currencies='EUR'" outline small>Select EUR</vm-button>
            </div>

            <vm-list radio-group :disabled="true" v-model="relationship">
                <vm-list-header>Disabled radio-group</vm-list-header>
                <vm-item>
                    <vm-label>Friends</vm-label>
                    <vm-radio value="friends"></vm-radio>
                </vm-item>
                <vm-item>
                    <vm-label>Enemies</vm-label>
                    <vm-radio value="enemies"></vm-radio>
                </vm-item>
            </vm-list>
        </vm-content>
    </vm-page>
</template>
<style lang="scss">
</style>
<script type="text/javascript">
  export default{
    name: 'radio',
    data () {
      return {
        fruits: 'default',
        isAppleDisabled: false,
        isListDisabled: false,
        isDisabled: false,

        currencies: 'USD',
        dynamicCurrencies: [],

        relationship: 'friends'
      }
    },
    props: {},
    watch: {},
    computed: {},
    methods: {
      onChangeHandler (val) {
        console.debug('当前v-model变化, 值: ' + val)
      },
      onSelectHandler (val) {
        console.debug('当前选择的是: ' + val)
      },
      addDynamicCurrencies () {
        this.dynamicCurrencies = ['USD', 'EUR']
      }

    },
    created: function () {

    },
    mounted: function () {},
    activated: function () {}
  }
</script>

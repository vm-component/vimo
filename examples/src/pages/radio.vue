<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Radio</Title>
            </Navbar>
        </Header>
        <Content class="outer-content">
            <List radio-group v-model="fruits" :disabled="isListDisabled" @onChange="onChangeHandler">
                <ListHeader>Fruits</ListHeader>
                <Item>
                    <Label>Apple</Label>
                    <Radio value="apple" :disabled="isAppleDisabled" @onSelect="onSelectHandler"></Radio>
                </Item>
                <Item>
                    <Label>Banana</Label>
                    <Radio value="banana" color="danger" @onSelect="onSelectHandler"></Radio>
                </Item>
                <Item>
                    <Label>Cherry (secondary color)</Label>
                    <Radio value="cherry" color="secondary" @onSelect="onSelectHandler"></Radio>
                </Item>
                <Item>
                    <Label>Disabled</Label>
                    <Radio value="disabled" :disabled="true" @onSelect="onSelectHandler"></Radio>
                </Item>
                <Item>
                    <Label>Default</Label>
                    <Radio value="default" @onSelect="onSelectHandler"></Radio>
                </Item>
            </List>

            <div text-center>
                <p text-center>当前选择: {{fruits}}</p>
                <Button @click="fruits='apple'" outline small>Select Apple</Button>
                <Button @click="fruits='banana'" outline small>Select Banana</Button>
                <Button @click="fruits='cherry'" outline small>Select Cherry</Button>
                <Button @click="isAppleDisabled=!isAppleDisabled" outline small>Set Apple Disabled</Button>
                <Button @click="isListDisabled=!isListDisabled" outline small>Set List Disabled</Button>
            </div>

            <div padding>
                <h5>注意</h5>
                <p>如果是点击则触发onSelect和onChange, 如果是改变v-model的值, 则只触发onSelect的值.</p>
            </div>

            <List radio-group v-model="currencies">
                <ListHeader>Dynamic Data(currencies)</ListHeader>
                <Item v-for="(item,index) in dynamicCurrencies" :key="index">
                    <Label>{{item}}</Label>
                    <Radio :value="item" @onSelect="onSelectHandler"></Radio>
                </Item>
            </List>
            <div padding>
                <code><b>dynamicCurrencies:</b> {{dynamicCurrencies}}</code><br>
            </div>
            <div text-center>
                <p text-center>当前选择: {{currencies}}</p>
                <Button @click="addDynamicCurrencies" outline small>加载数据</Button>
                <Button @click="currencies='USD'" outline small>Select USD</Button>
                <Button @click="currencies='EUR'" outline small>Select EUR</Button>
            </div>

            <List radio-group :disabled="true" v-model="relationship">
                <ListHeader>Disabled radio-group</ListHeader>
                <Item>
                    <Label>Friends</Label>
                    <Radio value="friends"></Radio>
                </Item>
                <Item>
                    <Label>Enemies</Label>
                    <Radio value="enemies"></Radio>
                </Item>
            </List>
        </Content>
    </Page>
</template>
<style lang="less">
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

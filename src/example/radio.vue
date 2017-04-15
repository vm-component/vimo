<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Radio</Title>
            </Navbar>
        </Header>
        <Content>
            <List radio-group v-model="fruits" :disabled="isListDisabled">
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
<style lang="scss">
    .main {

    }
</style>
<script type="text/ecmascript-6">
  import { List } from 'vimo/components/list'
  import { ListHeader, Item } from 'vimo/components/item'
  import { Label } from 'vimo/components/label'
  import { Radio } from 'vimo/components/radio'
  import { Icon } from 'vimo/components/icon'

  export default{
    name: 'radio',
    data(){
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
      onSelectHandler(val){
        console.debug('当前选择的是: ' + val)
      },

    },
    created: function () {
      setTimeout(() => {
        this.dynamicCurrencies = ['USD', 'EUR']
      }, 100)
    },
    mounted: function () {},
    activated: function () {},
    components: {List, ListHeader, Item, Label, Radio, Icon}
  }
</script>

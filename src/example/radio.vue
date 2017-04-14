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
                    <Radio value="apple" :disabled="isAppleDisabled"></Radio>
                </Item>
                <Item>
                    <Label>Banana</Label>
                    <Radio value="banana" color="danger"></Radio>
                </Item>
                <Item>
                    <Label>Cherry (secondary color)</Label>
                    <Radio value="cherry" color="secondary"></Radio>
                </Item>
                <Item>
                    <Label>Disabled</Label>
                    <Radio value="disabled" :disabled="true"></Radio>
                </Item>
                <Item>
                    <Label>Default</Label>
                    <Radio value="default"></Radio>
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

            <List radio-group v-model="dynamicFruits">
                <ListHeader>Dynamic Data(Fruits)</ListHeader>
                <Item v-for="(item,index) in dynamicFruitList" :key="index">
                    <Label>{{item}}</Label>
                    <Radio :value="item"></Radio>
                </Item>
            </List>

            <div text-center>
                <p text-center>当前选择: {{dynamicFruits}}</p>
                <Button @click="dynamicFruits='apple'" outline small>Select Apple</Button>
                <Button @click="dynamicFruits='banana'" outline small>Select Banana</Button>
            </div>
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

        dynamicFruits: '',
        dynamicFruitList: [],

      }
    },
    props: {},
    watch: {},
    computed: {},
    methods: {
      setApple(){},
      setBanana(){},
      setCherry(){},

    },
    created: function () {
      setTimeout(() => {
        this.dynamicFruitList = [
          'apple',
          'banana',
          'cherry',
          'disabled',
          'default',
        ]
      }, 2000)
    },
    mounted: function () {},
    activated: function () {},
    components: {List, ListHeader, Item, Label, Radio, Icon}
  }
</script>

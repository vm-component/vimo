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
                    <Select>
                        <Option value="f">Female</Option>
                        <Option value="m">Male</Option>
                    </Select>
                </Item>

                <!--<ion-item>-->
                <!--<ion-label>Gaming</ion-label>-->
                <!--<ion-select [(ngModel)]="gaming" (ionCancel)="gamingCancel()" (ionChange)="gamingChange($event)">-->
                <!--<ion-option value="nes">NES</ion-option>-->
                <!--<ion-option value="n64">Nintendo64</ion-option>-->
                <!--<ion-option value="ps">PlayStation</ion-option>-->
                <!--<ion-option value="genesis">Sega Genesis</ion-option>-->
                <!--<ion-option value="saturn">Sega Saturn</ion-option>-->
                <!--<ion-option value="snes">SNES</ion-option>-->
                <!--</ion-select>-->
                <!--</ion-item>-->

                <!--<ion-item>-->
                <!--<ion-label>Operating System</ion-label>-->
                <!--<ion-select [(ngModel)]="os" interface="alert" submitText="Okay" cancelText="Nah">-->
                <!--<ion-option value="dos">DOS</ion-option>-->
                <!--<ion-option value="lunix">Linux</ion-option>-->
                <!--<ion-option value="mac7">Mac OS 7</ion-option>-->
                <!--<ion-option value="mac8">Mac OS 8</ion-option>-->
                <!--<ion-option value="win3.1">Windows 3.1</ion-option>-->
                <!--<ion-option value="win95">Windows 95</ion-option>-->
                <!--<ion-option value="win98">Windows 98</ion-option>-->
                <!--</ion-select>-->
                <!--</ion-item>-->


            </List>
        </Content>
    </Page>
</template>
<style scoped lang="scss">

</style>
<script type="text/ecmascript-6">
  import { List } from 'vimo/components/list'
  import { Item, ListHeader } from 'vimo/components/item'
  import { label } from 'vimo/components/label'
  import { Select, Option } from 'vimo/components/select'
  export default{
    name: 'name',
    data(){
      return {}
    },
    props: {},
    watch: {},
    computed: {},
    methods: {},
    created: function () {},
    mounted: function () {},
    activated: function () {},
    components: {List, Item, ListHeader, label, Select, Option}
  }
</script>

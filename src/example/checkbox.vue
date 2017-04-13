<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Checkbox</Title>
            </Navbar>
        </Header>
        <Content>
            <List>
                <ListHeader>Checkbox</ListHeader>
                <Item>
                    <Label>Danger</Label>
                    <Checkbox slot="item-left" color="danger" :checked="grapeChecked"
                              :formControlName="grape"></Checkbox>
                    <Toggle slot="item-right"></Toggle>
                </Item>
                <Item>
                    <Label>Primary</Label>
                    <Checkbox slot="item-left" color="primary" :checked="grapeChecked"
                              :formControlName="grape"></Checkbox>
                </Item>
                <Item>
                    <Label>Dark</Label>
                    <Checkbox slot="item-left" color="dark" :checked="grapeChecked" :formControlName="grape"></Checkbox>
                </Item>
                <Item>
                    <Label>Light</Label>
                    <Checkbox slot="item-left" color="light" :checked="grapeChecked"
                              :formControlName="grape"></Checkbox>
                </Item>

                <ListHeader>使用 v-modal 绑定</ListHeader>
                <Item>
                    <Label>Danger</Label>
                    <Checkbox slot="item-left" color="danger" v-model="testModal" :disabled="testDisabled"
                              :checked="true"
                              :formControlName="grape"></Checkbox>
                </Item>
                <Grid>
                    <Row justify-content-center>
                        <Column text-center>
                            <strong> Current Value: </strong>
                            <span>{{testModal}}</span>
                        </Column>
                        <Column text-center>
                            <strong> Disabled State: </strong>
                            <span>{{testDisabled}}</span>
                        </Column>
                    </Row>
                    <Row justify-content-center>
                        <Column col-1></Column>
                        <Column>
                            <Button block @click="testModal =!testModal">setValue</Button>
                        </Column>
                        <Column>
                            <Button block @click="testDisabled =!testDisabled">Disabled</Button>
                        </Column>
                        <Column col-1></Column>
                    </Row>
                </Grid>

                <ListHeader>使用 checked 属性</ListHeader>
                <Item>
                    <Label>Danger</Label>
                    <Checkbox slot="item-left" color="danger" :checked="testChecked"
                              :formControlName="grape"></Checkbox>
                </Item>

                <Grid>
                    <Row justify-content-center>
                        <Column text-center>
                            <strong> Current Value(主动触发, 单相数据流): </strong>
                            <span>{{testChecked}}</span>
                        </Column>
                    </Row>
                    <Row justify-content-center>
                        <Column col-2></Column>
                        <Column>
                            <Button block @click="testChecked =!testChecked">setValue</Button>
                        </Column>
                        <Column col-2></Column>
                    </Row>
                </Grid>

            </List>
        </Content>
    </Page>
</template>
<style scoped lang="scss">
    .main {

    }
</style>
<script type="text/ecmascript-6">
  import { List } from 'vimo/components/list'
  import { Item, ListHeader } from 'vimo/components/item'
  import { Label } from 'vimo/components/label'
  import { Checkbox } from 'vimo/components/checkbox'
  import { Toggle } from 'vimo/components/toggle'
  export default{
    name: 'name',
    data(){
      return {
        grapeChecked: true,
        grape: true,

        testModal: false,
        testDisabled: false,

        testChecked: true,

      }
    },
    props: {},
    watch: {},
    computed: {},
    methods: {},
    created: function () {},
    mounted: function () {},
    activated: function () {},
    components: {List, Item, ListHeader, Checkbox, Label, Toggle}
  }
</script>

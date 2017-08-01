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
                    <Checkbox slot="item-left" color="danger" v-model="displayData.danger"></Checkbox>
                    <Toggle slot="item-right"></Toggle>
                </Item>
                <Item>
                    <Label>Primary</Label>
                    <Checkbox slot="item-left" color="primary" v-model="displayData.primary"></Checkbox>
                </Item>
                <Item>
                    <Label>Dark</Label>
                    <Checkbox slot="item-left" color="dark" v-model="displayData.dark"></Checkbox>
                </Item>
                <Item>
                    <Label>Light</Label>
                    <Checkbox slot="item-left" color="light" v-model="displayData.light"></Checkbox>
                </Item>
                <Item>
                    <Label>Disabled</Label>
                    <Checkbox slot="item-left" :disabled="displayData.disabled"
                              v-model="displayData.disabled"></Checkbox>
                </Item>
                <ListHeader>使用 v-modal 绑定</ListHeader>
                <Item>
                    <Label>Danger</Label>
                    <Checkbox slot="item-left" color="danger" v-model="testModal" :disabled="testDisabled"
                              @onChange="onCheckboxChange"></Checkbox>
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

            </List>
        </Content>
    </Page>
</template>
<style scoped lang="scss">
    .main {

    }
</style>
<script type="text/javascript">
  export default {
    name: 'name',
    data () {
      return {

        displayData: {
          danger: false,
          primary: true,
          dark: false,
          light: true,
          disabled: true
        },

        testModal: true,
        testDisabled: false
      }
    },
    props: {},
    watch: {
      displayData: {
        handler () {
          console.debug(JSON.parse(JSON.stringify(this.displayData)))
        },
        deep: true
      }
    },
    computed: {},
    methods: {
      onCheckboxChange (val) {
        console.debug('onCheckboxChange:' + val)
      }
    },
    created () {},
    mounted () {},
    activated () {}
  }
</script>

<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Range</Title>
            </Navbar>
        </Header>
        <Content class="outer-content">

            <List>
                <ListHeader>
                    <span>Brightness</span>
                    <Badge slot="item-right">{{brightness}}</Badge>
                </ListHeader>
                <Item>
                    <Range v-model="brightness">
                        <Icon slot="range-left" small name="sunny"></Icon>
                        <Icon slot="range-right" name="sunny"></Icon>
                    </Range>
                </Item>
            </List>

            <List>
                <ListHeader>
                    <span>Saturation</span>
                    <Badge slot="item-right" color="secondary">{{saturation}}</Badge>
                </ListHeader>
                <Item>
                    <Range :min="-200" :max="200" :pin="true" v-model="saturation" color="secondary">
                        <Label slot="range-left">-200</Label>
                        <Label slot="range-right">200</Label>
                    </Range>
                </Item>
            </List>


            <List>
                <ListHeader>
                    <span>Warmth</span>
                    <Badge slot="item-right" color="danger">{{warmth}}</Badge>
                </ListHeader>
                <Item>
                    <Range :min="1000" :max="2000" :step="100" :snaps="true" v-model="warmth" color="danger">
                        <Icon slot="range-left" small color="danger" name="thermometer"></Icon>
                        <Icon slot="range-right" color="danger" name="thermometer"></Icon>
                    </Range>
                </Item>
            </List>

            <List>
                <ListHeader>
                    <span>Structure</span>
                    <Badge slot="item-right" color="dark">{{structure.lower}}</Badge>
                    <Badge slot="item-right" color="dark">{{structure.upper}}</Badge>
                </ListHeader>
                <Item>
                    <Range :dualKnobs="true" :pin="true" v-model="structure"
                           color="dark">
                        <Label slot="range-left">-0</Label>
                        <Label slot="range-right">100</Label>
                    </Range>
                </Item>
            </List>

            <List>
                <ListHeader>
                    <span>Disable</span>
                    <Badge slot="item-right" color="secondary">{{disableRange}}</Badge>
                </ListHeader>
                <Item>
                    <Range :disabled="disabled" :min="-200" :max="200" :pin="true" v-model="disableRange"
                           color="secondary">
                        <Label slot="range-left">-200</Label>
                        <Label slot="range-right">200</Label>
                    </Range>
                </Item>
            </List>

            <Grid>
                <Row justify-content-center>
                    <Column col-6>
                        <Button block @click="disableToggle">Disabled Toggle</Button>
                    </Column>
                </Row>
            </Grid>
        </Content>
    </Page>
</template>
<style scoped lang="less">
</style>
<script type="text/javascript">
  export default{
    name: 'range',
    data () {
      return {

        brightness: 20,
        saturation: 0,
        warmth: 1300,
        structure: {lower: 33, upper: 60},

        disableRange: 10,
        disabled: false
      }
    },
    props: {},
    watch: {
      structure (val) {
        console.log('structure val:')
        console.log(val)
      }
    },
    computed: {},
    methods: {
      disableToggle () {
        this.disabled = !this.disabled
      }
    },
    created () {},
    mounted () {},
    activated () {}
  }
</script>

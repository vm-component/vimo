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
          Brightness
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
          Saturation
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
          Warmth
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
          Structure/Debounce
          <Badge slot="item-right" color="dark">{{structure.lower}}</Badge>
          <Badge slot="item-right" color="dark">{{structure.upper}}</Badge>
        </ListHeader>
        <Item>
          <Range :debounce="200" :dualKnobs="true" :pin="true" v-model="structure" @onChange="onChange" color="dark">
            <Label slot="range-left">-0</Label>
            <Label slot="range-right">100</Label>
          </Range>
        </Item>
      </List>

      <List>
        <ListHeader>
          Disable
          <Badge slot="item-right" color="secondary">{{disableRange}}</Badge>
        </ListHeader>
        <Item>
          <Range :disabled="disabled" :min="-200" :max="200" :pin="true" v-model="disableRange" color="secondary">
            <Label slot="range-left">-200</Label>
            <Label slot="range-right">200</Label>
          </Range>
        </Item>
      </List>

      <Grid>
        <Row  justify-content-center>
          <Column col-6>
            <Button type="block" @click="disableToggle">Disabled Toggle</Button>
          </Column>
        </Row>
      </Grid>



    </Content>
  </Page>
</template>
<style scoped lang="scss">
  .main {

  }
</style>
<script type="text/ecmascript-6">
  export default{
    name: 'range',
    data(){
      return {

        brightness: 20,
        saturation: 0,
        warmth: 1300,
        structure: {lower: 33, upper: 60},

        disableRange: 10,
        disabled:false,

      }
    },
    props: {},
    watch: {
      structure(val){
        console.log('structure val:')
        console.log(val)
      }
    },
    computed: {},
    methods: {

      onChange(value) {
        console.log('Changed', JSON.stringify(value));
      },
      disableToggle(){
        this.disabled = !this.disabled;
      }
    },
    created(){},
    mounted(){},
    activated(){},
    components: {}
  }
</script>

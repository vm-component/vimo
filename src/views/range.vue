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
          Disable
          <Badge slot="item-right" color="secondary">{{disable}}</Badge>
        </ListHeader>
        <Item>
          <Range :disabled="true" :min="-200" :max="200" :pin="true" v-model="disable" color="secondary">
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
          Structure
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
        disable: 10,
        warmth: 1300,
        structure: {lower: 33, upper: 60},

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
      }
    },
    created(){},
    mounted(){},
    activated(){},
    components: {}
  }
</script>

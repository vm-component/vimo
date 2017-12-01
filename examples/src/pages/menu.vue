<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Menu</Title>
            </Navbar>
        </Header>
        <Content padding class="outer-content">
            <h1>Menus参数设置</h1>
            <List radio-group v-model="menusType">
                <ListHeader>Type</ListHeader>
                <Item>
                    <Label>Overlay</Label>
                    <Radio value="overlay"></Radio>
                </Item>
                <Item>
                    <Label>Reveal</Label>
                    <Radio value="reveal"></Radio>
                </Item>
            </List>
            <List radio-group v-model="menusSide">
                <ListHeader>Side</ListHeader>
                <Item>
                    <Label>Left</Label>
                    <Radio value="left"></Radio>
                </Item>
                <Item>
                    <Label>Right</Label>
                    <Radio value="right"></Radio>
                </Item>
            </List>
            <Button block @click="$menu.open('menu')">Open Menu</Button>
        </Content>
    </Page>
</template>
<script type="text/javascript">

  export default {
    name: 'MenusDemo',
    components: {},
    // data
    props: {},
    data () {
      return {}
    },
    watch: {},
    computed: {
      menusType: {
        get () {
          return this.$store.state.menu.type
        },
        set (v) {
          this.$store.commit('SET_MENUS', {type: v})
        }
      },
      menusSide: {
        get () {
          return this.$store.state.menu.side
        },
        set (v) {
          this.$store.commit('SET_MENUS', {side: v})
        }
      }
    },
    // methods
    methods: {},
    // life hook
    beforeCreate () {},
    created () {},
    beforeMount () {},
    mounted () {
      console.log(this.$store)
    },
    beforeUpdate () {},
    updated () {},
    activated () {},
    deactivated () {},
    beforeDestroy () {},
    destroyed () {}
  }
</script>
<style scoped lang="scss">

</style>

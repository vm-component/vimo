<template>
  <Page>
    <Header>
      <Navbar>
        <Title>ListForAll</Title>
      </Navbar>
    </Header>
    <Content>
      <List>
        <!--header-->
        <ListHeader>
          setting
          <Button icon-only slot="right" type="clear">
            <Icon name="cog"></Icon>
          </Button>
        </ListHeader>
        <!--group-->
        <ItemGroup>
          <Item>
            <Icon slot="left" color="danger" name="plane"></Icon>
            Airplane Mode
            <Toggle slot="right" @ionChange="toggleChange"
                    :checked="toggleValue"></Toggle>
          </Item>
          <!--button属性会在右边增加向右箭头-->
          <Item button>
            <Icon slot="left" color="primary" name="wifi"></Icon>
            Wi-Fi
            <Note slot="right">The Interwebz</Note>
          </Item>
          <!--button属性会在右边增加向右箭头-->
          <Item button>
            <Icon slot="left" color="primary" name="bluetooth"></Icon>
            Bluetooth
            <Note slot="right">Off</Note>
          </Item>
        </ItemGroup>
        <!--divider-->
        <ItemDivider color="primary">
          Other Setting
          <Button slot="right" type="outline" color="light">Clear</Button>
        </ItemDivider>

        <!--button属性会在右边增加向右箭头-->
        <Item button>
          <Icon slot="left" color="secondary" name="call"></Icon>
          Cellular
        </Item>
        <!--button属性会在右边增加向右箭头-->
        <Item button>
          <Icon slot="left" color="secondary" name="link"></Icon>
          Personal Hotspot
          <Note slot="right">Off</Note>
        </Item>
      </List>

      <List radio-group :value="silencePhone">
        <!--header-->
        <ListHeader>
          <Icon slot="left" name="phone-portrait"></Icon>
          Silence Phone
        </ListHeader>
        <!--button属性会在右边增加向右箭头-->
        <Item>
          Always
          <!--<ion-radio value="always" checked></ion-radio>-->
        </Item>
        <!--button属性会在右边增加向右箭头-->
        <Item>
          Only while phone is locked
        </Item>
      </List>

      <List>
        <!--header-->
        <ListHeader>
          Apps Installed
        </ListHeader>

        <!--button属性会在右边增加向右箭头-->
        <Item>
          <Icon slot="left" color="primary" name="ionic"></Icon>
          Ionic View
          <Button slot="right" type="outline" color="primary">Uninstall</Button>
        </Item>
        <!--button属性会在右边增加向右箭头-->
        <Item>
          <Icon slot="left" color="primary" name="brush"></Icon>
          Ionic Creator
          <Button slot="right" type="outline" color="primary">Uninstall</Button>
        </Item>
        <!--button属性会在右边增加向右箭头-->
        <Item>
          <Icon slot="left" color="dark" name="logo-octocat"></Icon>
          Hubstruck
          <Button slot="right" type="outline" color="primary">Uninstall</Button>
        </Item>
        <!--button属性会在右边增加向右箭头-->
        <Item>
          <Icon slot="left" color="danger" name="paw"></Icon>
          Barkpark
          <Button slot="right" type="outline" color="primary">Uninstall</Button>
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
    data(){
      return {
        toggleValue: true,
        silencePhone: 'always',
      }
    },
    watch: {
      toggleValue: function () {
        console.debug('outer toggleValue change:' + this.toggleValue)
      }
    },
    computed: {},
    methods: {
      toggleChange: function (val) {
        console.debug('Outer Toggle Change Value - airPlane:' + val)
      }
    },
    created: function () {
    },
    mounted: function () {
    },
    activated: function () {
    },
    components: {}
  }
</script>

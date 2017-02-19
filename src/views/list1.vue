<template>
  <Page>
    <Header>
      <Navbar>
        <Title slot="content" title="List"></Title>
      </Navbar>
    </Header>
    <Content>
      <List>
        <!--header-->
        <ListHeader>
          <ion-label slot="label">setting</ion-label>
          <Button icon-only slot="item-right" item-right type="clear">
            <Icon name="cog"></Icon>
          </Button>
        </ListHeader>
        <!--group-->
        <ItemGroup>
          <Item>
            <Icon slot="item-left" item-left color="danger" name="plane"></Icon>
            <ion-label slot="label">Airplane Mode</ion-label>
            <Toggle slot="item-right" item-right @ionChange="toggleChange"
                        :checked="toggleValue"></Toggle>
          </Item>
          <!--button属性会在右边增加向右箭头-->
          <Item button>
            <Icon slot="item-left" item-left color="primary" name="wifi"></Icon>
            <ion-label slot="label">Wi-Fi</ion-label>
            <Note slot="item-right" item-right>The Interwebz</Note>
          </Item>
          <!--button属性会在右边增加向右箭头-->
          <Item button>
            <Icon slot="item-left" item-left color="primary" name="bluetooth"></Icon>
            <ion-label slot="label">Bluetooth</ion-label>
            <Note slot="item-right" item-right>Off</Note>
          </Item>
        </ItemGroup>
        <!--divider-->
        <ItemDivider color="primary">
          <ion-label slot="label">Other Setting</ion-label>
          <Button slot="item-right" item-right type="outline" color="light">Clear</Button>
        </ItemDivider>

        <!--button属性会在右边增加向右箭头-->
        <Item button>
          <Icon slot="item-left" item-left color="secondary" name="call"></Icon>
          <ion-label slot="label">Cellular</ion-label>
        </Item>
        <!--button属性会在右边增加向右箭头-->
        <Item button>
          <Icon slot="item-left" item-left color="secondary" name="link"></Icon>
          <ion-label slot="label">Personal Hotspot</ion-label>
          <Note slot="item-right" item-right>Off</Note>
        </Item>


      </List>

      <List radio-group :value="silencePhone">
        <!--header-->
        <ListHeader>
          <Icon slot="item-left" item-left name="phone-portrait"></Icon>
          <ion-label slot="label">
            Silence Phone
          </ion-label>
        </ListHeader>

        <!--button属性会在右边增加向右箭头-->
        <Item>
          <ion-label slot="label">Always</ion-label>
          <!--<ion-radio value="always" checked></ion-radio>-->
        </Item>
        <!--button属性会在右边增加向右箭头-->
        <Item>
          <ion-label slot="label" value="locked">Only while phone is locked</ion-label>
        </Item>

      </List>

      <List>
        <!--header-->
        <ListHeader>
          <ion-label slot="label">
            Apps Installed
          </ion-label>
        </ListHeader>

        <!--button属性会在右边增加向右箭头-->
        <Item>
          <Icon slot="item-left" item-left color="primary" name="ionic"></Icon>
          <ion-label slot="label">Ionic View</ion-label>
          <Button slot="item-right" item-right type="outline" color="primary">Uninstall</Button>
        </Item>
        <!--button属性会在右边增加向右箭头-->
        <Item>
          <Icon slot="item-left" item-left color="primary" name="brush"></Icon>
          <ion-label slot="label">Ionic Creator</ion-label>
          <Button slot="item-right" item-right type="outline" color="primary">Uninstall</Button>
        </Item>
        <!--button属性会在右边增加向右箭头-->
        <Item>
          <Icon slot="item-left" item-left color="dark" name="logo-octocat"></Icon>
          <ion-label slot="label">Hubstruck</ion-label>
          <Button slot="item-right" item-right type="outline" color="primary">Uninstall</Button>
        </Item>
        <!--button属性会在右边增加向右箭头-->
        <Item>
          <Icon slot="item-left" item-left color="danger" name="paw"></Icon>
          <ion-label slot="label">Barkpark</ion-label>
          <Button slot="item-right" item-right type="outline" color="primary">Uninstall</Button>
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

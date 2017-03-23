<template>
    <Page>
        <Header>
            <Navbar>
                <Title>AvatarList</Title>
            </Navbar>
        </Header>
        <Content class="list-avatar-page">
            <List>
                <ListHeader>
                    <span>today</span>
                </ListHeader>
                <Item>
                    <Avatar slot="item-left">
                        <img src="http://ionicframework.com/dist/preview-app/www/assets/img/avatar-ts-woody.png">
                    </Avatar>
                    <Label>
                        <h2>Woody</h2>
                        <p>This town ain't big enough for the two of us!</p>
                    </Label>
                    <Note slot="item-right">3:43 pm</Note>
                </Item>
                <Item>
                    <Avatar slot="item-left">
                        <img src="http://ionicframework.com/dist/preview-app/www/assets/img/avatar-ts-buzz.png">
                    </Avatar>
                    <Label>
                        <h2>Buzz Lightyear</h2>
                        <p>My eyeballs could have been sucked from their sockets!</p>
                    </Label>
                    <Note slot="item-right">1:12 pm</Note>
                </Item>
            </List>

            <List>
                <ListHeader>
                    <span>yesterday</span>
                </ListHeader>
                <Item>
                    <Avatar slot="item-left">
                        <img src="http://ionicframework.com/dist/preview-app/www/assets/img/avatar-ts-hamm.png">
                    </Avatar>
                    <Label>
                        <h2>Hamm</h2>
                        <p>You heard of Kung Fu? Well get ready for pork chop.</p>
                    </Label>
                    <Note slot="item-right">11:12 pm</Note>
                </Item>
                <Item>
                    <Avatar slot="item-left">
                        <img src="http://ionicframework.com/dist/preview-app/www/assets/img/avatar-ts-slinky.png">
                    </Avatar>
                    <Label><h2>Slinky Dog</h2>
                        <p>I may not be a smart dog, but I know what roadkill is.</p></Label>
                    <Note slot="item-right">12:12 pm</Note>
                </Item>
            </List>
        </Content>
    </Page>
</template>
<style scoped lang="scss">
    .list-avatar-page {
        .ion-note {
            font-size: 12px;
            -webkit-align-self: flex-start;
            -ms-flex-item-align: start;
            align-self: flex-start;
            margin-top: 14px;
        }
    }
</style>
<script type="text/ecmascript-6">
  import { List } from 'vimo/components/list'
  import { ListHeader, ItemGroup, Item, ItemSliding, ItemOptions, ItemDivider } from 'vimo/components/item'
  import { Note } from 'vimo/components/note'
  import { Avatar } from 'vimo/components/avatar'
  import { Label } from 'vimo/components/label'
  export default{
    data(){
      return {}
    },
    watch: {},
    computed: {},
    methods: {},
    created() {},
    mounted () {},
    activated () {},
    components: {List, ListHeader, ItemGroup, Item, ItemSliding, ItemOptions, ItemDivider, Note, Avatar, Label}
  }
</script>

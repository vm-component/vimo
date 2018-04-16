<template>
    <App>
        <Menu id="menu" :side="menu.side" :type="menu.type">
            <List>
                <ListHeader>
                    <span>Start</span>
                </ListHeader>
                <Item detail-push :to="{name: 'introduce'}" wait>
                    <Icon slot="item-left" name="apps"></Icon>
                    <span>Introduction</span>
                </Item>
                <Item detail-push :to="{name: 'config'}" wait>
                    <Icon slot="item-left" name="settings"></Icon>
                    <span>Config</span>
                </Item>
                <Item detail-push :to="{name: 'platform'}" wait>
                    <Icon slot="item-left" md="logo-android" ios="logo-apple"></Icon>
                    <span>Platfrom</span>
                </Item>
                <Item detail-push :to="{name: 'crossPlatform'}" wait>
                    <Icon slot="item-left" name="logo-javascript"></Icon>
                    <span>Cross Platorm</span>
                </Item>
            </List>
            <List>
                <ListHeader>
                    <span>Main</span>
                </ListHeader>
                <Item detail-push :to="{name: 'components'}" wait>
                    <Icon slot="item-left" name="logo-rss"></Icon>
                    <span>Components</span>
                </Item>
            </List>
        </Menu>
        <Menu id="menu1" side="left" type="reveal">
            <div padding>
                <h3>Menu1</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusamus beatae blanditiis cupiditate dolor, doloribus eligendi est eum hic, molestias mollitia nam neque perferendis quia reiciendis rem vel, veniam voluptatum.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusamus beatae blanditiis cupiditate dolor, doloribus eligendi est eum hic, molestias mollitia nam neque perferendis quia reiciendis rem vel, veniam voluptatum.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusamus beatae blanditiis cupiditate dolor, doloribus eligendi est eum hic, molestias mollitia nam neque perferendis quia reiciendis rem vel, veniam voluptatum.</p>
                <Button block @click="$menu.present('menu2')">Open Menu2</Button>
            </div>
        </Menu>
        <Menu id="menu2" side="right" type="overlay">
            <div padding>
                <h3>Menu2</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem enim facilis fuga magni nisi non officia pariatur sed. Commodi consequuntur esse, ex exercitationem fugiat nisi quisquam quod vitae voluptas? Impedit?</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem enim facilis fuga magni nisi non officia pariatur sed. Commodi consequuntur esse, ex exercitationem fugiat nisi quisquam quod vitae voluptas? Impedit?</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem enim facilis fuga magni nisi non officia pariatur sed. Commodi consequuntur esse, ex exercitationem fugiat nisi quisquam quod vitae voluptas? Impedit?</p>
                <Button block @click="$menu.present('menu1')">Open Menu1</Button>
            </div>
        </Menu>
        <Nav>
            <router-view/>
        </Nav>
    </App>
</template>
<script type="application/javascript">
  import { mapState } from 'vuex'

  export default {
    name: 'DemoRoot',
    computed: {
      ...mapState([
        'menu'
      ])
    }
  }
</script>

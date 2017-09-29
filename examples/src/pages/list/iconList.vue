<template>
    <Page>
        <Header>
            <Navbar>
                <Title>IconList</Title>
            </Navbar>
        </Header>
        <Content class="outer-content">
            <List>
                <ListHeader>
                    <span>classes</span>
                </ListHeader>

                <Item>
                    <Icon name="planet" slot="item-left"></Icon>
                    <Label>Astronomy</Label>
                    <Note slot="item-right">To the moon</Note>
                </Item>

                <Item>
                    <Icon name="body" slot="item-left"></Icon>
                    <Label>Muggle Studies</Label>
                    <Toggle slot="item-right" :checked="false"></Toggle>
                </Item>

                <Item>
                    <Icon name="leaf" slot="item-left"></Icon>
                    <Label>Herbology</Label>
                    <Icon name="rose" slot="item-right"></Icon>
                </Item>

                <Item>
                    <Icon name="flask" slot="item-left"></Icon>
                    <label>Potions</label>
                    <Button slot="item-right" outline color="primary">Btn</Button>
                </Item>


                <Item @click.native="onClickHandler" :to="{'name':'components'}">
                    <Icon name="flask" slot="item-left"></Icon>
                    <label>Click</label>
                    <Button slot="item-right" outline color="primary">Btn</Button>
                </Item>
            </List>
        </Content>
    </Page>
</template>
<style scoped lang="less"></style>
<script type="text/javascript">
  export default{
    data () {
      return {
        list: [
          'NoLine 1',
          'NoLine 2',
          'NoLine 3',
          'NoLine 4',
          'NoLine 5',
          'NoLine 6',
          'NoLine 7',
          'NoLine 8',
          'NoLine 9',
          'NoLine 10',
          'NoLine 11',
          'NoLine 12',
          'NoLine 13',
          'NoLine 14'
        ]
      }
    },
    methods: {
      onClickHandler () {
        alert('click click')
      }
    }
  }
</script>

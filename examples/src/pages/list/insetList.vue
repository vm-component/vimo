<template>
    <Page>
        <Header>
            <Navbar>
                <Title>InsetList</Title>
            </Navbar>
        </Header>
        <Content class="outer-content">
            <List inset>
                <Item button v-for="(item,index) in list" :key="index">
                    {{item}}
                </Item>
            </List>
        </Content>
    </Page>
</template>
<style scoped lang="less">

</style>
<script type="text/javascript">
  export default{
    data () {
      return {
        list: [
          'InsetList 1',
          'InsetList 2',
          'InsetList 3',
          'InsetList 4',
          'InsetList 5',
          'InsetList 6',
          'InsetList 7',
          'InsetList 8',
          'InsetList 9',
          'InsetList 10',
          'InsetList 11',
          'InsetList 12',
          'InsetList 13',
          'InsetList 14'
        ]
      }
    }
  }
</script>

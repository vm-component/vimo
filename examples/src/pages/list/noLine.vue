<template>
    <Page>
        <Header>
            <Navbar>
                <Title>NoLine</Title>
            </Navbar>
        </Header>
        <Content class="outer-content">
            <List no-lines>
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
    watch: {},
    computed: {},
    methods: {},
    created () {},
    mounted () {},
    activated () {}
  }
</script>

<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Demo</Title>
            </Navbar>
        </Header>
        <Content>
            <h1>这里是内容</h1>
        </Content>
    </Page>
</template>
<style scoped lang="scss">


</style>
<script type="text/javascript">
  import axios from 'axios'
  export default{
    data () {
      return {}
    },
    watch: {},
    computed: {},
    methods: {},
    created () {},
    mounted () {
      var $axios = axios.create({
        baseURL: '/',
        headers: {}
      })
      // 获取省份信息
      // params
      axios.get('https://api.m.taobao.com/h5/com.taobao.mtop.deliver.getdivisionchild/2.0/?appKey=12574478&t=1496898794817&sign=171357049a200ca0c2f1cd83ab586f3e&api=com.taobao.mtop.deliver.getDivisionChild&v=2.0&type=originaljson&dataType=json&data=%7B%22divisionCode%22%3A%221%22%7D')
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })

    },
    activated () {},
    components: {}
  }
</script>

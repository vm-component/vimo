<template>
  <Page>
    <Header>
      <Navbar>
        <Title>Searchbar</Title>
      </Navbar>
      <Toolbar>
        <Searchbar :animated="false"
                   :debounce="1000"
                   mode="ios"
                   color="danger"
                   v-model="myInput"
                   :showCancelButton="true"
                   cancelButtonText="取消"
                   @ionInput="onInput"
                   @ionFocus="onFocus"
                   @ionBlur="onBlur"
                   @ionCancel="onCancel"
                   @ionClear="onClear"></Searchbar>
      </Toolbar>
    </Header>
    <Content padding>
      <h4>Searchbar</h4>
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
        myInput: ''
      }
    },
    watch: {
      myInput () {
        console.debug('myInput changed outer:' + this.myInput)
      }
    },
    computed: {},
    methods: {
      onInput ($event) {
        console.debug('outer-onInput:');
      },
      onCancel ($event) {
        console.debug('outer-onCancel:');
      },
      onClear: function ($event) {
        console.debug('outer-onClear:');
      },
      onBlur: function ($event) {
        console.debug('outer-onBlur:');
      },
      onFocus: function ($event) {
        console.debug('outer-onFocus:');
      }
    },
    created () {
    },
    mounted () {
    },
    activated () {
    },
  }
</script>

<template>
    <App :testValue="testValue">
        <div class="top">
            <Button @click="changeMode">Button</Button>
        </div>

        <Nav>
            <router-view/>
        </Nav>
    </App>
</template>
<style>
    .top {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9999;
    }
</style>
<script type="application/javascript">
  export default {
    name: 'DemoRoot',
    data () {
      return {
        testValue: '1xxxcd'
      }
    },
    methods: {
      changeMode () {
        this.testValue = new Date().getTime().toString()
      }
    }
  }
</script>

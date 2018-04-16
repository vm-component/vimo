<template>
    <App>
        <Nav>
            <router-view/>
        </Nav>
    </App>
</template>
<script type="application/javascript">
  export default {
    name: 'DemoRoot',
    methods: {
      changeMode () {
        this.testValue = new Date().getTime().toString()
      }
    }
  }
</script>

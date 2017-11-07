<template>
    <vm-page>
        <vm-header>
            <vm-navbar>
                <vm-title>Position</vm-title>
            </vm-navbar>
        </vm-header>
        <vm-content padding>
            <div v-for="bi in btn">
                <vm-button @click="getPosition(bi.name)" v-bind:color="bi.color">{{bi.name}}</vm-button>
            </div>
            <vm-grid>
                <vm-row>
                    <vm-col col-4>type</vm-col>
                    <vm-col>
                        {{type}}
                    </vm-col>
                </vm-row>
                <vm-row>
                    <vm-col>lat</vm-col>
                    <vm-col>
                        {{lat}}
                    </vm-col>
                </vm-row>
                <vm-row>
                    <vm-col col-4>lng</vm-col>
                    <vm-col>
                        {{lng}}
                    </vm-col>
                </vm-row>
            </vm-grid>
        </vm-content>
    </vm-page>


</template>
<style scoped lang="less">
    .buttons {
        text-align: center;

    }
</style>
<script type="text/javascript">
  export default{
    data () {
      return {
        btn: [
          {
            name: 'ali',
            color: 'primary'
          }, {
            name: 'qq',
            color: 'primary'
          }, {
            name: 'baidu',
            color: 'primary'
          }
        ],
        type: '',
        lat: '',
        lng: ''
      }
    },
    methods: {
      getPosition (type) {
        this.btn.forEach(function (e, i) {
          e.color = 'primary'
          if (e.name === type) e.color = 'secondary'
        })
        this.getFromGeo(type)
      },
      getFromGeo (type) {
        var _this = this
        this.$geolocation.getCurrentPosition(type).then((pos) => {
          _this.type = pos.maptype
          _this.lat = pos.lat
          _this.lng = pos.lng
        })
      }
    }
  }
</script>

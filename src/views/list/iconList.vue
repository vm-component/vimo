<template>
  <ion-page>
    <ion-header>
      <ion-navbar>
        <ion-title slot="content">IconList</ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-list-header>
          classes
        </ion-list-header>

        <ion-item>
          <ion-icon name="planet" slot="item-left" item-left></ion-icon>
          Astronomy
          <ion-note slot="item-right" item-right>To the moon</ion-note>
        </ion-item>

        <ion-item>
          <ion-icon name="body" slot="item-left" item-left></ion-icon>
          Muggle Studies
          <ion-toggle slot="item-right" item-right :checked="false"></ion-toggle>
        </ion-item>

        <ion-item>
          <ion-icon name="leaf" slot="item-left" item-left></ion-icon>
          Herbology
          <ion-icon name="rose" slot="item-right" item-right></ion-icon>
        </ion-item>

        <ion-item>
          <ion-icon name="flask" slot="item-left" item-left></ion-icon>
          Potions
          <ion-button slot="item-right" item-right type="outline" color="primary">Btn</ion-button>
        </ion-item>

      </ion-list>
    </ion-content>
  </ion-page>
</template>
<style scoped lang="scss">

</style>
<script type="text/ecmascript-6">
  export default{
    data(){
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
          'NoLine 14',
        ]
      }
    },
    watch: {},
    computed: {},
    methods: {},
    created() {},
    mounted () {},
    activated () {},
    components: {}
  }
</script>

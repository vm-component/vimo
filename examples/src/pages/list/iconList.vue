<template>
    <vm-page>
        <vm-header>
            <vm-navbar>
                <vm-title>IconList</vm-title>
            </vm-navbar>
        </vm-header>
        <vm-content class="outer-content">
            <vm-list>
                <vm-list-header>
                    <span>classes</span>
                </vm-list-header>

                <vm-item>
                    <vm-icon name="planet" slot="item-start"></vm-icon>
                    <vm-label>Astronomy</vm-label>
                    <vm-note slot="item-end">To the moon</vm-note>
                </vm-item>

                <vm-item>
                    <vm-icon name="body" slot="item-start"></vm-icon>
                    <vm-label>Muggle Studies</vm-label>
                    <vm-toggle slot="item-end" :checked="false"></vm-toggle>
                </vm-item>

                <vm-item>
                    <vm-icon name="leaf" slot="item-start"></vm-icon>
                    <vm-label>Herbology</vm-label>
                    <vm-icon name="rose" slot="item-end"></vm-icon>
                </vm-item>

                <vm-item>
                    <vm-icon name="flask" slot="item-start"></vm-icon>
                    <vm-label>Potions</vm-label>
                    <vm-button slot="item-end" outline color="primary">Btn</vm-button>
                </vm-item>


                <vm-item @click.native="onClickHandler" :to="{'name':'components'}">
                    <vm-icon name="flask" slot="item-start"></vm-icon>
                    <vm-label>Click</vm-label>
                    <vm-button slot="item-end" outline color="primary">Btn</vm-button>
                </vm-item>
            </vm-list>
        </vm-content>
    </vm-page>
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

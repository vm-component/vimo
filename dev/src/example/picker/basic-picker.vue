<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Basic</Title>
            </Navbar>
        </Header>
        <Content padding class="outer-content">

            <Button block @click="twoColumns">2 Columns</Button>
            <Button block @click="prefixLabel">Prefix Label</Button>
            <Button block @click="suffixLabel">Suffix Label</Button>
            <Button block @click="columnSizes">Columns with sizes</Button>

            <p padding>
                <code>Smoothie: {{ smoothie }}</code><br>
                <code>Timer: {{ timer }}</code><br>
            </p>
        </Content>
    </Page>
</template>
<style scoped lang="scss">

</style>
<script type="text/javascript">
  import { Picker } from 'vimo/components/picker'
  export default{
    name: 'name',
    data () {
      return {
        smoothie: '',
        timer: ''
      }
    },
    props: {},
    watch: {},
    computed: {},
    methods: {
      twoColumns () {
        Picker.present({
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel'
            },
            {
              text: 'Done',
              handler: (data) => {
                this.smoothie = `${data.flavor1.value} ${data.flavor2.value}`
              }
            }
          ],
          columns: [
            {
              name: 'flavor1',
              align: 'right',
              options: [
                {text: 'Mango'},
                {text: 'Banana'},
                {text: 'Cherry'},
                {text: 'Strawberry'},
                {text: 'Raspberry'},
                {text: 'Blueberry'},
                {text: 'Peach'},
                {text: 'Coconut'},
                {text: 'Pineapple'},
                {text: 'Honeydew'},
                {text: 'Watermelon'},
                {text: 'Grape'},
                {text: 'Avocado'},
                {text: 'Kiwi'},
                {text: 'Orange'},
                {text: 'Papaya'}
              ]
            },
            {
              name: 'flavor2',
              align: 'left',
              options: [
                {text: 'Banana'},
                {text: 'Orange'},
                {text: 'Grape'},
                {text: 'Watermelon'},
                {text: 'Strawberry'},
                {text: 'Papaya'},
                {text: 'Kiwi'},
                {text: 'Cherry'},
                {text: 'Raspberry'},
                {text: 'Mango'},
                {text: 'Pineapple'},
                {text: 'Peach'},
                {text: 'Avocado'},
                {text: 'Honeydew'},
                {text: 'Blueberry'},
                {text: 'Coconut'}
              ]
            }
          ]
        })
      },
      prefixLabel () {
        Picker.present({
          buttons: [
            {
              text: 'Nerp',
              role: 'cancel'
            },
            {
              text: 'Woot!',
              handler: (data) => {
                this.smoothie = `${data.flavor1.value}`
              }
            }
          ],
          columns: [
            {
              name: 'flavor1',
              align: 'left',
              prefix: 'Flavor',
              options: [
                {text: 'Mango'},
                {text: 'Banana'},
                {text: 'Cherry'},
                {text: 'Strawberry'},
                {text: 'Raspberry'},
                {text: 'Blueberry'},
                {text: 'Peach'},
                {text: 'Coconut'},
                {text: 'Pineapple'},
                {text: 'Honeydew'},
                {text: 'Watermelon'},
                {text: 'Grape'},
                {text: 'Avocado'},
                {text: 'Kiwi'},
                {text: 'Orange'},
                {text: 'Papaya'}
              ]
            }
          ]
        })
      },
      suffixLabel () {
        Picker.present({
          buttons: [
            {
              text: 'No',
              role: 'cancel'
            },
            {
              text: 'Si',
              handler: (data) => {
                this.smoothie = `${data.flavor1.value}`
              }
            }
          ],
          columns: [
            {
              name: 'flavor1',
              align: 'right',
              suffix: 'flavor',
              options: [
                {text: 'Mango'},
                {text: 'Banana'},
                {text: 'Cherry'},
                {text: 'Strawberry'},
                {text: 'Raspberry'},
                {text: 'Blueberry'},
                {text: 'Peach'},
                {text: 'Coconut'},
                {text: 'Pineapple'},
                {text: 'Honeydew'},
                {text: 'Watermelon'},
                {text: 'Grape'},
                {text: 'Avocado'},
                {text: 'Kiwi'},
                {text: 'Orange'},
                {text: 'Papaya'}
              ]
            }
          ]
        })
      },

      columnSizes() {
        let hourColumn = {
          name: 'hour',
          suffix: 'hour',
          optionsWidth: '50px',
          align: 'right',
          options: Array.apply(null, {length: 24}).map(Number.call, Number)
        }

        let minuteOptions = []
        for (var i = 0; i < 60; i++) {
          minuteOptions.push({
            text: i,
            value: ('0' + i).slice(-2)
          })
        }

        let minuteColumn = {
          name: 'min',
          suffix: 'min',
          optionsWidth: '80px',
          align: 'left',
          options: minuteOptions
        }

        Picker.present({
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel'
            },
            {
              text: 'Set Timer',
              handler: (data) => {
                this.timer = `${data.hour.value}:${data.min.value}`
              }
            }
          ],
          columns: [
            hourColumn, minuteColumn
          ]
        })
      }

    },
    created () {},
    mounted () {},
    activated () {},
    deactivate () {},
    components: {},
    destroyed () {}
  }
</script>

<template>
    <Page>
        <Header>
            <Navbar>
                <Title :title="$t('title')"></Title>
            </Navbar>
        </Header>
        <Content padding class="outer-content">
            <Button block @click="oneColumns">1 Columns</Button>
            <Button block @click="twoColumns">2 Columns</Button>
            <Button block @click="threeColumns">3 Columns</Button>
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
<script type="text/javascript">
  export default {
    name: 'DemoNormalPick',
    i18n: {
      messages: {
        'zh-CN': {
          title: '基础使用',
          confirm: '确认',
          cancel: '取消'
        },
        'en-US': {
          title: 'Basic Usage',
          confirm: 'Confirm',
          cancel: 'Cancel'
        }
      }
    },
    data () {
      return {
        smoothie: '',
        timer: ''
      }
    },
    methods: {
      oneColumns () {
        let column = [
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

        let selectedIndex = column.indexOf(column.filter((item) => {
          return this.smoothie.toString().toLowerCase().indexOf(item.text.toString().toLowerCase()) > -1
        })[0])

        let options = {
          buttons: [
            {
              text: this.$t('cancel'),
              role: 'cancel',
              handler: (data) => {
                console.log(JSON.stringify(data))
              }
            },
            {
              text: this.$t('confirm'),
              handler: (data) => {
                this.smoothie = `${data.flavor1.value}`
              }
            }
          ],
          columns: [
            {
              name: 'flavor1',
              selectedIndex: selectedIndex,
              options: column
            }
          ]
        }

        this.$picker.present(options)
      },
      twoColumns () {
        this.$picker.present({
          buttons: [
            {
              text: this.$t('cancel'),
              role: 'cancel'
            },
            {
              text: this.$t('confirm'),
              handler: (data) => {
                this.smoothie = `${data.flavor1.value} ${data.flavor2.value}`
                console.log(data)
                console.log(data)
                console.log(JSON.stringify(data))
              }
            }
          ],
          columns: [
            {
              name: 'flavor1',
              align: 'right',
              selectedIndex: 1,
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
              selectedIndex: 3,
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
      threeColumns () {
        this.$picker.present({
          buttons: [
            {
              text: this.$t('cancel'),
              role: 'cancel'
            },
            {
              text: this.$t('confirm'),
              handler: (data) => {
                this.smoothie = `${data.flavor1.value} ${data.flavor2.value}`
                console.log(data)
                console.log(data)
                console.log(JSON.stringify(data))
              }
            }
          ],
          columns: [
            {
              name: 'flavor1',
              align: 'right',
              selectedIndex: 1,
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
              selectedIndex: 3,
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
            },
            {
              name: 'flavor3',
              align: 'left',
              selectedIndex: 5,
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
        this.$picker.present({
          isH5: true,
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
        this.$picker.present({
          isH5: true,
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

      columnSizes () {
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

        this.$picker.present({
          isH5: true,
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
    }
  }
</script>

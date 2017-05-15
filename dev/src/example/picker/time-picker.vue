<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Datetime Picker</Title>
            </Navbar>
        </Header>
        <Content class="outer-content">

            <Item>
                <Label>MMMM</Label>
                <Datetime slot="item-right" displayFormat="MMMM" v-model="monthOnly"></Datetime>
            </Item>

            <Item>
                <Label>MM DD YY</Label>
                <Datetime slot="item-right" displayFormat="MM DD YY" v-model="placeholderDate"
                          placeholder="Select Date"></Datetime>
            </Item>

            <Item>
                <Label>YYYY</Label>
                <Datetime slot="item-right" displayFormat="YYYY" min="1981" max="2002" v-model="wwwInvented"></Datetime>
            </Item>

            <Item>
                <Label>MMMM YY</Label>
                <Datetime slot="item-right" displayFormat="MMMM YY" min="1989-06-04" max="2004-08-23"
                          v-model="netscapeReleased"></Datetime>
            </Item>

            <Item>
                <Label>MM/DD/YYYY</Label>
                <Datetime slot="item-right" displayFormat="MM/DD/YYYY" min="1994-03-14" max="2012-12-09"
                          v-model="firefoxReleased"
                          class="e2eOpenMMDDYYYY"></Datetime>
            </Item>

            <Item>
                <Label>DDD. MMM DD, YY (custom locale)</Label>
                <Datetime slot="item-right" v-model="operaReleased" min="1990-02" max="2000"
                          displayFormat="DDD. MMM DD, YY"
                          monthShortNames="jan, feb, mar, apr, mai, jun, jul, aug, sep, okt, nov, des"
                          :dayShortNames="customShortDay"></Datetime>
            </Item>

            <Item>
                <Label>D MMM YYYY H:mm</Label>
                <Datetime slot="item-right" displayFormat="D MMM YYYY H:mm" min="1997" max="2010"
                          v-model="webkitOpenSourced"></Datetime>
            </Item>

            <Item>
                <Label>DDDD MMM D, YYYY</Label>
                <Datetime slot="item-right" displayFormat="DDDD MMM D, YYYY" min="2005" max="2016"
                          v-model="chromeReleased"></Datetime>
            </Item>

            <Item>
                <Label>HH:mm</Label>
                <Datetime slot="item-right" displayFormat="HH:mm" v-model="time"></Datetime>
            </Item>

            <Item>
                <Label>h:mm a</Label>
                <Datetime slot="item-right" @onChange="onChange($event)" @onCancel="onCancel($event)"
                          displayFormat="h:mm a"
                          v-model="time"></Datetime>
            </Item>

            <Item>
                <Label>hh:mm A (15 min steps)</Label>
                <Datetime slot="item-right" displayFormat="h:mm A" minuteValues="0,15,30,45"></Datetime>
            </Item>

            <Item>
                <Label>Leap years, summer months</Label>
                <Datetime slot="item-right" displayFormat="MM/YYYY" pickerFormat="MMMM YYYY"
                          :yearValues="leapYearsArray"
                          monthValues="6,7,8"
                          v-model="leapYearsSummerMonths"></Datetime>
            </Item>

            <Item>
                <Label>Specific days/months/years</Label>
                <Datetime slot="item-right" monthValues="6,7,8" yearValues="2014,2015"
                          dayValues="01,02,03,04,05,06,08,09,10, 11, 12, 13, 14"
                          displayFormat="DD/MMM/YYYY" v-model="specificDaysMonthsYears"></Datetime>
            </Item>

            <p aria-hidden="true" padding>
                <code>monthOnly: {{monthOnly}}</code><br>
                <code>placeholderDate: {{placeholderDate}}</code><br>
                <code>wwwInvented: {{wwwInvented}}</code><br>
                <code>netscapeReleased: {{netscapeReleased}}</code><br>
                <code>operaReleased: {{operaReleased}}</code><br>
                <code>firefoxReleased: {{firefoxReleased}}</code><br>
                <code>webkitOpenSourced: {{webkitOpenSourced}}</code><br>
                <code>chromeReleased: {{chromeReleased}}</code><br>
                <code>time: {{time}}</code><br>
                <code>Leap year, summer months: {{leapYearsSummerMonths}}</code><br>
                <code>Specific days/months/years: {{specificDaysMonthsYears}}</code><br>
            </p>

            <p>
                <Button @click="clearLeapYear()">Clear Leap Years</Button>
            </p>

            <Item>
                <Label>myDate: {{myDate}}</Label>
                <Datetime slot="item-right" displayFormat="MMM DD, YYYY HH:mm" v-model="convertedDate"></Datetime>
            </Item>

            <p>
                <Button @click="convertDate()">Convert myDate To Date</Button>
                {{convertedDate}}
            </p>

            <Item>
                <Label>HH:mm:ss</Label>
                <Datetime slot="item-right" displayFormat="HH:mm:ss" v-model="time"></Datetime>
            </Item>

        </Content>
    </Page>
</template>
<style scoped lang="scss">

</style>
<script type="text/javascript">
  import { Datetime } from 'vimo/components/datetime'
  import { List } from 'vimo/components/list'
  import { ListHeader, ItemGroup, Item, ItemSliding, ItemOptions, ItemDivider } from 'vimo/components/item'
  export default{
    name: 'datetime',
    data () {
      return {
        myDate: '',
        placeholderDate: '',
        monthOnly: '2012-12-15T13:47:20.789',
        wwwInvented: '1989',
        time: '13:47:00',
        netscapeReleased: '1994-12-15T13:47:20.789',
        operaReleased: '1995-04-15',
        firefoxReleased: '2002-09-23T15:03:46.789',
        webkitOpenSourced: '2005-06-17T11:06Z',
        chromeReleased: '2008-09-02',
        leapYearsSummerMonths: null,
        convertedDate: '',
        specificDaysMonthsYears: '',
        leapYearsArray: [2020, 2016, 2008, 2004, 2000, 1996],
        customShortDay: [
          's\u00f8n',
          'man',
          'tir',
          'ons',
          'tor',
          'fre',
          'l\u00f8r'
        ]
      }
    },
    props: {},
    watch: {},
    computed: {},
    methods: {
      onChange(ev) {
        console.log('Changed', ev)
      },

      onCancel(ev) {
        console.log('Canceled', ev)
      },

      clearLeapYear() {
        this.leapYearsSummerMonths = null
      },
      convertDate() {
        this.convertedDate = new Date()
      }
    },
    created () {},
    mounted () {},
    activated () {},
    deactivate () {},
    components: {
      Datetime, List, ListHeader, ItemGroup, Item, ItemSliding, ItemOptions, ItemDivider
    },
    destroyed () {}
  }
</script>

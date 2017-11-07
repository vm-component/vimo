<template>
    <vm-page>
        <vm-header>
            <vm-navbar>
                <vm-title>Datetime Picker</vm-title>
            </vm-navbar>
        </vm-header>
        <vm-content class="outer-content">

            <div padding>
                <h5>简介</h5>
                <p>
                    时间选择器可以根据指定的日期格式选择制定日期, 或者指定的时间段. 通过v-model可以穿入如下类型: Date日起对象/ISO格式的时间String/能转化为Date对象的字符串 这三类. 但是v-model返回的数据都是ISO格式日期String, 如果期望返回每个column返回的详细结果, 请监听onChange事件.</p>
            </div>

            <vm-list>
                <vm-list-header>Choose Date</vm-list-header>
                <vm-item>
                    <vm-label>Default</vm-label>
                    <Datetime slot="item-right"></Datetime>
                </vm-item>
                <vm-item>
                    <vm-label>MMMM</vm-label>
                    <Datetime slot="item-right" displayFormat="MMMM" v-model="monthOnly"></Datetime>
                </vm-item>

                <vm-item>
                    <vm-label>MM DD YY</vm-label>
                    <Datetime slot="item-right" displayFormat="MM DD YY" v-model="placeholderDate"
                              placeholder="Select Date"></Datetime>
                </vm-item>

                <vm-item>
                    <vm-label>YYYY</vm-label>
                    <Datetime slot="item-right" displayFormat="YYYY" min="1981" max="2002"
                              v-model="wwwInvented"></Datetime>
                </vm-item>

                <vm-item>
                    <vm-label>MMMM YY</vm-label>
                    <Datetime slot="item-right" displayFormat="MMMM YY" min="1989-06-04" max="2004-08-23"
                              v-model="netscapeReleased"></Datetime>
                </vm-item>

                <vm-item>
                    <vm-label>MM/DD/YYYY</vm-label>
                    <Datetime slot="item-right" displayFormat="MM/DD/YYYY" min="1994-03-14" max="2012-12-09"
                              v-model="firefoxReleased"
                              class="e2eOpenMMDDYYYY"></Datetime>
                </vm-item>

                <vm-item>
                    <vm-label>DDD. MMM DD, YY(本地)</vm-label>
                    <Datetime slot="item-right" v-model="operaReleased" min="1990-02" max="2018"
                              displayFormat="DDD. MMM DD, YY"
                              monthShortNames="一月, 二月, 三月, 四月, 五月, 六月, 七月, 八月, 九月, 十月, 十一月, 十二月"
                              :dayShortNames="customShortDay"></Datetime>
                </vm-item>
                <vm-item>
                    <vm-label>D MMM YYYY H:mm</vm-label>
                    <Datetime slot="item-right" displayFormat="D MMM YYYY H:mm" min="1997" max="2010"
                              v-model="webkitOpenSourced"></Datetime>
                </vm-item>

                <vm-item>
                    <vm-label>DDDD MMM D, YYYY</vm-label>
                    <Datetime slot="item-right" displayFormat="DDDD MMM D, YYYY" min="2005" max="2016"
                              v-model="chromeReleased"></Datetime>
                </vm-item>

                <vm-item>
                    <vm-label>HH:mm</vm-label>
                    <Datetime slot="item-right" displayFormat="HH:mm" v-model="time"></Datetime>
                </vm-item>

                <vm-item>
                    <vm-label>h:mm a (with event)</vm-label>
                    <Datetime slot="item-right" @onChange="onChange($event)" @onCancel="onCancel($event)"
                              displayFormat="h:mm a"
                              v-model="time"></Datetime>
                </vm-item>

                <vm-item>
                    <vm-label>hh:mm A (15 min steps)</vm-label>
                    <Datetime slot="item-right" displayFormat="h:mm A" minuteValues="0,15,30,45"></Datetime>
                </vm-item>

                <vm-item>
                    <vm-label>Leap years, summer months</vm-label>
                    <Datetime slot="item-right" displayFormat="MM/YYYY" pickerFormat="MMMM YYYY"
                              :yearValues="leapYearsArray"
                              monthValues="6,7,8"
                              v-model="leapYearsSummerMonths"></Datetime>
                </vm-item>

                <vm-item>
                    <vm-label>Specific days/months/years</vm-label>
                    <Datetime slot="item-right" monthValues="6,7,8" yearValues="2014,2015"
                              dayValues="01,02,03,04,05,06,08,09,10, 11, 12, 13, 14"
                              displayFormat="DD/MMM/YYYY" v-model="specificDaysMonthsYears"></Datetime>
                </vm-item>


                <p padding>
                    <code>myDate: {{myDate}}</code><br>
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
                    <vm-grid>
                        <vm-row justify-content-center>
                            <vm-button block @click="clearLeapYear()">Clear Leap Years</vm-button>
                        </vm-row>
                    </vm-grid>
                </p>

                <vm-item>
                    <vm-label>time now</vm-label>
                    <Datetime slot="item-right" displayFormat="MMM DD, YYYY HH:mm " v-model="convertedDate"></Datetime>
                </vm-item>

                <p padding>
                    <vm-grid>
                        <vm-row justify-content-center>
                            {{convertedDate}}
                        </vm-row>
                        <vm-row justify-content-center>
                            <vm-button block @click="convertDate()">Convert myDate To Date</vm-button>
                        </vm-row>
                    </vm-grid>
                </p>

                <vm-item>
                    <vm-label>HH:mm:ss</vm-label>
                    <Datetime slot="item-right" displayFormat="HH:mm:ss" v-model="time"></Datetime>
                </vm-item>

            </vm-list>
        </vm-content>
    </vm-page>
</template>
<style scoped lang="less">

</style>
<script type="text/javascript">
  export default{
    name: 'datetime',
    data () {
      return {
        myDate: new Date(),
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
        convertedDate: new Date(),
        specificDaysMonthsYears: '',
        leapYearsArray: [2020, 2016, 2008, 2004, 2000, 1996],
        customShortDay: [
          '周一',
          '周二',
          '周三',
          '周四',
          '周五',
          '周六',
          '周日'
        ]
      }
    },
    props: {},
    watch: {},
    computed: {},
    methods: {
      onChange (ev) {
        console.log('Changed', ev)
      },

      onCancel (ev) {
        console.log('Canceled', ev)
      },

      clearLeapYear () {
        this.leapYearsSummerMonths = null
      },
      convertDate () {
        this.convertedDate = new Date()
      }
    },
    created () {},
    mounted () {},
    activated () {},
    deactivate () {},
    components: {
    },
    destroyed () {}
  }
</script>

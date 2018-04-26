<template>
    <Page>
        <Header>
            <Navbar>
                <Title :title="$t('title')"></Title>
            </Navbar>
        </Header>
        <Content class="outer-content">
            <List>
                <ListHeader>Demo</ListHeader>
                <Item>
                    <Label color="primary">{{$t('shortText')}}</Label>
                    <Input type="text"
                           clear-input
                           :regex=regex
                           @onKeyup.enter="submit"
                           @onBlur="onBlurtHandler"
                           @onFocus="onFocusHandler"
                           @onInput="onInputHandler"
                           @onValid="onValidHandler"
                           @onInvalid="onInvalidHandler"
                           :placeholder="$t('placeholder')"></Input>
                </Item>
                <Item>
                    <Label fixed slot="item-left">{{$t('verif')}}</Label>
                    <p>{{regex.toString()}}</p>
                </Item>
            </List>
            <p class="event__p">
                <strong>{{$t('trigger')}}:</strong>
            </p>
            <ul class="event__ul">
                <li class="event__li" v-for="(item,index) in eventListDisplay.reverse()" :key="index">
                    <span>{{item.time}}</span>
                    <span text-uppercase class="eventType" :class="item.eventType">{{item.eventType}}</span>
                    <span>{{item.msg}}</span>
                </li>
                <li v-if="eventListDisplay.length === 0">{{$t('empty')}}</li>
            </ul>
        </Content>
    </Page>
</template>
<script type="text/javascript">
  export default {
    name: 'InputEventDemo',
    i18n: {
      messages: {
        'zh-CN': {
          title: '输入事件',
          shortText: '短文本',
          verif: '验证条件',
          trigger: '触发记录',
          empty: '空',
          placeholder: "'XX-XX-XXX' 数字格式",
        },
        'en-US': {
          title: 'Event',
          shortText: 'Short text',
          verif: 'Conditions',
          trigger: 'Trigger record',
          empty: 'empty',
          placeholder: "'XX-XX-XXX' format number",
        }
      }
    },
    data () {
      return {
        regex: /\d{2}-\d{2}-\d{3}/,
        eventList: []
      }
    },
    computed: {
      eventListDisplay () {
        let list = JSON.parse(JSON.stringify(this.eventList))
        return list.splice(-15)
      }
    },
    methods: {
      submit () {
        this.eventList.push({
          time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
          eventType: 'enter',
          msg: ''
        })
      },
      onBlurtHandler () {
        this.eventList.push({
          time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
          eventType: 'blur',
          msg: ''
        })
      },
      onFocusHandler () {
        this.eventList.push({
          time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
          eventType: 'focus',
          msg: ''
        })
      },
      onInputHandler (value) {
        this.eventList.push({
          time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
          eventType: 'input',
          msg: value
        })
      },
      onValidHandler (value, type) {
        this.eventList.push({
          time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
          eventType: 'valid',
          msg: `type: ${type} - value: ${value}`
        })
      },
      onInvalidHandler (value, type) {
        this.eventList.push({
          time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
          eventType: 'invalid',
          msg: `type: ${type} - value: ${value}`
        })
      }
    }
  }
</script>
<style scoped lang="scss">
    .event__p {
        padding-left: 40px;
    }

    .event__ul {
        padding-left: 40px;
        .event__li {
            margin-bottom: 5px;
            .eventType {
                padding: 2px 5px;
                border-radius: 2px;
                background: #ddd;
                display: inline-block;
            }

            .blur {
                background: #ddd6ff;

            }

            .focus {
                background: #29a0fd;
            }

            .input {
                background: #ccb020;
            }

            .valid {
                background: #58ea66;
            }

            .invalid {
                background: #d61652;
            }
        }
    }


</style>

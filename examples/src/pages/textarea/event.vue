<template>
    <Page>
        <Header>
            <Navbar>
                <Title>Event</Title>
            </Navbar>
        </Header>
        <Content class="outer-content">
            <List>
                <ListHeader>
                    <span>事件测试</span>
                </ListHeader>
                <Item>
                    <Label color="primary">短文本</Label>
                    <Textarea @onKeyup.enter="submit"
                              autosize
                              @onBlur="onBlurtHandler"
                              @onFocus="onFocusHandler"
                              @onInput="onInputHandler"
                              placeholder="请输入..."></Textarea>
                </Item>
            </List>
            <p class="event__p">
                <strong>触发记录:</strong>
            </p>
            <ul class="event__ul">
                <li class="event__li" v-for="(item,index) in eventListDisplay.reverse()" :key="index">
                    <span>{{item.time}}</span>
                    <span text-uppercase class="eventType" :class="item.eventType">{{item.eventType}}</span>
                    <span>{{item.msg}}</span>
                </li>
                <li v-if="eventListDisplay.length === 0">空</li>
            </ul>
        </Content>
    </Page>
</template>
<script type="text/javascript">
  export default {
    name: 'TextareaEventDemo',
    data () {
      return {
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
      submit ($event) {
        this.eventList.push({
          time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
          eventType: 'enter',
          msg: $event
        })
      },
      onBlurtHandler ($event) {
        this.eventList.push({
          time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
          eventType: 'blur',
          msg: $event
        })
      },
      onFocusHandler ($event) {
        this.eventList.push({
          time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
          eventType: 'focus',
          msg: $event
        })
      },
      onInputHandler ($event) {
        this.eventList.push({
          time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
          eventType: 'input',
          msg: $event
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
<style scoped lang="less">
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

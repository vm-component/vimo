<template>
  <section class="logBox" :class="{'active':isActive}">
    <article ref="listBox" class="logBox__article">
      <section class="recordList">
        <!--each start-->
        <div class="recordItem" v-for="item in reComputeRecordList" :class="[setTypeClass(item.type)]">
          <div class="recordItem__count">
            <span v-if="parseInt(item.count)>99">99+</span>
            <span v-else>{{item.count}}</span>
          </div>
          <div class="recordItem__info">
            <div class="recordItem__info--names">
              <span class="type">{{item.type}}</span>
              <i v-if="!!item.name" class="name">{{item.name}}</i>
              <i v-if="!!item.time" class="time">- {{new Date(item.time).Format('yyyy/MM/dd hh:mm:ss')}}</i>
            </div>
            <div class="recordItem__info--position" v-if="!!item.script">
              <span class="name">Position:</span>
              <i v-if="!!item.script" class="script">{{item.script}}</i>
              <i v-if="!!item.line" class="line">-{{item.line}}</i>
            </div>
            <div class="recordItem__info--message">
              {{item.message}}
            </div>
            <div class="recordItem__info--stack">
              {{item.stack}}
            </div>
          </div>
        </div>
        <!--each end-->
      </section>
    </article>
    <footer class="logBox__footer">
      <div class="logBox__footer--buttons left">
        <button :class="{'active':selectType==='all'}" class="all" @click="segmentClick('all')">all</button>
        <button :class="{'active':selectType==='log'}" class="log" @click="segmentClick('log')">LOG</button>
        <button :class="{'active':selectType==='debug'}" class="debug" @click="segmentClick('debug')">DEBUG</button>
        <button :class="{'active':selectType==='warn'}" class="warn" @click="segmentClick('warn')">WARN</button>
        <button :class="{'active':selectType==='error'}" class="error" @click="segmentClick('error')">ERROR</button>
        <button :class="{'active':selectType==='assert'}" class="assert" @click="segmentClick('assert')">ASSERT</button>
      </div>
      <div class="logBox__footer--buttons right">
        <button class="close" @click="close()">close</button>
      </div>
    </footer>
    <aside class="logBox__aside" @click="open()">
      <span>open</span>
      <span>logs</span>
    </aside>
  </section>
</template>
<style scoped lang="scss">
  /** {*/
    /*!*outline: 1px solid #ddd;*!*/
  /*}*/

  $log: #05b300;
  $debug: #36a8ee;
  $warn: #ee03e6;
  $error: #ff0000;
  $assert: #ffb019;

  .logBox {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
    color: #d5d5d5;
    z-index: 99999;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    font-size: 12px;
    transform: translateX(-100%);
    transition: all ease 200ms;
    &.active{
      transform: translateX(0);
    }
    .logBox__footer {
      flex: 0 1 46px;
      height: 46px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 2px;
      color: #fff;
      .logBox__footer--buttons {
        height: 80%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        button {
          margin: 0 1px;
          flex: 1;
          height: 100%;
          text-transform: uppercase;
          background-color: transparent;
          border: 0;
          outline: none;
          color: #fff;
          padding: 0 4px;
          box-sizing: border-box;
          transition: all ease 200ms;
          font-size: 12px;
          &.all {
            border: 1px solid #fff;
            color: #fff;
            border-radius: 2px;
          }
          &.all.active {
            border: 1px solid #fff;
            background-color: #fff;
            color: #000;
            border-radius: 2px;
          }

          &.log {
            border: 1px solid $log;
            color: $log;
            border-radius: 2px;
          }
          &.log.active {
            border: 1px solid $log;
            background-color: $log;
            color: #fff;
            border-radius: 2px;
          }

          &.debug {
            border: 1px solid $debug;
            color: $debug;
            border-radius: 2px;
          }
          &.debug.active {
            border: 1px solid $debug;
            background-color: $debug;
            color: #fff;
            border-radius: 2px;
          }

          &.warn {
            border: 1px solid $warn;
            color: $warn;
            border-radius: 2px;
          }
          &.warn.active {
            border: 1px solid $warn;
            background-color: $warn;
            color: #fff;
            border-radius: 2px;
          }

          &.error {
            border: 1px solid $error;
            color: $error;
            border-radius: 2px;
          }
          &.error.active {
            border: 1px solid $error;
            background-color: $error;
            color: #fff;
            border-radius: 2px;
          }

          &.assert {
            border: 1px solid $assert;
            color: $assert;
            border-radius: 2px;
          }
          &.assert.active {
            border: 1px solid $assert;
            background-color: $assert;
            color: #fff;
            border-radius: 2px;
          }

        }
      }
    }
    .logBox__article {
      flex: 1;
      overflow: scroll;
      width: 100%;
      -webkit-overflow-scrolling: touch;
      .recordList {
        padding-top: 5px;
        .recordItem {
          padding: 5px;
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          &.log {
            .recordItem__info--names {
              .type {
                background-color: $log;
              }
              .name {
                color: $log;
              }
            }
          }
          &.debug {
            .recordItem__info--names {
              .type {
                background-color: $debug;
              }
              .name {
                color: $debug;
              }
            }
          }
          &.warn {
            .recordItem__info--names {
              .type {
                background-color: $warn;
              }
              .name {
                color: $warn;
              }
            }
          }
          &.error {
            .recordItem__info--names {
              .type {
                background-color: $error;
              }
              .name {
                color: $error;
              }
            }
          }
          &.assert {
            .recordItem__info--names {
              .type {
                background-color: $assert;
              }
              .name {
                color: $assert;
              }
            }
          }
          .recordItem__count {
            flex: 0 0 25px;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .recordItem__info {
            flex: 1;
            padding: 0 2px;
            .recordItem__info--names {
              color: #fff;
              .type {
                font-weight: bold;
                text-transform: uppercase;
                border-radius: 2px;
                padding: 0 2px;
              }
              .name {
                font-weight: bold;
              }
              .time {
              }
            }
            .recordItem__info--position {
              color: #fff;
              .name {
                text-transform: uppercase;
                font-weight: bold;
              }
            }
            .recordItem__info--message {
              font-size: 12px;
            }
            .recordItem__info--stack {
              font-size: 12px;
            }
          }
        }
      }
    }
    .logBox__aside{
      position: absolute;
      bottom:0;
      right: 0;
      transform: translateX(100%);
      height: 46px;
      width: 46px;
      box-sizing: border-box;
      background:rgba(0,0,0,0.8);
      text-transform: uppercase;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      line-height: 130%;
      flex-direction: column;
      cursor: pointer;
    }
  }
</style>
<script type="text/ecmascript-6">
  export default{
    name: 'logbox',
    data(){
      return {
        isActive:false, // 是否打开
        selectType: 'all', // 默认选中全部
        listBox: null, // 列表盒子的dom
        recordList:[],
        // recordList: [
        //   {
        //     message: '这个是log信息这个是log信息这个是log信息这个是log信息这个是log信息这个是log信息这个是log信息这个是log信息这个是log信息这个是log信息这个是log信息这个是log信息这个是log信息这个是log信息这个是log信息这个是log信息这个是log信息这个是log信息这个是log信息这个是log信息这个是log信息这个是log信息这个是log信息这个是log信息这个是log信息这个是log信息这个是log信息这个是log信息',                // The error message
        //     count: 99,
        //     type: 'log',
        //     name: '',
        //     time: (new Date()).getTime(),
        //     script: '',
        //     stack: '',
        //     line: '',
        //   },
        //   {
        //     message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.' +
        //     ' Assumenda autem debitis dicta dolor exercitationem expedita fugit' +
        //     ' harum id incidunt ipsum obcaecati, pariatur placeat, possimus quas' +
        //     ' quis ratione sapiente vero. Eveniet!',                // The error message
        //     count: 12,
        //     type: 'debug',
        //     name: '',
        //     time: (new Date()).getTime(),
        //     script: './test.js::<Function>testMethod',
        //     stack: '',
        //     line: '123',
        //   },
        //   {
        //     message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.' +
        //     ' Assumenda autem debitis dicta dolor exercitationem expedita fugit' +
        //     ' harum id incidunt ipsum obcaecati, pariatur placeat, possimus quas' +
        //     ' quis ratione sapiente vero. Eveniet!',                // The error message
        //     count: 23,
        //     type: 'warn',
        //     name: '',
        //     time: (new Date()).getTime(),
        //     script: './test.js::<Function>testMethod',
        //     stack: '',
        //     line: '123',
        //   },
        //   {
        //     message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.' +
        //     ' Assumenda autem debitis dicta dolor exercitationem expedita fugit' +
        //     ' harum id incidunt ipsum obcaecati, pariatur placeat, possimus quas' +
        //     ' quis ratione sapiente vero. Eveniet!',                // The error message
        //     count: 1,
        //     type: 'error',
        //     name: '',
        //     time: (new Date()).getTime(),
        //     script: './test.js::<Function>testMethod',
        //     stack: '',
        //     line: '123',
        //   },
        //   {
        //     message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.' +
        //     ' Assumenda autem debitis dicta dolor exercitationem expedita fugit' +
        //     ' harum id incidunt ipsum obcaecati, pariatur placeat, possimus quas' +
        //     ' quis ratione sapiente vero. Eveniet!',                // The error message
        //     count: 1,
        //     type: 'assert',
        //     name: '',
        //     time: (new Date()).getTime(),
        //     script: './test.js::<Function>testMethod',
        //     stack: '',
        //     line: '123',
        //   },
        //   {
        //     message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.' +
        //     ' Assumenda autem debitis dicta dolor exercitationem expedita fugit' +
        //     ' harum id incidunt ipsum obcaecati, pariatur placeat, possimus quas' +
        //     ' quis ratione sapiente vero. Eveniet!',                // The error message
        //     count: 1,
        //     type: 'error',
        //     name: 'SyntaxError',
        //     time: (new Date()).getTime(),
        //     script: './test.js::<Function>testMethod',
        //     stack: '',
        //     line: '123',
        //   },
        // ]
      }
    },
    computed: {
      reComputeRecordList(){
        return this.recordList.filter((item) => {
          this.scrollBottom();
          if (this.selectType === 'all') {
            return true
          }
          return item.type === this.selectType.toLowerCase();
        })
      }
    },
    methods: {

      /**
       * 打开盒子
       * */
      open(){
        this.isActive = true;
      },

      /**
       * 关闭盒子
       * */
      close(){
        this.isActive = false;
      },

      /**
       * 设置记录列表
       * */
      setRecordList(list){
        this.recordList = list
      },

      /**
       * @private
       * 点击segment按钮切换不同type
       * @param {string} type - all表示全部
       * */
      segmentClick(type){
        if (!!type) {
          this.selectType = type.toString().toLowerCase();
        } else {
          this.selectType = 'all';
        }
      },

      /**
       * @private
       * 获取类型的颜色Class
       * @param {string} type - 类型
       * */
      setTypeClass(type){
        if (!!type) {
          return type.toString().toLowerCase()
        } else {
          return 'error'
        }
      },

      /**
       * @private
       * 滚动到底部, 不需要动画
       * 执行需要等待DOM更新为完毕
       * */
      scrollBottom(){
        this.$nextTick(() => {
          if (!!this.listBox) {
            this.listBox.scrollTop = this.listBox.scrollHeight
          }
        })
      },

    },
    mounted () {
      // 获取滚动的box
      this.listBox = this.$refs.listBox;
    },
  }
  // Date Format
  Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
      "M+": this.getMonth() + 1, //月份
      "d+": this.getDate(), //日
      "h+": this.getHours(), //小时
      "m+": this.getMinutes(), //分
      "s+": this.getSeconds(), //秒
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }
</script>

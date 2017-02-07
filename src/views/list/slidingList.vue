<template>
  <ion-page>
    <ion-header>
      <ion-navbar>
        <ion-title slot="content">SlidingList</ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-list-header>
          SlidingList Demo
        </ion-list-header>
        <ion-item-sliding>
          <ion-item>
            <ion-avatar item-left slot="item-left">
              <img src="http://placehold.it/36x36">
            </ion-avatar>
            <h2>两边都有按钮</h2>
            <p>试试 ↔️️ 都滑动</p>
          </ion-item>
          <ion-item-options side="left">
            <ion-button ion-button color="primary" @click="clickText">
              <ion-icon name="text"></ion-icon>
              Text
            </ion-button>
            <ion-button ion-button color="secondary" @click="clickCall">
              <ion-icon name="call"></ion-icon>
              Call
            </ion-button>
          </ion-item-options>
          <ion-item-options side="right">
            <ion-button ion-button color="primary" @click="clickEmail">
              <ion-icon name="mail"></ion-icon>
              Email
            </ion-button>
          </ion-item-options>
        </ion-item-sliding>
        <ion-item-sliding>
          <ion-item>
            <ion-avatar item-left slot="item-left">
              <img src="http://placehold.it/36x36">
            </ion-avatar>
            <h2>按钮在右边</h2>
            <p>⬅️ 滑动出现按钮</p>
          </ion-item>
          <ion-item-options side="right">
            <ion-button ion-button color="primary" @click="clickEmail">
              <ion-icon name="mail"></ion-icon>
              Email
            </ion-button>
          </ion-item-options>
        </ion-item-sliding>
        <ion-item-sliding>
          <ion-item>
            <ion-avatar item-left slot="item-left">
              <img src="http://placehold.it/36x36">
            </ion-avatar>
            <h2>按钮在左边</h2>
            <p>➡️ 滑动出现按钮</p>
          </ion-item>
          <ion-item-options side="left">
            <ion-button ion-button color="primary" @click="clickText">
              <ion-icon name="text"></ion-icon>
              Text
            </ion-button>
            <ion-button ion-button color="secondary" @click="clickCall">
              <ion-icon name="call"></ion-icon>
              Call
            </ion-button>
          </ion-item-options>
        </ion-item-sliding>

        <ion-item-sliding>
          <ion-item>
            <ion-avatar item-left slot="item-left">
              <img src="http://placehold.it/36x36">
            </ion-avatar>
            <h2>按钮在右边</h2>
            <p>⬅️ 滑动出现按钮，再滑动则执行</p>
          </ion-item>

          <ion-item-options side="right">
            <ion-button expandable ion-button color="danger" @click="clickDelete">
              <ion-icon name="trash"></ion-icon>
              Delete
            </ion-button>
          </ion-item-options>
        </ion-item-sliding>


        <ion-item-sliding>
          <ion-item>
            <ion-avatar item-left slot="item-left">
              <img src="http://placehold.it/36x36">
            </ion-avatar>
            <h2>Icon在左边的</h2>
            <p>⬅️ 滑动出现按钮</p>
          </ion-item>

          <ion-item-options side="right" icon-left>
            <ion-button ion-button color="danger" @click="clickDelete">
              <ion-icon name="trash"></ion-icon>
              Delete
            </ion-button>
          </ion-item-options>
        </ion-item-sliding>


        <ion-item-sliding
          @ionDrag="slidingDrag"
          @ionSwipeLeft="slidingDragLeft"
          @ionSwipeRight="slidingDragRight"
          @ionSwipe="slidingSwipe">
          <ion-item>
            <ion-avatar item-left slot="item-left">
              <img src="http://placehold.it/36x36">
            </ion-avatar>
            <h2>事件监听</h2>
            <p>↔️ 滑动出现按钮</p>
          </ion-item>
          <ion-item-options side="left">
            <ion-button expandable ion-button color="danger" @click="clickDelete">
              <ion-icon name="trash"></ion-icon>
              Delete
            </ion-button>
          </ion-item-options>
          <ion-item-options side="right">
            <ion-button ion-button color="danger" @click="clickDelete">
              <ion-icon name="trash"></ion-icon>
              Delete
            </ion-button>
          </ion-item-options>
        </ion-item-sliding>


      </ion-list>
    </ion-content>
  </ion-page>
</template>
<style lang="scss">

</style>
<script type="text/ecmascript-6">
  import mixin from '../../mixins/baseMethodMixin'
  export default{
    mixins: [mixin],
    data(){
      return {}
    },
    watch: {},
    computed: {},
    methods: {
      clickText(){
        alert('clickText')
      },
      clickCall(){
        alert('clickCall')
      },
      clickEmail(){
        alert('clickEmail')
      },
      clickDelete(){
        alert('clickDelete')
      },
      // 事件监听
      slidingDrag(ins){
        console.log('正在拖动，但不知道方向')
      },
      slidingSwipe(ins){
        console.debug('触发了滑动的最大限度值，但不知道左右')
      },
      slidingDragLeft(ins){
        console.debug('slidingDragLeft：向左滑动超过了swiper阈值');
      },
      slidingDragRight(ins){
        console.debug('slidingDragRight：向右滑动超过了swiper阈值，出发后会执行自动关闭')
        alert('已删除')
        ins.close();
      },
    },
    created() {},
    mounted () {},
    activated () {},
    components: {}
  }
</script>

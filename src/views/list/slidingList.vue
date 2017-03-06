<template>
  <Page>
    <Header>
      <Navbar>
        <Title>SlidingList</Title>
      </Navbar>
    </Header>
    <Content>
      <List>
        <ListHeader>
          SlidingList Demo
        </ListHeader>
        <ItemSliding>
          <Item>
            <Avatar slot="item-left">
              <img src="http://placehold.it/36x36">
            </Avatar>
            <h2>两边都有按钮</h2>
            <p>试试 ↔️️ 都滑动</p>
          </Item>
          <ItemOptions side="left">
            <Button ion-button color="primary" @click="clickText">
              <Icon name="text"></Icon>
              Text
            </Button>
            <Button ion-button color="secondary" @click="clickCall">
              <Icon name="call"></Icon>
              Call
            </Button>
          </ItemOptions>
          <ItemOptions side="right">
            <Button ion-button color="primary" @click="clickEmail">
              <Icon name="mail"></Icon>
              Email
            </Button>
          </ItemOptions>
        </ItemSliding>
        <ItemSliding>
          <Item>
            <Avatar slot="item-left">
              <img src="http://placehold.it/36x36">
            </Avatar>
            <h2>按钮在右边</h2>
            <p>⬅️ 滑动出现按钮</p>
          </Item>
          <ItemOptions side="right">
            <Button ion-button color="primary" @click="clickEmail">
              <Icon name="mail"></Icon>
              Email
            </Button>
          </ItemOptions>
        </ItemSliding>
        <ItemSliding>
          <Item>
            <Avatar slot="item-left">
              <img src="http://placehold.it/36x36">
            </Avatar>
            <h2>按钮在左边</h2>
            <p>➡️ 滑动出现按钮</p>
          </Item>
          <ItemOptions side="left">
            <Button ion-button color="primary" @click="clickText">
              <Icon name="text"></Icon>
              Text
            </Button>
            <Button ion-button color="secondary" @click="clickCall">
              <Icon name="call"></Icon>
              Call
            </Button>
          </ItemOptions>
        </ItemSliding>

        <ItemSliding>
          <Item>
            <Avatar slot="item-left">
              <img src="http://placehold.it/36x36">
            </Avatar>
            <h2>按钮在右边</h2>
            <p>⬅️ 滑动出现按钮，再滑动则执行</p>
          </Item>

          <ItemOptions side="right">
            <Button expandable ion-button color="danger" @click="clickDelete">
              <Icon name="trash"></Icon>
              Delete
            </Button>
          </ItemOptions>
        </ItemSliding>
        <ItemSliding>
          <Item>
            <Avatar slot="item-left">
              <img src="http://placehold.it/36x36">
            </Avatar>
            <h2>按钮在右边</h2>
            <p>⬅️ 滑动出现按钮，再滑动则执行</p>
          </Item>

          <ItemOptions side="right">
            <Button expandable ion-button color="danger" @click="clickDelete">
              <Icon name="trash"></Icon>
              Delete
            </Button>
          </ItemOptions>
        </ItemSliding>
        <ItemSliding>
          <Item>
            <Avatar slot="item-left">
              <img src="http://placehold.it/36x36">
            </Avatar>
            <h2>按钮在右边</h2>
            <p>⬅️ 滑动出现按钮，再滑动则执行</p>
          </Item>

          <ItemOptions side="right">
            <Button expandable ion-button color="danger" @click="clickDelete">
              <Icon name="trash"></Icon>
              Delete
            </Button>
          </ItemOptions>
        </ItemSliding>
        <ItemSliding>
          <Item>
            <Avatar slot="item-left">
              <img src="http://placehold.it/36x36">
            </Avatar>
            <h2>按钮在右边</h2>
            <p>⬅️ 滑动出现按钮，再滑动则执行</p>
          </Item>

          <ItemOptions side="right">
            <Button expandable ion-button color="danger" @click="clickDelete">
              <Icon name="trash"></Icon>
              Delete
            </Button>
          </ItemOptions>
        </ItemSliding>

        <ItemSliding>
          <Item>
            <Avatar slot="item-left">
              <img src="http://placehold.it/36x36">
            </Avatar>
            <h2>Icon在左边的</h2>
            <p>⬅️ 滑动出现按钮</p>
          </Item>

          <ItemOptions side="right" icon-left>
            <Button ion-button color="danger" @click="clickDelete">
              <Icon name="trash"></Icon>
              Delete
            </Button>
          </ItemOptions>
        </ItemSliding>


        <ItemSliding
          @ionDrag="slidingDrag"
          @ionSwipeLeft="slidingDragLeft"
          @ionSwipeRight="slidingDragRight"
          @ionSwipe="slidingSwipe">
          <Item>
            <Avatar slot="item-left">
              <img src="http://placehold.it/36x36">
            </Avatar>
            <h2>事件监听</h2>
            <p>↔️ 滑动出现按钮</p>
          </Item>
          <ItemOptions side="left">
            <Button expandable ion-button color="danger" @click="clickDelete">
              <Icon name="trash"></Icon>
              Delete
            </Button>
          </ItemOptions>
          <ItemOptions side="right">
            <Button ion-button color="danger" @click="clickDelete">
              <Icon name="trash"></Icon>
              Delete
            </Button>
          </ItemOptions>
        </ItemSliding>


      </List>
    </Content>
  </Page>
</template>
<style lang="scss">

</style>
<script type="text/ecmascript-6">
  export default{
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

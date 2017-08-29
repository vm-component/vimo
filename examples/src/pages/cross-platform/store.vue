<template>
    <Page>
        <Header>
            <Navbar>
                <Title>存储</Title>
            </Navbar>
        </Header>
        <Content padding class="outer-content">
            <h4>设备</h4>
            <section>
                <strong>设置存储信息</strong>
                <Item no-lines class="item">
                    <Label slot="item-left">Key/Value: </Label>
                    <Input placeholder="key/value用空格分割" type="text" v-model="keyValue" clearInput></Input>
                </Item>
                <Button block @click="setItem()">SetItem</Button>
                <strong>结果</strong>
                <p class="result">{{setItemResult}}</p>
            </section>
            <section>
                <strong>获取存储信息</strong>
                <Item no-lines class="item">
                    <Label slot="item-left">Key: </Label>
                    <Input placeholder="key" type="text" v-model="getKey" clearInput></Input>
                </Item>
                <Button block @click="getItem()">GetItem</Button>
                <strong>结果</strong>
                <p class="result">{{getItemResult}}</p>
            </section>
            <section>
                <strong>删除相应存储信息</strong>
                <Item no-lines class="item">
                    <Label slot="item-left">Key: </Label>
                    <Input placeholder="key" type="text" v-model="deleteKey" clearInput></Input>
                </Item>
                <Button block @click="removeItem()">RmoveItem</Button>
                <strong>结果</strong>
                <p class="result">{{removeItemResult}}</p>
            </section>
        </Content>
    </Page>
</template>
<script type="text/javascript">
  export default {
    name: 'Store',
    data () {
      return {
        keyValue: '',
        setItemResult: '',
        getKey: '',
        getItemResult: '',
        deleteKey: '',
        removeItemResult: '',

        last: ''
      }
    },
    methods: {
      setItem () {
        const _this = this
        let keyValue = _this.keyValue.split(' ')
        window.dd && window.dd.util.domainStorage.setItem({
          name: keyValue[0], // 存储信息的key值
          value: keyValue[1], // 存储信息的Value值
          onSuccess (result) {
            _this.setItemResult = `onSuccess: ${JSON.stringify(result)}`
          },
          onFail (err) {
            _this.setItemResult = `onFail: ${JSON.stringify(err)}`
          }
        })
      },
      getItem () {
        const _this = this
        window.dd && window.dd.util.domainStorage.getItem({
          name: _this.getKey, // 存储信息的key值
          onSuccess (result) {
            _this.getItemResult = `onSuccess: ${JSON.stringify(result)}`
          },
          onFail (err) {
            _this.getItemResult = `onFail: ${JSON.stringify(err)}`
          }
        })
      },
      removeItem () {
        const _this = this
        window.dd && window.dd.util.domainStorage.removeItem({
          name: _this.deleteKey, // 存储信息的key值
          onSuccess (result) {
            _this.removeItemResult = `onSuccess: ${JSON.stringify(result)}`
          },
          onFail (err) {
            _this.removeItemResult = `onFail: ${JSON.stringify(err)}`
          }
        })
      }
    }
  }
</script>
<style scoped lang="less">
    .result {
        border: 1px dashed #333;
        min-height: 20px;
        border-radius: 3px;
        overflow-y: scroll;
        white-space: pre-line;
        margin: 0 0 20px;
    }

    .item {
        margin: 5px 0;
    }
</style>

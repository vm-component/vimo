<template>
    <Page>
        <Header>
            <Navbar>
                <Title>图片相关</Title>
            </Navbar>
        </Header>
        <Content padding class="outer-content">
            <h4>图片相关</h4>
            <section>
                <strong>上传图片</strong>
                <br>
                <small>成功上传之后回调onSuccess方法，返回alicdn上的图片链接</small>
                <Item no-lines class="item">
                    <Label slot="item-left">多选: </Label>
                    <Toggle slot="item-right" v-model="uploadImageMulti"></Toggle>
                </Item>
                <Item no-lines class="item">
                    <Label slot="item-left">最多可选个数: </Label>
                    <Input placeholder="..." type="number" v-model="uploadImageMax"
                           clearInput></Input>
                </Item>
                <Button block @click="uploadImage()">UploadImage</Button>
                <strong>结果</strong>
                <p class="result">{{uploadImageResult}}</p>
            </section>
            <section>
                <strong>上传图片（仅支持拍照上传）</strong>
                <br>
                <small>成功上传之后回调onSuccess方法，返回alicdn上的图片链接</small>
                <Item no-lines class="item">
                    <Label slot="item-left">是否压缩: </Label>
                    <Toggle slot="item-right" v-model="uploadImageFromCameraCompression"></Toggle>
                </Item>
                <Button block @click="uploadImageFromCamera()">UploadImageFromCamera</Button>
                <strong>结果</strong>
                <p class="result">{{uploadImageFromCameraResult}}</p>
            </section>
            <section>
                <strong>图片浏览器</strong>
                <Button block @click="previewImage">PreviewImage</Button>
                <strong>结果</strong>
                <p class="result">{{previewImageResult}}</p>
            </section>

        </Content>
    </Page>
</template>
<script type="text/javascript">
  export default {
    name: 'Image',
    data () {
      return {
        uploadImageResult: '',
        uploadImageMulti: false,
        uploadImageMax: 3,

        uploadImageFromCameraResult: '',
        uploadImageFromCameraCompression: true,

        previewImageResult: '',
        last: ''
      }
    },
    methods: {
      uploadImage () {
        const _this = this
        window.dd && window.dd.biz.util.uploadImage({
          multiple: _this.uploadImageMulti, //是否多选，默认false
          max: _this.uploadImageMax, //最多可选个数
          onSuccess (result) {
            _this.uploadImageResult = `onSuccess: ${JSON.stringify(result)}`
          },
          onFail (err) {
            _this.uploadImageResult = `onFail: ${JSON.stringify(err)}`
          }
        })
      },
      uploadImageFromCamera () {
        const _this = this
        window.dd && window.dd.biz.util.uploadImageFromCamera({
          compression: _this.uploadImageFromCameraCompression,//(是否压缩，默认为true)
          onSuccess (result) {
            _this.uploadImageResult = `onSuccess: ${JSON.stringify(result)}`
          },
          onFail (err) {
            _this.uploadImageResult = `onFail: ${JSON.stringify(err)}`
          }
        })
      },
      previewImage () {
        const _this = this
        window.dd && window.dd.biz.util.previewImage({
          urls: [
            'https://img.alicdn.com/tps/TB1sXGYIFXXXXc5XpXXXXXXXXXX.jpg',
            'https://img.alicdn.com/tps/TB1pfG4IFXXXXc6XXXXXXXXXXXX.jpg',
            'https://img.alicdn.com/tps/TB1h9xxIFXXXXbKXXXXXXXXXXXX.jpg'
          ],//图片地址列表
          current: 'https://img.alicdn.com/tps/TB1sXGYIFXXXXc5XpXXXXXXXXXX.jpg',//当前显示的图片链接
          onSuccess (result) {
            _this.previewImageResult = `onSuccess: ${JSON.stringify(result)}`
          },
          onFail (err) {
            _this.previewImageResult = `onSuccess: ${JSON.stringify(err)}`
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
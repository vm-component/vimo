<template>
    <Page>
        <Header>
            <Navbar>
                <Title>音频相关</Title>
            </Navbar>
        </Header>
        <Content padding class="outer-content">
            <section class="fixedTop" slot="fixedTop">
                <section class="fixedTopInner">
                    <strong>当前声音文件信息:</strong>
                    <br>
                    <p>
                        <small><strong>mediaId: </strong>{{mediaId}}</small>
                    </p>
                    <p>
                        <small><strong>duration: </strong>{{duration}}</small>
                    </p>
                    <p>
                        <small><strong>localAudioId: </strong>{{localAudioId}}</small>
                    </p>
                </section>
            </section>

            <h4>音频相关</h4>
            <section>
                <strong>开始录音(最长为60秒)</strong>
                <Button block @click="startRecord()">startRecord</Button>
                <strong>结果</strong>
                <p class="result">{{startRecordResult}}</p>
            </section>
            <section>
                <strong>停止录音</strong>
                <Button block @click="stopRecord()">stopRecord</Button>
                <strong>结果</strong>
                <p class="result">{{stopRecordResult}}</p>
            </section>
            <section>
                <strong>监听录音自动停止</strong>
                <Button block @click="onRecordEnd()">onRecordEnd</Button>
                <strong>结果</strong>
                <p class="result">{{onRecordEndResult}}</p>
            </section>
            <section>
                <strong>下载音频</strong>
                <Button block @click="download()">download</Button>
                <strong>结果</strong>
                <p class="result">{{downloadResult}}</p>
            </section>
            <section>
                <strong>播放语音</strong>
                <Button block @click="play()">play</Button>
                <strong>结果</strong>
                <p class="result">{{playResult}}</p>
            </section>
            <section>
                <strong>暂停播放语音</strong>
                <Button block @click="pause()">pause</Button>
                <strong>结果</strong>
                <p class="result">{{pauseResult}}</p>
            </section>
            <section>
                <strong>恢复暂停播放的语音</strong>
                <Button block @click="resume()">resume</Button>
                <strong>结果</strong>
                <p class="result">{{resumeResult}}</p>
            </section>
            <section>
                <strong>停止播放语音</strong>
                <Button block @click="stop()">stop</Button>
                <strong>结果</strong>
                <p class="result">{{stopResult}}</p>
            </section>
            <section>
                <strong>监听播放自动停止</strong>
                <Button block @click="onPlayEnd()">onPlayEnd</Button>
                <strong>结果</strong>
                <p class="result">{{onPlayEndResult}}</p>
            </section>
            <section>
                <strong>语音转文字接口</strong>
                <Button block @click="translateVoice()">translateVoice</Button>
                <strong>结果</strong>
                <p class="result">{{translateVoiceResult}}</p>
            </section>
        </Content>
    </Page>
</template>
<script type="text/javascript">
  export default {
    name: 'Audio',
    data () {
      return {
        // common
        mediaId: 'null',
        duration: 'null',
        localAudioId: 'null',

        startRecordResult: '',
        stopRecordResult: '',
        onRecordEndResult: '',
        downloadResult: '',
        playResult: '',
        pauseResult: '',
        resumeResult: '',
        stopResult: '',
        onPlayEndResult: '',
        translateVoiceResult: '',

        last: ''
      }
    },
    methods: {
      startRecord () {
        const _this = this
        window.dd && window.dd.device.audio.startRecord({
          onSuccess (data) {
            _this.startRecordResult = `onSuccess: ${JSON.stringify(data)}`
          },
          onFail (err) {
            _this.startRecordResult = `onFail: ${JSON.stringify(err)}`
          }
        })
      },
      stopRecord () {
        const _this = this
        window.dd && window.dd.device.audio.stopRecord({
          onSuccess (data) {
            _this.mediaId = data.mediaId // 返回音频的MediaID，可用于本地播放和音频下载
            _this.duration = data.duration // 返回音频的时长，单位：秒
            _this.stopRecordResult = `onSuccess: ${JSON.stringify(data)}`
          },
          onFail (err) {
            _this.stopRecordResult = `onFail: ${JSON.stringify(err)}`
          }
        })
      },
      onRecordEnd () {
        const _this = this
        window.dd && window.dd.device.audio.onRecordEnd({
          onSuccess (data) {
            _this.mediaId = data.mediaId // 返回音频的MediaID，可用于本地播放和音频下载
            _this.duration = data.duration // 返回音频的时长，单位：秒
            _this.onRecordEndResult = `onSuccess: ${JSON.stringify(data)}`
          },
          onFail (err) {
            _this.onRecordEndResult = `onFail: ${JSON.stringify(err)}`
          }
        })
      },
      download () {
        const _this = this
        window.dd && window.dd.device.audio.onRecordEnd({
          mediaId: _this.mediaId,
          onSuccess (data) {
            _this.localAudioId = data.localAudioId // 下载完成后返回音频在本地的MediaId。
            _this.downloadResult = `onSuccess: ${JSON.stringify(data)}`
          },
          onFail (err) {
            _this.downloadResult = `onFail: ${JSON.stringify(err)}`
          }
        })
      },
      play () {
        const _this = this
        window.dd && window.dd.device.audio.play({
          localAudioId: _this.localAudioId,
          onSuccess () {
            _this.playResult = `onSuccess: ${JSON.stringify(data)}`
          },
          onFail (err) {
            _this.playResult = `onFail: ${JSON.stringify(err)}`
          }
        })
      },

      pause () {
        const _this = this
        window.dd && window.dd.device.audio.pause({
          localAudioId: _this.localAudioId,
          onSuccess (data) {
            _this.pauseResult = `onSuccess: ${JSON.stringify(data)}`
          },
          onFail (err) {
            _this.pauseResult = `onFail: ${JSON.stringify(err)}`
          }
        })
      },

      resume () {
        const _this = this
        window.dd && window.dd.device.audio.resume({
          localAudioId: _this.localAudioId,
          onSuccess (data) {
            _this.resumeResult = `onSuccess: ${JSON.stringify(data)}`
          },
          onFail (err) {
            _this.resumeResult = `onFail: ${JSON.stringify(err)}`
          }
        })
      },

      stop () {
        const _this = this
        window.dd && window.dd.device.audio.stop({
          localAudioId: _this.localAudioId,
          onSuccess (data) {
            _this.stopResult = `onSuccess: ${JSON.stringify(data)}`
          },
          onFail (err) {
            _this.stopResult = `onFail: ${JSON.stringify(err)}`
          }
        })
      },
      onPlayEnd () {
        const _this = this
        window.dd && window.dd.device.audio.onPlayEnd({
          onSuccess (data) {
            _this.onPlayEndResult = `onSuccess: ${JSON.stringify(data)}`
          },
          onFail (err) {
            _this.onPlayEndResult = `onFail: ${JSON.stringify(err)}`
          }
        })
      },
      translateVoice () {
        const _this = this
        window.dd && window.dd.device.audio.translateVoice({
          mediaId: _this.mediaId,
          duration: _this.duration,
          onSuccess (data) {
            _this.translateVoiceResult = `onSuccess: ${JSON.stringify(data)}`
          },
          onFail (err) {
            _this.translateVoiceResult = `onFail: ${JSON.stringify(err)}`
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

    .fixedTop {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        z-index: 999;
        .fixedTopInner {
            width: 50%;
            background: rgba(256, 256, 256, 0.5);
            font-size: 14px;
            padding: 5px 10px;
            p {
                margin: 0;
            }
        }
    }
</style>
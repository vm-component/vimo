<template>
    <vm-page>
        <vm-header>
            <vm-navbar>
                <vm-title>Feedback</vm-title>
            </vm-navbar>
        </vm-header>
        <vm-content class="outer-content">
            <vm-feedback v-model="feedbackInfo" :maxlength="100" :maximage="4"></vm-feedback>
            <div padding>
                <h5>简介</h5>
                <p>Feedback组件用于反馈/意见信息/评价等场景.</p>

                <h5>录入结果:</h5>
                <p>文本: {{feedbackInfo.text}}</p>

                <section>
                    <p>图片:</p>
                    <img class="result-img" :src="data.code" v-for="(data, index) in feedbackInfo.images" :key="index">
                </section>
            </div>
        </vm-content>
    </vm-page>
</template>
<style scoped lang="scss">
    .result-img {
        width: 100px;
        height: 100px;
        margin: 5px;
        border: 1px solid #eee;
    }
</style>
<script type="text/javascript">
  export default{
    name: 'name',
    data () {
      return {
        feedbackInfo: {
          text: '#Hello Vimo#',
          images: []
        }
      }
    },
    props: {},
    watch: {},
    computed: {},
    methods: {},
    created () {},
    mounted () {},
    activated () {},
    deactivate () {},
    destroyed () {}
  }
</script>

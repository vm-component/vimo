<template>
    <vm-page>
        <vm-header>
            <vm-navbar>
                <vm-title>Normal</vm-title>
            </vm-navbar>
        </vm-header>
        <vm-content class="outer-content">
            <vm-list>
                <vm-list-header>
                    <span>布局</span>
                </vm-list-header>
                <vm-item>
                    <vm-label color="primary">Inline Label</vm-label>
                    <vm-textarea placeholder="Text Input"></vm-textarea>
                </vm-item>
                <vm-item>
                    <vm-label color="primary" fixed>Fixed Label with fixed width</vm-label>
                    <vm-textarea placeholder="Text Input"></vm-textarea>
                </vm-item>
                <vm-item>
                    <vm-label color="primary" floating>Floating Label</vm-label>
                    <vm-textarea></vm-textarea>
                </vm-item>

                <vm-item>
                    <vm-textarea :cols="3" placeholder="Text here"></vm-textarea>
                </vm-item>
                <vm-item>
                    <vm-label color="primary" stacked>Stacked Label</vm-label>
                    <vm-textarea placeholder="Text here"></vm-textarea>
                </vm-item>
            </vm-list>
            <vm-list>
                <vm-item>
                    <vm-label color="primary" stacked>计数</vm-label>
                    <vm-textarea :count="10000"  placeholder="输入文本"></vm-textarea>
                </vm-item>
                <vm-item>
                    <vm-label color="primary" stacked>聚焦高亮</vm-label>
                    <vm-textarea showFocusHighlight placeholder="输入文本"></vm-textarea>
                </vm-item>
                <vm-item>
                    <vm-label color="primary" stacked>自动高度</vm-label>
                    <vm-textarea autosize placeholder="输入文本"></vm-textarea>
                </vm-item>
                <vm-item>
                    <vm-label color="primary" stacked>禁用</vm-label>
                    <vm-textarea :rows="1" disabled placeholder="输入文本"></vm-textarea>
                </vm-item>
                <vm-item>
                    <vm-label color="primary" stacked>最长20个字符</vm-label>
                    <vm-textarea :rows="1" :maxlength="20" placeholder="输入文本"></vm-textarea>
                </vm-item>
                <vm-item>
                    <vm-label color="primary" stacked>只读</vm-label>
                    <vm-textarea :rows="1" readonly placeholder="输入文本"></vm-textarea>
                </vm-item>
            </vm-list>
            <vm-list>
                <vm-list-header>
                    <span>单独使用</span>
                </vm-list-header>
                <section class="customer">
                    <vm-textarea :count="300" autosize placeholder="Text here"></vm-textarea>
                </section>
            </vm-list>
        </vm-content>
    </vm-page>
</template>
<script type="text/javascript">
  export default {
    name: 'TextareaDemo',
    data () {
      return {}
    },
    methods: {}
  }
</script>
<style scoped lang="scss">
    .customer {
        width: 80%;
        background-color: #ffffff;
        color: #000000;
        margin: 10px auto;
        padding: 1px 10px;
    }
</style>

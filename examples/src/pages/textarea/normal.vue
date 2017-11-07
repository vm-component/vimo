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
                    <Textarea placeholder="Text Input"></Textarea>
                </vm-item>
                <vm-item>
                    <vm-label color="primary" fixed>Fixed Label with fixed width</vm-label>
                    <Textarea placeholder="Text Input"></Textarea>
                </vm-item>
                <vm-item>
                    <vm-label color="primary" floating>Floating Label</vm-label>
                    <Textarea></Textarea>
                </vm-item>

                <vm-item>
                    <Textarea :cols="3" placeholder="Text here"></Textarea>
                </vm-item>
                <vm-item>
                    <vm-label color="primary" stacked>Stacked Label</vm-label>
                    <Textarea placeholder="Text here"></Textarea>
                </vm-item>
            </vm-list>
            <vm-list>
                <vm-item>
                    <vm-label color="primary" stacked>计数</vm-label>
                    <Textarea :count="10000"  placeholder="输入文本"></Textarea>
                </vm-item>
                <vm-item>
                    <vm-label color="primary" stacked>聚焦高亮</vm-label>
                    <Textarea showFocusHighlight placeholder="输入文本"></Textarea>
                </vm-item>
                <vm-item>
                    <vm-label color="primary" stacked>自动高度</vm-label>
                    <Textarea autosize placeholder="输入文本"></Textarea>
                </vm-item>
                <vm-item>
                    <vm-label color="primary" stacked>禁用</vm-label>
                    <Textarea :rows="1" disabled placeholder="输入文本"></Textarea>
                </vm-item>
                <vm-item>
                    <vm-label color="primary" stacked>最长20个字符</vm-label>
                    <Textarea :rows="1" :maxlength="20" placeholder="输入文本"></Textarea>
                </vm-item>
                <vm-item>
                    <vm-label color="primary" stacked>只读</vm-label>
                    <Textarea :rows="1" readonly placeholder="输入文本"></Textarea>
                </vm-item>
            </vm-list>
            <vm-list>
                <vm-list-header>
                    <span>单独使用</span>
                </vm-list-header>
                <section class="customer">
                    <Textarea :count="300" autosize placeholder="Text here"></Textarea>
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
<style scoped lang="less">
    .customer {
        width: 80%;
        background-color: #ffffff;
        color: #000000;
        margin: 10px auto;
        padding: 1px 10px;
    }
</style>

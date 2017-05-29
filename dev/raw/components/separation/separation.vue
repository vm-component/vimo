<template>
    <div class="vm-separation">
        <div class="vm-separation-line"></div>
        <div class="vm-separation-wrap">
            <slot></slot>
        </div>
        <div class="vm-separation-line"></div>
    </div>
</template>
<style lang="scss">
    .vm-separation {
        width: 100%;
        margin: 15px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        .vm-separation-line {
            position: relative;
            flex: 1;
            &:after {
                content: '';
                position: absolute;
                top: 50%;
                height: 0;
                width: 100%;
                border-top: 1px solid #DDDDDD;
            }
        }
        .vm-separation-wrap {
            padding: 0 10px;
            color: #9F9F9F;
        }
    }
</style>
<script type="text/javascript">
  export default{
    name: 'Separation',
    data(){
      return {}
    },
    props: {},
    watch: {},
    computed: {},
    methods: {},
    created(){},
    mounted(){},
    activated(){},
    components: {}
  }
</script>

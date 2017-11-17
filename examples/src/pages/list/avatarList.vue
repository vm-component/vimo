<template>
    <vm-page>
        <vm-header>
            <vm-navbar>
                <vm-title>AvatarList</vm-title>
            </vm-navbar>
        </vm-header>
        <vm-content class="list-avatar-page outer-content">
            <vm-list>
                <vm-list-header>
                    <span>today</span>
                </vm-list-header>
                <vm-item>
                    <vm-avatar slot="item-start">
                        <img src="./img/avatar-ts-woody.png">
                    </vm-avatar>
                    <vm-label>
                        <h2>Woody</h2>
                        <p>This town ain't big enough for the two of us!</p>
                    </vm-label>
                    <vm-note slot="item-end">3:43 pm</vm-note>
                </vm-item>
                <vm-item>
                    <vm-avatar slot="item-start">
                        <img src="./img/avatar-ts-buzz.png">
                    </vm-avatar>
                    <vm-label>
                        <h2>Buzz Lightyear</h2>
                        <p>My eyeballs could have been sucked from their sockets!</p>
                    </vm-label>
                    <vm-note slot="item-end">1:12 pm</vm-note>
                </vm-item>
            </vm-list>

            <vm-list>
                <vm-list-header>
                    <span>yesterday</span>
                </vm-list-header>
                <vm-item>
                    <vm-avatar slot="item-start">
                        <img src="./img/avatar-ts-hamm.png">
                    </vm-avatar>
                    <vm-label>
                        <h2>Hamm</h2>
                        <p>You heard of Kung Fu? Well get ready for pork chop.</p>
                    </vm-label>
                    <vm-note slot="item-end">11:12 pm</vm-note>
                </vm-item>
                <vm-item>
                    <vm-avatar slot="item-start">
                        <img src="./img/avatar-ts-slinky.png">
                    </vm-avatar>
                    <vm-label><h2>Slinky Dog</h2>
                        <p>I may not be a smart dog, but I know what roadkill is.</p></vm-label>
                    <vm-note slot="item-end">12:12 pm</vm-note>
                </vm-item>
            </vm-list>
        </vm-content>
    </vm-page>
</template>
<style scoped lang="scss">
    .list-avatar-page {
        .ion-note {
            font-size: 12px;
            -webkit-align-self: flex-start;
            -ms-flex-item-align: start;
            align-self: flex-start;
            margin-top: 14px;
        }
    }
</style>
<script type="text/javascript">
  export default{
    data () {
      return {}
    }
  }
</script>

<template>
    <vm-page>
        <vm-header>
            <vm-navbar>
                <vm-title>Lists In Cards</vm-title>
            </vm-navbar>
        </vm-header>
        <vm-content>
            <vm-card>
                <vm-card-header>
                    Explore Nearby
                </vm-card-header>

                <vm-list>
                    <vm-item button>
                        <vm-icon name="person" slot="item-left"></vm-icon>
                        Shopping
                    </vm-item>

                    <vm-item button>
                        <vm-icon name="calculator" slot="item-left"></vm-icon>
                        Hospital
                    </vm-item>

                    <vm-item button>
                        <vm-icon name="camera" slot="item-left"></vm-icon>
                        Cafe
                    </vm-item>

                    <vm-item button>
                        <vm-icon name="paw" slot="item-left"></vm-icon>
                        Dog Park
                    </vm-item>

                    <vm-item button>
                        <vm-icon name="beer" slot="item-left"></vm-icon>
                        Pub
                    </vm-item>

                    <vm-item button>
                        <vm-icon name="easel" slot="item-left"></vm-icon>
                        Space
                    </vm-item>

                </vm-list>
            </vm-card>
        </vm-content>
    </vm-page>
</template>
<script type="text/javascript">
  export default{}
</script>

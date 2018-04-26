<template>
    <Page>
        <Header>
            <Navbar hide-back-button>
                <Title :title="$t('title')"></Title>
            </Navbar>
        </Header>
        <Content padding>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque deleniti dicta dolores exercitationem fugiat, libero magni nam.
                Aperiam aspernatur cum illum maiores maxime natus perspiciatis quae, quam ullam veniam.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto at, aut consequuntur cumque doloremque, dolorum eaque eos et hic ipsam
                laborum natus neque officiis quia, rem repellendus reprehenderit similique voluptas.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto at, aut consequuntur cumque doloremque, dolorum eaque eos et hic ipsam
                laborum natus neque officiis quia, rem repellendus reprehenderit similique voluptas.</p>
            <img src="../../assets/card-amsterdam.png">
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto at, aut consequuntur cumque doloremque, dolorum eaque eos et hic ipsam
                laborum natus neque officiis quia, rem repellendus reprehenderit similique voluptas.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto at, aut consequuntur cumque doloremque, dolorum eaque eos et hic ipsam
                laborum natus neque officiis quia, rem repellendus reprehenderit similique voluptas.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto at, aut consequuntur cumque doloremque, dolorum eaque eos et hic ipsam
                laborum natus neque officiis quia, rem repellendus reprehenderit similique voluptas.</p>
            <img src="../../assets/card-madison.png">
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto at, aut consequuntur cumque doloremque, dolorum eaque eos et hic ipsam
                laborum natus neque officiis quia, rem repellendus reprehenderit similique voluptas.</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto at, aut consequuntur cumque doloremque, dolorum eaque eos et hic ipsam
                laborum natus neque officiis quia, rem repellendus reprehenderit similique voluptas.</p>
        </Content>
    </Page>
</template>
<script type="text/javascript">
  export default {
    name: 'DemoCars',
    i18n: {
      messages: {
        'zh-CN': {
          title: '汽车相关'
        },
        'en-US': {
          title: 'About Cars'
        }
      }
    }
  }
</script>

/**
 * Created by Hsiang on 2017/4/21.
 * content相关的路由
 */
export default [

  // cards
  {
    path: '/cards',
    name: 'cards',
    component  (resolve) {
      require(['@/example/cards/cards.vue'], resolve)
    }
  },
  {
    path: '/basicCards',
    name: 'cards.basicCards',
    component  (resolve) {
      require(['@/example/cards/basicCards.vue'], resolve)
    }
  },
  {
    path: '/listsInCards',
    name: 'cards.listsInCards',
    component  (resolve) {
      require(['@/example/cards/listsInCards.vue'], resolve)
    }
  },
  {
    path: '/advancedCards',
    name: 'cards.advancedCards',
    component  (resolve) {
      require(['@/example/cards/advancedCards.vue'], resolve)
    }
  },
]
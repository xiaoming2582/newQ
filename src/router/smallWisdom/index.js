export default [{
    path: '/smallWisdom/main',
    name: 'smallWisdom/main',
    component: () => import('@/views/smallWisdom/main'),
    meta: {
      keepAlive: true,
      title: '小Q智慧',
      isShare: false,
    }
  },
  {
    path: '/smallWisdom/cardList',
    name: 'smallWisdom/cardList',
    component: () => import('@/views/smallWisdom/cardList'),
    meta: {
      keepAlive: true,
      title: '卡券列表',
      isShare: false,
    }
  },
  {
    path: '/smallWisdom/organInfo',
    name: 'smallWisdom/organInfo',
    component: () => import('@/views/smallWisdom/organInfo'),
    meta: {
      keepAlive: true,
      title: '卡券列表',
      isShare: false,
    }
  }
]

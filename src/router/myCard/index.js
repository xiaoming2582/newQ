export default [{
    path: '/myCard/cardList',
    name: 'myCard/cardList',
    component: () => import('@/views/myCard/cardList'),
    meta: {
      keepAlive: true,
      title: '我的卡券',
      isShare: false,
    }
  },
  {
    path: '/myCard/cardDetails',
    name: 'myCard/cardDetails',
    component: () => import('@/views/myCard/cardDetails'),
    meta: {
      keepAlive: true,
      title: '卡券详情',
      isShare: false,
    }
  }
]

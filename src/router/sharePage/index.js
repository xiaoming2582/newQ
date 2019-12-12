export default [{
  path: '/sharePage',
  name: 'sharePage',
  component: () => import('@/views/sharePage'),
  meta: {
    title: "分享",
    keepAlive: false,
    isShare: false,
  }
}]

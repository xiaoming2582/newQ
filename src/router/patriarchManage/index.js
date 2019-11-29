export default [{
  path: '/patriarchManage',
  name: 'patriarchManage',
  component: () => import('@/views/patriarchManage'),
  meta: {
    title: "家长管理",
    keepAlive: false,
    isShare: false,
  }
},
{
  path: '/patriarchManage/audit',
  name: 'patriarchManageAudit',
  component: () => import('@/views/patriarchManage/audit'),
  meta: {
    title: "审核详情",
    keepAlive: false,
    isShare: false,
  }
},
{
  path: '/patriarchManage/message',
  name: 'patriarchManageMessage',
  component: () => import('@/views/patriarchManage/message'),
  meta: {
    title: "家长信息",
    keepAlive: false,
    isShare: false,
  }
}
]

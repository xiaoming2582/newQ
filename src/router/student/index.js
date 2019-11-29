export default [{
    path: '/student',
    name: 'student',
    component: () => import('@/views/student'),
    meta: {
      keepAlive: false,
      isShare: true,
      title: '班级管理',
    },
  },
  {
    path: '/student/add',
    name: 'studentAdd',
    component: () => import('@/views/student/add'),
    meta: {
      keepAlive: false,
      isShare: false,
      title: '学生添加',
    }
  },
  {
    path: '/student/edit',
    name: 'studentEdit',
    component: () => import('@/views/student/edit'),
    meta: {
      keepAlive: false,
      isShare: false,
      title: '学生编辑',
    }
  },
  {
    path: '/student/newAdd',
    name: 'studentNewAdd',
    component: () => import('@/views/student/newAdd'),
    meta: {
      keepAlive: false,
      isShare: false,
      title: '填写资料',
    }
  },
  {
    path: '/student/grade',
    name: 'studentGrade',
    component: () => import('@/views/student/grade'),
    meta: {
      keepAlive: false,
      isShare: false,
      title: '班级管理',
    }
  },
  {
    path: '/student/audit',
    name: 'studentAudit',
    component: () => import('@/views/student/audit'),
    meta: {
      keepAlive: false,
      isShare: false,
      title: '审核详情',
    }
  },
]

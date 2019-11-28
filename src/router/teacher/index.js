export default [{
    path: '/teacher',
    name: 'teacher',
    component: () => import('@/views/teacher'),
    meta: {
      keepAlive: false,
      isShare: false,
      title: '老师管理',
    }
  },
  {
    path: '/teacher/add',
    name: 'teacherAdd',
    component: () => import('@/views/teacher/add'),
    meta: {
      keepAlive: true,
      isShare: false,
      title: '老师添加',
    }
  },
  {
    path: '/teacher/edit',
    name: 'teacherEdit',
    component: () => import('@/views/teacher/edit'),
    meta: {
      keepAlive: false,
      isShare: false,
      title: '老师编辑',
    }
  },
  {
    path: '/teacher/createClass',
    name: 'teacherCreateClass',
    component: () => import('@/views/teacher/createClass'),
    meta: {
      keepAlive: false,
      isShare: false,
      title: '创建班级',
    }
  },
  {
    path: '/teacher/share',
    name: 'teacherShare',
    component: () => import('@/views/teacher/share'),
    meta: {
      keepAlive: false,
      isShare: false,
      title: '分享',
    }
  },
  {
    path: '/teacher/success',
    name: 'teacherSuccess',
    component: () => import('@/views/teacher/success'),
    meta: {
      keepAlive: false,
      isShare: true,
      title: '创建成功',
    }
  },
  {
    path: '/teacher/createClassNextStep',
    name: 'createClassNextStep',
    component: () => import('@/views/teacher/createClassNextStep'),
    meta: {
      keepAlive: false,
      isShare: false,
      title: '创建班级',
    }
  },
]

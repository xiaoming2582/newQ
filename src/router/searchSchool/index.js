export default [{
    path: '/searchSchool',
    name: 'searchSchool',
    component: () => import('@/views/searchSchool/index'),
    meta: {
        keepAlive: false,
        isShare: false,
        title: '搜索学校',
    }
},
{
    path: '/searchSchool/result',
    name: 'result',
    component: () => import('@/views/searchSchool/result'),
    meta: {
        keepAlive: false,
        isShare: false,
        title: '搜索结果',
    }
},
{
    path: '/searchSchool/submitSucceed',
    name: 'submitSucceed',
    component: () => import('@/views/searchSchool/submitSucceed'),
    meta: {
        keepAlive: false,
        isShare: false,
        title: '提交成功',
    }
},
]

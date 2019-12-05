export default [{
    path: "/bindingList",
    name: "bindingList",
    component: () => import('@/views/bindingList'),
    meta: {
        title: "绑定列表",
        keepAlive: true,
        isShare: false,
    },

}, {
    path: "/bindingList/bindingMessage",
    name: "bindingMessage",
    component: () => import('@/views/bindingList/bindingMessage'),
    meta: {
        title: "绑定信息",
        keepAlive: true,
        isShare: false,
    }
}
]
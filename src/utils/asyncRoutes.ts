module.exports = [
    {
        path:'/',
        name: '首页',
        hidden: true,
        meta: {
            title: '首页',
            icon: 'shop',
            noCache: false
        }
    },
    {
        name: '商品管理',
        path: '/shop',
        hidden: true,
        alwaysShow: true,
        redirect: 'noredirect',
        component: "Layout",
        meta: {
            title: '商品管理',
            icon: 'shop',
            noCache: false
        },
        children: [
            {
                name: 'goodsAdd',
                path: '/shop/goodsAdd',
                hidden: true,
                alwaysShow: true,
                redirect: 'noredirect',
                component: "shop/goods/index",
                meta: {
                    title: 'goodsAdd',
                    icon: 'shop',
                    noCache: false
                },
            }
        ]
    },
    {
        name: '文章管理',
        path: '/article',
        hidden: true,
        alwaysShow: true,
        redirect: 'noredirect',
        component: "Layout",
        meta: {
            title: '文章管理',
            icon: 'article',
            noCache: false
        },
        children: [
            {
                name: '文章列表',
                path: '/article/index',
                hidden: true,
                alwaysShow: true,
                component: "article/index",
                meta: {
                    title: '文章列表',
                    icon: 'shop',
                    noCache: false
                },
            }
        ]
    },
    {
        name: '详情管理',
        path: '/detail',
        hidden: true,
        alwaysShow: true,
        redirect: 'noredirect',
        component: "Layout",
        meta: {
            title: '文章管理',
            icon: 'article',
            noCache: false
        },
        children: [
            {
                name: '上传头像',
                path: '/detail/upAvatar',
                hidden: true,
                alwaysShow: true,
                component: "avatar/index",
                meta: {
                    title: '上传头像',
                    icon: 'article',
                    noCache: false
                },
            },
            {
                name: '基础详情页',
                path: '/detail/basePage',
                hidden: true,
                alwaysShow: true,
                component: "avatar/basePage",
                meta: {
                    title: '基础详情页',
                    icon: 'article',
                    noCache: false
                },
            },
        ]
    },
    {
        name: '系统管理',
        path: '/system',
        hidden: true,
        alwaysShow: true,
        redirect: 'noredirect',
        component: "Layout",
        meta: {
            title: '系统管理',
            icon: 'article',
            noCache: false
        },
        children: [
            {
                name: '菜单管理',
                path: '/system/menuManage',
                hidden: true,
                alwaysShow: true,
                component: "system/menuManage",
                meta: {
                    title: '菜单管理',
                    icon: 'shop',
                    noCache: false
                },
            }
        ]
    },
]

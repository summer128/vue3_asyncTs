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
                name: '添加文章',
                path: '/article/addArticle',
                hidden: true,
                alwaysShow: true,
                component: "article/addArticle",
                meta: {
                    title: '添加文章',
                    icon: 'shop',
                    noCache: false
                },
            },
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
]
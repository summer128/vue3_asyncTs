module.exports = [
    {
        path:'/',
        meta: {

        }
    },
    {
        name: '商品管理',
        path: '/shop',
        hidden: false,
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
                hidden: false,
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
        hidden: false,
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
                name: 'articlesAdd',
                path: '/shop/articlesAdd',
                hidden: false,
                alwaysShow: true,
                redirect: 'noredirect',
                component: "article/index",
                meta: {
                    title: 'articlesAdd',
                    icon: 'shop',
                    noCache: false
                },
            }
        ]
    },
]
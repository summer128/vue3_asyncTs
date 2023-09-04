import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// @ts-ignore
import asyncRouter from '../utils/asyncRoutes'
// @ts-ignore
import Layout from '../views/layout/index'
// pinia
// @ts-ignore
import pinia from '../store/store'
// @ts-ignore
import { useMenu } from "../store/index"
const store = useMenu(pinia)  // 这里一定要把 pinia传入进去
console.log(store.$state.hasMenus, '获取pinia的数据')


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/layout/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/layout/login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/layout/register.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

/*
  请求处理动态路由
* */
function loadAsyncRoutes(val:any[]) {
  // let arr:any[] = []
  // val.filter((value, index) => {
  //   let child:any[] = []
  //   if (value.children && value.children.length) {
  //     value.children.filter((val:any, i:any) => {
  //       child.push({
  //         name: value.name,
  //         redirect: value.redirect,
  //         path: value.path,
  //         isHidden: value.isHidden,
  //         icon: value.icon,
  //         sort: value.sort,
  //         isCache: value.isCache,
  //         isDel: value.isDel,
  //         status: value.status,
  //         component: () => import(`@/views/${val.cUrl}`)
  //       })
  //     })
  //   }
  //   arr.push({
  //     name: value.name,
  //     redirect: value.redirect,
  //     path: value.path,
  //     isHidden: value.isHidden,
  //     icon: value.icon,
  //     sort: value.sort,
  //     isCache: value.isCache,
  //     isDel: value.isDel,
  //     status: value.status,
  //     component: () => import(`@/views/${value.cUrl}`),
  //     children: child
  //   })
  // })
  //
  // return arr
  /* 第一种方法 */
  let rdata = val
  for (let i = 0; i< rdata.length; i++) {
    if (rdata[i].cUrl == 'Layout') {
      rdata[i].component = Layout
    } else {
      const componentPath = rdata[i].cUrl
      rdata[i].component = () => import(`../views/${rdata[i].cUrl}.vue`)
    }
  }
  console.log(rdata, 'val:::::::::')
  return rdata

  /* 第二种方法 */
  // return val.map(x => {
  //   console.log(x, 'x')
  //   let data:any = {
  //     name: x.name,
  //     path: x.path,
  //     isHidden: x.isHidden,
  //     redirect:  x.redirect,
  //     component: x.cUrl === 'Layout' ? "Layout" : () => import(`../views/${x.cUrl}.vue`),
  //     icon: x.icon,
  //     sort: x.sort,
  //     isCache: x.isCache,
  //     isDel: x.isDel,
  //     status: x.status,
  //     children: x.children.length > 0 ? loadAsyncRoutes(x.children) :  []
  //   }
    // return data

    /* 第三种方法 */
    // 1.改变所有的component
    // if (x.cUrl === 'Layout') {
    //   x.component = Layout
    // } else {
    //   const componentPath = x.cUrl
    //   x.component = () => import(`../views/${componentPath}.vue`)
    // }

    // 2.判断有没有子级，在吧子级的component给处理
    // if(data.children) {
    //   data.children = loadAsyncRoutes(x.children)
    // }
  // })
}
const whiteList = ['/login', '/404','/register']
router.beforeEach((to,from,next) => {
  // 1.看跳转的path，有没有在白名单内
  if (whiteList.includes(to.path)) {
    next()
  } else {
    // 2.判断本地有没有Authorization，有token直接免登录
    if(localStorage.getItem('Authorization')){
      //3. 是否需要动态加载菜单
      // const hasMenus = localStorage.getItem('hasMenus')// 先写死， 判断接口是否返回路由菜单
      const hasMenus = store.$state.hasMenus// 先写死， 判断接口是否返回路由菜单
      /*
        问题： 返回的数据Proxy(Object)，取不到对象里面的值，对象target里面才是真正的值
        解决： 1. const data = Reflect.get(obj, 'title')  必须是对象，第一个是属性名，第二个值是要获取的key值--推荐
              2. JSON.parse(JSON.stringify(xxx)
        列子： Reflect.get(store.$state, 'staticRouter')
       */
      const staticMenus = JSON.parse(localStorage.getItem('userInfo') || '{}').roleMenus //判断接口是否返回路由菜单
      console.log(hasMenus, 'hasMenus')
      if (hasMenus) {
        const asyncroutes = loadAsyncRoutes(staticMenus)
        console.log(asyncroutes, 'asyncroutes')
        // 在末尾添加404的处理
        // asyncroutes.push({path:'/:catchAll(.*)', redirect: '/404'
        // 添加到动态路由当中
        asyncroutes.forEach(x => {
          router.addRoute(x)
        })
        console.log(router.getRoutes(), 'router--index页面的动态路由')
        // 告诉下次刷新页面时，已经获取到菜单，修改为false
        store.$state.hasMenus = false
        // localStorage.setItem('hasMenus', 'false')
        // store.$state.asyncRoute = asyncroutes
        /*
        如果首次或者刷新界面，next(...to, replace: true)会循环遍历路由，如果to找不到对应的路由那么他会再执行一次beforeEach((to, from, next))直到找到对应的路由，
        我们的问题在于页面刷新以后异步获取数据，直接执行next()感觉路由添加了但是在next()之后执行的，所以我们没法导航到相应的界面。这里使用变量registerRouteFresh变量做记录，
        直到找到相应的路由以后，把值设置为false然后走else执行next(),整个流程就走完了，路由也就添加完了。
         */
        next({ ...to, replace: true });
      } else {
        next()
      }
    } else {
      // 这样写有助于 用户如果想登录某一个页面，但是没有token，等到重新登录上之后，直接跳转到之前想要去的页面
      next(`/login?redirect=${to.path}`)
    }
  }
})

export default router

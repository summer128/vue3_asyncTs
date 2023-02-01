import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// @ts-ignore
import asyncRouter from '../utils/asyncRoutes'
// @ts-ignore
import Layout from '../views/layout/index'
// pinia
// @ts-ignore
import pinia from '../store/store'
// @ts-ignore
import { useStore } from "../store/index"
const store = useStore(pinia)  // 这里一定要把 pinia传入进去
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
  return val.map(x => {
    // 1.改变所有的component
    if (x.component === 'Layout') {
      x.component = Layout
    } else {
      const componentPath = x.component
      x.component = () => import(`../views/${componentPath}.vue`)
    }

    // 2.判断有没有子级，在吧子级的component给处理
    if(x.children) {
      x.children = loadAsyncRoutes(x.children)
    }
    return x
  })
}
localStorage.setItem('token','12ceshizxcvbnmasdfghjkl')
const whiteList = ['/login', '/404','/register']
router.beforeEach((to,from,next) => {
  console.log(whiteList.includes(to.path), '1234')
  // 1.看跳转的path，有没有在白名单内
  if (whiteList.includes(to.path)) {
    next()
  } else {
    // 2.判断本地有没有token，有token直接免登录
    if(localStorage.getItem('token')){
      //3. 是否需要动态加载菜单
      const hasMenus = store.$state.hasMenus // 先写死， 判断接口是否返回路由菜单
      if (hasMenus) {
        const asyncroutes = loadAsyncRoutes(asyncRouter)
        // 在末尾添加404的处理
        // asyncroutes.push({path:'/:catchAll(.*)', redirect: '/404' })

        // 添加到动态路由当中
        asyncroutes.forEach(x => {
          router.addRoute(x)
        })
        // 告诉下次刷新页面时，已经获取到菜单，修改为false
        store.$state.hasMenus = false
        store.$state.asyncRoute = asyncroutes
        localStorage.setItem('asyncMenu', JSON.stringify(asyncroutes))
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

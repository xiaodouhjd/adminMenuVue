import Vue from 'vue'
import VueRouter from 'vue-router'
import Loyout from '../page/layout'

Vue.use(VueRouter)
export const constRoutes = [
  {
    path: '/',
    name: 'Loyout',
    component: Loyout,
    redirect:'/home',
    children: [{
      path: '/home',
      name: 'home',
      component: () => import('../page/index/index.vue'),
    }
    ]
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../page/login/index.vue'),
    children: [

    ]
  },
  {
    path: '/404',
    component: () => import('@/page/404'),
    hidden: true
  },
  // { path: '*', redirect: '/404', hidden: true }
]
const createRouter = () => new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes: constRoutes
})

const router = createRouter()

// 重置路由
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}



export default router

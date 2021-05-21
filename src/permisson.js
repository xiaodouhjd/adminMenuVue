import router from './router'
import store from './store'

import { Message } from 'element-ui'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'

import { getToken,getLocal } from '@/utils/auth' // get token from cookie

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/auth-redirect']

router.beforeEach(async (to, from, next) => {
    // console.log(to);
    NProgress.start()
    document.title = to.name   // getPageTitle(to.meta.title)
    const hasToken = getToken()
    if(hasToken){
        if (to.path === '/login') {
            next({
                path:'/'
            })
            NProgress.done()
        }else{
            const hasMenu = store.state.User.asyncRouter.length
            if(hasMenu){
                next()
                NProgress.done()
                return
            }else{
                try{
                    const accessRoutes = await store.dispatch('User/GetRoutes')
                    // accessRoutes.push({ path: '*', redirect: '/404', hidden: true })
                    router.addRoutes(accessRoutes)
                    // next({ ...to, replace: true })
                    if(to.path === '/404'){
                        next('/')
                    }else{
                        next({ ...to, replace: true })
                    }
                    
                }catch(error){
                    Message.error(error || 'Has Error')
                    next(`/login?redirect=${to.path}`)
                }
            }
        }
        // getLocal
    }else{
        if (whiteList.indexOf(to.path) !== -1) {
            next()
            return
        }
        next({ path: '/login' })
    }
    next()
    NProgress.done()
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
  })
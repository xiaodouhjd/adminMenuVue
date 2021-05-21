import axios from 'axios'
import {constRoutes} from '@/router'
import router from 'vue-router'
import Layout from '@/page/layout/index'
import { getToken, setLocal } from '@/utils/auth' // get token from cookie


// 用 some 判断 router 中的权限码是否在数组 roles 中存在，存在返回true，否则返回false
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

export function getAsyncRoutes(routes,component) {
  const res = []
  const keys = ['path', 'name', 'children', 'redirect', 'alwaysShow', 'meta', 'hidden']
  routes.forEach(item => {
    var newItem = {}
    var flag =  false
    if (item.component) {
      if (item.component === 'Layout') {
        newItem.component = Layout
      } else {
        newItem.component = () => import(`@/${item.component}.vue`)
      }
    }
    for (const key in item) {
      if (keys.includes(key)) {
        newItem[key] = item[key]
      }
    }
    if (newItem.children && newItem.children.length) {
      if(component){
        if(component == item.component){
          newItem = getAsyncRoutes(item.children,item.component)
          flag = true
        }else{
          newItem.children = getAsyncRoutes(item.children,item.component)
        }
      }else{
        newItem.children = getAsyncRoutes(item.children,item.component)
      }
      
    }
    if(flag){
      res.push(...newItem)
    }else{
      res.push(newItem)
    }
    
  });
  return res
}


const state = {
  asyncMenuList: [],
  userInfo: {},
  Teken: '',
  asyncRouter: []
}

// 定义 getters
var getters = {

}

// import { resolve } from 'core-js/fn/promise'
const actions = {
  GetRoutes({ commit }) {
    // 该 action 被外部调用，调用后，会更新vuex中存储的asyncMenuList 
    return new Promise((resolve, reject) => {
      axios.get("/parameter/Menu").then(response => {
        var asyncRouter = getAsyncRoutes(response.data.data,null)
        asyncRouter =asyncRouter.concat(constRoutes)
        console.log(asyncRouter);
        setLocal("Menu", asyncRouter)
        //  if (roles.includes('admin')) {
        //   accessedRoutes = asyncRoutes || []
        // } else { // 这里是有做权限过滤的,如果不需要就不用
        //   accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        // }
        commit("SET_ROUTER", asyncRouter)
        //判断如果data为 ‘all’，则为超级管理员，否则调用menuFiltters方法对data进行动态路由匹配
        //  if (data === 'all') {
        //调用mutation中定义的 SET_MENU_LIST 方法，更新vuex中存储的asyncMenuList 
        commit('SET_MENU_LIST', response.data.data)
        //  } else {
        //    let menuRoutes
        //    menuRoutes = menuFiltters(asyncRoutes, data)
        //    // 将匹配成功的路由更新到vuex中存储的asyncMenuList中
        //    commit('SET_MENU_LIST', menuRoutes)

        //  }
        resolve(asyncRouter)
      })
    })

  },
  Login({ commit }, loginForm) {
    return new Promise((resolve, reject) => {
      axios.get("/parameter/query").then(res => {
        commit("SET_INFO", res.data.userInfo)
        commit("SET_TOKEN", res.data.Teken)
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      
      axios.get("/parameter/userInfo").then(response => {
        const { data } = response
        commit("SET_INFO",response)
        if (!data) {
          reject('Verification failed, please Login again.')
        }
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
}

const mutations = {
  SET_MENU_LIST: (state, data) => {
    state.asyncMenuList = data
  },
  SET_ROLES_ID: (state, id) => {
    state.rolesId = id
  },
  SET_TOKEN: (state, token) => {
    state.Teken = token
  },
  SET_ROUTER: (state, asyncRouter) => {
    state.asyncRouter =asyncRouter
  },
  SET_INFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
}
// 最后统一导出
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
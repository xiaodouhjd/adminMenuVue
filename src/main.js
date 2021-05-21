import Vue from 'vue'
import './plugins/axios'
import './style/common/reset.css'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './plugins/element.js'
import '@/permisson'
require('./mock/index');

import basicContainer from './components/basic-container/main'

Vue.config.productionTip = false
// 注册全局容器
Vue.component('basicContainer', basicContainer)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

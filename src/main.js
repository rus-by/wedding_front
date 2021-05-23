import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueClipboard from 'vue-clipboard2'
 const api = axios.create({
  baseURL: '/api',
  withCredentials: true
});
Vue.use(VueClipboard)
Vue.config.productionTip = false
Vue.use({
  install (Vue) {
  Vue.prototype.$api = api
}
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

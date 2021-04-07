import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
// 导入element框架
import ElementUI from 'element-ui'
// 导入element样式
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

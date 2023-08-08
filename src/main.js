import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import request from './utils/request'

//全局直接使用request
Vue.prototype.request = request
Vue.config.productionTip = false

//使用路由全局前置守卫，验证用户是否登录授权
router.beforeEach((to, from, next) => {
  //进入登录、注册也买你不需要拦截
  if (to.path === "/login" || to.path === "/" || to.path === "/register") {
    next();
  }
  else {
    let userToken = localStorage.getItem("token");
    // 判断token是否存在
    if (!userToken) {
      alert("没有权限，请先登录");
      return next("/");
    }
    else {
      next();
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

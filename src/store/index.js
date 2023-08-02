import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //全局存储获取值
    user: localStorage.getItem("user")?localStorage.getItem("user"):null,
    token: localStorage.getItem("token")?localStorage.getItem("token"):null,
    menu: localStorage.getItem("menu")?localStorage.getItem("menu"):null
  },
  getters: {
  },
  //更改vuex 当中state的值 并通过commit方法改变
  mutations: {
    setUser(state, user){
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    setToken(state, token){
      state.token = token;
      localStorage.setItem("token", token);
    },
    setMenu(state, menu){
      localStorage.setItem("menu", menu);
    },
    logout(state){
      localStorage.removeItem("user");
      state.user = null;
      localStorage.removeItem("token");
      state.token = null;
      localStorage.removeItem("menu");
      state.menu = null;
    }
  },
  actions: {
  },
  modules: {
  }
})

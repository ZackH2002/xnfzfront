import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //全局存储获取值
    user: localStorage.getItem("user") ? localStorage.getItem("user") : null,
    token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
    menu: localStorage.getItem("menu") ? localStorage.getItem("menu") : null,
    userType: localStorage.getItem("userType") ? localStorage.getItem("userType") : null
  },
  getters: {
  },
  //更改vuex 当中state的值 并通过commit方法改变
  mutations: {
    setUser(state, user) {
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
    },
    setMenu(state, menu) {
      state.menu = menu;
      localStorage.setItem("menu", menu);
    },
    logout(state) {
      localStorage.removeItem("user");
      state.user = null;
      localStorage.removeItem("token");
      state.token = null;
      localStorage.removeItem("menu");
      state.menu = null;
      localStorage.removeItem("userType");
      state.menu = null;
    },
    setUserType(state, userType) {
      state.userType = userType;
      localStorage.setItem("userType", userType);
    }
  },
  actions: {
  },
  modules: {
  }
})

// import Vue from 'vue'
// import Vuex from 'vuex'
Vue.use(Vuex)

const types = {
  SET_IS_AUTNENTIATED: 'SET_IS_AUTNENTIATED', // 是否认证通过
  SET_USER: 'SET_USER', // 用户信息
  SET_HOMEINFO: 'SET_HOMEINFO'
}
const state = {
  // 需要维护的状态
  isAutnenticated: false, // 是否认证
  user: null, // 存储用户信息 JSON.parse(sessionStorage.getItem('token')) ||
  homeinfo: null
}
const getters = {
  isAutnenticated: state => state.isAutnenticated,
  user: state => state.user,
  homeinfo: state => state.homeinfo
}
const mutations = {
  [types.SET_IS_AUTNENTIATED](state, isAutnenticated) {
    if (isAutnenticated) state.isAutnenticated = isAutnenticated
    else state.isAutnenticated = false
  },
  [types.SET_USER](state, user) {
    if (user) {
      // sessionStorage.setItem('user', JSON.stringify(user));
      state.user = user
    } else {
      state.user = null
    }
  },
  [types.SET_HOMEINFO](state, homeinfo) {
    if (homeinfo) {
      state.homeinfo = homeinfo
    } else {
      state.homeinfo = null
    }
  }
}
const actions = {
  setIsAutnenticated: ({ commit }, isAutnenticated) => {
    commit(types.SET_IS_AUTNENTIATED, isAutnenticated)
  },
  setUser: ({ commit }, user) => {
    commit(types.SET_USER, user)
  },
  setHomeinfo: ({ commit }, homeinfo) => {
    commit(types.SET_HOMEINFO, homeinfo)
  },
  clearHomeinfo: ({ commit }) => {
    commit(types.SET_HOMEINFO, null)
  },
  clearCurrentState: ({ commit }) => {
    commit(types.SET_USER, null)
    commit(types.SET_IS_AUTNENTIATED, false)
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

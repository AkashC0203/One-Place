const state = {
    isLoggedIn: false,
    userEmail: ''
  }
  
  const mutations = {
    login(state, email) {
      state.isLoggedIn = true
      state.userEmail = email
    },
    logout(state) {
      state.isLoggedIn = false
      state.userEmail = ''
    }
  }
  
  const actions = {
    login({ commit }, email) {
      commit('login', email)
    },
    logout({ commit }) {
      commit('logout')
    }
  }
  
  export default {
    state,
    mutations,
    actions
  }
  
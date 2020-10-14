import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null
  },
  //Mutations are functions that affect the state
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    }
  },
  //Action are function that we call throughout the entire application that call mutations
  actions: {
    setUser({commit}, user) {
      commit('SET_USER', user);
    }
  },
  modules: {
  }
})

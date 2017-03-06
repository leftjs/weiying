/**
 * Created by jason on 2017/2/27.
 */
export const state = {
  user: null
}

export const mutations = {
  setUser(state, user){
    state.user = user || null
  }
}

export const getters = {
  isAuthenticated (state) {
    return !!state.user
  },
  loggedUser (state) {
    return state.user
  }
}

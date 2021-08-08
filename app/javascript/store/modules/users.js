import axios from '../../plugins/axios.js'
const state = {
  currentUser: null
};
const getters = {
  getCurrentUser: state => state.currentUser
};
const mutations = {
  loginUser(state, user) {
    state.currentUser = user
  },
};
const actions = {
  async fetchCurrentUser({ commit, state }) {
    if (!localStorage.token) return null
    if (state.currentUser) return state.currentUser

    const res = await axios.get('users/me')
      .catch((err) => {
        return null
      })
    if (!res) return null

    const currentUser = res.data
    if (currentUser) {
      commit('loginUser', currentUser)
      return currentUser
    } else {
      commit('loginUser', null)
      return null
    }
  },
  async loginUser({commit}, user) {
    const res = await axios.post('login', user)
    localStorage.setItem('token', res.data.token)
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`
    commit('loginUser', res.data.user)
    console.log(res)
  },
  async updateUser({commit}, hash) {
    const res = await axios.patch(`users/${hash.id}`, hash.user)
    commit('loginUser', res.data)
    console.log(res)
  },
  logoutUser({commit}) {
    commit('loginUser', null)
    localStorage.removeItem('token')
    axios.defaults.headers.common['Authorization'] = ''
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
}

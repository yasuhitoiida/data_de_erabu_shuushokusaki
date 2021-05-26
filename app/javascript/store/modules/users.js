import axios from '../../plugins/axios.js'
const state = {
  loginUser: null
};
const getters = {
  loginUser: state => state.loginUser
};
const mutations = {
  loginUser(state, user) {
    state.loginUser = user
  },
};
const actions = {
  async fetchCurrentUser({ commit, state }) {
    if (!localStorage.token) return null
    if (state.loginUser) return state.loginUser

    // const res = await axios.get('users/me')
    // .catch((err) => {
    //   return null
    // })
    // console.log(res.data)
    // commit('loginUser', res.data)
    // return res.data

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
    console.log(res)
    commit('loginUser', res.data.user)
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

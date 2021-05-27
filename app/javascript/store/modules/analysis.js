import axios from '../../plugins/axios.js'
const state = {
  alternatives: null
}
const getters = {
  getAlternatives: state => state.alternatives
}
const mutations = {
  setAlternatives(state, array) {
    state.alternatives = array
  }
}
const actions = {
  setAlternatives({commit}, array) {
    commit('setAlternatives', array)
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
}

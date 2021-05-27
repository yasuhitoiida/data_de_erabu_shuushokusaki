import axios from '../../plugins/axios.js'
const state = {
  alternatives: null,
  criteria: null
}
const getters = {
  getAlternatives: state => state.alternatives,
  getCriteria: state => state.criteria
}
const mutations = {
  setAlternatives(state, array) {
    state.alternatives = array
  },
  setCriteria(state, array) {
    state.criteria = array
  }
}
const actions = {
  setAlternatives({commit}, array) {
    commit('setAlternatives', array)
  },
  setCriteria({commit}, array) {
    commit('setCriteria', array)
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
}

import axios from '../../plugins/axios.js'
const state = {
  alternatives: null,
  criteria: null,
  priority: null
}
const getters = {
  getAlternatives: state => state.alternatives,
  getCriteria: state => state.criteria,
  getPriority: state => state.priority
}
const mutations = {
  setAlternatives(state, array) {
    state.alternatives = array
  },
  setCriteria(state, array) {
    state.criteria = array
  },
  setPriority(state, hash) {
    state.priority = hash
  }
}
const actions = {
  setAlternatives({commit}, array) {
    commit('setAlternatives', array)
  },
  setCriteria({commit}, array) {
    commit('setCriteria', array)
  },
  setPriority({commit}, hash) {
    commit('setPriority', hash)
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
}

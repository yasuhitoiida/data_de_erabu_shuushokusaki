import axios from '../../plugins/axios.js'
const state = {
  alternatives: null,
  criteria: null,
  criterionImportances: null
}
const getters = {
  getAlternatives: state => state.alternatives,
  getCriteria: state => state.criteria,
  getCriterionImportances: state => state.criterionImportances
}
const mutations = {
  setAlternatives(state, array) {
    state.alternatives = array
  },
  setCriteria(state, array) {
    state.criteria = array
  },
  setCriterionImportances(state, hash) {
    state.criterionImportances = hash
  }
}
const actions = {
  setAlternatives({commit}, array) {
    commit('setAlternatives', array)
  },
  setCriteria({commit}, array) {
    commit('setCriteria', array)
  },
  setCriterionImportances({commit}, hash) {
    commit('setCriterionImportances', hash)
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
}

import axios from '../../plugins/axios.js'
const state = {
  alternatives: null,
  criteria: null,
  criterionImportances: null,
  alternativeEvaluations: null
}
const getters = {
  getAlternatives: state => state.alternatives,
  getCriteria: state => state.criteria,
  getCriterionImportances: state => state.criterionImportances,
  getAlternativeEvaluations: state => state.alternativeEvaluations
}
const mutations = {
  setAlternatives(state, array) {
    state.alternatives = array
  },
  setCriteria(state, array) {
    state.criteria = array
  },
  setCriterionImportances(state, array) {
    state.criterionImportances = array
  },
  setAlternativeEvaluations(state, array) {
    state.alternativeEvaluations = array
  }
}
const actions = {
  setAlternatives({commit}, array) {
    commit('setAlternatives', array)
  },
  setCriteria({commit}, array) {
    commit('setCriteria', array)
  },
  setCriterionImportances({commit}, array) {
    commit('setCriterionImportances', array)
  },
  setAlternativeEvaluations({commit}, array) {
    commit('setAlternativeEvaluations', array)
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
}

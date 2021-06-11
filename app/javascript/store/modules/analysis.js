import axios from '../../plugins/axios.js'
const state = {
  alternatives: null,
  criteria: null,
  criterionImportances: null,
  impRawData: null,
  alternativeEvaluations: null,
  evalRawData: null
}
const getters = {
  getAlternatives: state => state.alternatives,
  getCriteria: state => state.criteria,
  getCriterionImportances: state => state.criterionImportances,
  getImpRawData: state => state.impRawData,
  getAlternativeEvaluations: state => state.alternativeEvaluations,
  getEvalRawData: state => state.evalRawData
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
  setImpRawData(state, array) {
    state.impRawData = array
  },
  setAlternativeEvaluations(state, array) {
    state.alternativeEvaluations = array
  },
  setEvalRawData(state, array) {
    state.evalRawData = array
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
    commit('setCriterionImportances', hash.imp)
    commit('setImpRawData', hash.raw)
  },
  setAlternativeEvaluations({commit}, hash) {
    commit('setAlternativeEvaluations', hash.eval)
    commit('setEvalRawData', hash.raw)
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
}

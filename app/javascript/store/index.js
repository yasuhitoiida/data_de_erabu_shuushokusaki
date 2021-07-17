import Vue from 'vue'
import Vuex from 'vuex'
import users from './modules/users.js'
import analyses from './modules/analyses.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    users,
    analyses
  }
})

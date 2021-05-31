import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home.vue'
import Register from '../pages/Register.vue'
import Login from '../pages/Login.vue'
import MyPage from '../pages/MyPage.vue'
import AlternativeInput from '../pages/analysis/AlternativeInput.vue'
import CriterionSelect from '../pages/analysis/CriterionSelect.vue'
import CriterionImportance from '../pages/analysis/CriterionImportance.vue'
import AlternativeEvaluation from '../pages/analysis/AlternativeEvaluation.vue'
import Result from '../pages/analysis/Result.vue'
import store from '../store/index.js'

Vue.use(Router)

const router = new Router({
    mode: "history",
    routes: [{path: '/', component: Home},
             {path: '/register', component: Register},
             {path: '/login', component: Login},
             {path: '/mypage', component: MyPage, meta: { requiredAuth: true }},
             {path: '/analysis/step1', component: AlternativeInput},
             {path: '/analysis/step2', component: CriterionSelect},
             {path: '/analysis/step3', component: CriterionImportance},
             {path: '/analysis/step4', component: AlternativeEvaluation},
             {path: '/analysis/result', component: Result}]
})

router.beforeEach((to, from, next) => {
  store.dispatch('users/fetchCurrentUser').then((user) => {
    if (to.matched.some(record => record.meta.requiredAuth) && !user) {
      next('/login')
    } else {
      next()
    }
  })
})

export default router;

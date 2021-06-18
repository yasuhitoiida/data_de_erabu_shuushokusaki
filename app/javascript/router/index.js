import Vue from 'vue'
import Router from 'vue-router'
import Top from '../pages/TopPage.vue'
import Register from '../pages/RegisterPage.vue'
import Login from '../pages/LoginPage.vue'
import MyPage from '../pages/MyPage.vue'
import AlternativeInput from '../pages/analysis/AlternativeInput.vue'
import CriterionSelect from '../pages/analysis/CriterionSelect.vue'
import CriterionImportance from '../pages/analysis/CriterionImportance.vue'
import AlternativeEvaluation from '../pages/analysis/AlternativeEvaluation.vue'
import Result from '../pages/analysis/Result.vue'
import store from '../store/index.js'

Vue.use(Router)

const router = new Router({
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  mode: "history",
  routes: [{path: '/', component: Top},
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

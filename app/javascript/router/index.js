import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/home.vue'
import Register from '../pages/register.vue'
import Login from '../pages/login.vue'
import MyPage from '../pages/mypage.vue'
import AlternativeInput from '../pages/analysis/alternative_input.vue'
import CriteriaInput from '../pages/analysis/criteria_input.vue'
import store from '../store/index.js'

Vue.use(Router)

const router = new Router({
    mode: "history",
    routes: [{path: '/', component: Home},
             {path: '/register', component: Register},
             {path: '/login', component: Login},
             {path: '/mypage', component: MyPage, meta: { requiredAuth: true }},
             {path: '/analysis/step1', component: AlternativeInput},
             {path: '/analysis/step2', component: CriteriaInput}]
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

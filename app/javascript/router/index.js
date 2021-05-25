import Vue from 'vue';
import Router from 'vue-router';
import Register from '../pages/register.vue';

Vue.use(Router);

const router = new Router({
    mode: "history",
    // routes: [{path: '/', component: Home}],
    routes: [{path: '/register', component: Register}]
});

export default router;

import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from "../assets/js/nprogress";
Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/recommend'
    },
    {
        path: '/recommend',
        component: () => import('../components/recommend/recommend.vue'),
        children: [
            {
                /*忘了这个是什么意思*/
                path: ':id',
                component: () => import('../components/disc/disc.vue')
            }
        ]
    },
    {
        path: '/singer',
        component: () => import('../components/singer/singer.vue'),
        children:[
            {
                /*从/singer到这个路由的时候带参数  this.$router.push({path:`/singer/${singer.id}`}) 后面可以直接拿到id;*/
                path: 'singerDetail:id',
                component:()=>import('../components/singerDetail/singerDetail')
            }
        ]
    },
    {
        path: '/rank',
        component: () => import('../components/rank/rank.vue'),
    },
    {
        path: '/search',
        component: () => import('../components/search/search.vue'),
    },
    {
        path:'/login',
        component: () => import('../components/login/login.vue'),
    },
    {
        path:'/selfInformation',
        component: () => import('../components/selfInformation/selfInformation.vue'),
    }
];

const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
    try {
        NProgress.start();
    }catch (e) {
        console.log(e);
    }
    next();
});


router.afterEach((to, from) => {
    try {
        NProgress.done();
    }catch (e) {
        console.log(e);
    }
});

export default router;

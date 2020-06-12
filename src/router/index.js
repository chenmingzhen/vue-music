import Vue from "vue";
import VueRouter from "vue-router";

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
    }
];

const router = new VueRouter({
    routes
});

export default router;

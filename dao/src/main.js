import { createApp, h } from 'vue';
import * as VueRouter from 'vue-router';
import App from './App.vue';
const app = createApp({
    render: () => h(App)
});
/**
 * 引入全局样式
 */
import './assets/css/common.css'
/**
 * Element-plus
 */
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElementPlus)
    /**
     * SVG
     */
import "@/svgIcon/index";
import svgIcon from "@/svgIcon/index.vue";
app.component('svg-icon', svgIcon);

/**
 * Vue-router
 */
import Home from './components/Home.vue'
import Ranking from './components/Ranking.vue'
import Decisions from './components/Decisions.vue'
import System from './components/System.vue'
import Me from './components/Me.vue'
import Job from './components/Job.vue'
import Reward from './components/Reward.vue'
import Approval from './components/Approval.vue'
const routes = [
        { path: '/', component: Home },
        { path: '/ranking', component: Ranking },
        { path: '/decisions', component: Decisions },
        { path: '/system', component: System },
        { path: '/me', component: Me },
        { path: '/job', component: Job },
        { path: '/reward', component: Reward },
        { path: '/Approval', component: Approval },
    ]
    //创建路由实例并传递 `routes` 配置
const router = VueRouter.createRouter({
    // 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})
app.use(router) //整个应用支持路由。


app.mount('#app')
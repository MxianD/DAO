import { createApp, h } from 'vue'
import * as VueRouter from 'vue-router';
import App from './App.vue';
/**
 * Vue-router
 */
import Home from './components/Home.vue'
import Ranking from './components/Ranking.vue'
import Decisions from './components/Decisions.vue'
import System from './components/System.vue'
const routes = [
        { path: '/', component: Home },
        { path: '/ranking', component: Ranking },
        { path: '/decisions', component: Decisions },
        { path: '/system', component: System }
    ]
    //创建路由实例并传递 `routes` 配置
const router = VueRouter.createRouter({
    // 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHashHistory(),
    routes, // `routes: routes` 的缩写
})




const app = createApp({
    render: () => h(App)
});


app.use(router) //整个应用支持路由。


app.mount('#app')
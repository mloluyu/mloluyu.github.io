import { createApp } from 'vue'
import { createRouter, createWebHashHistory} from 'vue-router'
import './style.css'
import App from './App.vue'
import apiClient from './api'
import Home from './views/Home.vue'
//import Article from './views/Article.vue'

const routes = [
    { path: '/', name: 'Home', component: Home },
    { 
        path: '/article/:slug', 
        name: 'Article', 
        component: () => import('./views/Article.vue'),
        beforeEnter: async (to, from, next) => {
            try {
                const response = await apiClient.get(`/posts/${to.params.slug}/`)
                // 2. 将数据存入 to.meta，这样组件里可以直接拿，不需要再请求一次
                to.meta.postData = response.data
                next() // 只有执行 next() 才会真正跳转
            } catch (error) {
                console.error('数据加载失败', error)
                next('/404')
            }
        }
    },
    { path: '/categories/:slug', name: 'Category', component: Home },
    { path: '/about', name: 'About', component: () => import('./views/About.vue') },
    { path: '/friends', name: 'Friends', component: () => import('./views/Friends.vue') },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('./views/NotFound.vue') },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            // 如果是点击浏览器的“前进/后退”，则回到之前保存的位置
            return savedPosition;
        } else {
            // 如果是普通跳转，直接滚到顶部
            return { top: 0, behavior: 'smooth' }; // behavior: 'smooth' 是平滑滚动
        }
    }
})



createApp(App).use(router).mount('#app')

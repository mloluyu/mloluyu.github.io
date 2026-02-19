import { createApp } from 'vue'
import { createRouter, createWebHashHistory} from 'vue-router'
import './style.css'
import App from './App.vue'
//import Home from './views/Home.vue'
//import Article from './views/Article.vue'

const routes = [
    { path: '/', component: () => import('./views/Home.vue') },
    { path: '/article/:id', component: () => import('./views/Article.vue') },
    { path: '/about', component: () => import('./views/About.vue') },
    { path: '/:pathMatch(.*)*', component: () => import('./views/NotFound.vue') },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})



createApp(App).use(router).mount('#app')

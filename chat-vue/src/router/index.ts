import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/Chat',
      component: () => import('../views/ChatView.vue')
    },
    {
      path: '/PilihChat',
      component: () => import('../views/UserChatView.vue')
    },
    {
      path: '/Transfer',
      component: () => import('../views/MenuUtama.vue')
    }
  ]
})

export default router

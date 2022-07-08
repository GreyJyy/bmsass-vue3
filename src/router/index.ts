import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/index.vue'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/dashboard',
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('@/views/Dashboard/index.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login/index.vue')
    },
    { path: '/404', name: '404', component: import('@/views/404.vue') },
    // 404 page must be placed at the end
    { path: '/:pathMatch(.*)', redirect: '/404' }
  ]
})
export default router

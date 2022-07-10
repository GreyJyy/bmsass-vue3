import { createRouter, createWebHashHistory } from 'vue-router'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/layout/index.vue'),
      redirect: '/dashboard',
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('@/views/Dashboard/index.vue'),
          children: [
            {
              path: 'categories',
              name: 'categories',
              component: () => import('@/views/Categories/index.vue')
            },
            {
              path: 'users',
              name: 'users',
              component: () => import('@/views/Users/index.vue')
            },
            {
              path: 'roles',
              name: 'roles',
              component: () => import('@/views/Roles/index.vue')
            },
            {
              path: 'rights',
              name: 'rights',
              component: () => import('@/views/Rights/index.vue')
            },
            {
              path: 'goods',
              name: 'goods',
              component: () => import('@/views/Goods/index.vue')
            },
            {
              path: 'params',
              name: 'params',
              component: () => import('@/views/Params/index.vue')
            },
            {
              path: 'orders',
              name: 'orders',
              component: () => import('@/views/Orders/index.vue')
            },
            {
              path: 'reports',
              name: 'reports',
              component: () => import('@/views/Reports/index.vue')
            }
          ]
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

import {RouteRecordRaw,createRouter, createWebHistory} from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('../views/main.vue'),
    redirect: '/main/pic',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('../views/home/index.vue')
      },
      {
        path: 'pic',
        name: 'pic',
        component: () => import('../views/pic/index.vue')
      }
    ]
  },
  
]

export default createRouter({
  history: createWebHistory(),
  routes
})
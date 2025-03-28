import AppCreateView from '@/views/AppCreateView.vue'
import AppTasksView from '@/views/AppTasksView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/tasks', component: AppTasksView, alias: '/home' },
  { path: '/create-form', component: AppCreateView }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

export default router

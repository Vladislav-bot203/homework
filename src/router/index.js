import AppCreateView from '@/views/AppCreateView.vue'
import AppTasksView from '@/views/AppTasksView.vue'
import AppTaskView from '@/views/AppTaskView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import NotFoundPageView from '@/views/NotFoundPageView.vue'

const routes = [
  {
    path: '/',
    component: AppTasksView,
    alias: '/tasks',
    children: [
      { path: ':id', component: AppTaskView, props: true }
    ]
  },
  { path: '/create-form', component: AppCreateView },
  { path: '/:pathMatch(.*)*', component: NotFoundPageView, name: 'NotFoundPageView' }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

export default router

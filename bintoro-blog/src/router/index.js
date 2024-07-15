import { createRouter, createWebHistory } from 'vue-router'
import BlogList from '../components/BlogList.vue'
import BlogView from '../components/BlogView.vue'
import BlogAdd from '../components/BlogAdd.vue'

const routes = [
  { path: '/', name: 'list', component: BlogList },
  { path: '/view/:id', name: 'view', component: BlogView },
  { path: '/add', name: 'add', component: BlogAdd }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

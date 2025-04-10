import { createRouter, createWebHistory } from 'vue-router'
import SignUp from '../components/SignUp.vue'

const routes = [
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

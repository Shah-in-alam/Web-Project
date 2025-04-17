import { createRouter, createWebHistory } from 'vue-router'
import SignUp from '../components/SignUp.vue'
import SignIn from '../components/SignIn.vue'
import Home from '../components/Home.vue'
import Booking from '../components/Booking.vue'
import Campaign from '../components/Campaign.vue'
import Feature from '../components/Feature.vue'
import Review from '../components/Review.vue'
import ForgetPassword from '../components/ForgetPassword.vue'

const routes = [
  { path: '/signup', name: 'SignUp', component: SignUp },
  { path: '/signin', name: 'SignIn', component: SignIn },
  { path: '/', name: 'Home', component: Home },
  { path: '/booking', name: 'Booking', component: Booking },
  { path: '/campaign', name: 'Campaign', component: Campaign },
  { path: '/feature', name: 'Feature', component: Feature },
  { path: '/review', name: 'Review', component: Review },
  {path: '/forget-password',component: ForgetPassword},
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../components/AdminPage.vue'),
    beforeEnter: (to, from, next) => {
      const user = JSON.parse(localStorage.getItem('user'))
      if (user?.is_admin === true || user?.is_admin === 1) {
        next()
      } else {
        next('/') // Redirect to home if not admin
      }
    }
  }
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

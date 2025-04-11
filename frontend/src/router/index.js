import { createRouter, createWebHistory } from 'vue-router'
import SignUp from '../components/SignUp.vue'
import SignIn from '../components/SignIn.vue'
import Home from '../components/Home.vue'
import Booking from '../components/Booking.vue'
import Campaign from '../components/Campaign.vue'
import Feature from '../components/Feature.vue'
import Review from '../components/Review.vue'
import AdminPage from '../components/AdminPage.vue';
const routes = [
  { path: '/signup', name: 'SignUp', component: SignUp },
  { path: '/signin', name: 'SignIn', component: SignIn },
  { path: '/', name: 'Home', component: Home },
  { path: '/booking', name: 'Booking', component: Booking },
  { path: '/campaign', name: 'Campaign', component: Campaign },
  { path: '/feature', name: 'Feature', component: Feature },
  { path: '/review', name: 'Review', component: Review },
  { path: '/admin', component: AdminPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

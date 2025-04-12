<template>
  <div id="app">
    <Navbar v-if="isAuthenticated" />

    <div v-if="isAuthenticated && isAdmin && $route.path === '/admin'" >
      <h2 style="text-align: center">Welcome Admin 👑</h2>
    </div>

    <div v-else-if="!isAuthenticated && isWelcomePage" class="welcome">
      <h2>Welcome to my booking website</h2>
      <router-link to="/signin">Sign In</router-link> |
      <router-link to="/signup">Sign Up</router-link>
    </div>

    <!-- Only ONE router view -->
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  components: { Navbar },
  computed: {
    isAuthenticated() {
      return !!localStorage.getItem('user')
    },
    isAdmin() {
      const user = JSON.parse(localStorage.getItem('user'))
      return user && (user.is_admin === true || user.is_admin === 1)
    },
    isWelcomePage() {
      const route = this.$route.path
      return route === '/signin' || route === '/signup'
    }
  }
}
</script>

<style scoped>
.welcome {
  text-align: center;
  margin-top: 2rem;
}
</style>

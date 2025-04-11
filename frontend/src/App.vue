<template>
  <div id="app">
    <!-- If user is authenticated -->
    <div v-if="isAuthenticated">
      <Navbar />
      <router-view />
    </div>

    <!-- If not authenticated and on welcome-related routes -->
    <div v-else-if="isWelcomePage" class="welcome">
      <h2>Welcome to my booking website</h2>
      <router-link to="/signin">Sign In</router-link> |
      <router-link to="/signup">Sign Up</router-link>
      <router-view />
    </div>
    <div v-else>
      <router-view />
    </div>
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


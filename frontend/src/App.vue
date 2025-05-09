<template>
 <div class="welcomepage">
  <div id="app">
    <Navbar v-if="isAuthenticated" />

    <div v-if="isAuthenticated && isAdmin && $route.path === '/admin'" >
    </div>

    <div v-else-if="!isAuthenticated && isWelcomePage" class="welcome">
      <h2 class="wel">✨ Welcome to Campaign Website ✨</h2>
      <router-link to="/signin"><button class="btn">Sign In</button></router-link>  
      <router-link to="/signup"><button class="btn">Sign Up</button></router-link>
    </div>

    <!-- Only ONE router view -->
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
.welcomepage {
  background-image: url('@/assets/proxy-image.png'); /* Use the image from the assets folder */
  background-size: cover; /* Ensure the image covers the entire background */
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Prevent the image from repeating */
  height: 900px;
}

.welcome {
  text-align: center;
  margin-top: 2rem;
}

.btn {
  background-color: #4fc3f7;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.btn:hover {
  background-color: #29b6f6;
  transform: translateY(-2px);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.15);
}

.wel {
  text-align: center;
  font-size: 2.2rem;
  color: #2e7d32;
  margin: 2rem 0;
  font-weight: bold;
  font-family: 'Segoe UI', sans-serif;
  background: linear-gradient(90deg, #a7ffeb, #64ffda, #1de9b6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: fadeInUp 1s ease-out;
  letter-spacing: 1px;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

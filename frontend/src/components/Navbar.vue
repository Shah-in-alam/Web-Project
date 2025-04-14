<template>
  <nav class="navbar">
    <!-- If user is logged in, show full navbar -->
    <div v-if="isLoggedIn">
      <router-link to="/">Home</router-link>
      <router-link to="/booking">Booking</router-link>
      <router-link to="/campaign">Campaign</router-link>
      <router-link to="/feature">Feature</router-link>
      <router-link to="/review">Review</router-link>
      <router-link v-if="user && user.is_admin === 1" to="/admin">Admin</router-link>
      <a href="#" @click.prevent="logout">Logout</a>
    </div>

    <!-- If NOT logged in, show only Sign In / Sign Up -->
    <div v-else>
      <router-link to="/signup">Sign Up</router-link>
      <router-link to="/signin">Sign In</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AppNavbar',
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem('user')
    },
    user() {
      return JSON.parse(localStorage.getItem('user')); 
   }
  },
  methods: {
    logout() {
      localStorage.removeItem('user')
      this.$router.push('/signin')
    }
  },
  
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  padding: 12px;
  background-color: #f2f2f2;
  font-weight: bold;
  width: 100vw;
  box-sizing: border-box;
}

/* Style for router-link and a tags */
.navbar a,
.navbar router-link {
  text-decoration: none;
  color: black;
  background-color: gray;
  padding: 8px 16px;
  border-radius: 6px;
  transition: background-color 0.3s ease;
}

/* Hover effect */
.navbar a:hover,
.navbar router-link:hover {
  background-color: green;
  color: white;
}


</style>

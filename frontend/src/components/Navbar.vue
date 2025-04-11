<template>
  <nav>
    <!-- If user is logged in, show full navbar -->
    <div v-if="isLoggedIn">
      <router-link to="/">Home</router-link>
      <router-link to="/booking">Booking</router-link>
      <router-link to="/campaign">Campaign</router-link>
      <router-link to="/feature">Feature</router-link>
      <router-link to="/review">Review</router-link>
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
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('user')
      this.$router.push('/signin')
    }
  }
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: center;       /* Center links horizontally */
  align-items: center;           /* Center items vertically */
  gap: 2rem;                     /* Spacing between links */
  padding: 10px;
  background-color: #f2f2f2;
  font-weight: bold;
  text-align: center;
  width: 100%;                   /* Full width for centering */
  box-sizing: border-box;        /* Prevent overflow */
}
</style>

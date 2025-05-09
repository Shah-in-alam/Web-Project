<template>
  <nav class="navbar">
    <!-- Logo -->
    <div class="logo-container">
      <img src="@/assets/logo1.png" alt="Logo" class="logo" />
    </div>

    <!-- If user is logged in, show full navbar -->
    <div v-if="isLoggedIn" class="nav-links">
      <router-link to="/" exact-active-class="active-link">Home</router-link>
      <router-link to="/booking" exact-active-class="active-link">Booking</router-link>
      <router-link to="/campaign" exact-active-class="active-link">Campaign</router-link>
      <router-link to="/feature" exact-active-class="active-link">Feature</router-link>
      <router-link to="/review" exact-active-class="active-link">Review</router-link>
      <router-link v-if="user && user.is_admin === 1" to="/admin" exact-active-class="active-link">Admin</router-link>
      <a href="#" @click.prevent="logout">Logout</a>
    </div>

    <!-- If NOT logged in, show only Sign In / Sign Up -->
    <div v-else class="nav-links">
      <router-link to="/signup" exact-active-class="active-link">Sign Up</router-link>
      <router-link to="/signin" exact-active-class="active-link">Sign In</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AppNavbar',
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem('user');
    },
    user() {
      return JSON.parse(localStorage.getItem('user'));
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('user');
      this.$router.push('/signin');
    }
  }
};
</script>

<style scoped>
/* Navbar container */
.navbar {
  display: flex;
  justify-content: space-between; /* Space between logo and links */
  align-items: center;
  gap: 1.5rem;
  padding: 12px 20px;
  background: linear-gradient(90deg, #42a5f5, #66bb6a);
  color: white;
  font-weight: bold;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Logo container */
.logo-container {
  display: flex;
  align-items: center;
}

.logo {
  width: 50px;
  height: 50px;
  border-radius: 50%; /* Make the logo circular */
  object-fit: cover; /* Ensure the image fits within the circle */
}

/* Links container */
.nav-links {
  display: flex;
  gap: 1rem;
}

/* Style for router-link and a tags */
.navbar a,
.navbar router-link {
  text-decoration: none;
  color: white;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 8px 16px;
  border-radius: 6px;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

/* Hover effect */
.navbar a:hover,
.navbar router-link:hover {
  background-color: rgba(255, 255, 255, 0.4);
  transform: translateY(-2px);
}

/* Active link style */
.active-link {
  background-color: rgba(255, 255, 255, 0.6);
  color: black;
  font-weight: bold;
}

/* Responsive design */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    gap: 1rem;
  }

  .nav-links {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>

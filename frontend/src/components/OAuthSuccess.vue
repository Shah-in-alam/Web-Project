<template>
  <div class="oauth-success">
    <h2>✅ Google Sign-In Successful!</h2>
    <p>Redirecting to your dashboard...</p>
  </div>
</template>

<script>
export default {
  name: "OAuthSuccess",
  mounted() {
    // ✅ Extract user info from query parameters
    const { name, email, id } = this.$route.query;

    if (name && email && id) {
      // Save user info to localStorage (simulate login)
      const user = { name, email, user_id: id, is_admin: 0 };
      localStorage.setItem('user', JSON.stringify(user));
      window.dispatchEvent(new Event('storage'));

      // ✅ Redirect to the home/dashboard
      this.$router.push('/');
    } else {
      // Redirect to login if something went wrong
      this.$router.push('/signin');
    }
  }
}
</script>

<style scoped>
.oauth-success {
  text-align: center;
  margin-top: 100px;
  font-family: Arial, sans-serif;
}
</style>


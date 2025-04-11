<template>
  <div class="signin">
  
    <h2>Sign In</h2>
    <form @submit.prevent="handleSignIn">
      <input v-model="form.email" type="email" placeholder="Email" required />
      <input v-model="form.password" type="password" placeholder="Password" required />
      <button type="submit">Sign In</button>
    </form>
    <a href="#" @click.prevent="Forget">Forget Password?</a>
    <p v-if="message" style="color: green">{{ message }}</p>
    <p v-if="error" style="color: red">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SignIn',
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      message: '',
      error: ''
    }
  },
  methods: {
    async handleSignIn() {
      this.message = ''
      this.error = ''
      try {
        const { email, password } = this.form
        const response = await axios.post('http://localhost:3000/users/signin', { email, password })
        localStorage.setItem('user', JSON.stringify(response.data.user))
        this.$router.push('/')
      } catch (err) {
        this.error = err.response?.data?.error || 'Sign in failed!'
      }
    }
  }
}
</script>

<style scoped>
.signin {
  max-width: 400px;
  margin: auto;
  padding-top: 2rem;
}
input {
  display: block;
  margin: 10px 0;
  padding: 8px;
  width: 100%;
}
button {
  padding: 10px;
  background-color: #42b983;
  color: white;
  border: none;
}
</style>

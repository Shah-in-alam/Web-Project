<template>
  <div class="signin-box">
    <h2>Sign In</h2>
    <form @submit.prevent="handleSignIn">
      <input v-model="form.email" type="email" placeholder="Email" required />
      <input v-model="form.password" type="password" placeholder="Password" required />
      <button type="submit">Sign In</button>
    </form>
    <router-link to="/forget-password" class="forget-link">Forget Password?</router-link>

    <p v-if="message" class="success">{{ message }}</p>
    <p v-if="error" class="error">{{ error }}</p>
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
        const user=response.data.user
       localStorage.setItem('user', JSON.stringify(user))
       window.dispatchEvent(new Event("storage"))
        if (user.is_admin === true || user.is_admin === 1) {
          this.$router.push('/admin')
        } else {
          this.$router.push('/')
        }
        
      } catch (err) {
        this.error = err.response?.data?.error || 'Sign in failed!'
      }
    }
  }
}
</script>

<style scoped>
.signin-box {
  background-color: #d4edda; /* Light green */
  padding: 2rem;
  border-radius: 10px;
  width: 400px;
  margin: 2rem auto;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

input {
  display: block;
  margin: 10px auto;
  padding: 10px;
  width: 90%;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  background-color: #42b983;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #369b73;
}

.forget-link {
  display: block;
  margin-top: 10px;
  color: #007bff;
  text-decoration: underline;
  cursor: pointer;
}

.success {
  color: green;
}

.error {
  color: red;
}
</style>
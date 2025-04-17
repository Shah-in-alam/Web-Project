<template>
  <div class="forget-container">
    <form @submit.prevent="handleReset">
      <h2>Reset Password</h2>

      <input
        v-model="email"
        type="email"
        placeholder="Enter your email"
        required
      />

      <input
        v-model="newPassword"
        type="password"
        placeholder="Enter new password"
        required
      />

      <button type="submit">Reset Password</button>

      <p v-if="message" class="success">{{ message }}</p>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ForgetPassword',
  data() {
    return {
      email: '',
      newPassword: '',
      message: '',
      error: ''
    }
  },
  methods: {
    async handleReset() {
      this.message = ''
      this.error = ''
      try {
        const res = await axios.post('http://localhost:3000/users/reset-password', {
          email: this.email,
          newPassword: this.newPassword
        })
        this.message = res.data.message || 'Password reset successful!'
      } catch (err) {
        this.error = err.response?.data?.error || 'Reset failed.'
      }
    }
  }
}
</script>

<style scoped>
.forget-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #42b983;
}

form {
  background: #d4edda;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
  width: 350px;
  text-align: center;
}

input {
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button {
  background: #42b983;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background: #369b73;
}

.success {
  color: green;
}

.error {
  color: red;
}
</style>


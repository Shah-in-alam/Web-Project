<template>
  <div class="forget-container">
    <form @submit.prevent="handleReset" class="forget-form">
      <h2><i class="fas fa-unlock-alt"></i> Reset Password</h2>

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

      <router-link to="/signin" class="login-link">Back to Login</router-link>

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
  min-height: 100vh;
  background: linear-gradient(135deg, #43cea2 0%, #185a9d 100%);
}

.forget-form {
  background: #fff;
  padding: 2.5rem 2rem 2rem 2rem;
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(60, 60, 60, 0.13);
  width: 350px;
  text-align: center;
  animation: fadeInDown 0.7s;
}

h2 {
  color: #185a9d;
  margin-bottom: 1.5rem;
  font-size: 1.6rem;
  font-weight: bold;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

input {
  width: 100%;
  margin: 12px 0;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #b2dfdb;
  font-size: 16px;
  background: #f9fbe7;
  transition: border-color 0.3s, box-shadow 0.3s;
}

input:focus {
  outline: none;
  border-color: #43cea2;
  box-shadow: 0 0 0 2px #43cea2;
}

button {
  background: linear-gradient(90deg, #43cea2, #185a9d);
  color: #fff;
  padding: 12px;
  border: none;
  width: 100%;
  border-radius: 8px;
  font-size: 17px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(67, 160, 71, 0.08);
  transition: background 0.3s, transform 0.2s;
  margin-top: 10px;
}

button:hover {
  background: linear-gradient(90deg, #185a9d, #43cea2);
  transform: translateY(-2px) scale(1.03);
}

.login-link {
  display: inline-block;
  margin-top: 1rem;
  color: #185a9d;
  text-decoration: underline;
  font-size: 1rem;
  transition: color 0.2s;
}

.login-link:hover {
  color: #43cea2;
}

.success {
  color: #2e7d32;
  margin-top: 1rem;
  font-weight: bold;
}

.error {
  color: #c0392b;
  margin-top: 1rem;
  font-weight: bold;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>


<template>
    <div class="signup">
      <h2>Sign Up</h2>
      <form @submit.prevent="handleSignUp">
        <input v-model="form.user_id" placeholder="User ID" required />
        <input v-model="form.name" placeholder="Name" required />
        <input v-model="form.email" type="email" placeholder="Email" required />
        <input v-model="form.password" type="password" placeholder="Password" required />
        <input v-model="form.phone" placeholder="Phone" required />
        <input v-model="form.address" placeholder="Address" required />
        <button type="submit">Sign Up</button>
      </form>
      <p v-if="message" style="color: green">{{ message }}</p>
      <p v-if="error" style="color: red">{{ error }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    name: 'SignUp',
    data() {
      return {
        form: {
          user_id: '',
          name: '',
          email: '',
          password: '',
          phone: '',
          address: ''
        },
        message: '',
        error: ''
      }
    },
    methods: {
      async handleSignUp() {
        this.message = ''
        this.error = ''
        try {
          const res = await axios.post('http://localhost:3000/users/signup', this.form)
          this.message = res.data.message
        } catch (err) {
          this.error = err.response?.data?.message || 'Signup failed!'
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .signup {
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
  
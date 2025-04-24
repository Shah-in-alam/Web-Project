<template>
  <div class="booking-container">
    <Navbar />
    <div class="booking-form">
    
      <h2> 📅 Create a Booking</h2>

      <form @submit.prevent="submitBooking">
        <input v-model="form.booking_id" placeholder="Booking ID" required />
        <input v-model="form.spot_id" type="number" placeholder="Spot ID" required />
        <input v-model="form.name" placeholder="Name" required />
        <input v-model="form.price" type="number" placeholder="Price" required />
        <input v-model="form.amount" type="number" placeholder="Amount" required />
        <input v-model="form.check_in" type="datetime-local" placeholder="Check In" required />
        <input v-model="form.check_out" type="datetime-local" placeholder="Check Out" required />

        <!-- User ID is hidden but automatically filled -->
        <input type="hidden" v-model="form.user_id" />

        <button type="submit">Book Now</button>
      </form>

      <p v-if="success" class="success">{{ success }}</p>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Navbar from './Navbar.vue';

export default {
  name: 'BookingPage',
  components: { Navbar },
  data() {
    return {
      form: {
        booking_id: '',
        spot_id: '',
        name: '',
        price: '',
        amount: '',
        check_in: '',
        check_out: '',
        user_id: ''
      },
      success: '',
      error: ''
    };
  },
  mounted() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.user_id) {
      this.form.user_id = user.user_id;
    }
  },
  methods: {
    async submitBooking() {
      this.success = '';
      this.error = '';

      const payload = {
        booking_id: this.form.booking_id,
        spot_id: parseInt(this.form.spot_id),
        name: this.form.name,
        price: parseFloat(this.form.price),
        amount: parseInt(this.form.amount),
        check_in: new Date(this.form.check_in),
        check_out: new Date(this.form.check_out),
        user_id: this.form.user_id
      };

      try {
        const response = await axios.post('http://localhost:3000/booking', payload);
        this.success = response.data.message;
        this.clearForm();
      } catch (err) {
        this.error = err.response?.data?.error || 'Failed to create booking.';
        console.error('❌ Booking Error:', err);
      }
    },
    clearForm() {
      this.form = {
        booking_id: '',
        spot_id: '',
        name: '',
        price: '',
        amount: '',
        check_in: '',
        check_out: '',
        user_id: this.form.user_id // Keep user_id
      };
    }
  }
};
</script>

<style scoped>
.booking-container {
  background: linear-gradient(to bottom, #d4edda, #a8f0b0);
  min-height: 100vh;
  padding: 2rem;
  font-family: 'Segoe UI', sans-serif;
  
}
.user-header {
  text-align: left;
  font-size: 1rem;
  color: #2e7d32;
  margin-bottom: 1rem;
}
.booking-form {
  background-color: white;
  max-width: 600px;
  margin: auto;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 1rem;
  color: #2e7d32;
}

input {
  display: block;
  margin-bottom: 12px;
  padding: 10px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
}

input:focus {
  outline: none;
  border-color: #42b983;
  box-shadow: 0 0 0 2px rgba(66, 185, 131, 0.2);
}

button {
  padding: 12px;
  background-color: #42b983;
  color: white;
  border: none;
  width: 100%;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

button:hover {
  background-color: #369a6e;
}

.success {
  text-align: center;
  color: #2e7d32;
  margin-top: 1rem;
  font-weight: bold;
}

.error {
  text-align: center;
  color: #c0392b;
  margin-top: 1rem;
  font-weight: bold;
}
</style>

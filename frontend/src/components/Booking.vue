<template>
  <div class="booking-container">
  <Navbar />
  <div class="booking-form">
    <h2>Create a Booking</h2>

    <form @submit.prevent="submitBooking">
      <input v-model="form.booking_id" placeholder="Booking ID" required />
      <input v-model="form.spot_id" placeholder="Spot ID" required />
      <input v-model="form.name" placeholder="Name" required />
      <input v-model="form.price" type="number" placeholder="Price" required />
      <input v-model="form.amount" type="number" placeholder="Amount" required />
      <input v-model="form.check_in" type="datetime-local" placeholder="Check In" required />
      <input v-model="form.check_out" type="datetime-local" placeholder="Check Out" required />
      <input v-model="form.user_id" placeholder="User ID (e.g., shahin123)" required />

      <button type="submit">Book Now</button>
    </form>

    <p v-if="success" style="color: green">{{ success }}</p>
    <p v-if="error" style="color: red">{{ error }}</p>
  </div>
  </div>
</template>

<script>
import axios from 'axios';
import Navbar from './Navbar.vue'
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
  methods: {
    async submitBooking() {
      this.success = '';
      this.error = '';

      try {
        const response = await axios.post('http://localhost:3000/booking', this.form);
        this.success = response.data.message;
        this.clearForm();
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to create booking.';
        console.error('Error:', err);
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
        user_id: ''
      };
    }
  }
};
</script>

<style scoped>
.booking-container{
  background-color: #d4edda; /* Light green */
  min-height: 100vh;
  padding: 20px;
}
.booking-form {
  max-width: 500px;
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
  cursor: pointer;
}
</style>

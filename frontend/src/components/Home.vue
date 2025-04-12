<template>
  <div class="home-container">
    <Navbar />
     <div class="center-text">
      <h1>Welcome to Home</h1>
      <h2>Booking Overview</h2>
    </div>
    <div v-if="loading">Loading...</div>
    <div v-if="error" style="color: red">{{ error }}</div>

    <table v-if="bookings.length" class="booking-table">
      <thead>
        <tr>
          <th>Booking ID</th>
          <th>User</th>
          <th>Spot ID</th>
          <th>Name</th>
          <th>Price</th>
          <th>Amount</th>
          <th>Check In</th>
          <th>Check Out</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="booking in bookings" :key="booking.booking_id">
          <td>{{ booking.booking_id }}</td>
          <td>{{ booking.user?.name }}</td>
          <td>{{ booking.spot_id }}</td>
          <td>{{ booking.name }}</td>
          <td>{{ booking.price }}</td>
          <td>{{ booking.amount }}</td>
          <td>{{ formatDate(booking.check_in) }}</td>
          <td>{{ formatDate(booking.check_out) }}</td>
          <td>{{ booking.status }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Cancel Booking Section -->
    <div class="cancel-section">
      <h3>Cancel a Booking</h3>
      <input v-model="cancelId" placeholder="Enter booking ID" />
      <button @click="cancelBooking">Cancel Booking</button>
      <p v-if="cancelMessage" style="color: green">{{ cancelMessage }}</p>
      <p v-if="cancelError" style="color: red">{{ cancelError }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Navbar from './Navbar.vue'

export default {
  name: 'HomePage',
  components: { Navbar },
  data() {
    return {
      bookings: [],
      loading: true,
      error: '',
      cancelId: '',
      cancelMessage: '',
      cancelError: ''
    }
  },
  methods: {
    async fetchBookings() {
      try {
        const res = await axios.get('http://localhost:3000/home')
        this.bookings = res.data.bookings
        this.loading = false
      } catch (err) {
        this.error = err.response?.data?.error || 'Failed to load bookings'
        this.loading = false
      }
    },
    formatDate(dateStr) {
      const date = new Date(dateStr)
      return date.toLocaleDateString()
    },
    async cancelBooking() {
      this.cancelMessage = ''
      this.cancelError = ''
      if (!this.cancelId.trim()) {
        this.cancelError = 'Please enter a valid booking ID'
        return
      }

      try {
        const res = await axios.patch(`http://localhost:3000/booking/cancel/${this.cancelId}`)
        this.cancelMessage = res.data.message
        this.fetchBookings() // Refresh list
      } catch (err) {
        this.cancelError = err.response?.data?.details || 'Failed to cancel booking'
      }
    }
  },
  mounted() {
    this.fetchBookings()
  }
}
</script>

<style scoped>
.home-container {
  background-color: #d4edda; /* Light green */
  min-height: 100vh;
  padding: 20px;
}
.center-text {
  text-align: center;
  margin-top: 20px;
   
}
.center-text h1{
  color:darkgreen;
}
.booking-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.booking-table th,
.booking-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: center;
}

.booking-table th {
  background-color: #e9ecef;
  font-weight: bold;
}

.booking-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.booking-table tr:hover {
  background-color: #f1f1f1;
}

.cancel-section {
  margin-top: 40px;
  text-align: left;
}

.cancel-section input {
  padding: 8px;
  width: 200px;
  margin-right: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.cancel-section button {
  padding: 8px 16px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.cancel-section button:hover {
  background-color: #c82333;
}
</style>

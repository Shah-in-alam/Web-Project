<template>
  <div class="home-container">
    <Navbar />
      
    <div class="center-text">
        <div class="user-header">
      <p>👤 Welcome, {{ username }}</p>
    </div>
      <h2>Your Bookings</h2>
    </div>
 
     
    <div v-if="error" class="error">{{ error }}</div>

    <div v-if="bookings.length" class="booking-grid">
      <div class="booking-card" v-for="booking in bookings" :key="booking.booking_id">
        <img :src="booking.campaign.feature.image_url" alt="Booking Image" class="booking-image" style="width: 300px; height: 200px; object-fit: cover; border-radius: 10px" />
        <div class="booking-details">
          <h3>{{ booking.campaign.name }}</h3>
          <p><strong>Description:</strong> {{ booking.campaign.feature.description }}</p>
          <p><strong>Booking Id:</strong> {{ booking.booking_id }}</p>
          <p><strong>Price:</strong> ${{ booking.price }}</p>
          <p><strong>Amount:</strong> {{ booking.amount }}</p>
          <p><strong>Check In:</strong> {{ formatDate(booking.check_in) }}</p>
          <p><strong>Check Out:</strong> {{ formatDate(booking.check_out) }}</p>
          <p><strong>Status:</strong> {{ booking.status }}</p>
        </div>
      </div>
    </div>

    <!-- Cancel Booking -->
    <div class="cancel-section">
      <h3>Cancel a Booking</h3>
      <input v-model="cancelId" placeholder="Enter booking ID" />
      <button @click="cancelBooking">Cancel Booking</button>
      <p v-if="cancelMessage" class="success">{{ cancelMessage }}</p>
      <p v-if="cancelError" class="error">{{ cancelError }}</p>
    </div>
  </div>
  <div class="end"> @2025 All Right Recived!</div>
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
      formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  },
    async fetchBookings() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || !user.user_id) {
    this.error = 'User not found.';
    return;
  }

  try {
    const res = await axios.get(`http://localhost:3000/home?user_id=${user.user_id}`);
    this.bookings = res.data.bookings;
  } catch (err) {
    this.error = err.response?.data?.error || 'Failed to load bookings';
  }
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
        this.fetchBookings()
      } catch (err) {
        this.cancelError = err.response?.data?.details || 'Failed to cancel booking'
      }
    }
  },
  mounted() {
    this.fetchBookings()
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.name) {
      this.username = user.name;
    }
  }
}
</script>


<style scoped>
.home-container {
  background: linear-gradient(to bottom, #d4edda, #a8f0b0);
  min-height: 100vh;
  padding: 20px;
}

.user-header {
  text-align: center;
  margin: 30px 0;
  color:darkgreen;
  font-size:30px;
  transition: background-color 0.3s ease;
}

.center-text h1 {
  color: darkgreen;
  font-size: 2.5rem;
  
}

.center-text h2 {
  color: #555;
  font-size: 1.5rem;
}

/* Booking Cards */
.booking-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
  padding: 20px 0;
}

.booking-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: transform 0.2s;
}

.booking-card:hover {
  transform: translateY(-5px);
}

.booking-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-bottom: 1px solid #eee;
}

.booking-details {
  padding: 16px;
}

.booking-details h3 {
  margin-bottom: 10px;
  color: #2c3e50;
}

.booking-details p {
  margin: 5px 0;
  color: #444;
}

/* Cancel Section */
.cancel-section {
  margin-top: 50px;
  text-align: left;
}

.cancel-section input {
  padding: 8px;
  width: 200px;
  margin-right: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.cancel-section button {
  padding: 8px 16px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.cancel-section button:hover {
  background-color: #c82333;
}
.end{
  color:darkgreen;
  text-align:center;
}

.success {
  color: green;
  margin-top: 10px;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>

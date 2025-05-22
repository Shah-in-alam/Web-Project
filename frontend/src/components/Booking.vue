<template>
  <div class="booking-container">
    <Navbar />
    <div class="booking-form">
      <h2>📅 Create a Booking</h2>
      <p v-if="!form.spot_id" class="info">Fill in all fields to book manually.</p>
      <form @submit.prevent="submitBooking">
        <input v-model="form.booking_id" placeholder="Booking ID" required />
        <input v-model="form.spot_id" type="number" placeholder="Spot ID" required />
        <input v-model="form.name" placeholder="Name" required />
        <input v-model="form.price" type="number" placeholder="Price" step ="0.01" required />
        <input v-model="form.amount" type="number" placeholder="Amount" required />
        <input v-model="form.check_in" type="datetime-local" placeholder="Check In" required />
        <input v-model="form.check_out" type="datetime-local" placeholder="Check Out" required />
        <input type="hidden" v-model="form.user_id" />
        <button type="submit">Book Now</button>
      </form>
      <p v-if="success" class="success">{{ success }}</p>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import axios from 'axios';
import Navbar from './Navbar.vue';
import AppFooter from './Footer.vue';

export default {
  name: 'BookingPage',
  components: { Navbar, AppFooter },
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
    if (this.$route.params.spot_id) {
      this.form.spot_id = this.$route.params.spot_id;
      this.fetchCampaignDetails(this.form.spot_id); // Fetch and fill details
    }
  },
  methods: {
    async fetchCampaignDetails(spotId) {
      try {
        const res = await axios.get(`http://localhost:3000/campaign/${spotId}`);
        const camp = res.data;
        this.form.name = camp.name;
        this.form.price = camp.price_per_night;
        // Add more fields if needed
      } catch (err) {
        console.error('Failed to fetch campaign details:', err);
      }
    },
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
       this.$router.push('/payment');
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
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to bottom, #e0f7fa 0%, #d4edda 100%);
  font-family: 'Segoe UI', sans-serif;
  position: relative;
}

.booking-form {
  margin-top: 7vh;
  margin-bottom: 5vh;
  background: #fff;
  max-width: 480px;
  width: 100%;
  padding: 2.5rem 2rem 2rem 2rem;
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(60, 60, 60, 0.13);
  margin-left: auto;
  margin-right: auto;
  animation: fadeInUp 0.7s;
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #219150;
  font-size: 1.7rem;
  letter-spacing: 1px;
  background: linear-gradient(90deg, #b2ff59, #43a047, #b2ff59);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
}

input {
  display: block;
  margin-bottom: 15px;
  padding: 12px;
  width: 100%;
  border-radius: 8px;
  border: 1px solid #b2dfdb;
  font-size: 16px;
  background: #f9fbe7;
  transition: border-color 0.3s, box-shadow 0.3s;
}

input:focus {
  outline: none;
  border-color: #43a047;
  box-shadow: 0 0 0 2px #b2ff59;
}

button {
  padding: 12px;
  background: linear-gradient(90deg, #43a047, #b2ff59);
  color: #fff;
  border: none;
  width: 100%;
  border-radius: 8px;
  font-size: 17px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(67, 160, 71, 0.08);
  transition: background 0.3s, transform 0.2s;
}

button:hover {
  background: linear-gradient(90deg, #388e3c, #b2ff59);
  transform: translateY(-2px) scale(1.03);
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

/* Make footer always at the bottom */
.booking-container > .footer,
.booking-container > AppFooter {
  margin-top: auto;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

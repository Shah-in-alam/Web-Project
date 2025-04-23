<template>
  <div class="admin-page">
    <!-- Logout Button -->
    <button class="logout-btn" @click="logout">Logout</button>

    <header class="admin-header">
      <h1>Admin Dashboard 👑</h1>
      <p class="subtitle">Only admins can access this page</p>
    </header>

    <main class="admin-content">
      <!-- Feature Creation -->
      <section class="admin-card">
        <h2>Create Feature</h2>
        <form @submit.prevent="createFeature" class="form-grid">
          <input v-model="feature.feature_name" placeholder="Feature Name" required />
          <input v-model="feature.description" placeholder="Description" required />
          <input v-model="feature.image_url" placeholder="Image URL" required />
          <input v-model="feature.type" placeholder="Type" required />
          <input v-model.number="feature.rating" type="number" placeholder="Rating" />
          <input v-model.number="feature.popularity" type="number" placeholder="Popularity" />
          <input v-model="feature.category" placeholder="Category" required />
          <div class="checkbox-row">
            <label><input type="checkbox" v-model="feature.available" /> Available</label>
            <label><input type="checkbox" v-model="feature.is_paid" /> Paid</label>
          </div>
          <button type="submit" class="primary-btn">Add Feature</button>
        </form>
      </section>

      <!-- Feature Deletion -->
      <section class="admin-card">
        <h2>Delete Feature</h2>
        <div class="form-inline">
          <input v-model="deleteFeatureId" placeholder="Feature ID" />
          <button @click="deleteFeature" class="danger-btn">Delete</button>
        </div>
      </section>

      <!-- Campaign Creation -->
      <section class="admin-card">
        <h2>Create Campaign</h2>
        <form @submit.prevent="createCampaign" class="form-grid">
          <input v-model="campaign.name" placeholder="Name" required />
          <input v-model="campaign.location" placeholder="Location" required />
          <input v-model.number="campaign.price_per_night" placeholder="Price per Night" required />
          <input v-model.number="campaign.capacity" placeholder="Capacity" required />
          <input v-model.number="campaign.features_id" placeholder="Feature ID" required />
          <button type="submit" class="primary-btn">Add Campaign</button>
        </form>
      </section>

      <!-- Campaign Deletion -->
      <section class="admin-card">
        <h2>Delete Campaign</h2>
        <div class="form-inline">
          <input v-model="deleteCampaignId" placeholder="Campaign ID" />
          <button @click="deleteCampaign" class="danger-btn">Delete</button>
        </div>
      </section>

      <!-- User Deletion -->
      <section class="admin-card">
        <h2>Delete User</h2>
        <div class="form-inline">
          <input v-model="deleteUserId" placeholder="User ID" />
          <button @click="deleteUser" class="danger-btn">Delete</button>
        </div>
      </section>

      <!-- Approve Booking -->
      <section class="admin-card">
        <h2>Pending Bookings</h2>
        <div v-if="bookings.length === 0" class="no-booking">No pending bookings.</div>
        <ul class="booking-list">
          <li v-for="booking in bookings" :key="booking.booking_id">
            <p><strong>{{ booking.name }}</strong> ({{ booking.status }})</p>
            <button @click="approveBooking(booking.booking_id)" class="approve-btn">Approve</button>
          </li>
        </ul>
      </section>

      <!-- Success & Error Messages -->
      <transition name="fade">
        <p v-if="error" class="alert alert-error">{{ error }}</p>
      </transition>
      <transition name="fade">
        <p v-if="success" class="alert alert-success">{{ success }}</p>
      </transition>
    </main>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AdminPage',
  data() {
    return {
      feature: {
        feature_name: '',
        description: '',
        image_url: '',
        available: false,
        is_paid: false,
        type: '',
        rating: null,
        popularity: '',
        category: ''
      },
      campaign: {
        name: '',
        location: '',
        price_per_night: null,
        capacity: null,
        features_id: null
      },
      deleteFeatureId: '',
      deleteCampaignId: '',
      deleteUserId: '',
      bookings: [],
      error: '',
      success: ''
    };
  },
  mounted() {
    this.fetchPendingBookings();
  },
  methods: {
    logout() {
      localStorage.removeItem('user');
      this.$router.push('/signin');
    },
    async createFeature() {
      try {
        this.error = '';
        this.success = '';
        const res = await axios.post('http://localhost:3000/feature', this.feature);
        this.success = res.data.message;
      } catch (err) {
        this.error = 'Failed to create feature.';
      }
    },
    async deleteFeature() {
      try {
        this.error = '';
        this.success = '';
        const res = await axios.delete(`http://localhost:3000/feature/${this.deleteFeatureId}`);
        this.success = res.data.message;
      } catch (err) {
        this.error = 'Failed to delete feature.';
      }
    },
    async createCampaign() {
      try {
        this.error = '';
        this.success = '';
        const res = await axios.post('http://localhost:3000/campaign', this.campaign);
        this.success = res.data.message;
      } catch (err) {
        this.error = 'Failed to create campaign.';
      }
    },
    async deleteCampaign() {
      try {
        this.error = '';
        this.success = '';
        const res = await axios.delete(`http://localhost:3000/campaign/${this.deleteCampaignId}`);
        this.success = res.data.message;
      } catch (err) {
        this.error = 'Failed to delete campaign.';
      }
    },
    async deleteUser() {
      try {
        this.error = '';
        this.success = '';
        const res = await axios.delete(`http://localhost:3000/users/${this.deleteUserId}`);
        this.success = res.data.message;
      } catch (err) {
        this.error = 'Failed to delete user.';
      }
    },
    async fetchPendingBookings() {
      try {
        const res = await axios.get('http://localhost:3000/booking?status=Pending');
        this.bookings = res.data;
      } catch (err) {
        this.error = 'Failed to fetch bookings.';
      }
    },
    async approveBooking(bookingId) {
      try {
        const res = await axios.patch(`http://localhost:3000/booking/${bookingId}/approve`);
        this.success = res.data.message;
        this.fetchPendingBookings();
      } catch (err) {
        this.error = 'Failed to approve booking.';
      }
    }
  }
};
</script>

<style scoped>
/* Base Layout */
.admin-page {
  min-height: 100vh;
  padding: 3rem;
  background: linear-gradient(135deg, #e0f7fa, #ffffff);
  font-family: 'Inter', 'Segoe UI', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Header */
.admin-header {
  text-align: center;
  margin-bottom: 3rem;
}

.admin-header h1 {
  font-size: 3rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1.1rem;
  color: #6c757d;
}

/* Card Style */
.admin-content {
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.admin-card {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.admin-card:hover {
  transform: scale(1.01);
}

.admin-card h2 {
  margin-bottom: 1.2rem;
  font-size: 1.6rem;
  color: #009688;
}

/* Forms */
.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

input {
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  width: 100%;
  background: #fdfdfd;
}

input:focus {
  border-color: #00bfa5;
  box-shadow: 0 0 0 3px rgba(0, 191, 165, 0.2);
  outline: none;
}

.checkbox-row {
  display: flex;
  gap: 1.5rem;
  margin-top: 0.5rem;
}

/* Buttons */
button {
  padding: 12px 18px;
  font-size: 1rem;
  border: none;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
}

.primary-btn {
  background-color: #00bfa5;
  color: white;
}

.primary-btn:hover {
  background-color: #009688;
}

.danger-btn {
  background-color: #ff5252;
  color: white;
}

.danger-btn:hover {
  background-color: #e53935;
}

.approve-btn {
  background-color: #42a5f5;
  color: white;
}

.approve-btn:hover {
  background-color: #1e88e5;
}

/* Booking List */
.booking-list {
  list-style: none;
  padding-left: 0;
}

.booking-list li {
  background: #f5f5f5;
  padding: 1rem;
  margin-bottom: 10px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Alerts */
.alert {
  padding: 12px 16px;
  border-radius: 12px;
  margin-top: 1rem;
  font-weight: bold;
  text-align: center;
}

.alert-success {
  background: #d0f8ce;
  color: #256029;
}

.alert-error {
  background: #ffcdd2;
  color: #b71c1c;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Inline Form */
.form-inline {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

/* Logout Button */
.logout-btn {
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  background-color: #ef5350;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 12px;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.logout-btn:hover {
  background-color: #c62828;
  transform: scale(1.05);
}
</style>



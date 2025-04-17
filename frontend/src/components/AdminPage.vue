<template>
  <div class="admin-page">
    <!-- Logout button in the corner -->
    <button class="logout-btn" @click="logout">Logout</button>

    <h2 class="Hea">Admin Dashboard 👑</h2>
    <p class="ne">Only admin can see this!</p>

    <!-- Feature Creation -->
    <section class="admin-section">
      <h3>Create Feature</h3>
      <form @submit.prevent="createFeature">
        <input v-model="feature.feature_name" placeholder="Feature Name" required />
        <input v-model="feature.description" placeholder="Description" required />
        <input v-model="feature.image_url" placeholder="Image URL" required />
        <label><input type="checkbox" v-model="feature.available" /> Available</label>
        <label><input type="checkbox" v-model="feature.is_paid" /> Paid</label>
        <input v-model="feature.type" placeholder="Type" required />
        <input v-model.number="feature.rating" type="number" placeholder="Rating" />
        <input v-model.number="feature.popularity" type="number" placeholder="Popularity" />
        <input v-model="feature.category" placeholder="Category" required />
        <button type="submit">Add Feature</button>
      </form>
    </section>

    <!-- Feature Deletion -->
    <section class="admin-section">
      <h3>Delete Feature</h3>
      <input v-model="deleteFeatureId" placeholder="Feature ID to delete" />
      <button @click="deleteFeature">Delete Feature</button>
    </section>

    <!-- Campaign Creation -->
    <section class="admin-section">
      <h3>Create Campaign</h3>
      <form @submit.prevent="createCampaign">
        <input v-model="campaign.name" placeholder="Name" required />
        <input v-model="campaign.location" placeholder="Location" required />
        <input v-model.number="campaign.price_per_night" placeholder="Price per Night" required />
        <input v-model.number="campaign.capacity" placeholder="Capacity" required />
        <input v-model.number="campaign.features_id" placeholder="Feature ID" required />
        <button type="submit">Add Campaign</button>
      </form>
    </section>

    <!-- Campaign Deletion -->
    <section class="admin-section">
      <h3>Delete Campaign</h3>
      <input v-model="deleteCampaignId" placeholder="Campaign ID to delete" />
      <button @click="deleteCampaign">Delete Campaign</button>
    </section>

    <!-- User Deletion -->
    <section class="admin-section">
      <h3>Delete User</h3>
      <input v-model="deleteUserId" placeholder="User ID " />
      <button @click="deleteUser">Delete User</button>
    </section>

    <!-- Approve Booking -->
    <section class="admin-section">
      <h3>Pending Booking</h3>
      <div v-if="bookings.length === 0">No pending booking.</div>
      <ul>
        <li v-for="booking in bookings" :key="booking.booking_id">
          <p><strong>{{ booking.name }}</strong> ({{ booking.status }})</p>
          <button @click="approveBooking(booking.booking_id)">Approve</button>
        </li>
      </ul>
    </section>

    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="success" class="success">{{ success }}</p>
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
        popularity: 0,
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
.admin-page {
  position: relative;
  padding: 2rem;
  background: #e6ffed;
}
.Hea {
  color: green;
  text-align: center;
  font-size: 50px;
}
.ne{
  text-align:center;
  color:green;
  font-size: 30px;
}
.logout-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.logout-btn:hover {
  background-color: #c0392b;
}

.admin-section {
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid #ccc;
  background: white;
  
}

input {
  margin: 5px;
  padding: 8px;
  display: block;
}

button {
  margin-top: 10px;
  padding: 8px 12px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
}

.error {
  color: red;
}

.success {
  color: green;
}
</style>



<template>
  <div class="campaign-container">
    <Navbar />

    <div class="campaign-wrapper">
      <h1>📢 Available Campaigns</h1>

      <div v-if="error" class="error">{{ error }}</div>

      <!-- Approved Campaigns -->
      <div class="campaign-grid">
        <div v-for="camp in campaigns" :key="camp.spot_id" class="campaign-card">
          <h2>{{ camp.name }}</h2>
          <p><strong>📍 Location:</strong> {{ camp.location }}</p>
          <iframe
            :src="`https://www.google.com/maps/embed?pb=${camp.map_embed}`"
            width="100%"
            height="200"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
          <p><strong>💰 Price/Night:</strong> ${{ camp.price_per_night }}</p>
          <p><strong>👥 Capacity:</strong> {{ camp.capacity }}</p>
          <p><strong>🔗 Features ID:</strong> {{ camp.features_id }}</p>
          <p><strong>🆔 Spot ID:</strong> {{ camp.spot_id }}</p>
        </div>
      </div>

      <!-- Suggest Button -->
      <button class="suggest-btn" @click="showForm = !showForm">
        {{ showForm ? 'Cancel Suggestion' : 'Suggest a Campaign Spot' }}
      </button>

      <!-- Suggestion Form -->
      <form v-if="showForm" @submit.prevent="submitSuggestion" class="suggest-form">
        <input v-model="suggest.name" placeholder="Name" required />
        <input v-model="suggest.location" placeholder="Location" required />
        <input v-model.number="suggest.price_per_night" placeholder="Price per Night" required />
        <input v-model.number="suggest.capacity" placeholder="Capacity" required />
        <input v-model.number="suggest.features_id" placeholder="Features ID" required />
        <button type="submit">Submit Suggestion</button>
        <p v-if="success" class="success">{{ success }}</p>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Navbar from './Navbar.vue'

export default {
  name: 'CampaignPage',
  components: { Navbar },
  data() {
    return {
      campaigns: [],
      error: '',
      success: '',
      showForm: false,
      suggest: {
        name: '',
        location: '',
        price_per_night: '',
        capacity: '',
        features_id: ''
      }
    }
  },
  mounted() {
    this.fetchCampaigns()
  },
  methods: {
    async fetchCampaigns() {
      try {
        const res = await axios.get('http://localhost:3000/campaign')
        this.campaigns = res.data
      } catch (err) {
        this.error = 'Failed to fetch campaigns.'
      }
    },
    async submitSuggestion() {
      this.success = ''
      this.error = ''
      try {
        await axios.post('http://localhost:3000/campaign', this.suggest)
        this.success = 'Suggestion submitted! Waiting for admin approval.'
        this.showForm = false
        this.suggest = {
          name: '',
          location: '',
          price_per_night: '',
          capacity: '',
          features_id: ''
        }
      } catch (err) {
        this.error = err.response?.data?.error || 'Failed to submit suggestion.'
      }
    }
  }
}
</script>

<style scoped>
/* Container */
.campaign-container {
  background: linear-gradient(to bottom, #e3f2fd, #c8e6c9);
  min-height: 100vh;
  padding: 2rem;
  font-family: 'Segoe UI', sans-serif;
}

/* Wrapper */
.campaign-wrapper {
  max-width: 1200px;
  margin: auto;
}

/* Title */
h1 {
  text-align: center;
  color: #2e7d32;
  margin-bottom: 2rem;
  font-size: 2.5rem;
}

/* Error and Success Messages */
.error {
  color: red;
  text-align: center;
  margin-bottom: 1.5rem;
  font-weight: bold;
}

.success {
  color: green;
  text-align: center;
  font-weight: bold;
  margin-top: 1rem;
}

/* Suggest Button */
.suggest-btn {
  background-color: #42b983;
  color: white;
  padding: 10px 20px;
  margin: 1rem auto 2rem;
  display: block;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.suggest-btn:hover {
  background-color: #369b73;
}

/* Suggestion Form */
.suggest-form {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.suggest-form input {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.suggest-form button {
  background-color: #2e8b57;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.suggest-form button:hover {
  background-color: #1e6f47;
}

/* Campaign Grid */
.campaign-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  justify-content: center;
}

/* Campaign Card */
.campaign-card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
  transition: transform 0.2s ease;
}

.campaign-card:hover {
  transform: translateY(-4px);
}

.campaign-card h2 {
  margin-bottom: 0.75rem;
  color: #2c3e50;
}

.campaign-card p {
  margin: 6px 0;
  color: #444;
  font-size: 0.95rem;
}
</style>

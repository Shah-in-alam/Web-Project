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
          <p><strong>📍 Location:</strong> {{ camp.location}}</p>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.898601734003!2d90.3915093154311!3d23.750876394667266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b859e935931f%3A0x57ee2b6f3a6f4ef!2sDhaka!5e0!3m2!1sen!2sbd!4v1700000000000"
                width="100%"
                height="250"
                style="border:0;"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade">
              </iframe>
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
.campaign-container {
  background: linear-gradient(to bottom, #d4edda, #b2fab4);
  min-height: 100vh;
  padding: 2rem;
  font-family: 'Segoe UI', sans-serif;
}

.campaign-wrapper {
  max-width: 1000px;
  margin: auto;
}

h1 {
  text-align: center;
  color: #2e7d32;
  margin-bottom: 2rem;
}

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
}

.suggest-form {
  background:rgb(58, 77, 63);
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
  padding: 8px;
}

.suggest-form button {
  background-color: #2e8b57;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.campaign-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
}

.campaign-card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  width: 280px;
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
.map-link {
  color: #1e88e5;
  text-decoration: underline;
}

.map-link:hover {
  color: #1565c0;
}
</style>

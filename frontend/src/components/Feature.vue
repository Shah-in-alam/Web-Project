<template>
  <div class="feature-container">
    <Navbar />
    <h1>🌟 Features</h1>

    <div v-if="error" class="error">{{ error }}</div>

    <!-- Feature cards -->
    <div class="feature-grid">
      <div class="feature-card" v-for="feat in features" :key="feat.features_id">
        <img :src="feat.image_url" alt="Feature Image" />
        <h3 class="feature-title">{{ feat.feature_name }}</h3>
        <div class="feature-meta">
          <span class="feature-id"><strong>#{{ feat.features_id }}</strong></span>
          <span class="feature-rating" :title="'Rating: ' + feat.rating">
            <span class="star">⭐</span>
            <span class="rating-value">{{ feat.rating }}</span>
          </span>
        </div>
        <p class="feature-desc">{{ feat.description }}</p>
        <button class="details-btn" @click="openDetails(feat)">See Details</button>
      </div>
    </div>

    <!-- Details Modal -->
    <div v-if="showDetails" class="modal-overlay" @click.self="closeDetails">
      <div class="modal-content">
        <button class="close-btn" @click="closeDetails">&times;</button>
        <img :src="selectedFeature.image_url" alt="Feature Image" class="modal-img" />
        <h2>{{ selectedFeature.feature_name }}</h2>
        <p><strong>Description:</strong> {{ selectedFeature.description }}</p>
        <div class="modal-details">
          <div><span class="icon">📦</span> <b>Type:</b> {{ selectedFeature.type }}</div>
          <div><span class="icon">🔥</span> <b>Popularity:</b> {{ selectedFeature.popularity }}%</div>
          <div><span class="icon">🏷️</span> <b>Category:</b> {{ selectedFeature.category }}</div>
          <div><span class="icon">✅</span> <b>Available:</b> <span :class="selectedFeature.available ? 'yes' : 'no'">{{ selectedFeature.available ? 'Yes' : 'No' }}</span></div>
          <div><span class="icon">💲</span> <b>Paid:</b> <span :class="selectedFeature.is_paid ? 'yes' : 'no'">{{ selectedFeature.is_paid ? 'Yes' : 'No' }}</span></div>
          <div><span class="icon">⭐</span> <b>Rating:</b> {{ selectedFeature.rating }}</div>
        </div>
      </div>
    </div>

    <!-- Toggle Suggestion Form -->
    <div class="suggest-toggle">
      <button @click="showSuggestForm = !showSuggestForm">
        {{ showSuggestForm ? 'Hide Suggestion Form' : '💡 Suggest a Feature' }}
      </button>
    </div>

    <!-- Suggestion Form -->
    <div v-if="showSuggestForm" class="suggest-section">
      <h2>Suggest a New Feature</h2>
      <form @submit.prevent="suggestFeature" class="suggest-form">
        <input v-model="newFeature.feature_name" placeholder="Feature Name" required />
        <textarea v-model="newFeature.description" placeholder="Description" required></textarea>
        <input v-model="newFeature.image_url" placeholder="Image URL" required />
        <input v-model="newFeature.type" placeholder="Type" required />
        <input v-model.number="newFeature.rating" type="number" min="1" max="5" step="0.1" placeholder="Rating" />
        <input v-model.number="newFeature.popularity" type="number" min="0" max="100" placeholder="Popularity" />
        <input v-model="newFeature.category" placeholder="Category" required />

        <div class="checkbox-row">
          <label class="custom-checkbox">
            <input type="checkbox" v-model="newFeature.available" />
            <span class="checkmark"></span>
            Available
          </label>
          <label class="custom-checkbox">
            <input type="checkbox" v-model="newFeature.is_paid" />
            <span class="checkmark"></span>
            Paid Feature
          </label>
        </div>

        <button type="submit">Submit Suggestion</button>
      </form>

      <p v-if="message" class="success">{{ message }}</p>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Navbar from './Navbar.vue';

export default {
  name: 'FeaturePage',
  components: { Navbar },
  data() {
    return {
      features: [],
      error: '',
      message: '',
      showSuggestForm: false,
      showDetails: false,
      selectedFeature: {},
      newFeature: {
        feature_name: '',
        description: '',
        image_url: '',
        type: '',
        rating: null,
        popularity: null,
        category: '',
        available: true,
        is_paid: false
      }
    };
  },
  mounted() {
    this.fetchApprovedFeatures();
  },
  methods: {
    async fetchApprovedFeatures() {
      try {
        const res = await axios.get('http://localhost:3000/feature');
        this.features = res.data;
      } catch (err) {
        this.error = 'Failed to load features';
      }
    },
    async suggestFeature() {
      this.error = '';
      this.message = '';
      try {
        await axios.post('http://localhost:3000/feature', {
          ...this.newFeature,
          approved: false
        });
        this.message = 'Feature suggestion submitted for review!';
        this.resetForm();
      } catch (err) {
        this.error = err.response?.data?.error || 'Failed to submit feature';
      }
    },
    resetForm() {
      this.newFeature = {
        feature_name: '',
        description: '',
        image_url: '',
        type: '',
        rating: null,
        popularity: null,
        category: '',
        available: true,
        is_paid: false
      };
    },
    openDetails(feature) {
      this.selectedFeature = feature;
      this.showDetails = true;
    },
    closeDetails() {
      this.showDetails = false;
      this.selectedFeature = {};
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
.feature-container {
  background: linear-gradient(to bottom, #e8f5e9, #c8e6c9);
  min-height: 100vh;
  padding: 2rem;
  font-family: 'Segoe UI', sans-serif;
}

h1 {
  text-align: center;
  color: #2e7d32;
  margin-bottom: 1.5rem;
  font-size: 2.5rem;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
  margin-bottom: 2rem;
}

.feature-card {
  background: #fff;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

.feature-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.feature-title {
  color: #1b5e20;
  font-size: 1.3rem;
  margin-bottom: 0.2rem;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.feature-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.feature-id {
  background: #e0f2f1;
  color: #00796b;
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 0.85rem;
}

.feature-rating {
  display: flex;
  align-items: center;
  background: #fffde7;
  color: #fbc02d;
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 600;
}

.feature-rating .star {
  margin-right: 3px;
}

.feature-desc {
  color: #444;
  font-size: 0.98rem;
  margin-bottom: 0.7rem;
  min-height: 48px;
}

.feature-divider {
  border: none;
  border-top: 1.5px solid #e0e0e0;
  margin: 1rem 0 1.2rem 0;
}

.feature-details {
  background: #f7faf9;
  border-radius: 8px;
  padding: 1rem 0.7rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.7rem 1.2rem;
  margin-bottom: 0.5rem;
  box-shadow: 0 1px 4px rgba(60, 120, 60, 0.04);
}

.detail-row {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.97rem;
  padding: 2px 0;
}

.detail-row .icon {
  font-size: 1.1rem;
  margin-right: 2px;
}

detail-row .label {
  color: #388e3c;
  font-weight: 500;
  margin-right: 2px;
}

.detail-row .value {
  font-weight: 500;
  color: #333;
}

.detail-row .yes {
  color: #388e3c;
  font-weight: bold;
}

.detail-row .no {
  color: #d32f2f;
  font-weight: bold;
}

.details-btn {
  background: #1976d2;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 18px;
  margin-top: 10px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.2s;
}
.details-btn:hover {
  background: #125ea2;
}

.suggest-toggle {
  text-align: center;
  margin-bottom: 1.5rem;
}

.suggest-toggle button {
  background: #00796b;
  color: white;
  padding: 10px 22px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.suggest-toggle button:hover {
  background-color: #004d40;
}

.suggest-section {
  background: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 2rem auto;
}

.suggest-section h2 {
  text-align: center;
  color: #2e7d32;
  margin-bottom: 1rem;
}

.suggest-form input,
.suggest-form textarea {
  display: block;
  width: 100%;
  padding: 12px;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 0.95rem;
}

.suggest-form textarea {
  resize: none;
  height: 100px;
}

.suggest-form label {
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
  font-size: 0.9rem;
}

.suggest-form label input[type="checkbox"] {
  margin-right: 10px;
}

.checkbox-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.custom-checkbox {
  position: relative;
  padding-left: 25px;
  cursor: pointer;
  font-size: 0.9rem;
}

.custom-checkbox input[type="checkbox"] {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.custom-checkbox .checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: #eee;
  border-radius: 4px;
}

.custom-checkbox input[type="checkbox"]:checked ~ .checkmark {
  background-color: #43a047;
}

button[type="submit"] {
  background: #43a047;
  color: white;
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
  width: 100%;
}

button[type="submit"]:hover {
  background-color: #2e7d32;
}

.success {
  color: green;
  text-align: center;
  margin-top: 1rem;
}

.error {
  color: red;
  text-align: center;
  margin-top: 1rem;
}

.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-content {
  background: #fff;
  border-radius: 12px;
  padding: 2rem;
  max-width: 400px;
  width: 95%;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  position: relative;
  animation: fadeInUp 0.3s;
}
.close-btn {
  position: absolute;
  top: 10px; right: 14px;
  background: none;
  border: none;
  font-size: 2rem;
  color: #888;
  cursor: pointer;
}
.modal-img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
}
.modal-details {
  margin-top: 1rem;
  display: grid;
  gap: 0.5rem;
}
.modal-details .icon {
  margin-right: 4px;
}
.yes {
  color: #388e3c;
  font-weight: bold;
}
.no {
  color: #d32f2f;
  font-weight: bold;
}
</style>


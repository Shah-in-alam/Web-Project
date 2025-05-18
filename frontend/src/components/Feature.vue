<template>
  <div class="feature-container">
    <Navbar />
    <h1>🌟 Features</h1>

    <div v-if="error" class="error">{{ error }}</div>

    <!-- Feature cards -->
    <div class="feature-grid">
      <div class="feature-card" v-for="feat in features" :key="feat.features_id">
        <img :src="feat.image_url" alt="Feature Image" />
        <h3>{{ feat.feature_name }}</h3>
        <p> <strong> Id: </strong>{{ feat.features_id}}</p>
        <p>{{ feat.description }}</p>
        <p><strong>Type:</strong> {{ feat.type }}</p>
        <p><strong>Rating:</strong> ⭐ {{ feat.rating }}</p>
        <p><strong>Popularity:</strong> {{ feat.popularity }}%</p>
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

.feature-card h3 {
  color: #2c3e50;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.feature-card p {
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 0.4rem;
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
</style>


<template>
  <div class="feature-container">
    <Navbar />
    <h1>🌟 Features</h1>

    <div v-if="error" class="error">{{ error }}</div>

    <!-- Display existing features -->
    <div class="feature-grid">
      <div class="feature-card" v-for="feat in features" :key="feat.features_id">
        <img :src="feat.image_url" alt="Feature Image" />
        <h3>{{ feat.feature_name }}</h3>
        <p>{{ feat.description }}</p>
        <p><strong>Type:</strong> {{ feat.type }}</p>
        <p><strong>Rating:</strong> ⭐ {{ feat.rating }}</p>
        <p><strong>Popularity:</strong> {{ feat.popularity }}</p>
      </div>
    </div>

    <!-- Button to toggle suggestion form -->
    <div class="suggest-toggle">
      <button @click="showSuggestForm = !showSuggestForm">
        {{ showSuggestForm ? 'Hide Suggestion Form' : '💡 Suggest a Feature' }}
      </button>
    </div>

    <!-- Suggest Feature Form -->
    <div v-if="showSuggestForm" class="suggest-section">
      <h2>Suggest a New Feature</h2>
      <form @submit.prevent="suggestFeature" class="suggest-form">
        <input v-model="newFeature.feature_name" placeholder="Feature Name" required />
        <textarea v-model="newFeature.description" placeholder="Description" required></textarea>
        <input v-model="newFeature.image_url" placeholder="Image URL" required />
        <input v-model="newFeature.type" placeholder="Type" required />
        <input v-model.number="newFeature.rating" type="number" min="1" max="5" placeholder="Rating" />
        <input v-model.number="newFeature.popularity" type="number" min="1" max="100" placeholder="Popularity" />
        <input v-model="newFeature.category" placeholder="Category" required />
        <button type="submit">Submit Suggestion</button>
      </form>

      <p v-if="message" class="success">{{ message }}</p>
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
        popularity: null, // Added popularity field
        category: '',
        available: false,
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
        this.features = res.data; // only show approved ones
      } catch (err) {
        this.error = 'Failed to load features';
      }
    },
    async suggestFeature() {
      try {
        await axios.post('http://localhost:3000/feature', {
          ...this.newFeature,
          approved: false // user suggestions are not approved yet
        });
        this.message = 'Feature suggestion submitted for review!';
        this.newFeature = {
          feature_name: '',
          description: '',
          image_url: '',
          type: '',
          rating: null,
          popularity: null, // Reset popularity field
          category: '',
          available: false,
          is_paid: false
        };
      } catch (err) {
        this.error = 'Failed to submit suggestion';
      }
    }
  }
};
</script>

<style scoped>
/* Container */
.feature-container {
  background: linear-gradient(to bottom, #e8f5e9, #c8e6c9);
  min-height: 100vh;
  padding: 2rem;
  font-family: 'Segoe UI', sans-serif;
}

/* Title */
h1 {
  text-align: center;
  color: #2e7d32;
  margin-bottom: 1.5rem;
  font-size: 2.5rem;
}

/* Feature Grid */
.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  justify-content: center;
}

/* Feature Card */
.feature-card {
  background: #fff;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

.feature-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.2rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.feature-card p {
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 0.5rem;
}

/* Suggest Toggle */
.suggest-toggle {
  text-align: center;
  margin: 2rem 0;
}

.suggest-toggle button {
  background: #00796b;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.suggest-toggle button:hover {
  background-color: #004d40;
}

/* Suggest Section */
.suggest-section {
  background: #ffffff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
  padding: 10px;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.suggest-form textarea {
  resize: none;
  height: 100px;
}

button[type="submit"] {
  background: #43a047;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

button[type="submit"]:hover {
  background-color: #2e7d32;
}

/* Success and Error Messages */
.success {
  color: green;
  text-align: center;
  margin-top: 1rem;
}

.error {
  color: red;
  text-align: center;
}
</style>




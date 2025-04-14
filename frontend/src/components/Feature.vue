<template>
  <div class="feature-container">
    <div class="feature">
      <Navbar />

      <h1>Features</h1>
      <div v-if="error" class="error">{{ error }}</div>

      <!-- Table without image -->
      <table v-if="features.length" class="feature-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Description</th>
            <th>Available</th>
            <th>Paid</th>
            <th>Type</th>
            <th>Rating</th>
            <th>Popularity</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="feat in features" :key="feat.features_id">
            <td>{{ feat.features_id }}</td>
            <td>{{ feat.feature_name }}</td>
            <td>{{ feat.description }}</td>
            <td>{{ feat.available ? 'Yes' : 'No' }}</td>
            <td>{{ feat.is_paid ? 'Yes' : 'No' }}</td>
            <td>{{ feat.type }}</td>
            <td>{{ feat.rating }}</td>
            <td>{{ feat.popularity }}</td>
            <td>{{ feat.category }}</td>
          </tr>
        </tbody>
      </table>

      <!-- Image section below the table -->
      <div class="image-gallery">
        <h2>Feature Images</h2>
        <div v-for="feat in features" :key="feat.features_id" class="image-item">
          <p><strong>{{ feat.feature_name }}</strong></p>
          <img :src="feat.image_url" alt="Feature Image" width="150" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Navbar from './Navbar.vue'

export default {
  name: 'FeaturePage',
  components: { Navbar },
  data() {
    return {
      features: [],
      error: '',
      newFeature: {
        feature_id: '',
        feature_name: '',
        description: '',
        image_url: '',
        available: false,
        is_paid: false,
        type: '',
        rating: null,
        popularity: 0,
        category: ''
      }
    }
  },
  mounted() {
    this.fetchFeatures()
  },
  methods: {
    async fetchFeatures() {
      try {
        const res = await axios.get('http://localhost:3000/feature')
        this.features = res.data
      } catch (err) {
        this.error = 'Failed to fetch features.'
      }
    }
  }
}
</script>

<style scoped>
.feature-container {
  background-color: #d4edda; /* Light green */
  min-height: 100vh;
  padding: 20px;
}

.feature {
  max-width: 900px;
  margin: 15px ;
}

.feature-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.feature-table th,
.feature-table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: center;
}

.feature-table th {
  background-color: #f2f2f2;
}

.image-gallery {
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.image-item {
  text-align: center;
}

.image-item img {
  border: 1px solid #ccc;
  border-radius: 4px;
}

.error {
  color: red;
  margin-top: 1rem;
}
</style>


<template>
 <div class="feature-container">
  <div class="feature">
    <Navbar />

    <h1>Features</h1>

    <div v-if="error" class="error">{{ error }}</div>

    <table v-if="features.length" border="1" cellpadding="10">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Description</th>
          <th>Image</th>
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
          <td><img :src="feat.image_url" width="80" /></td>
         <td>{{ feat.available ? 'Yes' : 'No' }}</td>
          <td>{{ feat.is_paid ? 'Yes' : 'No' }}</td>
          <td>{{ feat.type }}</td>
          <td>{{ feat.rating }}</td>
          <td>{{ feat.popularity }}</td>
          <td>{{ feat.category }}</td>
        </tr>
      </tbody>
    </table>
<!--
    <h2>Add New Feature</h2>
    <form @submit.prevent="createFeature">
      <input v-model="newFeature.feature_name" placeholder="Feature Name" required />
      <input v-model="newFeature.description" placeholder="Description" required />
      <input v-model="newFeature.image_url" placeholder="Image URL" required />
      <label>
        Available:
        <input type="checkbox" v-model="newFeature.available" />
      </label>
      <label>
        Is Paid:
        <input type="checkbox" v-model="newFeature.is_paid" />
      </label>
      <input v-model="newFeature.type" placeholder="Type" required />
      <input v-model.number="newFeature.rating" type="number" placeholder="Rating" />
      <input v-model.number="newFeature.popularity" type="number" placeholder="Popularity" />
      <input v-model="newFeature.category" placeholder="Category" required />
      <button type="submit">Add Feature</button>
    </form> !-->
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
    },
    async createFeature() {
      try {
        await axios.post('http://localhost:3000/feature', this.newFeature)
        this.fetchFeatures()
        this.newFeature = {
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
      } catch (err) {
        this.error = 'Failed to create feature.'
      }
    }
  }
}
</script>

<style scoped>
.feature-container{
  background-color: #d4edda; /* Light green */
  min-height: 100vh;
  padding: 20px;
}
.feature {
  max-width: 900px;
  margin: 15px;
}
input, label {
  display: block;
  margin: 5px 0;
}
img {
  border: 1px solid #ccc;
  border-radius: 4px;
}
.error {
  color: red;
}
</style>

<template>
  <div class="campaign">
    <Navbar />

    <h1>Campaigns</h1>

    <div v-if="error" class="error">{{ error }}</div>

    <table v-if="campaigns.length" border="1" cellpadding="10">
      <thead>
        <tr>
          <th>Spot ID</th>
          <th>Name</th>
          <th>Location</th>
          <th>Price/Night</th>
          <th>Capacity</th>
          <th>Features ID</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="camp in campaigns" :key="camp.spot_id">
          <td>{{ camp.spot_id }}</td>
          <td>{{ camp.name }}</td>
          <td>{{ camp.location }}</td>
          <td>{{ camp.price_per_night }}</td>
          <td>{{ camp.capacity }}</td>
          <td>{{ camp.features_id }}</td>
          <td>
            <button @click="deleteCampaign(camp.spot_id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <h2>Add New Campaign</h2>
    <form @submit.prevent="createCampaign">
      <input v-model="newCampaign.name" placeholder="Name" required />
      <input v-model="newCampaign.location" placeholder="Location" required />
      <input v-model="newCampaign.price_per_night" type="number" step="0.01" placeholder="Price per night" required />
      <input v-model="newCampaign.capacity" type="number" placeholder="Capacity" required />
      <input v-model="newCampaign.features_id" type="number" placeholder="Features ID" required />
      <button type="submit">Add Campaign</button>
    </form>
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
      newCampaign: {
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
    async createCampaign() {
      try {
        await axios.post('http://localhost:3000/campaign', this.newCampaign)
        this.fetchCampaigns()
        this.newCampaign = { name: '', location: '', price_per_night: '', capacity: '', features_id: '' }
      } catch (err) {
        this.error = 'Failed to create campaign.'
      }
    },
    async deleteCampaign(id) {
      try {
        await axios.delete(`http://localhost:3000/campaign/${id}`)
        this.fetchCampaigns()
      } catch (err) {
        this.error = 'Failed to delete campaign.'
      }
    }
  }
}
</script>

<style scoped>
.campaign {
  max-width: 800px;
  margin: auto;
}
form input {
  margin: 5px;
  padding: 5px;
}
.error {
  color: red;
  margin-bottom: 1rem;
}
</style>

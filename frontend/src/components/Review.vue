<template>
  <div class="review-container">
  <div class="review-page">
    <Navbar />
    <h2>Submit a Review</h2>

    <form @submit.prevent="submitReview">
      <input v-model="form.user_id" placeholder="User ID" required />
      <input v-model="form.spot_id" placeholder="Spot ID" required />
      <input v-model.number="form.rating" type="number" min="1" max="5" placeholder="Rating (1-5)" required />
      <textarea v-model="form.review" placeholder="Your review..." required></textarea>
      <button type="submit">Submit Review</button>
    </form>

    <p v-if="message" style="color: green">{{ message }}</p>
    <p v-if="error" style="color: red">{{ error }}</p>

    <hr />

    <h2>All Reviews</h2>
    <div v-if="reviews.length === 0">No reviews yet.</div>
    <ul>
      <li v-for="r in reviews" :key="r.id">
        <strong>{{ r.user.name || r.user_id }} ({{ r.rating }}/5):</strong> {{ r.review }}
      </li>
    </ul>
  </div>
  </div>

</template>

<script>
import axios from 'axios'
import Navbar from './Navbar.vue'

export default {
  name: 'ReviewPage',
  components: { Navbar },
  data() {
    return {
      form: {
        user_id: '',
        spot_id: '',
        rating: 5,
        review: ''
      },
      reviews: [],
      message: '',
      error: ''
    }
  },
  methods: {
    async submitReview() {
      this.message = ''
      this.error = ''
      try {
        const res = await axios.post('http://localhost:3000/review', this.form)
        this.message = res.data.message
        this.loadReviews()
        this.form.review = ''
      } catch (err) {
        this.error = err.response?.data?.message || 'Submission failed!'
      }
    },
    async loadReviews() {
      try {
        const res = await axios.get('http://localhost:3000/review')
        this.reviews = res.data
      } catch (err) {
        console.error('Error loading reviews:', err)
      }
    }
  },
  mounted() {
    this.loadReviews()
  }
}
</script>

<style scoped>
.review-container{
  background-color: #d4edda; /* Light green */
  min-height: 100vh;
  padding: 20px;
}
.review-page {
  max-width: 600px;
  margin: 15px;
}
form input, form textarea {
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 8px;
}
button {
  padding: 8px 16px;
  background-color: #42b983;
  color: white;
  border: none;
}
</style>


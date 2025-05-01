<template>
  <div class="review-container">
    <Navbar />

    <div class="review-page">
      <h2>📝 Submit a Review</h2>

      <form @submit.prevent="submitReview" class="review-form">
        <input v-model="form.user_id" placeholder="User ID" required />
        <input v-model="form.spot_id" placeholder="Spot ID" required />
        <input
          v-model.number="form.rating"
          type="number"
          min="1"
          max="5"
          step="0.1"
          placeholder="Rating (1-5)"
          required
        />
        <textarea v-model="form.review" placeholder="Write your review..." required></textarea>

        <button type="submit">Submit Review</button>

        <p v-if="message" class="success">{{ message }}</p>
        <p v-if="error" class="error">{{ error }}</p>
      </form>

      <div class="review-placer">
        <h2>💬 All Reviews</h2>
        <div v-if="reviews.length === 0" class="empty-review">No reviews yet.</div>

        <div v-for="r in reviews" :key="r.review_id" class="review-card">
          <div class="review-header">
            <strong>{{ r.user?.name || r.user_id }}</strong>
            <span class="rating">{{ r.rating }}/5 ⭐</span>
          </div>
          <p class="review-text">{{ r.review }}</p>
        </div>
      </div>
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
  mounted() {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user?.user_id) this.form.user_id = user.user_id
    this.loadReviews()
  },
  methods: {
    async submitReview() {
      this.message = ''
      this.error = ''
      try {
        const res = await axios.post('http://localhost:3000/review', this.form)
        this.message = res.data.message
        this.form.review = ''
        this.loadReviews()
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
  }
}
</script>

<style scoped>
.review-container {
  background: linear-gradient(to bottom, #d4edda, #b2fab4);
  min-height: 100vh;
  padding: 2rem;
  font-family: 'Segoe UI', sans-serif;
}

.review-page {
  max-width: 700px;
  margin: auto;
}

h2 {
  color: #2e7d32;
  margin-bottom: 1.5rem;
  text-align: center;
}

.review-form {
  background-color: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
}

.review-form input,
.review-form textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
}

.review-form textarea {
  resize: vertical;
  height: 100px;
}

.review-form button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.review-form button:hover {
  background-color: #369a6e;
}

.success {
  color: #2e7d32;
  font-weight: bold;
  margin-top: 1rem;
}

.error {
  color: #c0392b;
  font-weight: bold;
  margin-top: 1rem;
}

.review-placer {
  background-color: #f0fff4;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
}

.empty-review {
  text-align: center;
  font-style: italic;
  color: #555;
}

.review-card {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

.review-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.rating {
  color: #f39c12;
}

.review-text {
  font-size: 0.95rem;
  color: #333;
}
</style>

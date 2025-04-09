const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// POST: Create a review
router.post('/', async (req, res) => {
  const { user_id, spot_id, rating, review } = req.body;

  // Validation
  if (!user_id || !spot_id || rating == null || !review) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Rating must be between 1 and 5' });
  }

  try {
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { user_id },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create review
    const newReview = await prisma.review.create({
      data: {
        user_id,
        spot_id,
        rating,
        review, // ✅ comment
      },
    });

    res.status(201).json({
      message: 'Review submitted successfully',
      review: newReview,
    });
  } catch (error) {
    console.error('Review error:', error);
    res.status(500).json({ error: 'Failed to submit review', details: error });
  }
});

// Optional: GET all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await prisma.review.findMany({
      include: { user: true },
    });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews', details: error });
  }
});

module.exports = router;

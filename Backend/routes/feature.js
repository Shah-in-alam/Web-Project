const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET all features
router.get('/', async (req, res) => {
  try {
    const features = await prisma.feature.findMany();
    res.json(features);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching features', details: error });
  }
});

// POST new feature
router.post('/', async (req, res) => {
  const {
    feature_name,
    description,
    image_url,
    available,
    is_paid,
    type,
    rating,
    popularity,
    category,
  } = req.body;

  try {
    const newFeature = await prisma.feature.create({
      data: {
        feature_name,
        description,
        image_url,
        available,
        is_paid,
        type,
        rating: rating ? parseFloat(rating) : null,
        popularity: popularity ? parseInt(popularity) : 0,
        category,
      },
    });
    res.status(201).json({ message: 'Feature created', feature: newFeature });
  } catch (error) {
    res.status(500).json({ error: 'Error creating feature', details: error });
  }
});

module.exports = router;
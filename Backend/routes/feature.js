const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ✅ GET all approved features (public)
router.get('/', async (req, res) => {
  try {
    const features = await prisma.feature.findMany({
      where: { approved: true }
    });
    res.json(features);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching features', details: error });
  }
});

// ✅ GET pending feature suggestions (admin)
router.get('/pending', async (req, res) => {
  try {
    const suggestions = await prisma.feature.findMany({
      where: { approved: false }
    });
    res.json(suggestions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get pending feature suggestions', details: error });
  }
});

// ✅ PATCH approve a feature suggestion
router.patch('/:id/approve', async (req, res) => {
  const features_id = parseInt(req.params.id);
  try {
    const updated = await prisma.feature.update({
      where: { features_id },
      data: { approved: true }
    });
    res.json({ message: 'Feature approved!', feature: updated });
  } catch (error) {
    res.status(500).json({ error: 'Failed to approve feature', details: error });
  }
});

// ✅ POST new feature
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
    approved = false // ✨ default to false for suggestions
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
        approved
      }
    });
    res.status(201).json({ message: 'Feature created', feature: newFeature });
  } catch (error) {
    console.error('Error creating feature:', error);
    res.status(500).json({ error: 'Error creating feature', details: error });
  }
});

// ✅ DELETE feature by ID
router.delete('/:id', async (req, res) => {
  const features_id = parseInt(req.params.id);
  try {
    await prisma.feature.delete({ where: { features_id } });
    res.json({ message: 'Feature deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting feature', details: error });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET all campaigns with feature info
router.get('/', async (req, res) => {
  try {
    const campaigns = await prisma.campaign.findMany({
      include: { feature: true },
    });
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get campaigns', details: error });
  }
});

// GET single campaign by ID
router.get('/:id', async (req, res) => {
  const spot_id = parseInt(req.params.id);
  try {
    const campaign = await prisma.campaign.findUnique({
      where: { spot_id },
      include: { feature: true },
    });
    if (!campaign) return res.status(404).json({ error: 'Campaign not found' });
    res.json(campaign);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching campaign', details: error });
  }
});

// POST create new campaign
router.post('/', async (req, res) => {
  const { name, location, price_per_night, capacity, features_id } = req.body;

  try {
    const newCampaign = await prisma.campaign.create({
      data: {
        name,
        location,
        price_per_night: parseFloat(price_per_night),
        capacity: parseInt(capacity),
        features_id: parseInt(features_id),
      },
    });
    res.status(201).json({ message: 'Campaign created', campaign: newCampaign });
  } catch (error) {
    res.status(500).json({ error: 'Error creating campaign', details: error });
  }
});

// DELETE campaign by ID
router.delete('/:id', async (req, res) => {
  const spot_id = parseInt(req.params.id);
  try {
    await prisma.campaign.delete({ where: { spot_id } });
    res.json({ message: 'Campaign deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting campaign', details: error });
  }
});

module.exports = router;
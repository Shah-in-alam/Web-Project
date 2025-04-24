const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ✅ GET all approved campaigns (public view)
router.get('/', async (req, res) => {
  try {
    const campaigns = await prisma.campaign.findMany({
      where: { approved: true },
      include: { feature: true }
    });
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get campaigns', details: error });
  }
});

// ✅ GET pending campaigns for admin approval
router.get('/pending', async (req, res) => {
  try {
    const campaigns = await prisma.campaign.findMany({
      where: { approved: false },
      include: { feature: true }
    });
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get pending campaigns', details: error });
  }
});

// ✅ Approve a campaign
router.patch('/:id/approve', async (req, res) => {
  const spot_id = parseInt(req.params.id);
  try {
    const updated = await prisma.campaign.update({
      where: { spot_id },
      data: { approved: true }
    });
    res.json({ message: 'Campaign approved!', campaign: updated });
  } catch (error) {
    res.status(500).json({ error: 'Failed to approve campaign', details: error });
  }
});

// ✅ GET single campaign by ID (public)
router.get('/:id', async (req, res) => {
  const spot_id = parseInt(req.params.id);
  try {
    const campaign = await prisma.campaign.findUnique({
      where: { spot_id },
      include: { feature: true }
    });
    if (!campaign) return res.status(404).json({ error: 'Campaign not found' });
    res.json(campaign);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching campaign', details: error });
  }
});

// ✅ POST create new campaign (from user suggestion)
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
        approved: false // ✅ default to false for suggestions
      },
    });
    res.status(201).json({ message: 'Campaign suggestion submitted!', campaign: newCampaign });
  } catch (error) {
    res.status(500).json({ error: 'Error creating campaign', details: error });
  }
});

// ✅ DELETE campaign
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

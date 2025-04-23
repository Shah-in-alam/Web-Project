const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  const user_id = req.query.user_id;
  console.log('🔥 user_id received:', user_id);

  try {
    const bookings = await prisma.booking.findMany({
      where: { user_id },
      include: {
        campaign: {
          include: {
            feature: true
          }
        }
      }
    });

    console.log('✅ Bookings fetched:', bookings.length);
    res.status(200).json({ bookings });
  } catch (error) {
    console.error('❌ Booking fetch error:', error);
    res.status(500).json({ error: 'Failed to load bookings', details: error });
  }
});
module.exports = router;
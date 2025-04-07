const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// ✅ GET /home - Booking Overview
router.get('/home', async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      select: {
        booking_id: true,
        name: true,
        spot_id: true,
        user_id: true,
        price: true,
        amount: true,
        check_in: true,
        check_out: true,
        status: true,
        user: {
          select: {
            name: true
          }
        }
      }
    });

    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load bookings', details: error });
  }
});

module.exports = router;
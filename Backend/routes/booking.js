const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  const {booking_id, spot_id, name, price, amount, check_in, check_out, user_id } = req.body;

  if (!spot_id || !name || !price || !amount || !check_in || !check_out || !user_id) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { user_id }, // Directly use user_id like "shahin123"
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newBooking = await prisma.booking.create({
      data: {
        booking_id,
        spot_id,
        name,
        price: parseFloat(price),
        amount: parseInt(amount),
        check_in: new Date(check_in),
        check_out: new Date(check_out),
        user_id: user.user_id,
        status: 'Pending',
      },
    });

    res.status(201).json({
      message: 'Booking created successfully',
      booking: newBooking,
    });
  } catch (error) {
    res.status(500).json({ error: 'Booking creation failed', details: error });
  }
});

module.exports = router;

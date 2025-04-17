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
// GET /booking?status=Pending
router.get('/', async (req, res) => {
  const { status } = req.query;
  try {
    const bookings = await prisma.booking.findMany({
      where: status ? { status } : {},
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings', details: error.message });
  }
});
// PATCH /bookings/cancel/:id
// PATCH /bookings/cancel/:id
router.patch('/cancel/:id', async (req, res) => {
  const bookingId = req.params.id;

  try {
    const updatedBooking = await prisma.booking.update({
      where: { booking_id: bookingId },
      data: { status: 'Canceled' }
    });

    res.json({ message: 'Booking canceled successfully', booking: updatedBooking });
  } catch (error) {
    console.error('Cancel failed:', error);
    res.status(500).json({ error: 'Failed to cancel booking', details: error.message });
  }
});
// In your booking route file
router.patch('/:id/approve', async (req, res) => {
  try {
    const booking = await prisma.booking.update({
      where: { booking_id: req.params.id },
      data: { status: 'Approved' },
    });
    res.json({ message: 'Booking approved', booking });
  } catch (err) {
    res.status(500).json({ error: 'Failed to approve booking' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// POST /booking route to create a booking
router.post('/booking', async (req, res) => {
    const { spot_id, name, price, amount, check_in, check_out, user_id } = req.body;
  
    // Validate if all required fields are provided
    if (!spot_id || !name || !price || !amount || !check_in || !check_out || !user_id) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
      // Create a new booking associated with the user
      const newBooking = await prisma.booking.create({
        data: {
          spot_id,
          name,
          price,
          amount,
          check_in: new Date(check_in),  // Convert string to Date object
          check_out: new Date(check_out), // Convert string to Date object
          user_id,
          status: 'Pending', // Default status
        }
      });
  
      // Respond with the created booking
      res.status(201).json({
        message: 'Booking created successfully',
        booking: newBooking
      });
    } catch (error) {
      res.status(500).json({ error: 'Booking creation failed', details: error });
    }
  });
  
module.exports = router;
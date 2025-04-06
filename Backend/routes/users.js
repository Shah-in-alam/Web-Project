const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();
//SIGNUP POST
router.post('/signup', async (req, res) => {
  const { user_id, name, email, password, phone, address } = req.body;

  if (!user_id || !name || !email || !password || !phone || !address) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return res.status(409).json({ message: 'Email already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      user_id,
      name,
      email,
      password: hashedPassword,
      phone,
      address
    }
  });

  res.status(201).json({ message: 'User registered successfully' });
});

//SIGNIN POST ROUTE
// POST /signin route to authenticate user
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Retrieve user from database by email
    const user = await prisma.user.findUnique({
      where: { email: email },  // Find user by email
    });

    // Check if user exists and password matches
    if (user && user.password === password) {
      // If credentials match, respond with a success message
      res.status(200).json({
        message: 'You have successfully signed in!',
        user: { id: user.user_id, name: user.name, email: user.email }
      });
    } else {
      // If credentials don't match
      res.status(400).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    // Handle any errors (e.g., DB connection errors)
    res.status(500).json({ error: 'Server error', details: error });
  }
});
// GET /signin route for testing - returns a success message
router.get('/signin', (req, res) => {
  res.status(200).json({ message: 'You successfully signed in!' });
});
// GET all users
router.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.status(200).json(users);
});

module.exports = router;

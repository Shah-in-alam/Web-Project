const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

//SIGNUP POST route
router.post('/signup', async (req, res) => {
  const { user_id,name, email, password, phone, address } = req.body;

  if ( !user_id||!name || !email || !password || !phone || !address) {
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

// POST /signin route for authenticating user
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    // Retrieve user from database by email
    const user = await prisma.user.findUnique({
      where: { email: email },  // Find user by email
    });

    // Check if user exists and compare the hashed password
    if (user && await bcrypt.compare(password, user.password)) {
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

// POST /users route to create a new user
router.post('/', async (req, res) => {
  const { user_id, name, email, password, phone, address } = req.body;

  if (!user_id || !name || !email || !password || !phone || !address) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if the user already exists by email
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await prisma.user.create({
      data: {
        user_id,
        name,
        email,
        password: hashedPassword,
        phone,
        address
      }
    });

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ error: 'User creation failed', details: error });
  }
});

// GET all users
router.get('/', async (req, res) => {
  const users = await prisma.user.findMany();
  res.status(200).json(users);
});
// GET Signup API
router.get('/signup',(req,res)=>{
  res.status(200).send('Signup page or from');
})
// GET /signin route for testing or showing a sign-in page
// GET /signin route for checking user credentials
router.get('/signin', async (req, res) => {
  const { email, password } = req.query;  // Get email and password from query parameters

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    // Retrieve user from database by email
    const user = await prisma.user.findUnique({
      where: { email: email },  // Find user by email
    });

    // Check if user exists and password matches
    if (user && user.password === password) {
      // If credentials match, respond with a success message
      res.status(200).json({ message: 'You are on the sign-in page!' });
    } else {
      // If credentials don't match
      res.status(400).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    // Handle any errors (e.g., DB connection errors)
    res.status(500).json({ error: 'Server error', details: error });
  }
});
module.exports = router;

const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// ✅ POST SignUp API
router.post('/signup', async (req, res) => {
  const { user_id, name, email, password, phone, address } = req.body;

  try {
    const user = await prisma.user.create({
      data: { user_id, name, email, password, phone, address }
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
// GET Signup API
router.get('/signup',(req,res)=>{
  res.status(200).send('Signup page or from');
})
// ✅ GET all users
router.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

//POST all users route to create new user
router.post('/users', async (req, res) => {
  const { user_id,name, email, password, phone, address } = req.body;

  try {
    const user = await prisma.user.create({
      data: {
        user_id,
        name,
        email,
        password,
        phone,
        address,
      },
    });
    res.status(201).json(user); // Respond with the created user
  } catch (error) {
    res.status(400).json({ error: 'User creation failed', details: error }); // Error response
  }
});

// Home rote
router.get('/',(req,res)=>{
  res.send('Welcome to the Index router!');
});
module.exports = router;

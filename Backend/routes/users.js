const express = require('express');
const  router = express.Router();
const bcrypt =require('bcrypt');

let users=[];
/*
*POST /api/signup
*Resiger a new user
*/
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

/* GET users listing. */
router.get('/signup', async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      user_id: true,
      name: true,
      email: true,
      phone: true,
      address: true
    }
  });
  res.status(200).json(users);
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();
//--------------------------------------------------------------------------------
//SIGNUP POST route
//---------------------------------------------------------------------------------
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
  const isAdmin = email.includes('.admin@gmail.com');
  await prisma.user.create({
    data: {
      user_id,
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      is_admin: isAdmin
    }
  });

  res.status(201).json({ message: 'User registered successfully' });
});
//---------------------------------------------------------------------------------
// POST /signin route for authenticating user
//----------------------------------------------------------------------------------
router.post('/signin', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' })
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' })
    }

    res.status(200).json({
      message: 'You have successfully signed in!',
      user: { user_id: user.user_id, name: user.name, email: user.email ,is_admin:user.is_admin}
    })
  } catch (error) {
    console.error('SignIn Error:', error)
    res.status(500).json({ error: 'Server error' })
  }
})
//------------------------------------------------------------------------------------
// POST /users route to create a new user
//------------------------------------------------------------------------------------
router.post('/', async (req, res) => {
  const { user_id, name, email, password, phone, address } = req.body;

  if (!user_id || !name || !email || !password || !phone || !address) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
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
//-------------------------------------------------------------------------
// GET all users
//----------------------------------------------------------------
router.get('/', async (req, res) => {
  const users = await prisma.user.findMany();
  res.status(200).json(users);
});
//-------------------------------------------------------------
// GET Signup API
router.get('/signup',(req,res)=>{
  res.status(200).send('Signup page or from');
})
//----------------------------------------------------------------------
// GET /signin route for testing or showing a sign-in page
// GET /signin route for checking user credentials
//------------------------------------------------------------------
router.get('/signin', async (req, res) => {
  const { email, password } = req.query;  

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: email },  
    });
    if (user && user.password === password) {
      res.status(200).json({ message: 'You are on the sign-in page!' });
    } else {
      res.status(400).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error });
  }
});
//------------------------------------------------------------------------
//RESET PASSWORD
// ---------------------------------------------------------------------
router.post('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword }
    });

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to reset password' });
  }
});
///---------------------------------------------------------
//DELET USER BY THE ADMIN
//----------------------------------------------------------
router.delete('/:id',async (req,res) => {
  const user_id=req.params.id;
  try{
    await prisma.user.delete({
      where:{user_id},
    });
    res.json({message:'User delete successfully'});

  }
  catch(error){
    console.error('Delete user error:',error);
    res.status(500).json({error: 'Failed to delete user'});
  }


});
module.exports = router;

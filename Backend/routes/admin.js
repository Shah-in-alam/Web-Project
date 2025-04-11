const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Dummy authentication middleware (you should replace this with real one)
const authenticate = async (req, res, next) => {
  // For demonstration, we're simulating a logged-in user
  const userId = req.headers['user-id'];
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  const user = await prisma.user.findUnique({ where: { user_id: userId } });
  if (!user) return res.status(404).json({ message: 'User not found' });

  req.user = user;
  next();
};

// ✅ Inline checkAdmin logic
const checkAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
  next();
};

// ✅ Admin-only route
router.get('/dashboard', authenticate, checkAdmin, (req, res) => {
  res.json({ message: 'Welcome Admin!', user: req.user });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const bodyParser = require('body-parser');

const app = express();
const prisma = new PrismaClient();

app.use(bodyParser.json());

// ✅ POST SignUp API
app.post('/signup', async (req, res) => {
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

// ✅ GET all users
app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication
    // You can redirect to frontend or send token
    const user = req.user;
    res.redirect(`http://localhost:8080/oauth-success?name=${encodeURIComponent(user.name)}&email=${encodeURIComponent(user.email)}&id=${user.user_id}`);

  }
);

module.exports = router;

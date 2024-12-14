const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../db');
const router = express.Router();
const { authenticateJwt, SECRET } = require("../middleware/index.js");

router.post('/signup', async (req,res) => {
   const {username,password} = req.body;
   const user = await User.findOne({username});

   if(user){
    res.status(403).json({message: 'User Already Exists'});
   } else {
    const newUser = new User({username,password});
    await newUser.save();
    const token = jwt.sign({id: newUser._id}, SECRET,{expiresIn: '1H'});
    res.json({message: 'User Created Successfully', token});
   }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
      const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Invalid username or password' });
    }
  });

    router.get('/me', authenticateJwt, async (req, res) => {
      const user = await User.findOne({ _id: req.userId });
      if (user) {
        res.json({ username: user.username });
      } else {
        res.status(403).json({ message: 'User not logged in' });
      }
    });

  module.exports = router;
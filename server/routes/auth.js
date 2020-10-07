const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
import dotenv from 'dotenv'
dotenv.config()

console.log(process.env.JWT_SECRET)
//const getSecret = require("../config/secrets")
const auth = require('../middleware/auth'); //bring in to verify token

const User = require('../models/User');

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password') //.select - do not return password enough though its encrypted
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


router.post('/', async (req, res) => {

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email }); //check to see if user exists in db (search by email)

    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' }) // if user doesn't exist send error
    }

    const isMatch = await bcrypt.compare(password, user.password); //use bycrypt to see if password returned from database matches password entered by user

    if (!isMatch) { // if no match send error back to user
      return res.status(400).json({ msg: 'Invalid Credentials' })
    }
    // run below if there is a match
    jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET, { //pass in an object with user id to create webtoken with jsonwebtoken
      expiresIn: 3600                                         // a secret must also be passed into sign (it can be whatever you want (store in config.get() from config npm))
    }, (err, token) => {
      if (err) throw err;
      res.json({ token })
    })
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
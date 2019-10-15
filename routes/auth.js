const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const session = require('express-session');

router.get('/', (req, res) => {
  res.render('home', {layout: false});
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error){
    req.flash('error', error.details[0].message);
    res.redirect('/');
  }
  let user = await User.findOne({ email: req.body.email });
  if (!user){
    req.flash('error', 'Invalid email or password.');
    res.redirect('/');
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword){
    req.flash('error', 'Invalid email or password.');
    res.redirect('/');
  }
  const token = user.generateAuthToken();
  ssn = req.session;
  ssn.token = token;
  res.setHeader('Authorization', token);
  res.redirect('dashboard');
});
router.get('/signout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

function validate(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required()
  };

  return Joi.validate(req, schema);
}

module.exports = router; 

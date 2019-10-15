const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User, validate} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});
router.get('/', async (req, res) => {
  const users = await User.find().sort('name');
  res.render('register-users', { title: "Register A User", users : users, user: req.user });
});

router.get('/view', async (req, res) => {
  const users = await User.find().sort('name');
  res.render('view-users', { title: "System Users", users : users, user: req.user });
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 

  if (error){
    req.flash('error', error.details[0].message);
    res.redirect('users');
  }

  let user = await User.findOne({ email: req.body.email });
  if (user){
    req.flash('error', 'User already registered.');
    res.redirect('users');
  }

  user = new User(_.pick(req.body, ['name', 'email', 'password', 'isAdmin', 'role']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  req.flash('info', "User successfully registered");
  res.redirect('users');
  // const token = user.generateAuthToken();
  // res.header('x-auth-token', token).redirect('register-users');
  // res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

router.delete('/:id', async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);

  if (!user) return res.status(404).send('The user with the given ID was not found.');

  res.sendStatus(200);
});

module.exports = router; 

const {Material, validate} = require('../models/material');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  const materials = await Material.find().sort('name');
  res.render('material', { title: "materials", materials : materials, user: req.user });
  // res.send(materials);
  // console.log(req.user);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) {
    req.flash('error', error.details[0].message);
    res.redirect('materials');
  }

  let material = new Material({ 
      title: req.body.title,
      units: req.body.units
 });
  material = await material.save();
  
  res.redirect('materials');
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const material = await Material.findByIdAndUpdate(req.params.id, { 
      title: req.body.title,
      units: req.body.units
 }, {
    new: true
  });

  if (!material) return res.status(404).send('The material with the given ID was not found.');
  
  res.send(material);
});

router.delete('/:id', async (req, res) => {
  const material = await Material.findByIdAndRemove(req.params.id);

  if (!material) return res.status(404).send('The material with the given ID was not found.');

  res.sendStatus(200);
});

router.get('/:id', async (req, res) => {
  const material = await Material.findById(req.params.id);

  if (!material) return res.status(404).send('The material with the given ID was not found.');

  res.send(material);
});

module.exports = router;
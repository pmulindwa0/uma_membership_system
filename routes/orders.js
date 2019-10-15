const {Order, validate} = require('../models/order'); 
const {Material} = require('../models/material');
const {Job} = require('../models/job');
const mongoose = require('mongoose');
const Fawn = require('fawn');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const orders = await Order.find().sort('-placedOn');
  const jobs = await Job.find();
  const materials = await Material.find();
  
  res.render('material-order', {title: "Material Orders", orders: orders, jobs: jobs, materials: materials, user: req.user});
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); // Destructuring
  // if (error) return res.status(400).send(error.details[0].message);
  if (error) {
    req.flash('error', error.details[0].message);
    res.redirect('material-order');
  }

  const material = await Material.findById(req.body.materialId);
  if(!material) return res.status(400).send('Invalid material..');

  const job = await Job.findById(req.body.jobId);
  if(!job) return res.status(400).send('Invalid job..');
  
  if (material.numberInStock < parseInt(req.body.quantity)) {
    req.flash('error', 'The quantity requested for is greater than what is in stock');
    res.redirect('material-order');
  }

  let order = new Order({ 
    material:{
      _id: material._id,
      title: material.title,
      units: material.units
   },
   job:{
    _id: job._id,
    title: job.title,
    description: job.description
    },
    quantity: req.body.quantity,
    placedBy: req.body.placedBy
  });
  try{
    new Fawn.Task()
    .save('orders', order)
    .update('materials', {_id: material._id}, {
      $inc: {numberInStock: -parseInt(req.body.quantity)}
    })
    .run();

    // res.send(order);
    req.flash('info', 'Order Recived!');
    res.redirect('material-order');
  }catch(ex){
    req.flash('error', 'something went worng...');
    res.redirect('material-order');
  }
  
});

router.delete('/:id', async (req, res) => {
  const order = await Order.findByIdAndRemove(req.params.id);

  if (!order) return res.status(404).send('The stock with the given ID was not found.');

  res.send(order);
});

router.get('/:id', async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) return res.status(404).send('The order with the given ID was not found.');

  res.send(order);
});

module.exports = router; 
const {Stock, validate} = require('../models/stock'); 
const {Material} = require('../models/material');
const mongoose = require('mongoose');
const Fawn = require('fawn');
const express = require('express');
const router = express.Router();

Fawn.init(mongoose);

router.get('/', async (req, res) => {
  const materials = await Material.find().sort('title');
  const stocks = await Stock.find().sort('-dateIn');
  res.render('stock-take', {title: "Stock Take", stocks: stocks, materials: materials, user: req.user});
  // res.send(stocks);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body); // Destructuring
  // if (error) return res.status(400).send(error.details[0].message);
  if (error) {
    req.flash('error', error.details[0].message);
    res.redirect('stock-take');
  }

  const material = await Material.findById(req.body.materialId);
  if(!material) return res.status(400).send('Invalid material..');

  let stock = new Stock({ 
    material:{
      _id: material._id,
      title: material.title,
      units: material.units
   },
    quantity: req.body.quantity,
    ammount: req.body.ammount
  });
  try{
    new Fawn.Task()
    .save('stocks', stock)
    .update('materials', {_id: material._id}, {
      $inc: {numberInStock: parseInt(req.body.quantity)}
    })
    .run();

    res.redirect('stock-take');
  }catch(ex){
    res.status(500).send('something went worng...');
  }
  
});

router.delete('/:id', async (req, res) => {
  const stock = await Stock.findByIdAndRemove(req.params.id);

  if (!stock) return res.status(404).send('The stock with the given ID was not found.');

  res.send(stock);
});

router.get('/:id', async (req, res) => {
  const stock = await Stock.findById(req.params.id);

  if (!stock) return res.status(404).send('The stock with the given ID was not found.');

  res.send(stock);
});

module.exports = router; 
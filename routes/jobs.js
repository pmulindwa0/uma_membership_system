const {Job, validate} = require('../models/job');
const mongoose = require('mongoose');
const multer = require('multer');
const path   = require('path');
const express = require('express');
const router = express.Router();

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).fields([
  {name: 'sample'},
  {name: 'sample2'},
  {name: 'sample3'}
]);

// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}


router.get('/', async (req, res) => {
  const jobs = await Job.find().sort('title');
  res.render('job-order', { title: "Job Orders", jobs : jobs, user: req.user });
});

router.get('/view', async (req, res) => {
  const jobs = await Job.find().sort('title');
  res.render('view-job-order', { title: "Job Orders", jobs : jobs, user: req.user });
});

router.post('/', upload, async (req, res) => {
  // const { error } = validate(req.body); 
  // if (error) return res.status(400).send(error.details[0].message);

  let job = new Job({ 
      title: req.body.title,
      quantity: req.body.quantity,
      description: req.body.description,
      sample: `uploads/${req.files.sample[0].filename}`,
      sample2: `uploads/${req.files.sample2[0].filename}`,
      sample3: `uploads/${req.files.sample3[0].filename}`,
 });
  job = await job.save();
  
  res.redirect('job-order');
  // res.send(req.files.sample[0].filename);
});

router.post('/:id', async (req, res) => {
  // const { error } = validate(req.body); 
  // // if (error) return res.status(400).send(error.details[0].message);
  // if (error) {
  //   req.flash('error', error.details[0].message);
  //   res.redirect(`/job-order/${req.params.id}`);
  // }

  if ((parseInt(req.body.quantity) < parseInt(req.body.cutting)) || 
  (parseInt(req.body.quantity) < parseInt(req.body.stitching)) || 
  (parseInt(req.body.quantity) < parseInt(req.body.finishing)) ||
  (parseInt(req.body.quantity) < parseInt(req.body.packaging))) {
    req.flash('error', `Oops, You are exceeding the requested quantity of ${req.body.quantity}`);
    res.redirect(`/job-order/${req.params.id}`);
  }else{
  const job = await Job.findByIdAndUpdate(req.params.id, { 
      title: req.body.title,
      quantity: req.body.quantity,
      description: req.body.description,
      sample: req.body.sample,
      orderDate: req.body.orderDate,
      cutting: req.body.cutting,
      stitching: req.body.stitching,
      finishing: req.body.finishing,
      packaging: req.body.packaging
 }, {
    new: true
  });

  if (!job) return res.status(404).send('The job with the given ID was not found.');
  req.flash('info', 'Status successfully update...');
  res.redirect(`/job-order/${req.params.id}`);
}
});

router.delete('/:id', async (req, res) => {
  const job = await Job.findByIdAndRemove(req.params.id);

  if (!job) return res.status(404).send('The job with the given ID was not found.');

  res.sendStatus(200);
});

router.get('/:id', async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) return res.status(404).send('The job with the given ID was not found.');

  res.render('job-details', { title: "Job Details", job : job, user: req.user });
});

module.exports = router;
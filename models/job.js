const Joi = require('joi');
const mongoose = require('mongoose');
const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  quantity:{
    type: Number,
    required: true,
    min: 0
  },
  orderDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  description: {
      type: String,
      required: true
  },
  cutting: {
      type: Number,
      default: 0,
      required: true
  },
  stitching: {
    type: Number,
    default: 0,
    required: true
},
finishing: {
    type: Number,
    default: 0,
    required: true
},
packaging: {
    type: Number,
    default: 0,
    required: true
},
sample: {
    type: String,
    required: true
},
sample2: {
  type: String,
  required: true
},
sample3: {
  type: String,
  required: true
}
})

const Job = mongoose.model('Job', jobSchema);

function validateJob(job) {
  const schema = {
    title: Joi.string().min(2).required(),
    quantity: Joi.number().required(),
    description: Joi.string().required(),
    sample: Joi.string().required(),
    sample2: Joi.string().required(),
    sample3: Joi.string().required()
  };

  return Joi.validate(job, schema);
}

exports.Job = Job; 
exports.validate = validateJob;
exports.jobSchema = jobSchema;
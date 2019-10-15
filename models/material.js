const Joi = require('joi');
const mongoose = require('mongoose');
const materialSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  units: {
      type: String,
      required: true
  },
  numberInStock: {
      type: Number,
      default: 0,
      required: true
  }
})

const Material = mongoose.model('Material', materialSchema);

function validateMaterial(material) {
  const schema = {
    title: Joi.string().min(2).required(),
    units: Joi.string().required()
  };

  return Joi.validate(material, schema);
}

exports.Material = Material; 
exports.validate = validateMaterial;
exports.materialSchema = materialSchema;
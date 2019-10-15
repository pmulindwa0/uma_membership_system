const Joi = require('joi');
const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  material: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
      },
      units:{
        type: String,
        required: true
      }
    }),
    required: true
  },
  dateIn: {
    type: Date,
    required: true,
    default : Date.now
  },

  quantity : {
      type : Number,
      required: true,
      min: 0
  },
  ammount: {
      type: Number,
      required: true,
      min: 0
  }
});

const Stock = mongoose.model('Stock', stockSchema);

function validateStock(stock) {
  const schema = {
    materialId: Joi.string().required(),
    quantity: Joi.number().required(),
    ammount: Joi.number().required()
  };

  return Joi.validate(stock, schema);
}

exports.Stock = Stock; 
exports.validate = validateStock;
exports.stockSchema = stockSchema;
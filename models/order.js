const Joi = require('joi');
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
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
  job: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
      },
      description:{
        type: String,
        required: true
      }
    }),
    required: true
  },
  placedOn: {
    type: Date,
    required: true,
    default : Date.now
  },

  quantity : {
      type : Number,
      required: true,
      min: 0
  },
  placedBy: {
      type: String,
      required: true
  }
});

const Order = mongoose.model('Order', orderSchema);

function validateOrder(order) {
  const schema = {
    materialId: Joi.string().required(),
    jobId: Joi.string().required(),
    quantity: Joi.number().required(),
    placedBy: Joi.string().required()
  };

  return Joi.validate(order, schema);
}

exports.Order = Order; 
exports.validate = validateOrder;
exports.orderSchema = orderSchema;
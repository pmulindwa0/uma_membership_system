const Joi = require('joi');
const mongoose = require('mongoose');
const eventSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String},
    from: {type: Date},
    to: {type: Date},
    attendants: {type: [new mongoose.Schema(
    {company_name: {type: String, required: true}, 
    representative: {type: String},
    telephone_number:{type: String},
    email: {type: String},
    title: {type: String}
    }
    )]}
});

const Event = mongoose.model('Event', eventSchema);

function validateEvent(event) {

    const schema = {
    title: Joi.string().required(),
    description: Joi.string()
    };

    return Joi.validate(event, schema);
}

exports.Event = Event; 
exports.validate = validateEvent;
exports.eventSchema = eventSchema;
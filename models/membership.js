const Joi = require('joi');
const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    company_name: {type: String},
    physical_address: {type: String},
    box_number: {type: String},
    telephone_number: {type: String},
    fax_number: {type: String},
    email: {type: String},
    website: {type: String},
    facebook_account: {type: String},
    tweeter_handle: {type: String},
    whatsapp_number: {type: String},
    skype: {type: String},
    selling_point: {type: String},
    sector: {type: String},
    products: {type: [ String ]},
    product_hs_codes: {type: [String]},
    product_brands: {type: [String]},
    ownership: {type: String},
    investment: {type: String},
    directors: {type: [ String ]},
    director_nationalities: {type: [ String ]},
    turn_over: {type: String},
    labour_force: {type: String},
    contact_name: {type: String},
    contact_tel: {type: String},
    contact_email: {type: String},
    md_name: {type: String},
    md_email: {type: String},
    md_phone: {type: String},
    pm_name: {type: String},
    pm_email: {type: String},
    pm_phone: {type: String},
    em_name: {type: String},
    em_email: {type: String},
    em_phone: {type: String},
    am_name: {type: String},
    am_email: {type: String},
    am_phone: {type: String},
    establishment_date: {type: Date},
    created_on: {type: Date, default: Date.now },
    isActive: {type: Boolean, default: false },
    paid_up: {type: Boolean, default: false },
    license: { type: String, required: true},
    ura: {type: String, required: true},
    nssf: {type: String, required: true}
})

const Member = mongoose.model('Member', memberSchema);

function validateMember(member) {
    const schema = {
        company_name: Joi.string().min(2).required(),
        physical_address: Joi.string().required()
    };

    return Joi.validate(member, schema);
}

exports.Member = Member;
exports.validate = validateMember;
exports.memberSchema = memberSchema;
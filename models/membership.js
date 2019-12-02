const Joi = require('joi');
const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    company_name: {type: String},
    physical_address: {type: String},
    sub_county: {type: String},
    district: {type: String},
    region: {type: String},
    box_number: {type: String},
    telephone_number: {type: String},
    mobile: {type: String},
    fax_number: {type: String},
    email: {type: String},
    website: {type: String},
    facebook_account: {type: String},
    tweeter_handle: {type: String},
    whatsapp_number: {type: String},
    skype: {type: String},
    selling_point: {type: String},
    nature_of_business: {type: String},
    sector: {type: String},
    category: {type: String},
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
    contact_tile: {type: String},
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
    date_joining_uma: {type: Date},
    created_on: {type: Date, default: Date.now },
    isActive: {type: Boolean, default: false },
    paid_up: {type: Boolean, default: false },
    license: { type: String},
    ura: {type: String},
    nssf: {type: String},
    logo: {type: String},
    y_coordinates: {type: String},
    x_coordinates: {type: String},
    payments: {type: [{
        reciept_number: {type: String},
        cheque_number: {type: String},
        paymentDate: {type: Date},
        amount: {type: String},
        recordedBy: {type: String}
    }     
    ]},
    concerns: {type: [{
        concern: {type: String},
        loggedInBy: {type: String},
        loggedInOn: {type: Date},
        solution: {type: String},
        solutionDate: {type: Date}
    }     
    ]}
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
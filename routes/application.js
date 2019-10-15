const {Member, validate} = require('../models/membership');
const multer = require('multer');
const path   = require('path');
const express = require('express');
const router = express.Router();

// uploads
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb){
      cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  
  const upload = multer({
    storage: storage,
    limits:{fileSize: 10000000},
    fileFilter: function(req, file, cb){
      checkFileType(file, cb);
    }
  }).fields([
    {name: 'license'},
    {name: 'ura'},
    {name: 'nssf'}
  ]);
  // Check File Type
function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|docx|pdf|doc/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
  
    if(mimetype && extname){
      return cb(null,true);
    } else {
      cb('Error: Unaccepted file format!');
    }
  }
// end upload

router.get('/', async (req, res) => {
    res.render('membership_app_form', {
        layout: false
    });
});

router.post('/', upload, async (req, res) => {
    console.log(req.body);
    // console.log(req.files);
    const {error} = validate(req.body);
    if (error) {
        console.log(error.details[0].message)
        // req.flash('error', error.details[0].message);
        res.redirect('application');
    }

    let member = new Member({
        company_name: req.body.company,
        physical_address: req.body.office,
        box_number: req.body.box,
        telephone_number: req.body.tel_no,
        fax_number: req.body.fax,
        email: req.body.email,
        website: req.body.web,
        facebook_account: req.body.facebook,
        tweeter_handle: req.body.tweeter,
        whatsapp_number: req.body.whatsapp,
        skype: req.body.skype,
        selling_point: req.body.seeling_point,
        sector: req.body.business,
        products: req.body.fields,
        product_hs_codes: req.body.fields2,
        product_brands: req.body.fields3,
        ownership: req.body.ownership,
        investment: req.body.investment,
        directors: req.body.directors_name,
        director_nationalities: req.body.directors_nationality,
        turn_over: req.body.turnover,
        labour_force: req.body.employees,
        contact_name: req.body.contact_name,
        contact_tel: req.body.contact_tel,
        contact_email: req.body.contact_email,
        md_name: req.body.md_name,
        md_email: req.body.md_email,
        md_phone: req.body.md_phone,
        pm_name: req.body.pm_name,
        pm_email: req.body.pm_email,
        pm_phone: req.body.pm_phone,
        em_name: req.body.em_name,
        em_email: req.body.em_email,
        em_phone: req.body.em_phone,
        am_name: req.body.am_name,
        am_email: req.body.am_email,
        am_phone: req.body.am_phone,
        establishment_date: req.body.establishment,
        license: `uploads/${req.files.license[0].filename}`,
        ura: `uploads/${req.files.ura[0].filename}`,
        nssf: `uploads/${req.files.nssf[0].filename}`
    });
    member = await member.save();

    res.redirect('application');
});

module.exports = router;
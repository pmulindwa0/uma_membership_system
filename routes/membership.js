const {Member, validate} = require('../models/membership');
const express = require('express');
const csv = require('fast-csv');
const json2csv = require('json2csv');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/', async(req,res) => {
    const members = await Member.find().sort('created_on');
    const sectors = await Member.distinct("sector");
    const category = await Member.distinct("category");
    res.render('membership_list', {title: "Membership List", members: members, user: req.user, sectors: sectors, category: category})
});

router.post('/', async(req,res) => {
    // const members = await Member.find().sort('created_on');
    let sector = req.body.sectors;
    let category = req.body.category;

    if (sector === undefined) {
        sector = await Member.distinct("sector");
    }

    if (category === undefined) {
        category = await Member.distinct("category");
     }
    
    const members = await Member.find({
        'sector': {$in: sector}, 
        'category': {$in: category}
    });

    res.render('membership_list', {title: "Membership List", members: members, user: req.user, sectors: await Member.distinct("sector"), category: await Member.distinct("category")})
});

router.get('/upload', async (req, res) => {
    res.render('membership_upload', { title: "Upload Members", user: req.user });
  });

router.post('/upload', async (req, res) => {
if (!req.files) {
    // return res.status(400).send('No file upload.');
    req.flash('error', 'No file upload.');
    res.redirect('/membership/upload');
}

const memberFile = req.files.file;

const members = [];

csv
.fromString(memberFile.data.toString(), {
    headers: true,
    ignoreEmpty: true
})
.on("data", function(data){
    data['_id'] = new mongoose.Types.ObjectId();

    members.push(data)
})
.on("end", function(){
    Member.create(members, function(err, documents) {
       if (err) throw err;
    });
     
    // res.send(members.length + ' members have been successfully uploaded.');
    req.flash('info', members.length + ' members have been successfully uploaded.');
    res.redirect('/membership/upload');
});

// res.redirect('membership/upload');
});

router.get('/template', (req, res) => {

    const fields = Object.keys(Member.schema.obj);
 
    const csv = json2csv.parse({ data: '', fields: fields });
 
    res.set("Content-Disposition", "attachment;filename=members.csv");
    res.set("Content-Type", "application/octet-stream");
 
    res.send(csv);
});

router.get('/:id', async (req, res) => {
    const member = await Member.findById(req.params.id);
  
    if (!member) {
        req.flash('error','The Member with the given ID was not found.');
        res.redirect('/membership');
    }
  
    res.render('company_profile', {title: `${member.company_name} Profile`, member: member, user: req.user})
  });
router.post('/:id', async (req, res) =>{
    // res.send(req.body);
    const memberUpdate = await Member.findByIdAndUpdate(req.params.id,{
        company_name: req.body.company,
        physical_address: req.body.office,
        box_number: req.body.box,
        telephone_number: req.body.phone,
        fax_number: req.body.fax,
        email: req.body.email,
        website: req.body.web,
        facebook_account: req.body.facebook,
        tweeter_handle: req.body.tweeter,
        whatsapp_number: req.body.whatsapp,
        skype: req.body.skype,
        category: req.body.category,
        sector: req.body.sector,
        investment: req.body.investment,
        directors: req.body.directors_name,
        turn_over: req.body.turnover,
        labour_force: req.body.employees,
        isActive: req.body.active,
        y_coordinates: req.body.y_coordinates,
        x_coordinates: req.body.x_coordinates,
        contact_name: req.body.contact_person,
        contact_tel: req.body.contact_tel,
        contact_email: req.body.contact_email
    },{
        new: true
    });

    if (!memberUpdate) {
        req.flash('error','Update failure!');
        res.redirect('/membership');
    }
  
    req.flash('info','Member Information successfully updated!');
    res.redirect('/membership');
});

router.get('/:id/delete', async (req, res) => {
const member = await Member.findByIdAndRemove(req.params.id);

if (!member) {
    req.flash('error','The Member with the given ID was not found.');
    res.redirect('/membership');
}else{
    req.flash('info','One member successfully deleted');
    res.redirect('/membership');
}

// res.send(member);
});

router.get('/:id/payment', async(req, res)=>{
    const member = await Member.findById(req.params.id);
    res.render('payment', {title: member.company_name, member: member, user: req.user});
});

router.post('/:id/payment', async(req, res)=>{
    // res.send(req.body);
    const updatePayments = await Member.update(
        {_id: req.params.id},
        {$push: {payments:{
            reciept_number: req.body.reiept_no,
            cheque_number: req.body.cheque_no,
            paymentDate: req.body.date,
            amount: req.body.amount
        }}}
    );

    if (!updatePayments) {
        req.flash('error','Update failure!');
        res.redirect(`/membership/${req.params.id}/payment`);
    }
  
    req.flash('info','Payment captured');
    res.redirect(`/membership/${req.params.id}/payment`);

});

router.get('/:id/concerns', async(req, res)=>{
    const member = await Member.findById(req.params.id);
    res.render('concern', {title: member.company_name, member: member, user: req.user});
});

router.post('/:id/concerns', async(req, res)=>{
    // res.send(req.body);
    const updateConcerns = await Member.update(
        {_id: req.params.id},
        {$push: {concerns:{
            concern: req.body.concern,
            loggedInBy: req.user.name,
            loggedInOn: req.body.date,
        }}}
    );

    if (!updateConcerns) {
        req.flash('error','Update failure!');
        res.redirect(`/membership/${req.params.id}/concerns`);
    }
  
    req.flash('info','Concern captured');
    res.redirect(`/membership/${req.params.id}/concerns`);

});

module.exports = router;
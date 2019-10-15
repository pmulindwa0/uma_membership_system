const {Member, validate} = require('../models/membership')
const express = require('express');
const csv = require('fast-csv');
const json2csv = require('json2csv');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/', async(req,res) => {
    const members = await Member.find().sort('created_on');
    res.render('membership_list', {title: "Membership List", members: members, user: req.user})
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
module.exports = router;
const {Member, validate} = require('../models/membership');
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');


router.get('/', async (req, res) => {
  res.render('mail', {title: "Mail Notifications", user: req.user, sectors: await Member.distinct("sector"), category: await Member.distinct("category")});
});

router.post('/', async (req, res) => {
  let sector = req.body.sectors;
  let category = req.body.category;

  let member_emails = [];

  if ((sector !== undefined) || (category !== undefined)) {
    if ((sector !== undefined) && (category === undefined)) {
      
      member_emails = await Member.find({
        'sector': {$in: sector}
      }).distinct("email");
    }

    else if ((sector === undefined) && (category !== undefined)) {
      member_emails = await Member.find({
        'category': {$in: category}
      }).distinct("email");
    }

    else{
      member_emails = await Member.find({
        'sector': {$in: sector}, 
        'category': {$in: category}
      }).distinct("email");
    }
  }
  // res.send(member_emails);
  // console.log(member_emails.length);
  const bccEmails = (member_emails.length > 0) ? ['umahest.system@gmail.com', 'pmulindwa0@gmail.com'] : ' ';


  let transporter = nodemailer.createTransport({
    host: 'openafricatours.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: "pecode@openafricatours.com", // generated ethereal user
        pass: "pa55w0rd" // generated ethereal password
    }
  });
  

  let mailOptions = {
    from: '"UMA Membership Admin" <pecode@openafricatours.com>',
    to: req.body.emailTo,
    bcc: bccEmails,
    subject: req.body.subject,
    html: req.body.message        
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      req.flash('error', "Send mail failure");
      res.redirect('/notification');
    } else {
      console.log('Email sent: ' + info.response);
      req.flash('info', "Email send successfully");
      res.redirect('/notification');
    }
  });
});

module.exports = router; 
const {Event, validate} = require('../models/event');
const {Member} = require('../models/membership');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
    const events = await Event.find();
    res.render('create_event', {title: "Membership Events", user: req.user, events: events});
  });

router.post('/', async(req, res) => {
   const { error } = validate(req.body); // Destructuring
    // if (error) return res.status(400).send(error.details[0].message);
    // if (error) {
    //     req.flash('error', error.details[0].message);
    //     res.redirect('/events');
    // } 

    let event = new Event({
        title: req.body.title,
        description: req.body.description,
        from: req.body.from,
        to: req.body.to
    });

    event = await event.save();

    if (!event) {
        req.flash('error', "Server Error, Unable to register event");
        res.redirect('/events');
    }

    req.flash('info', "An event has been submitted");
    res.redirect('/events');
});
router.get('/attendance/:id', async(req, res) =>{
    // res.send(req.params.id);
    const members = await Member.find();
    const event = await Event.findById(req.params.id);
    res.render('attendence', {title: `${event.title} Attendence List`, user: req.user, members: members, eventAttendants: event.attendants, event: event, eventID: req.params.id});
});
router.post('/attendance/:id', async(req, res) =>{
    const id = req.params.id;
    const coId = req.body.members;
    // res.send(`Event: ${id} Company: ${coId}`);
    const member = await Member.findById(coId);

   const updateAttendence = await Event.update(
        { _id: id },
        { $addToSet: { attendants: { 
            company_name: member.company_name, 
            representative: req.body.representative,
            telephone_number: req.body.repTel,
            email: req.body.repEmail,
            title: req.body.repTitle
        } } }
     );

     if (!updateAttendence) {
        req.flash('error','Update failure!');
        res.redirect(`/events/attendance/${id}`);
    }
  
    req.flash('info','Attendence List Updated!');
    res.redirect(`/events/attendance/${id}`);
});
module.exports = router; 
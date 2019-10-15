const {Member} = require('../models/membership');
const {Wsaip} = require('../models/wsaip');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/', async(req,res) => {
    const members = await Member.distinct("company_name"); // Getting a list of unique members frome the database
    // numberOfMembers = members.length;
    const respondents = await Wsaip.find();
    const industryInSwamp = await Wsaip.aggregate([
		{"$group" : {_id:"$industryInSwampySurrounding", count:{$sum:1}}}
    ]);
    const waterUsage = await Wsaip.aggregate([
		{"$group" : {_id:"$waterQuantity", count:{$sum:1}}}
    ]);
    const months = await Wsaip.aggregate([
		{"$group" : {_id:"$monthsWithMoreFlooding", count:{$sum:1}}}
    ]);
    const counts = [];
    const ids = [];
    waterUsage.forEach(item =>{
        counts.push(item.count);
        ids.push(item._id);
    });
    const swampyLabels = [];
    const swampyCounts = [];

    industryInSwamp.forEach(x=>{
        swampyCounts.push(x.count);
        swampyLabels.push(x._id);
    });

    props = {
        companies: members.length,
        respondents: respondents.length,
        swampy: industryInSwamp,
        waterUsage: waterUsage,
        counts: counts,
        ids: ids,
        months: months,
        swampyLabels: swampyLabels,
        swampyCounts: swampyCounts
    };
    // res.send(props);
    res.render('dashboard', {title: "Dashboard", props: props, user: req.user, wsaipData: respondents})
});

module.exports = router;
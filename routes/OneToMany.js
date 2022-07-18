const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');

const User = require('../models/user')
const Sport  = require('../models/sports'); 

router.get('/u', async (req,res)=>{
    User.find({}).then(function(dbUsers){
        res.json(dbUsers);
    }).catch(function(err){
        res.json(err);
    })
});

router.get('/s', async (req,res)=>{
    Sport.find({}).then(function(dbSports){
        res.json(dbSports);
    }).catch(function(err){
        res.json(err);
    })
});

router.post('/u',async (req,res)=>{
    User.create(req.body).then(function(dbUsers){
        res.json(dbUsers);
    }).catch(function(err){
        res.json(err);
    });
})

router.post('/u/:id', async(req,res)=>{
    Sport.create(req.body).then(function(dbSports){
        return User.findOneAndUpdate({_id: req.params.id},
            {
                $push: {sports: dbSports._id}},{new:true});
    }).then(function(dbUsers){
        res.json(dbUsers);
    }).catch(function(err){
        res.json(err);
    });
});

router.get('/u/:id', async (req,res)=>{
    User.findOne({_id: req.params.id}).populate('sports').then(function(dbUsers){
        res.json(dbUsers);
    }).catch(function(err){
        res.json(err);
    });
});







module.exports = router
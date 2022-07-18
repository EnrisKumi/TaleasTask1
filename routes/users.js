const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');

const User = require('../models/user')
const Sport  = require('../models/sports'); 

router.get('/', async (req,res,next)=>{
    try{
        const users = await User.find();
        res.status(200).json(users)
    }catch(err){
        res.send('Error '+ err)
    }
})

router.post('/', async(req,res)=> {
    const user = new User({
        firstName: req.body.firstName,
        lastName : req.body.lastName,
    })
    try{
       
        const a = await user.save();
        res.status(200).json(a);
    }catch(err){
        res.send('Error')
    }
})


router.get('/:id', async (req,res,next)=>{
    try{
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    }catch(err){
        res.send('Error '+ err)
    }
})

router.patch('/:id', async (req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        const {firstName,lastName}= req.body

        if(firstName){
            user.firstName= firstName
        }
        if(lastName){
            user.lastName= lastName
        }

        const us = await user.save()
        res.status(200).json(us)
    }catch(err){
        res.send('Error')
    }
})

router.delete('/:id', async (req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        
        const us = await user.remove()
        res.status(200).json(us)
    }catch(err){
        res.send('Error')
    }
})


module.exports = router
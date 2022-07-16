const express = require('express')
const router = express.Router()
const User = require('../models/user')


router.get('/', async (req,res)=>{
    try{
        const users = await User.find() 
        res.json(users)
    }catch(err){
        res.send('Error '+ err)
    }
})

router.post('/', async (req,res)=>{
    const user = new User({
        //data from object from client side
        firstName: req.body.firstName,
        lastName: req.body.lastName
    }) 
    try{
        const us = await user.save()
        res.json(us)
    }catch(err){
        res.send('Error')
    }
})

router.get('/:id', async (req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        res.json(user)
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
        res.json(us)
    }catch(err){
        res.send('Error')
    }
})

router.delete('/:id', async (req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        
        const us = await user.remove()
        res.json(us)
    }catch(err){
        res.send('Error')
    }
})


module.exports = router
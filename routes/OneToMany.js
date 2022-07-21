const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');

const User = require('../models/user')
const Sport  = require('../models/sports'); 

/**
 * @swagger
 * /one2many/users:
 *   get:
 *     summary: Returns the list of all the users
 *     tags: [One to Many]
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

router.get('/users', async (req,res)=>{
    User.find({}).then(function(dbUsers){
        res.json(dbUsers);
    }).catch(function(err){
        res.json(err);
    })
});

/**
 * @swagger
 * /one2many/sports:
 *   get:
 *     summary: Returns the list of all the sports
 *     tags: [One to Many]
 *     responses:
 *       200:
 *         description: The list of the sports
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sports'
 */

router.get('/sports', async (req,res)=>{
    Sport.find({}).then(function(dbSports){
        res.json(dbSports);
    }).catch(function(err){
        res.json(err);
    })
});

/**
 * @swagger
 * /one2many/users:
 *   post:
 *     summary: Create a new user
 *     tags: [One to Many]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 */

router.post('/users',async (req,res)=>{
    User.create(req.body).then(function(dbUsers){
        res.json(dbUsers);
    }).catch(function(err){
        res.json(err);
    });
})

/**
 * @swagger
 * /one2many/users/{id}:
 *  post:
 *    summary: Add to the user the sport that he/she plays
 *    tags: [One to Many]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Sports'
 */

router.post('/users/:id', async(req,res)=>{
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

/**
 * @swagger
 * /one2many/users/{id}:
 *   get:
 *     summary: Returns the list of all the users by and their sports
 *     tags: [One to Many]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user by id
 *     responses:
 *       200:
 *         description: The user description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */

router.get('/users/:id', async (req,res)=>{
    User.findOne({_id: req.params.id}).populate('sports').then(function(dbUsers){
        res.json(dbUsers);
    }).catch(function(err){
        res.json(err);
    });
});

/**
 * @swagger
 * /one2many/users/{id}:
 *   delete:
 *     summary: Delete a user by their id
 *     tags: [One to Many]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 */

router.delete('/users/:id', async(req, res) =>{
    User.findOneAndDelete({_id: req.params.id})
    .then(function(dbUsers){
        res.json(dbUsers)
    }).catch(function(error){
        res.json(error)
    })
})

/**
 * @swagger
 * /one2many/sports/{id}:
 *   delete:
 *     summary: Delete a sport by their ID
 *     tags: [One to Many]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 */

router.delete('/sports/:id', async(req, res) =>{
    Sport.findOneAndDelete({_id: req.params.id})
    .then(function(dbSports){
        res.json(dbSports)
    })
    .catch(function(err){
        res.json(err)
    })
})

/**
 * @swagger
 * /one2many/users/{id}:
 *  patch:
 *    summary: Update the user by their id
 *    tags: [One to Many]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 */

router.patch('/users/:id', async(req, res) =>{
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








module.exports = router
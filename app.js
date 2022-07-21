const express = require('express')
const mongoose = require('mongoose')
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require ('swagger-jsdoc');



const url = 'mongodb://localhost/DataBaseT'

//start app
const app = express()

mongoose.connect(url , {useNewUrlParser:true})

const con = mongoose.connection

con.on('open',() => {
    console.log('Connected...')
})

const options = {
    definition: {
        openapi:"3.0.0",
        infor: {
            title: "Rest API",
            version: "1.0.0",
            description: "A simple api"
        },
        servers : [
            {
                url: "http://localhost:9000"
            }
        ],
    },
    apis:["./routes/*.js"]
};

const specs = swaggerJsDoc(options);

app.use(express.json())

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

const usersRouter = require('./routes/users')
app.use('/users',usersRouter)

const OneToMany = require('./routes/OneToMany')
const swaggerJSDoc = require('swagger-jsdoc')
app.use('/one2many',OneToMany)

app.listen(9000, ()=>{
    console.log('Server started')
})
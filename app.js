const express = require('express')
const mongoose = require('mongoose')

const url = 'mongodb://localhost/DataBaseT'

//start app
const app = express()

mongoose.connect(url , {useNewUrlParser:true})

const con = mongoose.connection

con.on('open',() => {
    console.log('Connected...')
})

app.use(express.json())

const usersRouter = require('./routes/users')
app.use('/users',usersRouter)

app.listen(9000, ()=>{
    console.log('Server started')
})
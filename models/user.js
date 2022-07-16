const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true //compository field
    },

    lastName: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User',userSchema)
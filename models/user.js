const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true //compository field
    },

    lastName: {
        type: String,
        required: true
    },

    sports: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sports'
    }]

});

module.exports = mongoose.model('User',userSchema)
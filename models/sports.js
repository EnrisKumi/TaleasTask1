const mongoose = require('mongoose');

const sportSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    timePlaying:{
        type: Number,
        required:true
    }
});

module.exports = mongoose.model('Sports',sportSchema);
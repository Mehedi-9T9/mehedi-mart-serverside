const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        trim: true
    },
    password: {
        type: String,
        require: true,
        trim: true
    },
    gender: {
        type: String,
        require: true
    },
    photo: {
        type: String,
        require: true
    }
})
module.exports = userSchema
const mongoose = require('mongoose');

const User = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    passwordSet: {
        type: Boolean,
        required: true,
    },
    name: {
        type: String,
    },
    imgURL: {
        type: String,
    }
});

module.exports = mongoose.model('User', User);
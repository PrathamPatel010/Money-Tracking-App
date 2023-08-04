const mongoose = require('mongoose');

const User = new mongoose.Schema({
    email: {
        type: String,
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
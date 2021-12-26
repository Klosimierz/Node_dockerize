const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 32
    },
    password: {
        type: String,
        required: true
    }
});

const user = mongoose.model('User',userSchema);

exports.user = user;
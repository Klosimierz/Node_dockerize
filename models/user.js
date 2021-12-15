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
        required: true,
        minlength: 8,
        maxlength: 32
    }
});

const user = mongoose.model('User',userSchema);

userSchema.methods.genToken = () => {
    return jwt.sign({_id:this._id},"temporary_secret");
}
//PRE-LOGIN-VALIDATION
function validateUser(user) {
    const validity = {
        name: Joi.string().required().min(8).max(32),
        password: Joi.string().required().min(8).max(32)
    }
    return Joi.validate(user,validity);
}

exports.preValidation = validateUser;
exports.user = user;
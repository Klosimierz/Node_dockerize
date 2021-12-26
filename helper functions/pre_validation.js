const Joi = require('joi');

module.exports = function(user) {
        const validity = Joi.object({
            name: Joi.string().required().min(8).max(32),
            password: Joi.string().required().min(8).max(32)
        });
        return validity.validate(user);
}
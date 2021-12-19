const {user} = require('../models/user');

module.exports = async function isAuthorized(req, res, next) {
    const checkUser = await user.findOne({name: req.body.name});
    if(checkUser.password === req.body.password) {
        return next();
    }
    else {
        res.send('Unauthorized');
    }
}
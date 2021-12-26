const {user} = require('../models/user');
const bcrypt = require('bcrypt');

module.exports = async function isAuthorized(req, res, next) {
    const checkUser = await user.findOne({name: req.body.name});
    if(!checkUser) {
        res.status(401).send('Unauthorized');
        return 1;
    }
    if(await bcrypt.compare(req.body.password,checkUser.password)) {
        return next();
    }
    else {
        res.status(401).send('Unauthorized');
        return 1;
    }
}
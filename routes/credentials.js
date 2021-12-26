const {user} = require('../models/user');
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const pre_validation = require('../helper functions/pre_validation');

router.post('/register', async(req,res)=> {
    const {error} = pre_validation(req.body);
    if (error) {
        res.status(400).send('Invalid data');
        return;
    }
    else {
        let {password,name} = req.body;
        try {
            const existingUser = await user.findOne({name: req.body.name});
            if (existingUser) {
                res.status(400).send('User with this name exists');
                return;
            }
            else {
                const salt = await bcrypt.genSalt(10);
                const hashed_pw = await bcrypt.hash(password,salt);
                addUser = new user({
                    name: name,
                    password: password
                });
                addUser.password = hashed_pw;
                const result = await addUser.save();
                res.status(200).send(result);
            }
        }
        catch (exception) {
            console.log(exception.message);
            res.status(500).send('An error has occured');
        }
    }
});

module.exports = router;


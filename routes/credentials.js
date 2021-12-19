const {user, preValidation} = require('../models/user');
const express = require('express');
const router = express.Router();

router.post('/register', async(req,res)=> {
    console.log("AAA",req.body);
    const {error} = preValidation(req.body);
    if (error) {
        res.status(400).send('Invalid data');
        return;
    }
    else {
        try {
            const existingUser = await user.findOne({name: req.body.name});
            if (existingUser) {
                res.status(200).send('User with this name exists');
                return;
            }
            else {
                addUser = new user({
                    name: req.body.name,
                    password: req.body.password
                })
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


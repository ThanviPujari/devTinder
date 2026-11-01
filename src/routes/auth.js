const express = require('express');
const authRouter = express.Router();
const { validateSignUpData } = require('../utils/validation');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const validator = require('validator');

authRouter.post('/signup', async (req, res) => {
    try {
        //Validate the data
        validateSignUpData(req);
        //Encrypt the password
        const passwordHash = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            ...req.body,
           password: passwordHash
        })
        await user.save();
        res.send('User Added Successfully.')
    }
    catch (err) {
        res.status(400).send('Error: ' + err.message)
    }

})

authRouter.post('/login', async (req, res) => {
    try {
        const { emailId, password } = req.body;
        if(!validator.isEmail(emailId)) {
            throw new Error('Please enter a valid email.');
        }
        if(!password) {
            throw new Error('Please enter a valid password');
        } 
        const user = await User.findOne({ emailId: emailId });
        if (user) {
            const isValid = user.isPasswordValid(password);
            if (isValid) {
                const token = await user.getJWT();
                res.cookie('token', token);
                res.status(200).send(`Login Successful `);
            }
            else {
                throw new Error('Incorrect Password')
            }
        }
        else {
            throw new Error('Invalid Credentials.')
        }
    }
    catch (err) {
        res.send('Error: ' + err.message)
    }
})

module.exports = authRouter
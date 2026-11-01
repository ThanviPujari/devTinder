const express = require('express');
const profileRouter = express.Router();
const {userAuth} = require('../middleware/auth');

profileRouter.get('/profile' , userAuth, async(req,res)=>{
    try {
    res.send(req.user);
    }
    catch(err) {
        res.send(err.message)
    }
})

module.exports = profileRouter
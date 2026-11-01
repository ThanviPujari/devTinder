const User = require('../models/user');
const jwt = require('jsonwebtoken')
const userAuth = async (req,res,next)=>{
    try {
    // Read token 
    const {token} = req.cookies;
    console.log(token);
    if(!token) {
        throw new Error('Cookie Expired.')
    }
    // Validate the token
    const decodedMessage = jwt.verify(token, 'DevTinder@999');
    
    // Read the id
    const {_id} = decodedMessage;
    // Read the user from database
    const user = await User.findOne({_id});
    if(!user){
        throw new Error('Not a Authorized user.')
    }
    req.user = user;
    next();
    }
    catch(err) {
        res.status(404).send(err.message);
    }
}

module.exports = {userAuth}
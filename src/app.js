const express = require('express');
const app = express();
const connectDB = require('./config/database');
const User = require('./models/user');
const { validateSignUpData } = require('./utils/validation');
const bcrypt = require('bcrypt');
const validator = require('validator');
const cookieParser = require('cookie-parser');
var jwt = require('jsonwebtoken');
const {userAuth} = require('./middleware/auth');
app.use(express.json());
app.use(cookieParser());

app.post('/signup', async (req, res) => {
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
app.get('/login', async (req, res) => {
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
            const isValid = await bcrypt.compare(password, user.password);
            if (isValid) {
                var token = await jwt.sign({_id: user._id}, 'DevTinder@999', {expiresIn: '7d'})
                res.cookie('token', token, {maxAge: 60000});
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
app.get('/profile' , userAuth, async(req,res)=>{
    try {
    res.send(req.user);
    }
    catch(err) {
        res.send(err.message)
    }
})

app.get('/email', async (req, res) => {
    const user = await User.findOne({ emailId: req.body.email });
    if (!user) {
        res.status(404).send('User not found.')
    }
    else {
        res.status(200).send(user);
    }
})
app.get('/feed', async (req, res) => {
    try {
        const users = await User.find(req.body);
        if (users.length === 0) {
            res.status(404).send('User not found.')
        }
        else {
            res.status(200).json(
                {
                    'result': 'Users Data Succesfully Fetched.',
                    'data': users
                })
        }
    }
    catch (err) {
        console.log(err.message)
    }
})
app.delete('/user', async (req, res) => {
    const user = await User.findOneAndDelete({ email: req.body.email });
    res.status(200).json({
        "status": "User successfully deleted.",
        "data": user
    })

})
app.patch('/user/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const ALLOWED_UPDATES = ['photourl', 'about', 'gender', 'age', 'firstName', 'lastName', 'password', 'skills'];
        const isUpdateAllowed = Object.keys(req.body).every((k) => ALLOWED_UPDATES.includes(k));
        if (!isUpdateAllowed) {
            throw new Error('Update not allowed.')
        }
        if (req.body.skills?.length > 10) {
            throw new Error("More than 10 skills aren't allowed.")
        }
        const user = await User.findOneAndUpdate({ _id: userId }, req.body, { returnDocument: "after", runValidators: "true" });
        res.status(200).json({
            "status": "User successfully updated.",
            "updatedData": user
        });
    }
    catch (err) {
        res.status(400).send(err.message)
    }
})
connectDB().then(() => {
    console.log('Database connection succesfully established.');
    app.listen(3000, 'localhost', () => {
        console.log('Server is all set for listenting running on port 3000')
    })
}).catch((err) => {
    console.log(err.message);
})

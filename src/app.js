const express = require('express');
const app = express();
const connectDB = require('./config/database');
const User = require('./models/user');
app.use(express.json());

app.post('/signup', async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        res.send('Enter User Credentials.')
    }
    else {
        const user = new User(req.body);
        try {
            await user.save();
            res.send('User Added Successfully.')
        }
        catch (err) {
            console.log(err.message);
        }
    }
})
app.get('/email', async (req,res)=>{
    const user = await User.findOne({email: req.body.email});
    res.status(200).send(user);
})
app.get('/feed', async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        res.send('Enter User Credentials.')
    }
    else {
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

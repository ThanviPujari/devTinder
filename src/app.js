const express = require('express');
const {adminAuth, userAuth} = require('./middleware/auth');
const app = express();
app.use('/admin', adminAuth)
app.use('/user/login',(req,res)=>{
    res.send('User Logged in Successfully');
})
app.use('/user', userAuth, (req,res)=>{
    res.send('User Data')
})
app.use('/admin/getAllData',(req,res,next)=>{
    res.send('All user data sent.')
})
app.use('/admin/deleteAllData',(req,res,next)=>{
    res.send('User data deleted')
})


app.listen(3000,'localhost',()=>{
    console.log('Server is all set for listenting running on port 3000')
})
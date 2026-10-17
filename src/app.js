const express = require('express');
const app = express();
app.use('/admin',(req,res,next)=>{
const token = '123';
let authorized;
if(token === '123') {
    authorized = true;
}
else {
    authorized = false;
}
if(authorized) {
    next();
}
else {
     res.status(401).send('You are not a authorized user.')
}
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
const express = require('express');
const app = express();
app.use('/user',(req,res,next)=>{
// 1st controller
console.log('Route Handler 1');
res.send('Woah')
next()
},(req,res)=>{
// 2nd controller
console.log('Route Handler 1');
res.send('Hello')
})

app.listen(3000,'localhost',()=>{
    console.log('Server is all set for listenting running on port 3000')
})
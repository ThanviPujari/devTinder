const express = require('express');
const app = express();
app.use((req,res)=>{
    res.send('Hello')
})
app.listen(3000,'localhost',()=>{
    console.log('Server is all set for listenting running on port 3000')
})
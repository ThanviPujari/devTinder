const adminAuth = (req,res,next)=>{
    console.log('Admin Auth is getting checked.');
    const token = '123';
    const isAdminAuthorized = token === '123';
    if(!isAdminAuthorized) {
        res.status(401).send('You are not a authorized user.')
    }
    else {
        next();
    }
}

const userAuth = (req,res,next)=>{
    console.log('user Auth is getting checked.');
    const token = '123';
    const isuserAuthorized = token === '123';
    if(!isuserAuthorized) {
        res.status(401).send('You are not a authorized user.')
    }
    else {
        next();
    }
}

module.exports = {adminAuth, userAuth} ;
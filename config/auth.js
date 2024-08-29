const jwt = require('jsonwebtoken');
require('dotenv').config();

// middle ware to confirm that the user can enter this area
const authMiddleWare = (req, res, next)=>{
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if(!token){
        res.status(401).json({error: 'Access is denied, token missing'});
    }
    try{
    const verified = jwt.verify(token, process.env.secretKey);
    req.user = verified;
    next();
    } catch(err){
        res.status(400).send(err);
    }
}

module.exports = authMiddleWare;
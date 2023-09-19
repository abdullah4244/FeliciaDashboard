const jwt = require('jsonwebtoken');
const User = require('../database/models/user');
exports.protect = async (req,res,next) =>{
  const token =req.cookies?.jwt
  console.log(token, "token")
  if(!token) {
    return res.status(404).json({
        message : "Not Authorized"
    })
  }
  const decoded = jwt.verify(token,process.env.JWT_SECRET)
  const user = await User.findByPk(decoded.id);
  if(user) {
    next()
  }
  else {
    res.status(404).json({
        message : "Not Authorized"
    })
  }
}
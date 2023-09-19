const User = require('../database/models/user');
const jwt = require('jsonwebtoken');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
      });
}
const createSendToken = (user,req,res) => {
    const token = signToken(user.id);
    res.cookie('jwt', token, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
      });
      return res.status(200).json({
        user : user,
      })
}
exports.logIn = async (req,res) => {
    try {
      const {email,password} = req.body;
      const resp = await User.findOne({where : {email : email}})
      console.log(resp,"response")
       if(!resp || !(await User.correctPassword(password,resp?.password))) {
        return res.status(404).json({
           message : "Invalid email or password"
        })
       }
       resp.password = undefined
       createSendToken(resp,req,res);
    }
    catch(err){
      return res.status(500).json({
        err : err.message
      })
    }
}

exports.getMe = async (req,res) => {
    try{
    const token = req.cookies?.jwt;
    if(!token) {
       return res.status(404).json({
            status : "Not Authorized"
        })
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    const user = await User.findByPk(decoded.id);
    if(!user) {
        return res.status(404).json({
            message : "Not Authorized"
        })
    }
    return res.status(200).json({
        user:  user
    })
}
catch(err) {
    res.status(500).json({
        err : err.message
    })
}
}
exports.logOut = (req,res) => {
    res.clearCookie('jwt');
      res.status(200).json({
        message : "Logout Successfully"
      });
  }
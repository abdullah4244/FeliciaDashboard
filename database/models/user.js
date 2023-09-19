const Sequelize = require('sequelize');
const sequelize = require('../db');
const bycrypt = require('bcryptjs');
const User = sequelize.define('user',{
    id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        primaryKey : true,
        allowNull : false
    },
    name : {
        type : Sequelize.STRING
    },
    email : {
        type : Sequelize.STRING,
        unique : {
            msg : "Email is already in use"
        },
        validate : {
            isEmail : {
                msg : "Valid Email is required"
            }
        }
    },
    password : {
        type : Sequelize.STRING,
        allowNull : false
    }
})

User.beforeCreate(async (user,options)=>{
    const hashedPassword = await bycrypt.hash(user.password , 8)
    user.password = hashedPassword
})
User.correctPassword = async (candidatePassword,userPassword) => {
    return await bycrypt.compare(candidatePassword, userPassword);
}
module.exports = User;

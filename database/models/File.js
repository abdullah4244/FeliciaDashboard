const Sequelize = require('sequelize');
const sequelize = require('../db');
const File = sequelize.define('file',{
    id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },
    name : {
        type : Sequelize.STRING
    },
    url : {
        type : Sequelize.STRING
    }
})
module.exports = File;
const Sequelize = require('sequelize')
const sequelize = require('../db')

const Filter = sequelize.define('filter',{
    id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true,
    },
    tag : {
        type : Sequelize.STRING
    }
})

module.exports = Filter
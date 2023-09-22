const app =require('./app');
const sequelize = require('./database/db')
const User = require('./database/models/user');
const File = require('./database/models/File');
const Filter = require('./database/models/Filter');
File.hasMany(Filter,{constraints : true,onDelete : "CASCADE",foreignKey : "fileId"})
sequelize
  .sync()
  .then(()=>{
    User.findOne({where: {email : "admin@admin.com"}}).then((resp)=>{
        if(!resp) {
            User.create({
                email :"admin@admin.com",
                password : "password",
                name : "Diving Master",
                role : "admin"
            }).then(()=>{
                console.log("Root User Created")
            })
        }
        else {
            console.log("Admin User Already Created")
        }
    })
    User.findOne({where: {email : "user@app.com"}}).then((resp)=>{
        if(!resp) {
            User.create({
                email :"user@app.com",
                password : "password",
                name : "Test User",
                role : "user"
            }).then(()=>{
                console.log("Normal User Created")
            })
        }
        else {
            console.log("Normal User Already Created")
        }
    })
    app.listen(process.env.NODE_DOCKER_PORT,()=>{
        console.log("listening on portt " + process.env.NODE_DOCKER_PORT)
    })
  }).catch((err)=>{
    console.log(err)
  })
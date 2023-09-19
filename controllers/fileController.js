const File = require('../database/models/File');
const Filter = require('../database/models/Filter');
exports.createFile=async (req,res)=>{
    const {filters} = req.body;
    const constructTags = []
    filters.forEach((filter)=>{
        constructTags.push({tag : filter})
    })
  try{
    if(!req.file) {
        return res.status(404).json({
            message : "File is required"
        })
    }
    const file =  await File.create({
        name : req.file.originalname,
        url : `/upload/${req.file.filename}`,
        filters: [...constructTags]
    },{
        include :[Filter]
    })
    if(!file) {
        return res.status(400).json({
            message : "Unable to create File"
        })
    }
    return res.status(200).json({
        data : file
    })
  }
  catch(err){
    res.status(500).json({
      err : err.message
    })
  }
}
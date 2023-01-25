const mongoose = require("mongoose")

const urlsSchema = mongoose.Schema({
    roleId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    path:{
        type:String,
        required:true,
    },
    method:{
        type:String,
        required:true,
        uppercase:true,
    },
    params:[{
        type:String,
    },],
    query:[{
        type:String,
    },],

}, {
    timestamps:true
})

const Urls = mongoose.model("Urls", urlsSchema)
module.exports=Urls
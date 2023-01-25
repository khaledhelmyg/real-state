const mongoose = require("mongoose")

const roleSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
    },

}, {
    timestamps:true
})


roleSchema.virtual("roleUrls", {
    ref:"Urls",
    localField:"_id",
    foreignField:"roleId"
})
const Role = mongoose.model("Role", roleSchema)
module.exports=Role
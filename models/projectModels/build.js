const mongoose=require("mongoose")
const buildSchema=mongoose.Schema({
    projectId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Project"
    },
    buildLetter:{
        type:String,
        require:true,
        unique:true
    },
    image:{
        type:String,
        required:true,
    },
    area:{
        type:String
    }
})
buildSchema.virtual("floors", {
    ref:"Floor",
    localField:"_id",
    foreignField:"buildId"
 })
const Build=mongoose.model("Build",buildSchema)
module.exports=Build
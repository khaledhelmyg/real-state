const mongoose=require("mongoose")

const floorSchema=mongoose.Schema({
    buildId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Build"
    },
    number:{
        type:String,
        require:true,
        unique:true
    },
    image:{
        type:String,
        required:true
    },
    unitsNum:{
        type:Number,
        default:4,
    }
})
floorSchema.virtual("units", {
    ref:"Unit",
    localField:"_id",
    foreignField:"floorId"
 })
const Floor=mongoose.model("Floor",floorSchema)
module.exports=Floor
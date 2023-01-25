const mongoose=require("mongoose")

const unitModel=mongoose.Schema({
    floorId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Floor"
    },
    number:{
        type:String,
        require:true,
        unique:true
    },
    images:[{
        image:{
        type:String,
        required:true
    }}],
    price:{
        type:Number,
        required:true
    },
    isPaid:{
        type:Boolean,
        required:true,
        default:false
    },
    roomsNum:{
        type:Number,
        required:true,
    },
    pathsNum:{
        type:Number,
        required:true
    },
    balconiesNum:{
        type:Number,
    },
    reciptionesNum:{
        type:Number,
    },
})

const Unit=mongoose.model("Unit",unitModel)
module.exports=Unit
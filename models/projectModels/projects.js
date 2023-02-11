const mongoose=require("mongoose")

const projectSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    forShow:{
        type:Boolean,
        required:true,
        default:true
    },
    area:{
        type:String,
    },
    const:{
        type:Number,
    },
    image:{
        type:String,
        required:true,
    },
    images:[{
        imageUrl:{
            type:String,
            required:true
        },
        // the number how the imgae is important to apear first
        fav:{
            type:Number
        }
    }]

})

projectSchema.virtual("proBuilds", {
    ref:"Build",
    localField:"_id",
    foreignField:"projectId"
})
const Project=mongoose.model("Project",projectSchema)
module.exports=Project
const mongoose=require("mongoose")

const orderSchema=mongoose.Schema({
    employeeId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    unitId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Unit"
    },
    paymentMethod: { type: String, required: true },
    sold: { type: Boolean, default: false },
    notes:{type:String}

},{
    timestamps:true
})


const Order=mongoose.model("Order",orderSchema)
module.exports=Order
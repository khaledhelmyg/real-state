const { resHelper } = require('./index')
const ordertModel=require('../models/order')
const Unit = require('../models/projectModels/unit')
const User = require('../models/user')
class Order{
    static create=async(req,res)=>{
        try {
            const newOrder=new ordertModel({
                employeeId:req.user._id,
                ...req.body
            })
            await newOrder.save()
            resHelper(res,200,true,newOrder,"order created")
        } catch (err) {
            resHelper(res,400,false,err,err.message)
        }
    }
    static getReceipt=async(req,res)=>{
        try {
            const order=await ordertModel.findById(req.params.id)
            if(!order)throw new Error("inavlid order id")

            const user=await User.findById(order.userId)
            if(!user)throw new Error("inavlid user id")
            
            const unit=await Unit.findById(order.unitId)
            if(!unit)throw new Error("inavlid unit id")
            //update unit payment status 
            unit.isPaid=true
            await unit.save()

            // const employee=req.user

            resHelper(res,200,true,{
                order,
                employee:req.user,
                user,
                unit
            },"get receipt")

        } catch (err) {
            resHelper(res,400,false,err,err.message)
        }
    }
}

module.exports=Order
const { resHelper, receiptPdf} = require('./index')
const ordertModel=require('../models/order')
const Unit = require('../models/projectModels/unit')
const User = require('../models/user')

const path=require('path')
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
            resHelper(res,200,true,{order,employee:req.user,user,unit},"get receipt")
        } catch (err) {
            resHelper(res,400,false,err,err.message)
        }
    }
    static getReceiptPdf=async(req,res)=>{
        try {
            const order=await ordertModel.findById(req.params.id)
            if(!order)throw new Error("inavlid order id")
            const user=await User.findById(order.userId)
            if(!user)throw new Error("inavlid user id")
            const unit=await Unit.findById(order.unitId)
            if(!unit)throw new Error("inavlid unit id")
            //update unit payment status 
            unit.isPaid=true
            unit.description ? unit.description : unit.description= "its a good unit for any use and convertabe"
            await unit.save()
            const employee=req.user
            const fileName=await receiptPdf(user,employee,order,unit)
            res.sendFile(path.join(__dirname,`../${fileName}`))
        } catch (err) {
            resHelper(res,400,false,err,err.message)
        }
    }
}

module.exports=Order
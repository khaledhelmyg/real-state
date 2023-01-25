const { resHelper } = require('..')
const unitModel=require('../../models/projectModels/unit')
class Unit{
    static add=async(req,res)=>{
        try {
            const newUnit=new unitModel({
                floorId:req.params.floorId,
                ...req.body
            })
            await newUnit.save()
            resHelper(res,200,true,newUnit,"unit added")
        } catch (err) {
            resHelper(res,400,false,err,err.message)
        }
    }
    static getSingle=async(req,res)=>{
        try {
            const unit=await unitModel.findById(req.params.id)
            resHelper(res,200,true,unit,"get unit")
        } catch (err) {
            resHelper(res,400,false,err,err.message)
        }
    }
    static getAll=async(req,res)=>{
        try {
            const units=await unitModel.find()
            resHelper(res,200,true,units,"get all units")
        } catch (err) {
            resHelper(res,400,false,err,err.message)
        }
    }
    static updateUnit=async(req,res)=>{
        try {
            const updatedUnit=await unitModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
            resHelper(res,200,true,updatedUnit,"unit updated")
        } catch (err) {
            resHelper(res,400,false,err,err.message)
        }
    }
    static deleteUnit=async(req,res)=>{
        try {
            await unitModel.findByIdAndDelete(req.params.id)
            resHelper(res,200,true,{},"unit deleted")
        } catch (err) {
            resHelper(res,400,false,err,err.message)
        }
    }
}

module.exports=Unit
const { resHelper } = require('..')
const floorModel=require('../../models/projectModels/floor')
class Floor{
    static add=async(req,res)=>{
        try {
            const newFloor=new floorModel({
                buildId:req.params.buildId,
                ...req.body
            })
            await newFloor.save()
            resHelper(res,200,true,newFloor,"Floor added")
        } catch (err) {
            resHelper(res,400,false,err,err.message)
        }
    }
    static getSingle=async(req,res)=>{
        try {
            const floor=await floorModel.findById(req.params.id)
            resHelper(res,200,true,floor,"get floor")
        } catch (err) {
            resHelper(res,400,false,err,err.message)
        }
    }
    static getAll=async(req,res)=>{
        try {
            const floors=await floorModel.find()
            resHelper(res,200,true,floors,"get all floors")
        } catch (err) {
            resHelper(res,400,false,err,err.message)
        }
    }
    static getFloorUnits=async(req,res)=>{
        try {
            const floor=await floorModel.findById(req.params.id).populate("units")
            console.log(floor.units)
            resHelper(res,200,true,{
                floor:floor,
                floorUnits:floor.units,
            },"get floor units")
        } catch (err) {
            resHelper(res,400,false,err,err.message)
        }
    }
    static updateFloor=async(req,res)=>{
        try {
            const updatedFloor=await floorModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
            resHelper(res,200,true,updatedFloor,"floor updated")
        } catch (err) {
            resHelper(res,400,false,err,err.message)
        }
    }
    static deleteFloor=async(req,res)=>{
        try {
            await floorModel.findByIdAndDelete(req.params.id)
            resHelper(res,200,true,{},"floor deleted")
        } catch (err) {
            resHelper(res,400,false,err,err.message)
        }
    }
}

module.exports=Floor
const { resHelper } = require('..')
const buildModel=require('../../models/projectModels/build')
class Build{
    static add=async(req,res)=>{
        try {
            const newBuild=new buildModel({
                projectId:req.params.projectId,
                ...req.body
            })
        
            await newBuild.save()
            resHelper(res,200,true,newBuild,"build added")
        } catch (err) {
            resHelper(res,400,false,err,err.message)
        }
    }
    static getSingle=async(req,res)=>{
        try {
            const build=await buildModel.findById(req.params.id)
            resHelper(res,200,true,build,"get build")
        } catch (err) {
            resHelper(res,400,false,err,err.message)
        }
    }
    static getAll=async(req,res)=>{
        try {
            const builds=await buildModel.find()
            resHelper(res,200,true,builds,"get all builds")
        } catch (err) {
            resHelper(res,400,false,err,err.message)
        }
    }
    static getBuildFloors=async(req,res)=>{
        try {
            const build=await buildModel.findById(req.params.id).populate("floors")
            console.log(build.floors)
            resHelper(res,200,true,{
                build:build,
                BuildFloors:build.floors,
            },"get build floors")
        } catch (err) {
            resHelper(res,400,false,err,err.message)
        }
    }
    static updateBuild=async(req,res)=>{
        try {
            const updatedBuild=await buildModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
            resHelper(res,200,true,updatedBuild,"build updated")
        } catch (err) {
            resHelper(res,400,false,err,err.message)
        }
    }
    static deleteBuild=async(req,res)=>{
        try {
            await buildModel.findByIdAndDelete(req.params.id)
            resHelper(res,200,true,{},"build deleted")
        } catch (err) {
            resHelper(res,400,false,err,err.message)
        }
    }
}

module.exports=Build
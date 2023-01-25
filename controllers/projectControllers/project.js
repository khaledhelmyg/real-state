const { resHelper } = require('..')
const projectModel=require('../../models/projectModels/projects')
class Project{
    static add=async(req,res)=>{
        try {
            const newProject=new projectModel(req.body)
            await newProject.save()
            resHelper(res,200,true,newProject,"project added")
        } catch (err) {
            resHelper(res,400,false,err,err.message)
        }
    }
    static getSingle=async(req,res)=>{
        try {
            const project=await projectModel.findById(req.params.id)
            resHelper(res,200,true,project,"get project")
        } catch (err) {
            resHelper(res,400,false,err,err.message)
        }
    }
    static getAll=async(req,res)=>{
        try {
            const projects=await projectModel.find()
            resHelper(res,200,true,projects,"get all projects")
        } catch (err) {
            resHelper(res,400,false,err,err.message)
        }
    }
    static getProjectBuilds=async(req,res)=>{
        try {
            const project=await projectModel.findById(req.params.id).populate("proBuilds")
            resHelper(res,200,true,{
                project:project,
                proBuilds:project.proBuilds,
                buildsFloors:project.proBuilds.floors
            },"get project builds")
        } catch (err) {
            resHelper(res,400,false,err,err.message)
        }
    }
    static updateProject=async(req,res)=>{
        try {
            const updatedPro=await projectModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
            resHelper(res,200,true,updatedPro,"project updated")
        } catch (err) {
            resHelper(res,400,false,err,err.message)
        }
    }
    static deleteProject=async(req,res)=>{
        try {
            await projectModel.findByIdAndDelete(req.params.id)
            resHelper(res,200,true,{},"project deleted")
        } catch (err) {
            resHelper(res,400,false,err,err.message)
        }
    }
}

module.exports=Project
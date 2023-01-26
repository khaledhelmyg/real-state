const { resHelper } = require(".")
const urlsModel=require('../models/urls')

class Urls{
    static create=async(req,res)=>{
        try {
            const newUrls=new urlsModel({
                roleId:req.role._id,
                ...req.body
            })
            await newUrls.save()
            resHelper(res,200,true,newUrls,"urls created")
        } catch (err) {
            resHelper(res,500,false,err,err.message)
        }
    }
    static get=async(req,res)=>{
        try {
            const role=await urlsModel.findById(req.params.id)
            resHelper(res,200,true,role,"get urls")
        } catch (err) {
            resHelper(res,500,false,err,err.message)
        }
    }
}

module.exports=Urls
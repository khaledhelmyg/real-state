const { resHelper } = require(".")
const rolesModel=require('../models/role')

class Role{
    static create=async(req,res)=>{
        try {
            const newRole=new rolesModel(req.body)
        
            await newRole.save()
            resHelper(res,200,true,newRole,"role created")
        } catch (err) {
            resHelper(res,500,false,err,err.message)
        }
    }
}
module.exports=Role
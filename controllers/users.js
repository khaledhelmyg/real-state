const userModel=require('../models/user')
const {resHelper} = require("./index")

class Users{
    static register = async(req,res) => {
        try{
            if(req.body.password.length<6) throw new Error("password must be more than 6")
            const userData = new userModel(req.body)
            await userData.save()
            resHelper(res, 200, true, userData, "user added successfully")
        }
        catch(e){
            resHelper(res, 500, false, e, e.message)
        }
    }
    static login = async(req,res) => {
        try{
            const userData = await userModel.loginUser(req.body.email, req.body.password)
            const token = await userData.generateToken()
            resHelper(res, 200, true, {user:userData, token}, "user added successfully")
        }
        catch(e){
            resHelper(res, 500, false, e, e.message)
        }
    }
    static profile=(req,res)=>{
        resHelper(res,200,true,{user:req.user},"profile fetched")
    } 
    static all=async(req,res)=>{
        try {
            const users=await userModel.find()
            resHelper(res,200,true,users,"get all users")
        } catch (err) {
            resHelper(res,400,false,err,err.message)
        }
    }
}
module.exports=Users
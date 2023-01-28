const jwt=require('jsonwebtoken')
const { resHelper } = require('../controllers')
const Role = require('../models/role')
const User = require('../models/user')

const Authanticated=async(req,res,next)=>{
    try {
        const token= req.header("Authorization").replace("Bearer ","")
        const decodedToken=jwt.verify(token,process.env.SECRET)
        const userData=await User.findOne({
            _id:decodedToken._id,
            "tokens.token":token
        })

        if(!userData)throw new Error("Ops you are not authorized!")
        const userRole=await Role.findById(userData.roleId)
        if(!userRole)throw new Error("Ops you have not role !")
        req.user=userData
        req.token=token
        req.role=userRole
        next()
    } catch (err) {
        resHelper(res,401,false,err.message,"invalid token!")
    }
}
const Authorized =async(req,res,next)=>{
    try {
        const role=await req.role.populate("roleUrls")
        // if(req.path == roleUrls.path && req.method  === roleUrls.method)
        const isAuth=role.roleUrls.find(roleUrl=>{
            // console.log(roleUrl.path, "---")
            // console.log(req.path)

            // console.log(roleUrl.method, "---")
            // console.log(req.method)
            // console.log(req.url)
            const firstRoote=req.path.split('/')[1]
            const firstRooteToMatch=roleUrl.path.split('/')[1]
            console.log(firstRoote)
            console.log(firstRooteToMatch)

            return firstRoote === firstRooteToMatch && req.method == roleUrl.method
        })
        // console.log(isAuth)
        if(!isAuth)throw new Error
        ("don't have peremission!\n if you need to get access ask super admin please")
        next()
    } catch (err) {
        resHelper(res,401,false,err.message,"UnAuthorized!")
        
    }
}

module.exports={
    isAuth:Authanticated,
    hasAuth:Authorized
}
